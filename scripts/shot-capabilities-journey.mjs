import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const outDir = resolve("docs/parity-screenshots/capabilities-rebuild");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await page.goto("http://127.0.0.1:3000/capabilities", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.addStyleTag({
  content: `
    footer,
    #cookie-preferences,
    button[aria-label="Back to top"],
    nextjs-portal {
      display: none !important;
    }
  `,
});
await page.waitForTimeout(700);

const journey = page.locator(".capabilities-journey");
await journey.waitFor({ state: "visible" });
await journey.screenshot({ path: resolve(outDir, "live-full.png") });
await page.locator(".capabilities-row").first().screenshot({
  path: resolve(outDir, "live-top.png"),
});
await page.locator(".capabilities-row").last().screenshot({
  path: resolve(outDir, "live-bot.png"),
});

await browser.close();
console.log("saved journey shots");
