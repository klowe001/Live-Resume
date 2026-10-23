# Live-Resume

Kevin Lowe's interactive résumé and blog, live at [kevin-lowe.com](https://kevin-lowe.com). React and Vite on the front, a small Express server for local dev, and a build step that prerenders every page to static HTML for GitHub Pages.

## Quick start

Requires Node 20.

```bash
npm install
npm run dev        # Express + Vite HMR on http://localhost:5002
```

Port 5002 avoids macOS AirPlay Receiver, which holds 5000. Set `PORT` to override.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Builds the client, prerenders pages with Puppeteer, bundles the server into `dist/` |
| `npm run prerender` | Re-runs only the prerender against an existing `dist/public` |
| `npm start` | Serves the production build |
| `npm run check` | TypeScript type check |
| `npm run og:render` | Re-renders the share image `client/public/og.jpg` |
| `npm run db:push` | Pushes the Drizzle schema (needs `DATABASE_URL`) |

There is no test suite or linter.

## Where things live

```
client/src/pages/      Home, blog index, post, 404
client/src/lib/        career.ts (roles, schools, journey chart), contact.ts, posts.ts, markdown.tsx
client/index.html      Head tags: title, description, canonical, Open Graph
content/posts/         Blog posts as Markdown
attached_assets/       Original media; web/ holds the optimized versions
server/                Express entry point and routes
shared/schema.ts       Drizzle schema and Zod validation
script/                Build, prerender, OG render, media optimization
```

## Editing content

- **Résumé:** roles, schools, and journey stops are in `client/src/lib/career.ts`. Email, LinkedIn, GitHub, and the "open to" line are in `client/src/lib/contact.ts`. Lines marked `confirm:` are waiting on Kevin
- **Blog posts:** add `content/posts/YYYY-MM-DD-slug.md`. The filename becomes the URL (`/blog/YYYY-MM-DD-slug`). Front matter takes `title`, `date`, `summary`, optional `topic` (`AI` or `Hard Tech`, which drives the filter on /blog), and optional `draft: true`
- **Media:** drop originals in `attached_assets/` and run `python3 script/optimize-media.py` (needs Pillow and ffmpeg). `--logos` rebuilds only the logos

Copy is third person, with no em dashes and no periods at the end of bullets.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site, checks that the prerendered pages have content, and publishes `dist/public` to GitHub Pages. The Monday Hard Tech Weekly task commits its post to `main`, so it ships the same way.

## More docs

- [CLAUDE.md](CLAUDE.md): full project notes
- [DESIGN.md](DESIGN.md): colors, type, and layout rules
- [PRODUCT.md](PRODUCT.md): audience, purpose, and design principles
