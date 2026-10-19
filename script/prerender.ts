import fs from "node:fs";
import path from "node:path";
import { preview } from "vite";
import puppeteer from "puppeteer";

/**
 * Writes fully rendered pages into dist/public: the home page to index.html,
 * the blog index to blog.html, and each post to blog/<slug>.html. Static
 * hosts serve /blog/<slug> from blog/<slug>.html.
 *
 * The site renders client-side, so anything that reads it without JavaScript
 * (link unfurlers, crawlers, someone pasting the URL into a chat assistant)
 * would otherwise get an empty <div id="root">. This serves the built files
 * locally, loads the page in headless Chrome, and saves the DOM it ends up
 * with. React still mounts normally for real visitors and replaces this
 * markup on load.
 */

const DIST_DIR = path.resolve(process.cwd(), "dist/public");
const PORT = Number(process.env.PRERENDER_PORT || 4173);
const POSTS_DIR = path.resolve(process.cwd(), "content/posts");
const SITE_ORIGIN = "https://kevin-lowe.com";

// Same rules as client/src/lib/posts.ts: the filename is the slug, and
// `draft: true` keeps a post out.
function postSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => {
      const frontMatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(path.join(POSTS_DIR, f), "utf8"))?.[1] ?? "";
      return !/^draft:\s*true\s*$/m.test(frontMatter);
    })
    .map((f) => f.replace(/\.md$/, ""))
    .sort()
    .reverse();
}

/** Route to output file: "/" -> index.html, "/blog/x" -> blog/x.html, "/404" -> 404.html. */
const outputFile = (route: string) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);

function writeSitemap(routes: string[]) {
  const urls = routes
    .map((r) => {
      const date = /^\/blog\/(\d{4}-\d{2}-\d{2})/.exec(r)?.[1];
      return `  <url><loc>${SITE_ORIGIN}${r === "/" ? "/" : r}</loc>${date ? `<lastmod>${date}</lastmod>` : ""}</url>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), xml, "utf8");
}


// Matches CONSENT_COOKIE_NAME / CONSENT_VERSION in client/src/context/consent-context.tsx.
// Pretending consent is already recorded keeps the cookie banner out of the snapshot.
const CONSENT_COOKIE = {
  name: "gdpr_consent",
  value: encodeURIComponent(
    JSON.stringify({
      version: "1",
      preferences: { functional: true, analytics: false, marketing: false },
      timestamp: new Date(0).toISOString(),
    }),
  ),
};

export async function prerender(): Promise<void> {
  const indexPath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error(`${indexPath} not found. Run the Vite build first.`);
  }

  const server = await preview({
    preview: { port: PORT, host: "127.0.0.1", strictPort: true, open: false },
  });
  const origin = `http://127.0.0.1:${PORT}`;
  console.log(`[prerender] Preview server listening on ${origin}`);

  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const routes = ["/", "/blog", ...postSlugs().map((slug) => `/blog/${slug}`)];
    // Any unknown path renders the not-found page. Static hosts serve 404.html for missing files.
    const notFound = "/404";
    const rendered: Array<[string, string]> = [];

    // Render everything before writing anything, so the preview server keeps
    // serving the untouched index.html as the app shell for every route.
    for (const route of routes) {
      rendered.push([route, await renderRoute(browser, origin, route)]);
    }
    rendered.push([notFound, await renderRoute(browser, origin, notFound)]);

    for (const [route, html] of rendered) {
      const file = path.join(DIST_DIR, outputFile(route));
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, html, "utf8");
      console.log(`[prerender] Wrote ${path.relative(DIST_DIR, file)} (${(html.length / 1024).toFixed(1)} kB)`);
    }
    writeSitemap(routes);
  } finally {
    await browser?.close();
    await new Promise<void>((resolve) => server.httpServer.close(() => resolve()));
  }
}

async function renderRoute(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  origin: string,
  route: string,
): Promise<string> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Only talk to the local preview server. This keeps Google Tag Manager,
  // the consent geolocation lookup, and web fonts out of the snapshot.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const { hostname } = new URL(req.url());
    if (hostname === "127.0.0.1") {
      void req.continue();
    } else {
      void req.abort();
    }
  });

  await page.setCookie({ ...CONSENT_COOKIE, url: origin });

  console.log(`[prerender] Rendering ${origin}${route}`);
  await page.goto(`${origin}${route}`, { waitUntil: "networkidle0", timeout: 30000 });

  // Sections below the fold animate in when scrolled into view. Walk the
  // page so every one of them reaches its final state.
  await page.evaluate(async () => {
    const step = Math.max(200, window.innerHeight / 2);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, route === "/" ? 1500 : 300));

  await page.evaluate(() => {
    // Pin anything the animation library left mid-transition.
    document.querySelectorAll<HTMLElement>('[style*="opacity"]').forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    // The inline GTM loader inserts its own <script> tag at runtime. Drop
    // it from the snapshot so the real page does not load GTM twice.
    document
      .querySelectorAll('script[src*="googletagmanager.com"]')
      .forEach((el) => el.remove());
  });

  const html = await page.content();
  await page.close();
  return html;
}

// Allow `npx tsx script/prerender.ts` on an existing build.
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  prerender().catch((err) => {
    console.error("[prerender] Failed:", err);
    process.exit(1);
  });
}
