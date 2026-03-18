# LocalLLMTestGenBuddy Frontend

React frontend for the test case generator application.

## Overview

This is a Vite + React application that provides a user-friendly interface for:

- Inputting requirements/test scenarios
- Generating test cases using configured LLM providers
- Viewing test cases in a structured table
- Exporting results in multiple formats (CSV, JSON)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Navigate to frontend directory:**
```bash
cd frontend
npm install
```

2. **Start development server:**
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── InputPanel.tsx          # Requirement input form
│   │   ├── TestCaseTable.tsx       # Test cases display table
│   │   ├── ProviderSelector.tsx    # LLM provider selection
│   │   └── ExportOptions.tsx       # Export functionality buttons
│   ├── services/
│   │   └── apiService.ts           # API client for backend
│   ├── styles/
│   │   ├── App.css                 # Main app styles
│   │   ├── InputPanel.module.css
│   │   ├── TestCaseTable.module.css
│   │   ├── ProviderSelector.module.css
│   │   └── ExportOptions.module.css
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── vite-env.d.ts              # Vite type definitions
├── index.html                      # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Key Features

### 1. Provider Selection
- Dropdown to select between available LLM providers
- Real-time provider status

### 2. Requirement Input
- Text area for requirement description
- Optional context/constraints input
- Form validation

### 3. Test Case Generation
- Click "Generate Test Cases" to trigger API call
- Loading state during generation
- Error handling and display

### 4. Test Case Display
- Responsive table view
- Shows: Test ID, Title, Precondition, Steps, Expected Result
- Scrollable on mobile devices

### 5. Export Options
- **CSV Export:** Download as spreadsheet-compatible format
- **JSON Export:** Download structured JSON format
- **Copy to Clipboard:** Copy formatted text to clipboard

## API Integration

The app communicates with the backend API on `http://localhost:5000`:

```typescript
// Generate test cases
POST /api/generate-testcases
{
  requirement: string,
  context?: string,
  provider?: string
}

// Get providers
GET /api/providers

// Test provider connection
POST /api/test-provider

// Health check
GET /api/health
```

## Development

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Styling

The application uses:
- **CSS Modules** for component-specific styles
- **Global CSS** for app-wide styles
- **CSS Variables** for consistent theming

### Color Scheme
- Primary: `#4a90e2` (Blue)
- Secondary: `#50e3c2` (Teal)
- Danger: `#e85d75` (Red)
- Success: `#7ed321` (Green)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Next Steps

1. Add persistence (localStorage or backend storage)
2. Add user authentication
3. Implement test case filtering/search
4. Add Jira integration for direct import
5. Support multiple requirements in batch

## License

MIT
