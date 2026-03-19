@echo off
REM start-dev.bat - Start both backend and frontend in Windows
REM Usage: start-dev.bat

echo 🚀 Starting LocalLLMTestGenBuddy...
echo ===================================
echo.

cd /d "%~dp0"

echo Starting Backend (port 5000)...
start cmd /k "cd backend && npm run dev"
timeout /t 3

echo Starting Frontend (port 3000)...
start cmd /k "cd frontend && npm run dev"
timeout /t 2

echo.
echo ✅ Both servers starting...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window (servers will continue running)
pause > nul
