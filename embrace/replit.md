# Embrace

## Overview
Embrace is a digital music platform dedicated to discovering and promoting emerging artists. The platform prioritizes new and lesser-known talent, ensuring their music reaches a global audience.

**Tech Stack:**
- React 18.2.0
- TypeScript
- Vite (build tool and dev server)
- Tailwind CSS (via CDN)
- Google Generative AI (for artist bio generation)

**Current State:** 
The application has been successfully configured for the Replit environment and is fully functional. The Vite dev server is running on port 5000, and deployment is configured for static site hosting.

## Recent Changes (November 30, 2025)
- Rebranded application from "Ascend Records" to "Embrace"
- Added like/unlike functionality for listeners with persistence in shared state
- Added file upload capability for musicians (MP3 audio files and cover images)
- Updated logo and branding throughout the application
- Fixed HMR issues by disabling it for Replit proxy compatibility

## Project Architecture

### Directory Structure
```
/
├── src/                      # Source code directory
│   ├── components/          # React components
│   │   ├── Layout/         # Header and Footer components
│   │   └── Music/          # Music-related components (Player, SongCard)
│   ├── context/            # React Context providers
│   │   ├── AuthContext.tsx  # User auth and like functionality
│   │   ├── DataContext.tsx  # Song/artist data management
│   │   └── MusicContext.tsx # Music playback state
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── DiscoverPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ArtistProfilePage.tsx
│   │   ├── ListenerProfilePage.tsx
│   │   ├── MusicianDashboard.tsx  # Includes song upload modal
│   │   └── DonationsPage.tsx
│   ├── router/             # Routing configuration
│   │   └── AppRouter.tsx
│   ├── lib/                # Utility libraries
│   │   └── gemini.ts       # Google Generative AI integration
│   ├── constants.ts        # Mock data and constants
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Application entry point
│   └── vite-env.d.ts       # Vite environment type definitions
├── index.html              # HTML entry point
├── package.json            # Node.js dependencies
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript config for Node modules
├── vite.config.ts          # Vite build configuration
└── .gitignore              # Git ignore rules
```

### Key Features
1. **User Authentication**: Support for both musicians and listeners
2. **Music Discovery**: Browse and search for emerging artists
3. **Music Playback**: Built-in audio player for streaming tracks
4. **Artist Profiles**: Showcase artist information, bio, and tracks
5. **Donations**: Support artists through direct donations
6. **AI-Generated Bios**: Google Generative AI integration for creating artist biographies
7. **Like/Unlike Songs**: Listeners can like songs, with likes persisting across navigation
8. **Song Upload**: Musicians can upload MP3 files and cover images for new songs

### Data Storage
Currently uses mock data stored in `src/constants.ts`. The application is designed to work with this in-memory data structure. Note: File uploads use temporary blob URLs which work during the session but would need proper storage in production.

### Environment Variables
- `VITE_GEMINI_API_KEY`: (Optional) API key for Google Generative AI. Falls back to default bios if not set.

## Development

### Running Locally
The Vite dev server runs automatically via the workflow on port 5000. Access the application through the Replit webview.

### Build Process
```bash
npm run build
```
This compiles TypeScript and bundles the application for production in the `dist/` directory.

### Deployment
Configured as a static site deployment:
- Build command: `npm run build`
- Public directory: `dist`
- Deployment type: Static

## User Preferences
- Branding: "Embrace" with orange accent color scheme
