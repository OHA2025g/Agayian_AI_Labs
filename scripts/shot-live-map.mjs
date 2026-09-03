import { chromium } from "@playwright/test";

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
await page.waitForTimeout(400);
const map = page.locator('[role="img"]').first();
const box = await map.boundingBox();
console.log(box);
await map.screenshot({
  path: "docs/parity-screenshots/industries-selector/live-map.png",
});
await page.screenshot({
  path: "docs/parity-screenshots/industries-selector/live-hero.png",
  clip: { x: 0, y: 0, width: 1440, height: 720 },
});
await browser.close();
console.log("ok");
