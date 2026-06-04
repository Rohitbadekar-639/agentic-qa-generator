from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from langgraph_orchestrator import generate_test_suite

load_dotenv()

app = FastAPI(title="Agentic QA Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateTestRequest(BaseModel):
    story: str
    framework: str

class GenerateTestResponse(BaseModel):
    code: str
    framework: str
    analysis: Optional[dict] = None

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/generate-tests", response_model=GenerateTestResponse)
async def generate_tests(request: GenerateTestRequest):
    try:
        if not request.story or not request.story.strip():
            raise HTTPException(status_code=400, detail="Story text cannot be empty")
        
        if request.framework not in ["playwright", "jest", "manual"]:
            raise HTTPException(status_code=400, detail="Invalid framework selected")
        
        result = generate_test_suite(request.story, request.framework)
        return GenerateTestResponse(
            code=result["code"],
            framework=result["framework"],
            analysis=result["analysis"]
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating tests: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
