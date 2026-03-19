#!/bin/bash
# start-dev.sh - Start both backend and frontend
# Usage: bash start-dev.sh

echo "🚀 Starting LocalLLMTestGenBuddy..."
echo "===================================="
echo ""

# Start Backend
echo "Starting Backend (port 5000)..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..
sleep 2

# Start Frontend
echo "Starting Frontend (port 3000)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..
sleep 2

echo ""
echo "✅ Both servers started!"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers..."
echo ""

# Wait for interruption
wait
