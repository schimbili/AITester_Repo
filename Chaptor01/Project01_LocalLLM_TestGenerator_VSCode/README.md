# LocalLLMTestGenBuddy

🤖 **Generate test cases using local LLMs** - A full-stack application that converts user requirements into structured test cases powered by Ollama, OpenAI, Claude, and more.

## Project Structure

```
.
├── backend/                # Node.js + TypeScript API server
│   ├── src/
│   │   ├── providers/     # LLM provider implementations
│   │   ├── routes/        # API endpoints
│   │   ├── utils/         # Utilities (logger, parser)
│   │   └── index.ts       # Main server
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/              # React + Vite UI
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API client
│   │   ├── styles/        # CSS modules
│   │   ├── App.tsx        # Main app
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
├── Design/                # UI/UX design files
│   └── LocalLLM.png       # Design reference
│
├── task_plan.md           # Project phases and goals
├── findings.md            # Research and discoveries
├── progress.md            # Implementation progress
├── context.md             # Current working context
└── README.md              # This file
```

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Ollama (for local LLM) OR OpenAI API key

### Setup

**1. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your LLM configuration
npm run dev
```

Server runs on `http://localhost:5000`

**2. Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

App opens at `http://localhost:3000`

## Features

✅ **LLM Provider Support**
- Ollama (local LLMs like Mistral, Llama)
- OpenAI (GPT-3.5-turbo, GPT-4)
- Extensible for Claude, Grok, Cohere

✅ **Core Functionality**
- Input requirements in natural language
- Generate test cases automatically
- View in structured table format
- Export as CSV, JSON, or clipboard

✅ **User Interface**
- Provider selector dropdown
- Rich text input areas
- Responsive test case table
- One-click export options

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18 + Vite + TypeScript |
| **Backend** | Node.js + Express + TypeScript |
| **LLM Integration** | Axios (HTTP client) |
| **Styling** | CSS Modules + Global CSS |
| **Build** | Vite (frontend), TypeScript (backend) |

## API Endpoints

### POST `/api/generate-testcases`
Generate test cases from a requirement.

**Request:**
```json
{
  "requirement": "Users should be able to reset their password",
  "context": "Must send email verification link",
  "provider": "ollama"
}
```

**Response:**
```json
{
  "success": true,
  "testCases": [
    {
      "testId": "TC-001",
      "title": "Reset password with valid email",
      "precondition": "User is logged out",
      "steps": ["Go to forgot password", "Enter email", "Click reset"],
      "expectedResult": "Email sent with reset link"
    }
  ]
}
```

### Full API Documentation
See [backend/README.md](backend/README.md#api-endpoints)

## Using Ollama (Local LLM)

1. **Install Ollama:** https://ollama.ai
2. **Pull a model:**
   ```bash
   ollama pull mistral
   ```
3. **Start Ollama:**
   ```bash
   ollama serve
   ```
4. **Set in `.env`:**
   ```env
   LLM_PROVIDER=ollama
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=mistral
   ```

## Using OpenAI

1. **Get API key:** https://platform.openai.com/api-keys
2. **Set in `.env`:**
   ```env
   LLM_PROVIDER=openai
   OPENAI_API_KEY=sk-...
   OPENAI_MODEL=gpt-3.5-turbo
   ```

## Development

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Running Tests

Backend:
```bash
cd backend
npm test
```

## Architecture

### Provider Pattern
The backend uses an abstract factory pattern for LLM providers:
- `BaseLLMProvider` - Abstract interface
- `OllamaProvider` - Local LLM implementation
- `OpenAIProvider` - Cloud API implementation
- Easy to add new providers (Claude, Grok, etc.)

### Test Case Parsing
Flexible parser that handles:
- JSON responses
- Table-like text format
- Unstructured LLM outputs
- Auto-generates missing fields

## Project Phases

**Phase 1: ✅ Backend Foundation**
- Express.js server with proper structure
- LLM provider abstraction and implementations
- API routes for test case generation
- Error handling and logging

**Phase 2: ✅ Frontend Setup & UI**
- React components for requirement input
- Test case table display
- Provider selector
- Export functionality

**Phase 3: (Next) Test Case Generation Logic**
- Prompt engineering optimization
- Response parsing refinement
- Edge case handling

**Phase 4: (Planned) Export & Persistence**
- Database support for test cases
- File-based persistence options
- Jira integration

**Phase 5: (Planned) Polish & Deployment**
- Integration testing
- Docker containerization
- Production deployment

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues or questions:
1. Check [backend README](backend/README.md)
2. Check [frontend README](frontend/README.md)
3. Review the issue tracker

---

**Made with ❤️ for QA teams everywhere**
