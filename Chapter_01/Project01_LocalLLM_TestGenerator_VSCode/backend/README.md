# LocalLLMTestGenBuddy Backend

Test case generation backend API powered by local LLMs (Ollama, OpenAI, Claude, etc.)

## Overview

This backend API accepts user requirements and generates structured test cases using Large Language Models. It supports multiple LLM providers:

- **Ollama** - Local LLM execution (Mistral, Llama, etc.)
- **OpenAI** - GPT-3.5-turbo, GPT-4
- *Extensible for Claude, Grok, and others*

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Python (for Ollama setup, if using local LLM)

### Installation

1. **Clone and setup:**
```bash
cd backend
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
```

3. **Edit `.env` with your LLM settings:**

   **For Ollama (local LLM):**
   ```env
   LLM_PROVIDER=ollama
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=gemma3:1b
   ```

   **For OpenAI:**
   ```env
   LLM_PROVIDER=openai
   OPENAI_API_KEY=sk-your-key-here
   OPENAI_MODEL=gpt-3.5-turbo
   ```

4. **Start the server:**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### 1. Generate Test Cases

**POST** `/api/generate-testcases`

Request body:
```json
{
  "requirement": "Users should be able to login with email and password",
  "context": "The login page should validate email format and password strength",
  "provider": "ollama"
}
```

Response:
```json
{
  "success": true,
  "testCases": [
    {
      "testId": "TC-001",
      "title": "Valid login with correct credentials",
      "precondition": "User is on login page",
      "steps": ["Enter valid email", "Enter valid password", "Click login"],
      "expectedResult": "User logged in successfully"
    }
  ],
  "rawResponse": "...",
  "model": "mistral"
}
```

### 2. Get Available Providers

**GET** `/api/providers`

Response:
```json
{
  "success": true,
  "providers": [
    {
      "name": "Ollama",
      "id": "ollama",
      "configured": true,
      "model": "mistral"
    }
  ],
  "currentProvider": "Ollama"
}
```

### 3. Test Provider Connection

**POST** `/api/test-provider`

Response:
```json
{
  "success": true,
  "provider": "Ollama",
  "message": "Connection successful"
}
```

### 4. Configure Provider

**POST** `/api/configure-provider`

Request:
```json
{
  "provider": "openai",
  "config": {
    "apiKey": "sk-...",
    "model": "gpt-3.5-turbo"
  }
}
```

### 5. Health Check

**GET** `/api/health`

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── providers/
│   │   ├── BaseLLMProvider.ts    # Abstract base class
│   │   ├── OllamaProvider.ts     # Ollama implementation
│   │   ├── OpenAIProvider.ts     # OpenAI implementation
│   │   └── index.ts              # Provider factory
│   ├── routes/
│   │   └── testCaseRoutes.ts     # API endpoints
│   └── utils/
│       ├── logger.ts             # Logging utility
│       └── testCaseParser.ts     # Parse LLM responses
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Development

### Build

```bash
npm run build
```

### Run

```bash
npm start
```

### Development mode (with hot reload)

```bash
npm run dev
```

### Test

```bash
npm test
```

## Using Ollama (Local LLM)

1. **Install Ollama:** https://ollama.ai

2. **Pull a model:**
```bash
ollama pull gemma3:1b
```

3. **Start Ollama server:**
```bash
ollama serve
```

4. **Configure backend .env:**
```env
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:1b
```

## Using OpenAI

1. **Get API key:** https://platform.openai.com/api-keys

2. **Configure backend .env:**
```env
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-3.5-turbo
```

## Architecture

### Provider Pattern

The LLM providers follow an abstract factory pattern:

- `BaseLLMProvider` - Abstract interface
- `OllamaProvider` - Local LLM implementation
- `OpenAIProvider` - Cloud LLM implementation
- `LLMProviderFactory` - Creates provider instances

This allows easy addition of new providers (Claude, Grok, Cohere, etc.)

### Test Case Parsing

The `testCaseParser.ts` utility converts LLM responses into structured test cases:

- Handles JSON responses
- Parses table-like text format
- Fallback text parsing for unstructured responses
- Generates Test IDs if missing

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `LLM_PROVIDER` | Active LLM provider | ollama |
| `OLLAMA_BASE_URL` | Ollama server URL | http://localhost:11434 |
| `OLLAMA_MODEL` | Ollama model name | gemma3:1b |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `OPENAI_MODEL` | OpenAI model | gpt-3.5-turbo |
| `LOG_LEVEL` | Logging level | info |

## Next Steps

1. Connect frontend to this API
2. Add database support for storing requirements and test cases
3. Add authentication/Authorization
4. Implement batch test case generation
5. Add support for more LLM providers (Claude, Grok, etc.)

## License

MIT
