import { chromium } from "@playwright/test";
import sharp from "sharp";

const out = "docs/parity-screenshots/industries-rebuild";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
await page.goto("http://127.0.0.1:3000/industries", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.addStyleTag({
  content: `
    #cookie-preferences,
    button[aria-label="Back to top"],
    body > footer:not(.industries-footer) {
      display: none !important;
    }
  `,
});
await page.waitForTimeout(600);
const metrics = await page.evaluate(() => ({
  height: document.documentElement.scrollHeight,
  footerTop: document.querySelector(".industries-footer")
    ? Math.round(
        document.querySelector(".industries-footer").getBoundingClientRect()
          .top + window.scrollY,
      )
    : null,
  siteFooterDisplay: document.querySelector("body > footer")
    ? getComputedStyle(document.querySelector("body > footer")).display
    : "missing",
}));
console.log(metrics);
const full = `${out}/current-1440.png`;
await page.screenshot({ path: full, fullPage: true });
await page.screenshot({
  path: `${out}/hero.png`,
  clip: { x: 0, y: 0, width: 1440, height: 750 },
});
await page.screenshot({
  path: `${out}/selector.png`,
  clip: { x: 0, y: 730, width: 1440, height: 280 },
});
await browser.close();
const meta = await sharp(full).metadata();
console.log("shot", meta.width, meta.height);
