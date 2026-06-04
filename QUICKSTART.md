# Quick Start Guide

Get the Agentic QA Generator running in 5 minutes.

## Prerequisites

- Node.js 18+ (download from https://nodejs.org)
- Python 3.9+ (download from https://python.org)
- OpenAI API key (free at https://platform.openai.com)

## Step 1: Get OpenAI API Key (2 minutes)

1. Go to https://platform.openai.com/account/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key somewhere safe

## Step 2: Setup Backend (2 minutes)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your API key
# Windows (PowerShell):
echo "OPENAI_API_KEY=your_key_here" > .env

# macOS/Linux:
echo "OPENAI_API_KEY=your_key_here" > .env

# Edit .env and replace "your_key_here" with your actual OpenAI API key
```

## Step 3: Setup Frontend (1 minute)

```bash
cd agentic-qa-generator
npm install
```

## Step 4: Run Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
# Activate venv first (see Step 2)
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd agentic-qa-generator
npm run dev
```

## Step 5: Use It

Open http://localhost:3000 in your browser and start generating tests!

## Example Story to Test

```
As a user, I want to create a new todo item with a title and description so that I can keep track of my tasks.

Acceptance Criteria:
- User can click "Add Todo" button
- Modal appears with title and description fields
- User can enter title (required, max 100 chars)
- User can enter description (optional, max 500 chars)
- User can click "Save" to create the todo
- Todo appears in the list immediately
- User sees success message
- Form clears after successful submission
- User can click "Cancel" to close modal without saving
```

## Troubleshooting

**"Cannot connect to backend"**
- Make sure backend is running on Terminal 1
- Check that it says "Uvicorn running on http://0.0.0.0:8000"

**"Invalid API key"**
- Check your .env file has the correct OpenAI API key
- Make sure there are no extra spaces or quotes

**"Port already in use"**
- Backend: Change port in main.py (line with `port=8000`)
- Frontend: Run `npm run dev -- -p 3001` to use port 3001

## Next Steps

- Read the full README.md for deployment options
- Customize the generated tests
- Deploy to production (see README.md)
