# Task Plan - Approved Blueprint

## Phase 1: Initialization & Discovery (COMPLETED)
- [x] Initialize documentation (Protocol 0)
- [x] Conduct discovery interview
- [x] Define Project Scope and Requirements

## Phase 2: Design & Blueprint (Current)
- [ ] Define System Architecture (Blueprint below)
- [ ] Get Blueprint Approval from User

### 🏗️ Blueprint: Local LLM Test Generator

#### 1. Backend Architecture (Node.js + TypeScript)
- **API Framework**: Express.js
- **Pattern**: Service-Controller pattern with Adapter pattern for LLM Providers.
- **Components**:
    - `LlmService`: Orchestrates calls to different providers.
    - `Adapters`: Individual classes for Ollama, Groq, OpenAI, etc.
    - `JiraFormatter`: Converts raw LLM output into standardized Jira format strings.
    - `ConfigManager`: Handles storage and retrieval of API keys and endpoints.

#### 2. Frontend Architecture (React + TypeScript)
- **UI Framework**: React (Vite)
- **State Management**: React Context or Zustand for settings and history.
- **Styling**: Premium Dark-themed Vanilla CSS (Glassmorphism, smooth transitions).
- **Key Modules**:
    - `ChatInterface`: Requirement input and Test Case display.
    - `HistoryPanel`: List of previous generations.
    - `SettingsOverlay`: Configuration for LLM providers with connection testing.

#### 3. Data Flow
1. User enters Requirement -> Sent to Backend.
2. Backend selects Provider based on Config -> Formats prompt for Jira test cases.
3. LLM returns content -> Backend parses/cleans -> Frontend displays and saves to history.

#### 4. Verification Plan
- **Manual Test**: Configure Ollama (Local) and verify connection.
- **Manual Test**: Enter a simple requirement (e.g., "User Login API") and verify Jira-formatted output.
- **Manual Test**: Verify history persistence.

## Phase 3: Implementation (Current)
- [/] Setup project structure (Monorepo with server/client)
- [ ] Implement Backend Core (LLM Adapters)
- [ ] Implement Frontend UI (Premium Design)
- [ ] Integration and Final Testing
