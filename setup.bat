@echo off
echo.
echo 🚀 Agentic QA Generator - Setup Script
echo ======================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.9+ from https://python.org
    pause
    exit /b 1
)
echo ✅ Python found

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js found
echo.

REM Backend setup
echo Setting up backend...
cd backend

if not exist "venv" (
    python -m venv venv
    echo ✅ Virtual environment created
)

call venv\Scripts\activate.bat
pip install -r requirements.txt
echo ✅ Backend dependencies installed

if not exist ".env" (
    copy .env.example .env
    echo ⚠️  Created .env file. Please edit it and add your OPENAI_API_KEY
)

cd ..
echo.

REM Frontend setup
echo Setting up frontend...
cd agentic-qa-generator
call npm install
echo ✅ Frontend dependencies installed
cd ..
echo.

echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Edit backend\.env and add your OpenAI API key
echo 2. Run: start.bat
echo.
echo For more details, see QUICKSTART.md
pause
