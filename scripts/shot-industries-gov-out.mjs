import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "docs/parity-screenshots/industries-rebuild");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
await page.goto("http://127.0.0.1:3000/industries?industry=government", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.addStyleTag({
  content: `#cookie-preferences, button[aria-label="Back to top"], nextjs-portal { display: none !important; }`,
});
const section = page.locator(".industries-gov-out");
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
const info = await page.evaluate(() => {
  const box = document.querySelector(".industries-gov-out")?.getBoundingClientRect();
  const gov = document.querySelector(".industries-governance")?.getBoundingClientRect();
  return {
    sectionH: Math.round(box?.height ?? 0),
    cardH: Math.round(gov?.height ?? 0),
    titles: [...document.querySelectorAll(".industries-gov-item h4")].map(
      (el) => el.textContent ?? "",
    ),
    outcomes: [...document.querySelectorAll(".industries-outcome-item span")].map(
      (el) => el.textContent ?? "",
    ),
    art: document.querySelector(".industries-outcomes-art")?.getAttribute("src"),
  };
});
await section.screenshot({ path: resolve(outDir, "gov-out.png") });
await browser.close();
console.log(JSON.stringify(info, null, 2));
