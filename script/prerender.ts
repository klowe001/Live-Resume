import fs from "node:fs";
import path from "node:path";
import { preview } from "vite";
import puppeteer from "puppeteer";

/**
 * Writes the fully rendered home page into dist/public/index.html.
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

    console.log(`[prerender] Rendering ${origin}/`);
    await page.goto(`${origin}/`, { waitUntil: "networkidle0", timeout: 30000 });

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
    await new Promise((r) => setTimeout(r, 1500));

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

    fs.writeFileSync(indexPath, html, "utf8");
    console.log(`[prerender] Wrote ${indexPath} (${(html.length / 1024).toFixed(1)} kB)`);
  } finally {
    await browser?.close();
    await new Promise<void>((resolve) => server.httpServer.close(() => resolve()));
  }
}

// Allow `npx tsx script/prerender.ts` on an existing build.
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  prerender().catch((err) => {
    console.error("[prerender] Failed:", err);
    process.exit(1);
  });
}
