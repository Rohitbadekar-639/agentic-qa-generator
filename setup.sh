#!/bin/bash

echo "🚀 Agentic QA Generator - Setup Script"
echo "======================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ from https://python.org"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Python and Node.js found"
echo ""

# Backend setup
echo "Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Virtual environment created"
fi

source venv/bin/activate
pip install -r requirements.txt
echo "✅ Backend dependencies installed"

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️  Created .env file. Please edit it and add your OPENAI_API_KEY"
fi

cd ..
echo ""

# Frontend setup
echo "Setting up frontend..."
cd agentic-qa-generator
npm install
echo "✅ Frontend dependencies installed"
cd ..
echo ""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env and add your OpenAI API key"
echo "2. Run: ./start.sh (or start.bat on Windows)"
echo ""
echo "For more details, see QUICKSTART.md"
