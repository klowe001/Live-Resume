# CLAUDE.md

## Project Overview

Live-Resume is a full-stack interactive portfolio/resume website for Kevin Lowe. React frontend with Express.js backend, deployed on Replit.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7, TailwindCSS 4, shadcn/ui, Wouter (routing), Framer Motion, TanStack React Query
- **Backend**: Express.js 5, Node.js (ES modules), Passport.js, PostgreSQL 16, Drizzle ORM
- **Build**: Vite (client), ESBuild (server), PostCSS

## Directory Structure

```
client/src/           # React frontend
  pages/              # Page components (home.tsx, not-found.tsx)
  components/         # App components + ui/ (shadcn)
  context/            # AnimationContext, ConsentContext
  hooks/              # Custom React hooks
  lib/                # Utilities, query client
server/               # Express backend
  index.ts            # Server entry point (port 5000)
  routes.ts           # API routes
  storage.ts          # Data storage interface
shared/               # Shared code
  schema.ts           # Drizzle schema + Zod validation
```

## Commands

```bash
npm run dev            # Start dev server (Express + Vite HMR)
npm run dev:client     # Start Vite dev server only
npm run build          # Build client (Vite) and server (ESBuild) to dist/
npm start              # Start production server
npm run check          # TypeScript type checking (tsc)
npm run db:push        # Push database migrations (Drizzle Kit)
```

## Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## Key Details

- App serves on port 5000
- Theme uses custom warm/paper-like palette with CSS variables (--color-ink, --color-paper, --color-accent)
- Fonts: "Instrument Serif" (serif), "Manrope" (sans-serif)
- GDPR consent management built in (ConsentContext + ConsentBanner)
- Google Tag Manager integration (GTM-W9Q3GNGD)
- No test suite or linter configured
- PostgreSQL required via DATABASE_URL env var
