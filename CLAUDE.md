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
  index.ts            # Server entry point (port 5002)
  routes.ts           # API routes
  storage.ts          # Data storage interface
shared/               # Shared code
  schema.ts           # Drizzle schema + Zod validation
```

## Commands

```bash
npm run dev            # Start dev server (Express + Vite HMR)
npm run dev:client     # Start Vite dev server only
npm run build          # Build client (Vite), prerender index.html (Puppeteer), build server (ESBuild) to dist/
npm run prerender      # Re-run only the prerender step against an existing dist/public
npm run og:render      # Re-render client/public/og.jpg from script/og-template.html
npm start              # Start production server
npm run check          # TypeScript type checking (tsc)
npm run db:push        # Push database migrations (Drizzle Kit)
```

## Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## Key Details

- App serves on port 5002 (5000 conflicts with macOS Control Center / AirPlay Receiver)
- Theme: warm paper and ink with one copper accent, OKLCH tokens in `client/src/index.css` (`--color-paper`, `--color-ink`, `--color-ink-soft`, `--color-line`, `--color-accent`). See DESIGN.md.
- The theme is `@theme inline`, so tokens are not runtime CSS variables. In CSS use `--theme(--color-accent)`; in classes use the generated utilities. `var(--color-…)` silently falls back.
- Font: Archivo only (variable width and weight). `type-masthead` and `type-section` utilities set the condensed display styles.
- Résumé content: roles, schools, and the journey chart's stops (with brand colors) live in `client/src/lib/career.ts`; email, LinkedIn, GitHub, and the "open to" line in `client/src/lib/contact.ts`. Lines marked `confirm:` are facts waiting on Kevin.
- Copy is third person ("Kevin writes the spec…"). No em dashes. No periods at the end of bullet points.
- Media: originals in `attached_assets/`, web versions in `attached_assets/web/` from `python3 script/optimize-media.py` (Pillow + ffmpeg). Logos are served from `attached_assets/web/logos/` with their white made transparent (`--logos` rebuilds just those). Hero portrait: `python3 script/optimize-media.py --portrait attached_assets/headshot.png --erode 0` (already transparent); photos with a background go through `swift script/cutout.swift` first (macOS 14+).
- GDPR consent management built in (ConsentContext + ConsentBanner)
- Google Tag Manager integration (GTM-W9Q3GNGD)
- The build writes the rendered home page into dist/public/index.html so crawlers and link previews see real content. React replaces it on load. Replit deploys dist/public as static files.
- Head tags (title, description, canonical, Open Graph) live in client/index.html. The share image is client/public/og.jpg.
- No test suite or linter configured
- PostgreSQL required via DATABASE_URL env var
