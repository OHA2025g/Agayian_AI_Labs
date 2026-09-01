/**
 * Capture full-page screenshots of marketing routes for design-parity verification.
 * Usage: node scripts/parity-screenshots.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const base = process.argv[2] || "http://127.0.0.1:3000";
const outDir = join(process.cwd(), "docs", "parity-screenshots");
mkdirSync(outDir, { recursive: true });

const routes = [
  ["home", "/"],
  ["capabilities", "/capabilities"],
  ["products", "/products"],
  ["industries", "/industries"],
  ["coe", "/ai-centre-of-excellence"],
  ["governance", "/ai-governance"],
  ["impact", "/impact-stories"],
  ["insights", "/insights"],
  [
    "article",
    "/insights/agentic-ai-from-demos-to-governed-operating-systems",
  ],
  ["company", "/company"],
  ["contact", "/contact"],
  ["trust", "/trust"],
  ["responsible-ai", "/responsible-ai"],
  ["privacy", "/privacy-policy"],
  ["terms", "/terms-of-use"],
  ["cookies", "/cookie-policy"],
  ["accessibility", "/accessibility-statement"],
];

const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1280", width: 1280, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  for (const [slug, path] of routes) {
    const url = `${base}${path}`;
    const file = join(outDir, `${slug}-${vp.name}.png`);
    try {
      const res = await page.goto(url, {
        waitUntil: "networkidle",
        timeout: 90000,
      });
      await page.waitForTimeout(800);
      await page.screenshot({ path: file, fullPage: true });
      const status = res?.status() ?? 0;
      results.push({ slug, vp: vp.name, status, file, ok: status < 400 });
      console.log(`OK ${status} ${slug}@${vp.name}`);
    } catch (err) {
      results.push({
        slug,
        vp: vp.name,
        status: 0,
        file,
        ok: false,
        error: String(err),
      });
      console.error(`FAIL ${slug}@${vp.name}: ${err}`);
    }
  }

  await context.close();
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(
  `\nCaptured ${results.length - failed.length}/${results.length} screenshots → ${outDir}`,
);
if (failed.length) {
  console.error("Failures:", failed);
  process.exit(1);
}
