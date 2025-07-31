# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint on all files
- `npm test` - Run Vitest tests

## Project Architecture

This is a Vite React application that generates X search URLs with precise date/time filtering. The application is built with TypeScript and Material-UI v5.

### Core Architecture

- **Vite + React**: Uses src/ directory structure with main.tsx as entry point
- **State Management**: Custom reducer with localStorage persistence via `useLocalStorageReducer` hook in `src/hooks/useLocalStorageReducer.ts`
- **Date/Time Handling**: Heavy use of moment.js and moment-timezone for timezone-aware date manipulation

### Key Components Structure

- `src/main.tsx` - Application entry point that renders the App component
- `src/App.tsx` - Primary application container
- `src/components/Main.tsx` - Main application logic with form and state management
- `src/components/` - Individual form components:
  - `BeginDateTime.tsx` - Start date/time picker
  - `EndDateTime.tsx` - End date/time picker  
  - `KeywordText.tsx` - Search keyword input
  - `TimeZone.tsx` - Timezone selector
  - `History.tsx` - Search history display
  - `Usage.tsx` - Usage instructions

### Core Business Logic

- `src/lib/index.ts` - Core functions:
  - `datetimeToQuery()` - Converts date/time to X search format (YYYY-MM-DD_HH:mm:ss_TZ)
  - `searchAndOpen()` - Constructs X search URL and opens in new window

### State Management Pattern

The app uses a custom reducer pattern with the following actions:
- `setKeyword`, `setBegin`, `setEnd`, `setTimeZone` - Update form fields
- `appendHistory` - Add search to history (max 10 items)
- `deleteHistory` - Remove item from history

State is automatically persisted to localStorage and restored on app load.

### Testing

- Vitest for unit testing with TypeScript support
- Tests located in `src/__tests__/` directory
- Current tests focus on the `datetimeToQuery` function with timezone handling

### Dependencies

- Vite 5.x with React 18.2
- Material-UI v5 for UI components and theming
- moment.js/moment-timezone for date handling
- TypeScript with strict mode enabled