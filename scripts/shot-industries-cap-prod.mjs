import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "docs/parity-screenshots/industries-rebuild");
mkdirSync(outDir, { recursive: true });

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";
const hideChrome = `
  #cookie-preferences,
  button[aria-label="Back to top"],
  nextjs-portal,
  [data-nextjs-toast] {
    display: none !important;
  }
`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});

await page.goto(`${baseURL}/industries?industry=government`, {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.addStyleTag({ content: hideChrome });
await page.waitForSelector(".industries-cap-prod");
await page.waitForTimeout(500);
const section = page.locator(".industries-cap-prod");
await section.scrollIntoViewIfNeeded();
const info = await page.evaluate(() => {
  const caps = [...document.querySelectorAll(".industries-cap-item span")].map(
    (el) => el.textContent ?? "",
  );
  const products = [...document.querySelectorAll(".industries-product-card h4")].map(
    (el) => el.textContent ?? "",
  );
  const blurbs = [...document.querySelectorAll(".industries-product-card p")].map(
    (el) => el.textContent ?? "",
  );
  return { caps, products, blurbs };
});
await section.screenshot({
  path: resolve(outDir, "cap-prod-gov.png"),
});
await page.locator(".industries-product-grid").screenshot({
  path: resolve(outDir, "product-cards.png"),
});
info.srcs = await page.evaluate(() =>
  [...document.querySelectorAll(".industries-product-card img")].map(
    (el) => el.getAttribute("src") ?? "",
  ),
);
await browser.close();
console.log(JSON.stringify(info, null, 2));
