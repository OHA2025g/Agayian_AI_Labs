import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const out = "docs/parity-screenshots/industries-selector";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto("http://127.0.0.1:3000/industries", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.addStyleTag({
  content: "footer, #cookie-preferences { display:none !important }",
});
await page.waitForTimeout(600);
await page.screenshot({
  path: `${out}/hero-map.png`,
  clip: { x: 0, y: 0, width: 1440, height: 720 },
});
await page.screenshot({
  path: `${out}/hero-map-close.png`,
  clip: { x: 720, y: 96, width: 680, height: 620 },
});
await page.evaluate(() => window.scrollTo(0, 980));
await page.waitForTimeout(400);
await page.screenshot({
  path: `${out}/opportunity-mesh.png`,
  clip: { x: 0, y: 0, width: 1440, height: 800 },
});

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
await mobile.goto("http://127.0.0.1:3000/industries", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await mobile.addStyleTag({
  content: "footer, #cookie-preferences { display:none !important }",
});
await mobile.waitForTimeout(500);
await mobile.screenshot({
  path: `${out}/hero-map-mobile.png`,
  clip: { x: 0, y: 0, width: 390, height: 844 },
});

console.log("wrote hero, close, mesh, mobile");
await browser.close();
