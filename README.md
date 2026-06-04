# Agentic QA Test Generator

A full-stack application that transforms Jira user stories into comprehensive automated test suites using LangGraph and AI orchestration.

## Features

- **AI-Powered Analysis**: Uses LangGraph to orchestrate a 2-node stateful workflow
  - Node 1 (Analyzer): Extracts functional requirements, business logic, and edge cases
  - Node 2 (Code Generator): Generates syntactically correct test code with Pydantic structured outputs
- **Multiple Framework Support**: Generate tests for Playwright, Jest, or manual test scenarios
- **Modern Dashboard**: Clean, responsive UI built with Next.js, Tailwind CSS, and TypeScript
- **One-Click Export**: Copy code to clipboard or download as a file
- **Real-time Analysis**: View extracted requirements and edge cases alongside generated tests

## Tech Stack

**Frontend:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React Syntax Highlighter
- Axios for API calls
- Lucide React icons

**Backend:**
- FastAPI
- LangGraph (agentic workflow orchestration)
- Pydantic (structured outputs)
- LangChain OpenAI integration
- Python 3.9+

## Project Structure

```
Agentic-QA-Generator/
├── agentic-qa-generator/          # Next.js frontend
│   ├── app/
│   │   ├── page.tsx               # Main entry point
│   │   ├── components/
│   │   │   ├── Dashboard.tsx       # Main dashboard component
│   │   │   └── CodeDisplay.tsx     # Syntax-highlighted code viewer
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.ts
│
└── backend/                        # FastAPI backend
    ├── main.py                     # FastAPI app and routes
    ├── langgraph_orchestrator.py   # LangGraph workflow
    ├── requirements.txt            # Python dependencies
    └── .env.example               # Environment variables template
```

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- OpenAI API key (free tier available at https://platform.openai.com)

## Setup Instructions

### 1. Get an OpenAI API Key

1. Visit https://platform.openai.com/account/api-keys
2. Sign up or log in to your OpenAI account
3. Create a new API key
4. Copy the key (you'll need it in the next step)

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_key_here
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd agentic-qa-generator

# Install dependencies
npm install

# Create .env.local (optional, for custom backend URL)
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running the Application

### Start Backend Server

```bash
cd backend

# Activate virtual environment (if not already activated)
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Run FastAPI server
python main.py
```

The backend will be available at `http://localhost:8000`

### Start Frontend Server

In a new terminal:

```bash
cd agentic-qa-generator

npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage

1. Open http://localhost:3000 in your browser
2. Paste a Jira user story or feature requirement in the text area
3. Select your preferred testing framework:
   - **Playwright**: For end-to-end testing with TypeScript
   - **Jest**: For unit/integration testing with TypeScript
   - **Manual**: For manual test scenarios in Markdown
4. Click "Generate Test Suite"
5. Review the generated code and analysis
6. Copy the code or download it as a file

## Example User Story

```
As a user, I want to be able to login with my email and password so that I can access my account.

Acceptance Criteria:
- User can enter email and password
- System validates email format
- System validates password (min 8 characters)
- User sees error message for invalid credentials
- User is redirected to dashboard on successful login
- Session is maintained across page refreshes
- User can logout and return to login page
```

## API Endpoints

### POST /api/generate-tests

Generates a test suite based on a user story.

**Request:**
```json
{
  "story": "User story text here",
  "framework": "playwright" | "jest" | "manual"
}
```

**Response:**
```json
{
  "code": "Generated test code",
  "framework": "playwright",
  "analysis": {
    "functional_requirements": ["Requirement 1", "Requirement 2"],
    "edge_cases": ["Edge case 1", "Edge case 2"],
    "business_logic": ["Logic 1", "Logic 2"]
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Deployment

### Deploy Frontend (Vercel)

1. Push your code to GitHub
2. Visit https://vercel.com/new
3. Import the `agentic-qa-generator` directory
4. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
5. Deploy

### Deploy Backend (Render, Railway, or Heroku)

1. Create a new Web Service on your chosen platform
2. Connect your GitHub repository
3. Set the start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy

## Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend (.env.local - optional)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## How It Works

### LangGraph Workflow

1. **Analyzer Node**: 
   - Takes the user story as input
   - Uses OpenAI to extract functional requirements, edge cases, and business logic
   - Returns structured analysis

2. **Code Generator Node**:
   - Receives the analysis from the Analyzer
   - Uses Pydantic for structured output validation
   - Generates syntactically correct test code matching the selected framework
   - Returns the generated test suite

### State Management

The workflow uses TypedDict-based state management to pass data between nodes:
- `story`: Original user story text
- `framework`: Selected testing framework
- `analysis`: Extracted requirements and edge cases
- `generated_code`: Final generated test code

## Troubleshooting

### Backend Connection Error
- Ensure backend is running on `http://localhost:8000`
- Check that FastAPI server started without errors
- Verify OPENAI_API_KEY is set in .env

### API Key Error
- Verify your OpenAI API key is valid
- Check that you have API credits available
- Ensure the key is correctly set in backend/.env

### Generation Timeout
- OpenAI API calls may take 10-30 seconds
- Check your internet connection
- Verify API key has sufficient quota

## Performance Notes

- First request may take 15-30 seconds as LangGraph initializes
- Subsequent requests are faster
- Generated code quality depends on story clarity and detail

## Future Enhancements

- Support for additional frameworks (Cypress, Selenium, etc.)
- Integration with Jira API for direct story import
- Custom test templates
- Test execution and reporting
- Team collaboration features
- Version history and test suite management

## License

MIT

## Support

For issues or questions, please check the troubleshooting section or create an issue in the repository.
