import os
from typing import TypedDict, Annotated
from pydantic import BaseModel, Field
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import json

load_dotenv()

llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.7,
    api_key=os.getenv("OPENAI_API_KEY")
)

class StoryAnalysis(BaseModel):
    functional_requirements: list[str] = Field(description="List of functional requirements extracted from the story")
    edge_cases: list[str] = Field(description="List of potential edge cases and error scenarios")
    business_logic: list[str] = Field(description="Key business logic points to test")

class State(TypedDict):
    story: str
    framework: str
    analysis: StoryAnalysis
    generated_code: str

def analyzer_node(state: State) -> State:
    """Node 1: Analyze the user story to extract requirements and edge cases"""
    story = state["story"]
    
    prompt = f"""Analyze this Jira user story and extract:
1. Functional requirements (list 3-5 items)
2. Edge cases and error scenarios (list 3-5 items)
3. Key business logic to test (list 2-3 items)

User Story:
{story}

Format your response as:
FUNCTIONAL REQUIREMENTS:
- requirement 1
- requirement 2

EDGE CASES:
- edge case 1
- edge case 2

BUSINESS LOGIC:
- logic 1
- logic 2"""
    
    try:
        response = llm.invoke(prompt)
        analysis_text = response.content
        analysis = StoryAnalysis(
            functional_requirements=extract_list_from_text(analysis_text, "FUNCTIONAL REQUIREMENTS"),
            edge_cases=extract_list_from_text(analysis_text, "EDGE CASES"),
            business_logic=extract_list_from_text(analysis_text, "BUSINESS LOGIC")
        )
    except Exception as e:
        print(f"Analysis error: {e}")
        analysis = StoryAnalysis(
            functional_requirements=["Feature implementation", "User interaction", "Data validation"],
            edge_cases=["Invalid input", "Null values", "Boundary conditions"],
            business_logic=["Core functionality", "Error handling", "State management"]
        )
    
    state["analysis"] = analysis
    return state

def code_generator_node(state: State) -> State:
    """Node 2: Generate test code based on analysis"""
    framework = state["framework"]
    analysis = state["analysis"]
    story = state["story"]
    
    framework_templates = {
        "playwright": get_playwright_template(),
        "jest": get_jest_template(),
        "manual": get_manual_template()
    }
    
    template = framework_templates.get(framework, framework_templates["playwright"])
    
    prompt = f"""Generate a {framework} test suite based on this analysis:

Story: {story}

Functional Requirements:
{chr(10).join(f"- {req}" for req in analysis.functional_requirements)}

Edge Cases:
{chr(10).join(f"- {case}" for case in analysis.edge_cases)}

Business Logic:
{chr(10).join(f"- {logic}" for logic in analysis.business_logic)}

Template to follow:
{template}

Generate complete, syntactically correct test code. Include all necessary imports and setup. Make it production-ready."""
    
    try:
        response = llm.invoke(prompt)
        state["generated_code"] = response.content
    except Exception as e:
        print(f"Code generation error: {e}")
        state["generated_code"] = template
    
    return state

def extract_list_from_text(text: str, keyword: str) -> list[str]:
    """Extract list items from LLM response text"""
    lines = text.split('\n')
    items = []
    capture = False
    
    for line in lines:
        if keyword in line:
            capture = True
            continue
        if capture:
            if line.strip().startswith('-') or line.strip().startswith('•'):
                item = line.strip().lstrip('-•').strip()
                if item and len(item) > 2:
                    items.append(item)
            elif line.strip() == '':
                continue
            elif not line.strip().startswith(('-', '•')) and line.strip():
                if capture and not any(c in line for c in [':', 'REQUIREMENTS', 'CASES', 'LOGIC']):
                    break
    
    return items if items else ["Default test case"]

def get_playwright_template() -> str:
    return """import { test, expect } from '@playwright/test';

test.describe('Feature Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load the page', async ({ page }) => {
    await expect(page).toHaveTitle(/.*/)
  });

  test('should handle user interaction', async ({ page }) => {
    // Add test implementation
  });

  test('should handle edge cases', async ({ page }) => {
    // Add edge case testing
  });
});"""

def get_jest_template() -> str:
    return """describe('Feature Tests', () => {
  beforeEach(() => {
    // Setup before each test
  });

  test('should initialize correctly', () => {
    expect(true).toBe(true);
  });

  test('should handle valid input', () => {
    // Add test implementation
  });

  test('should handle edge cases', () => {
    // Add edge case testing
  });

  test('should handle errors gracefully', () => {
    // Add error handling tests
  });
});"""

def get_manual_template() -> str:
    return """# Manual Test Suite

## Test Case 1: Basic Functionality
- **Objective**: Verify core feature works
- **Steps**:
  1. Step 1
  2. Step 2
  3. Step 3
- **Expected Result**: Feature works as expected

## Test Case 2: Edge Cases
- **Objective**: Verify edge case handling
- **Steps**:
  1. Step 1
  2. Step 2
- **Expected Result**: System handles gracefully

## Test Case 3: Error Scenarios
- **Objective**: Verify error handling
- **Steps**:
  1. Step 1
  2. Step 2
- **Expected Result**: Appropriate error message shown"""

def generate_test_suite(story: str, framework: str) -> dict:
    """Main orchestration function"""
    workflow = StateGraph(State)
    
    workflow.add_node("analyzer", analyzer_node)
    workflow.add_node("code_generator", code_generator_node)
    
    workflow.set_entry_point("analyzer")
    workflow.add_edge("analyzer", "code_generator")
    workflow.add_edge("code_generator", END)
    
    graph = workflow.compile()
    
    initial_state = {
        "story": story,
        "framework": framework,
        "analysis": None,
        "generated_code": ""
    }
    
    result = graph.invoke(initial_state)
    
    return {
        "code": result["generated_code"],
        "framework": framework,
        "analysis": result["analysis"].dict() if result["analysis"] else None
    }
