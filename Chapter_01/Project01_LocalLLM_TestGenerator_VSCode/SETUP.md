# 🚀 Installation & Setup Guide

Complete step-by-step guide to get **LocalLLMTestGenBuddy** running on your system.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Option A: Quick Setup (Ollama)](#option-a-quick-setup-with-ollama)
3. [Option B: OpenAI API Setup](#option-b-openai-api-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required
- **Node.js** 18 or higher
  - Download: https://nodejs.org/
  - Verify: `node --version`
- **npm** or **yarn** (comes with Node.js)
  - Verify: `npm --version`

### For Ollama (Local LLM)
- **Ollama** 
  - Download: https://ollama.ai
  - A local LLM model (Mistral, Llama, etc.)

### For OpenAI
- **OpenAI API Key**
  - Get from: https://platform.openai.com/api-keys
  - Requires paid account

---

## Option A: Quick Setup with Ollama

### Step 1: Install & Run Ollama

```bash
# Download from https://ollama.ai

# Once installed, pull a model
ollama pull gemma3:1b    # Gemma 3 1B - Fast and capable
# OR
ollama pull llama2     # Larger, more capable

# Start Ollama server (runs in background)
ollama serve
# Server will be available at http://localhost:11434
```

**On Windows:** Ollama will run as a service automatically.
**On Mac/Linux:** Run `ollama serve` in a terminal to start the server.

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with Ollama settings (should be defaults)
# OLLAMA_BASE_URL=http://localhost:11434
# OLLAMA_MODEL=gemma3:1b

# Start the server
npm run dev
```

**Expected output:**
```
🚀 Server running on http://localhost:5000
📝 LLM Provider: ollama
🤖 Environment: development
```

### Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected output:**
```
  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:3000/
```

### Step 4: Open in Browser
Visit **http://localhost:3000** and test it!

---

## Option B: OpenAI API Setup

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key (save it securely!)

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with OpenAI settings:
# LLM_PROVIDER=openai
# OPENAI_API_KEY=sk-your-actual-key-here
# OPENAI_MODEL=gpt-3.5-turbo

# Start the server
npm run dev
```

### Step 3: Frontend Setup (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

### Step 4: Open in Browser
Visit **http://localhost:3000**

---

## Backend Setup (Detailed)

### Files to Check

After installation, you should have:

```
backend/
├── node_modules/
├── src/
├── dist/              (will be created after build)
├── .env               (created from .env.example)
├── package.json
└── README.md
```

### Environment Variables (.env)

Create or edit `backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# LLM Provider (choose: ollama or openai)
LLM_PROVIDER=ollama

# Ollama Settings
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:1b

# OpenAI Settings (if using OpenAI)
# OPENAI_API_KEY=sk-...
# OPENAI_MODEL=gpt-3.5-turbo

# Logging
LOG_LEVEL=info
```

### Available Commands

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run tests (if tests exist)
npm test
```

---

## Frontend Setup (Detailed)

### Files to Check

After installation, you should have:

```
frontend/
├── node_modules/
├── src/
├── dist/           (will be created after build)
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

### Available Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Proxy Configuration

The frontend automatically proxies API calls to the backend:
- Frontend requests to `/api/*` are forwarded to `http://localhost:5000/api/*`
- Configured in `vite.config.ts`

---

## Verification

### Test Backend

Open a new terminal and run:

```bash
# Test if backend is running
curl http://localhost:5000/

# Should return:
# {"message":"LocalLLMTestGenBuddy API","version":"1.0.0",...}

# Test health endpoint
curl http://localhost:5000/api/health

# Should return:
# {"success":true,"status":"Server is running",...}
```

### Test Frontend

1. Open http://localhost:3000 in your browser
2. You should see the LocalLLMTestGenBuddy interface
3. The provider selector should show your configured provider

### Test Generation

1. In the frontend, enter a requirement: "Users should be able to login with email and password"
2. Click "Generate Test Cases"
3. Wait for results (may take 10-30 seconds depending on LLM)
4. View generated test cases in the table

---

## Troubleshooting

### Backend Won't Start

**Error: `Port 5000 is already in use`**
```bash
# Change port in .env
PORT=5001
```

**Error: `OLLAMA_BASE_URL connection refused`**
- Ollama server not running
- Solution: Run `ollama serve` in a separate terminal

**Error: `OPENAI_API_KEY is missing`**
- Check `.env` file has valid API key
- Make sure no quotes around the key

### Frontend Won't Load

**Error: `Cannot GET /api/generate-testcases`**
- Backend not running or not on port 5000
- Check if `npm run dev` is running in backend folder

**Error: `localhost:3000 refused to connect`**
- Frontend not running
- Run `npm run dev` in frontend folder

### LLM Not Responding

**Ollama Issue:**
```bash
# Check if Ollama is serving
curl http://localhost:11434/api/tags

# If not working:
# 1. Restart Ollama: ollama serve
# 2. Check if model exists: ollama list
# 3. Pull model if missing: ollama pull gemma3:1b
```

**OpenAI Issue:**
- Check API key is valid: https://platform.openai.com/account/api-keys
- Check account has credits
- Check rate limits haven't been exceeded

### Node Modules Issues

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Still Having Issues?

1. Check logs in terminal windows
2. Check browser console (F12 → Console tab)
3. Verify Node.js version: `node --version`
4. Make sure ports 3000 and 5000 are available

---

## Next Steps

After successful setup:

1. ✅ Generate your first test case
2. ✅ Try different requirements
3. ✅ Export test cases to CSV/JSON
4. ✅ Switch between Ollama and OpenAI providers
5. ✅ Read the main [README.md](README.md) for more features

---

## Production Deployment

See individual README files:
- [Backend Deployment](backend/README.md#development)
- [Frontend Deployment](frontend/README.md#development)

---

Happy testing! 🎉
