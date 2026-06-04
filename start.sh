#!/bin/bash

echo "🚀 Starting Agentic QA Generator"
echo "================================"
echo ""

# Check if setup has been done
if [ ! -d "backend/venv" ]; then
    echo "❌ Backend not set up. Please run ./setup.sh first"
    exit 1
fi

if [ ! -d "agentic-qa-generator/node_modules" ]; then
    echo "❌ Frontend not set up. Please run ./setup.sh first"
    exit 1
fi

# Check for .env file
if [ ! -f "backend/.env" ]; then
    echo "❌ backend/.env file not found. Please run ./setup.sh first"
    exit 1
fi

# Check if OPENAI_API_KEY is set
if ! grep -q "OPENAI_API_KEY=" backend/.env || grep "OPENAI_API_KEY=your_" backend/.env > /dev/null; then
    echo "❌ OPENAI_API_KEY not configured in backend/.env"
    echo "Please edit backend/.env and add your OpenAI API key"
    exit 1
fi

echo "Starting backend server..."
cd backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
cd ..

sleep 2

echo "Starting frontend server..."
cd agentic-qa-generator
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
cd ..

echo ""
echo "🎉 Application is running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
