import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

/**
 * Renders script/og-template.html to client/public/og.jpg at 1200x630.
 * Run once with `npm run og:render` whenever the template changes, then
 * commit the JPG. It is not part of the build.
 */

const TEMPLATE = path.resolve(process.cwd(), "script/og-template.html");
const OUT = path.resolve(process.cwd(), "client/public/og.jpg");

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(TEMPLATE).href, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: OUT,
      type: "jpeg",
      quality: 92,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
    console.log(`[og] Wrote ${OUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("[og] Failed:", err);
  process.exit(1);
});
