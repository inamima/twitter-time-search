# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the production bundle
- `npm start` - Start the production server
- `npm run lint` - Run ESLint on all files
- `npm test` - Run Jest tests

## Project Architecture

This is a Next.js React application that generates X search URLs with precise date/time filtering. The application is built with TypeScript and Material-UI v4.

### Core Architecture

- **Next.js Pages Router**: Uses the pages/ directory structure with `_app.tsx` and `_document.tsx`
- **State Management**: Custom reducer with localStorage persistence via `useReducerWithLocalStorage` hook in `src/state.ts`
- **Date/Time Handling**: Heavy use of moment.js and moment-timezone for timezone-aware date manipulation

### Key Components Structure

- `pages/index.tsx` - Entry point that renders the Main component
- `components/Main.tsx` - Primary application container with form logic and state management
- `components/` - Individual form components:
  - `BeginDateTime.tsx` - Start date/time picker
  - `EndDateTime.tsx` - End date/time picker  
  - `KeywordText.tsx` - Search keyword input
  - `TimeZone.tsx` - Timezone selector
  - `History.tsx` - Search history display
  - `Usage.tsx` - Usage instructions

### Core Business Logic

- `src/lib.ts` - Core functions:
  - `datetimeToQuery()` - Converts date/time to X search format (YYYY-MM-DD_HH:mm:ss_TZ)
  - `searchAndOpen()` - Constructs X search URL and opens in new window
- `src/state.ts` - State management with reducer pattern and localStorage persistence

### State Management Pattern

The app uses a custom reducer pattern with the following actions:
- `setKeyword`, `setBegin`, `setEnd`, `setTimeZone` - Update form fields
- `appendHistory` - Add search to history (max 10 items)
- `deleteHistory` - Remove item from history

State is automatically persisted to localStorage and restored on app load.

### Testing

- Jest with ts-jest for TypeScript support
- Tests located in `__tests__/` directory
- Current tests focus on the `datetimeToQuery` function with timezone handling

### Dependencies

- Next.js 9.x with React 16.12
- Material-UI v4 for UI components and theming
- moment.js/moment-timezone for date handling
- TypeScript with strict mode enabled