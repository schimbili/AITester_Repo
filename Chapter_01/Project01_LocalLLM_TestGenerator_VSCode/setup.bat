@echo off
REM setup.bat - Quick setup script for LocalLLMTestGenBuddy on Windows
REM Usage: setup.bat

cls
echo.
echo 🚀 LocalLLMTestGenBuddy - Quick Setup for Windows
echo ================================================
echo.

REM Check Node.js
echo Checking Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo ❌ Node.js not found. Please install Node.js 18+
  echo Download from: https://nodejs.org/
  pause
  exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% found
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

if not exist "node_modules" (
  echo Installing backend dependencies...
  call npm install
)

if not exist ".env" (
  echo Creating .env from .env.example...
  copy .env.example .env
  echo.
  echo ⚠️  Edit backend\.env to configure your LLM provider
)

echo ✅ Backend ready
cd ..
echo.

REM Setup Frontend
echo Setting up Frontend...
cd frontend

if not exist "node_modules" (
  echo Installing frontend dependencies...
  call npm install
)

echo ✅ Frontend ready
cd ..
echo.

echo ================================================
echo ✅ Setup Complete!
echo.
echo Next steps:
echo 1. Configure your LLM provider in backend\.env
echo 2. Start backend:  cd backend && npm run dev
echo 3. Start frontend: cd frontend && npm run dev
echo 4. Open http://localhost:3000
echo.
pause
