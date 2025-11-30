# Embrace

## Overview

Embrace is a digital music platform dedicated to discovering and promoting emerging artists. The platform prioritizes new and lesser-known talent by sorting music with fewer plays first, ensuring their work reaches a global audience. Users can engage as either musicians (who upload and manage their music) or listeners (who discover, like, and follow artists).

**Tech Stack:**
- React 18.2.0 with TypeScript
- Vite (build tool and dev server)
- Tailwind CSS (via CDN)
- Google Generative AI API (Gemini) for AI-generated artist biographies

## User Preferences

Preferred communication style: Simple, everyday language.
Language preference: Portuguese (Brazil) - All UI elements translated to PT-BR.

## System Architecture

### Frontend Architecture

**Single Page Application (SPA) with Client-Side Routing:**
- Custom routing implementation using React Context (`AuthContext.page` state)
- Page navigation handled via `setPage()` function instead of traditional routing library
- Route matching includes dynamic routes (e.g., `artist/{id}`)
- All navigation is client-side with no page reloads

**State Management Pattern:**
- Three primary React Context providers for separation of concerns:
  - `AuthContext`: User authentication, session management, and like/unlike functionality
  - `DataContext`: Song, musician, and donation data management
  - `MusicContext`: Audio playback state and controls
- Context composition in App.tsx ensures all child components have access to shared state
- No external state management libraries (Redux, MobX, etc.)

**Component Architecture:**
- Feature-based organization with clear separation:
  - `pages/`: Full page components (HomePage, DiscoverPage, LoginPage, etc.)
  - `components/Layout/`: Shared layout components (Header, Footer)
  - `components/Music/`: Music-specific reusable components (SongCard, MusicPlayer)
- Smart/Container components in pages consume context
- Presentational components receive props from parents

**Audio Playback System:**
- Native HTML5 Audio API via `useRef` hook in MusicContext
- Global music player component (sticky footer) with play/pause, progress bar, and seek functionality
- Play count tracking on song initiation
- Single audio instance shared across entire application

### Data Model & Business Logic

**User System:**
- Two distinct user types: `musician` and `listener`
- Type-based access control determines available features and UI
- Musicians can upload songs, view dashboard statistics, manage content, and edit their profile (name, bio, photo)
- Listeners can like songs, follow artists, and manage personal profiles

**Musician Profile Editing:**
- Musicians can update their artist name, bio, and profile photo from the dashboard
- Profile photos are converted to base64 for persistence during the session
- Changes are synchronized between AuthContext and DataContext to ensure consistency across all pages
- Modal-based editing interface with live preview of profile photo changes

**Content Discovery Algorithm:**
- Songs sorted by play count (ascending) to prioritize lesser-known content
- Secondary sort by upload date (descending) for equal play counts
- Genre-based filtering on Discover page
- "New" badge for songs uploaded within last 3 days

**File Upload System:**
- Client-side file handling for audio (MP3) and cover images
- File validation by MIME type
- Object URLs created for preview functionality
- Uploaded files converted to data URLs for mock persistence

**Mock Data Persistence:**
- In-memory state management simulating database
- Data initialized from constants file on application load
- No actual backend - all CRUD operations modify in-memory arrays
- State persists only during active session (resets on page refresh)

### External Dependencies

**Google Generative AI (Gemini):**
- Used exclusively for generating artist biographies during musician registration
- API key configured via environment variable: `VITE_GEMINI_API_KEY`
- Graceful fallback to template-based bio if API unavailable or key missing
- Model: `gemini-pro`
- Prompt engineering for 30-40 word professional biographies

**Tailwind CSS:**
- Loaded via CDN in index.html (not installed locally)
- Custom brand colors: Orange gradient (#F97316 to #EA580C)
- Dark theme: Primary background #111827, cards #1F2937
- No Tailwind configuration file needed

**Development Environment (Replit-Specific):**
- Vite dev server configured for host `0.0.0.0` on port 5000
- HMR (Hot Module Replacement) disabled for Replit proxy compatibility
- Static deployment configuration: build output directory is `dist`
- Web view integration via Replit workflow configuration

**Build & Development Tools:**
- Vite 5.0.11: Fast build tool with ES modules support
- TypeScript 5.3.3: Type safety without runtime overhead
- React plugin for Vite: Fast refresh and JSX transformation
- No additional bundlers or transpilers required

### Design Patterns & Principles

**Context Over Props Drilling:**
- Deeply nested components access shared state via context hooks (`useAuth`, `useData`, `useMusic`)
- Reduces prop passing through intermediate components
- Centralizes state update logic in context providers

**Optimistic UI Updates:**
- Like/unlike toggles update UI immediately before persistence
- Song upload shows in list instantly after form submission
- Enhances perceived performance despite synchronous operations

**Separation of Concerns:**
- Authentication logic separate from data management
- Music playback isolated from data fetching
- UI components don't directly manipulate global state

**Progressive Enhancement:**
- Application functional without AI-generated bios (fallback text provided)
- Graceful handling of missing environment variables
- No hard dependencies on external services for core functionality