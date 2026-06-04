@echo off
echo.
echo 🚀 Starting Agentic QA Generator
echo ================================
echo.

REM Check if setup has been done
if not exist "backend\venv" (
    echo ❌ Backend not set up. Please run setup.bat first
    pause
    exit /b 1
)

if not exist "agentic-qa-generator\node_modules" (
    echo ❌ Frontend not set up. Please run setup.bat first
    pause
    exit /b 1
)

REM Check for .env file
if not exist "backend\.env" (
    echo ❌ backend\.env file not found. Please run setup.bat first
    pause
    exit /b 1
)

echo Starting backend server...
start "Backend - Agentic QA Generator" cmd /k "cd backend && venv\Scripts\activate.bat && python main.py"
timeout /t 2 /nobreak

echo Starting frontend server...
start "Frontend - Agentic QA Generator" cmd /k "cd agentic-qa-generator && npm run dev"

echo.
echo 🎉 Application is starting!
echo 📱 Frontend: http://localhost:3000
echo 🔌 Backend: http://localhost:8000
echo.
echo Waiting for servers to start... (this may take 30 seconds)
timeout /t 5 /nobreak

REM Try to open in browser
start http://localhost:3000

echo.
echo ✅ Servers should be running now!
echo Close the terminal windows to stop the servers.
