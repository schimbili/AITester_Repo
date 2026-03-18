# Task Plan: LocalLLMTestGenBuddy

## Project Overview
**LocalLLMTestGenBuddy** - A local test case generator using LLMs (Ollama, OpenAI, Claude) that converts user requirements into structured test cases in Jira format with a tabular UI.

---

## Phase 1: Project Setup & Backend Foundation
**Goal:** Set up project structure, backend API, and LLM integration.

### Deliverables:
- [ ] Initialize Node.js + TypeScript backend project
- [ ] Setup Express.js server with API endpoints
- [ ] Implement LLM provider abstraction (Ollama, OpenAI, Claude support)
- [ ] Create environment configuration (.env file)
- [ ] Setup API route: POST `/api/generate-testcases` (accepts requirement, returns test cases)
- [ ] Basic error handling & logging
- [ ] Backend documentation

### Checklist:
- [ ] Project structure created
- [ ] Dependencies installed (express, typescript, dotenv, axios/fetch for LLM APIs)
- [ ] .env.example created with sample LLM configs
- [ ] Unit tests for LLM abstraction layer
- [ ] README with setup instructions

---

## Phase 2: Frontend Setup & UI
**Goal:** Build React UI for requirement input and test case display.

### Deliverables:
- [ ] Initialize React project (Vite or CRA)
- [ ] UI Layout:
  - [ ] Requirement input panel (textarea)
  - [ ] LLM provider selector dropdown
  - [ ] Generate button
  - [ ] Test case table output (columns: Test ID, Title, Precondition, Steps, Expected Result)
  - [ ] Export buttons (Copy/CSV/JSON)
- [ ] Form validation
- [ ] API integration with backend
- [ ] Loading/error state UI
- [ ] Responsive design

### Checklist:
- [ ] Components created (InputPanel, TestCaseTable, ExportOptions)
- [ ] API calls working (fetch/axios to backend)
- [ ] Styling applied (CSS/Tailwind)
- [ ] Error messages displayed
- [ ] Export functionality working

---

## Phase 3: Test Case Generation Logic
**Goal:** Implement core logic to transform requirements into structured test cases.

### Deliverables:
- [ ] Prompt engineering for LLM (optimize for test case generation)
- [ ] Test case parser (LLM response → structured JSON)
- [ ] Jira format mapping
- [ ] In-memory storage for current session test cases
- [ ] Edge case handling (incomplete reqs, long inputs)

### Checklist:
- [ ] LLM prompts tested & refined
- [ ] Response parsing working (handles different LLM outputs)
- [ ] Test case structure validated
- [ ] Example outputs documented

---

## Phase 4: Export & Persistence
**Goal:** Allow users to export and save test cases.

### Deliverables:
- [ ] Export to CSV
- [ ] Export to JSON
- [ ] Copy to clipboard
- [ ] Optional: Local file system storage (JSON file)
- [ ] Optional: Jira XML export

### Checklist:
- [ ] All export formats tested
- [ ] File download working
- [ ] Clipboard copy working

---

## Phase 5: Polish & Deployment
**Goal:** Final testing, documentation, and deployment setup.

### Deliverables:
- [ ] Integration testing (backend + frontend)
- [ ] E2E testing with real LLM providers
- [ ] UI/UX polish
- [ ] Documentation (setup, usage, API specs)
- [ ] Docker setup (optional)
- [ ] Deployment guide

### Checklist:
- [ ] All features tested
- [ ] No console errors
- [ ] Documentation complete
- [ ] Ready for deployment

---

## Tech Stack Summary

| Layer | Technology | Details |
|-------|-----------|---------|
| **Frontend** | React + Vite | Component-based UI |
| **Backend** | Node.js + Express | REST API |
| **Language** | TypeScript | Type safety |
| **LLM Integration** | Axios/Fetch | Call Ollama, OpenAI, Claude APIs |
| **Storage** | In-memory (Phase 1) | Optional: File / DB later |
| **Styling** | CSS/Tailwind | Responsive design |

---

## Assumptions (Review & Approve)
1. ✅ **LLM Providers:** Ollama + OpenAI (expandable to others)
2. ✅ **Input Method:** Text area with requirement text
3. ✅ **Output:** Interactive table + export options (CSV/JSON)
4. ✅ **Authentication:** Not required (local use)
5. ✅ **Persistence:** In-session only (files can be exported)
6. ✅ **Test Case Fields:** Test ID, Title, Precondition, Steps, Expected Result

---

## APPROVAL CHECKPOINT
**Please review the above plan and assumptions, then respond with:**
- ✅ **Approved** (proceed to Phase 1 implementation)
- 📝 **Changes needed** (specify what to adjust)
- ❓ **Questions** (ask for clarification)
