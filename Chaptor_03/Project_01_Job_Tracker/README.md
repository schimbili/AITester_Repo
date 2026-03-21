# JobFlow - Local-First Job Tracker

A premium, localized job application tracking system built with **React 18**, **Vite**, and **Tailwind CSS v4**. This application targets professionals who want total control over their data without relying on external cloud providers.

## 🚀 Key Features

- **Local-First Architecture**: Powered by **IndexedDB**, ensuring zero-dependency on external APIs and 100% data privacy.
- **Premium Kanban Board**: Manage your transition from "Wishlist" to "Offer" with a smooth, responsive drag-and-drop interface.
- **Advanced Data Model**:
  - Company & Role tracking
  - Application URL integration
  - Resume versioning
  - Automated "Days Since Applied" indicators
  - Salary range & recruiter notes
- **Visual Excellence**:
  - State-of-the-art Dark/Light mode.
  - Glassmorphic UI with micro-animations.
  - Real-time column statistics.
- **Data Portability**: Full JSON Import/Export support for manual backups and data migration.

## 🛠️ Tech Stack

- **Framework**: [React 18+](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Persistence**: [idb](https://www.npmjs.com/package/idb) (IndexedDB Wrapper)
- **Drag-and-Drop**: [@dnd-kit](https://dndkit.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 📂 Project Structure

```text
Project_01_Job_Tracker/
├── src/
│   ├── components/       # UI Components (Board, Card, Modals)
│   ├── lib/              # Database & Utility functions
│   ├── App.jsx           # Main Application Logic
│   ├── index.css         # Tailwind & Global Styles
│   └── main.jsx          # Entry Point
├── data/                 # Source data (Excel/JSON)
├── public/               # Static assets
└── package.json          # Dependencies & Scripts
```

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📊 Importing Data

The application supports importing job data from JSON. To convert your Excel data to the required format, you can use the included `generate_seed.cjs` script.

---
Developed as part of **Chapter 03: Local LLM Test Generator Project**.
