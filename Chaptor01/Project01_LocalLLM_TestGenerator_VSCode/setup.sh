#!/bin/bash
# setup.sh - Quick setup script for LocalLLMTestGenBuddy
# Usage: bash setup.sh

echo "🚀 LocalLLMTestGenBuddy - Quick Setup"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
  exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js $NODE_VERSION found${NC}"
echo ""

# Setup Backend
echo "Setting up Backend..."
cd backend || exit 1

if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi

if [ ! -f ".env" ]; then
  echo "Creating .env from .env.example..."
  cp .env.example .env
  echo -e "${YELLOW}⚠️  Edit backend/.env to configure your LLM provider${NC}"
fi

echo -e "${GREEN}✅ Backend ready${NC}"
cd ..
echo ""

# Setup Frontend
echo "Setting up Frontend..."
cd frontend || exit 1

if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

echo -e "${GREEN}✅ Frontend ready${NC}"
cd ..
echo ""

echo "===================================="
echo -e "${GREEN}Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure your LLM provider in backend/.env"
echo "2. Start backend:  cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Open http://localhost:3000"
echo ""
