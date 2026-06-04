# Architecture Overview

## System Design

The Agentic QA Generator is a full-stack application with a clear separation of concerns between frontend and backend, orchestrated through a stateful LangGraph workflow.

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Dashboard Component                                    │ │
│  │  - Text area for user story input                       │ │
│  │  - Framework selector dropdown                          │ │
│  │  - Generate button with loading state                   │ │
│  │  - Code display with syntax highlighting               │ │
│  │  - Copy and download functionality                      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           ↓ (HTTP POST)                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend (FastAPI)                           │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  /api/generate-tests Endpoint                           │ │
│  │  - Validates input (story, framework)                   │ │
│  │  - Invokes LangGraph workflow                           │ │
│  │  - Returns generated code and analysis                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │         LangGraph Orchestration Layer                   │ │
│  │  ┌──────────────────┐         ┌──────────────────────┐  │ │
│  │  │  Analyzer Node   │────────→│ Code Generator Node  │  │ │
│  │  │                  │         │                      │  │ │
│  │  │ • Parse story    │         │ • Generate tests     │  │ │
│  │  │ • Extract reqs   │         │ • Use Pydantic       │  │ │
│  │  │ • Find edge cases│         │ • Validate output    │  │ │
│  │  │ • Identify logic │         │ • Return code        │  │ │
│  │  └──────────────────┘         └──────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │         External Services                               │ │
│  │  - OpenAI API (GPT-3.5-turbo)                           │ │
│  │  - LangChain integration                                │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

**Dashboard.tsx**
- Main container component
- Manages state for story, framework, loading, generated code, and errors
- Handles API communication via axios
- Orchestrates child components

**CodeDisplay.tsx**
- Displays generated code with syntax highlighting
- Uses react-syntax-highlighter with Prism theme
- Supports multiple languages (TypeScript, Markdown)
- Responsive with scrollable container

### Backend Structure

**main.py**
- FastAPI application setup
- CORS middleware configuration
- Request/response models using Pydantic
- Route definitions and error handling

**langgraph_orchestrator.py**
- LangGraph workflow definition
- State management using TypedDict
- Two-node workflow:
  - `analyzer_node`: Analyzes user story
  - `code_generator_node`: Generates test code
- Template management for different frameworks
- Text parsing utilities

## Data Flow

### Request Flow

```
1. User enters story and selects framework
   ↓
2. Frontend sends POST to /api/generate-tests
   {
     "story": "User story text",
     "framework": "playwright|jest|manual"
   }
   ↓
3. Backend validates input
   ↓
4. LangGraph workflow executes:
   a. Analyzer Node
      - Sends story to OpenAI
      - Extracts requirements, edge cases, business logic
      - Returns StoryAnalysis object
   
   b. Code Generator Node
      - Receives analysis
      - Sends prompt with analysis to OpenAI
      - Generates framework-specific test code
      - Returns generated code
   ↓
5. Backend returns response
   {
     "code": "Generated test code",
     "framework": "playwright",
     "analysis": {
       "functional_requirements": [...],
       "edge_cases": [...],
       "business_logic": [...]
     }
   }
   ↓
6. Frontend displays code and analysis
   ↓
7. User can copy or download the code
```

## State Management

### LangGraph State

```python
class State(TypedDict):
    story: str                          # Original user story
    framework: str                      # Selected framework
    analysis: StoryAnalysis            # Extracted analysis
    generated_code: str                # Final generated code
```

### Frontend State

```typescript
- story: string                        // User input
- framework: string                    // Selected framework
- loading: boolean                     // API call in progress
- generatedCode: string               // Response code
- error: string                        // Error message
- analysis: AnalysisObject            // Extracted analysis
```

## Framework Support

### Playwright
- Language: TypeScript
- Type: E2E Testing
- Template: Includes page navigation, element interaction, assertions
- Output: `.spec.ts` file

### Jest
- Language: TypeScript
- Type: Unit/Integration Testing
- Template: Includes describe blocks, beforeEach hooks, test cases
- Output: `.test.ts` file

### Manual
- Language: Markdown
- Type: Manual Test Scenarios
- Template: Structured test cases with steps and expected results
- Output: `.md` file

## Error Handling

### Frontend Error Handling
- Empty story validation
- Network error catching
- User-friendly error messages
- Fallback to default templates if analysis fails

### Backend Error Handling
- Input validation (story, framework)
- HTTP exception raising with descriptive messages
- Graceful fallback for analysis failures
- Try-catch blocks around OpenAI API calls

## Performance Considerations

### Latency
- First request: 15-30 seconds (OpenAI API + LangGraph initialization)
- Subsequent requests: 10-20 seconds (API calls are sequential)
- Network latency: ~1-2 seconds

### Optimization Opportunities
1. **Caching**: Store frequently generated test patterns
2. **Parallel Processing**: Run analyzer and generator in parallel (if possible)
3. **Streaming**: Stream response tokens as they arrive
4. **Rate Limiting**: Implement token bucket for API calls
5. **Batch Processing**: Queue multiple requests

## Security Considerations

### API Key Management
- OpenAI API key stored in environment variables
- Never exposed in frontend code
- Backend-only access to sensitive credentials

### CORS Configuration
- Restricted to localhost in development
- Should be configured for specific domains in production
- Prevents unauthorized cross-origin requests

### Input Validation
- Story text length limits
- Framework whitelist validation
- SQL injection prevention (not applicable here)
- XSS prevention through React's built-in escaping

## Scalability

### Current Architecture
- Single instance backend
- Synchronous request processing
- No database or caching

### Scaling Strategies
1. **Horizontal Scaling**: Deploy multiple backend instances
2. **Load Balancing**: Use reverse proxy (nginx, HAProxy)
3. **Caching Layer**: Redis for response caching
4. **Job Queue**: Celery for async processing
5. **Database**: PostgreSQL for storing generated tests
6. **CDN**: CloudFlare for static asset delivery

## Testing Strategy

### Unit Tests
- Test individual analyzer and generator functions
- Mock OpenAI API responses
- Validate state transitions

### Integration Tests
- Test full workflow end-to-end
- Validate request/response formats
- Test error handling paths

### E2E Tests
- Test frontend user interactions
- Validate API integration
- Test file download functionality

## Deployment Architecture

### Development
```
localhost:3000 (Frontend)
    ↓
localhost:8000 (Backend)
```

### Production (Vercel + Render)
```
your-domain.vercel.app (Frontend)
    ↓
your-api.onrender.com (Backend)
```

## Technology Stack Rationale

| Technology | Reason |
|-----------|--------|
| Next.js | Modern React framework with built-in optimization |
| TypeScript | Type safety and better developer experience |
| Tailwind CSS | Utility-first CSS for rapid UI development |
| FastAPI | High-performance Python web framework |
| LangGraph | Stateful workflow orchestration for AI agents |
| Pydantic | Data validation and serialization |
| OpenAI API | State-of-the-art language model |
| React Syntax Highlighter | Beautiful code display |

## Future Architecture Improvements

1. **Microservices**: Separate analyzer and generator services
2. **Event-Driven**: Use message queues (RabbitMQ, Kafka)
3. **Caching**: Implement Redis for response caching
4. **Monitoring**: Add logging and metrics (Prometheus, Grafana)
5. **CI/CD**: Automated testing and deployment pipeline
6. **API Gateway**: Kong or AWS API Gateway for rate limiting
7. **Database**: Store test history and user preferences
