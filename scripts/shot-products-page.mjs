import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const outDir = resolve("docs/parity-screenshots/products-rebuild");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await page.goto("http://127.0.0.1:3000/products", {
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
await page.waitForTimeout(800);

const metrics = await page.evaluate(() => {
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      top: Math.round(r.top + window.scrollY),
      left: Math.round(r.left),
      width: Math.round(r.width),
      height: Math.round(r.height),
    };
  };
  return {
    hero: box(".products-hero"),
    categories: box(".products-category-bar"),
    featured: box(".products-featured"),
    explore: box(".products-explore"),
    architecture: box(".products-architecture"),
    cards: document.querySelectorAll(".products-card").length,
  };
});

await page.screenshot({
  path: resolve(outDir, "live-1440.png"),
  fullPage: true,
});
await page.locator(".products-hero").screenshot({
  path: resolve(outDir, "live-hero.png"),
});
await page.locator(".products-featured").screenshot({
  path: resolve(outDir, "live-spotlight.png"),
});
await page.locator(".products-explore").screenshot({
  path: resolve(outDir, "live-grid.png"),
});
await page.locator(".products-architecture").screenshot({
  path: resolve(outDir, "live-arch.png"),
});

const target = resolve("ChatGPT Image Aug 11, 2026, 09_49_38 PM (2).png");
const live = await sharp(resolve(outDir, "live-1440.png"))
  .resize({ width: 864 })
  .png()
  .toBuffer();
const mock = await sharp(target).resize({ width: 864 }).png().toBuffer();
const liveMeta = await sharp(live).metadata();
const mockMeta = await sharp(mock).metadata();
const height = Math.max(liveMeta.height || 1, mockMeta.height || 1);
const pad = async (buf, h) => {
  const m = await sharp(buf).metadata();
  return sharp(buf)
    .extend({
      bottom: Math.max(0, h - (m.height || 0)),
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .resize(864, h)
    .png()
    .toBuffer();
};
const livePad = await pad(live, height);
const mockPad = await pad(mock, height);
const faded = await sharp(livePad).ensureAlpha(0.5).png().toBuffer();
await sharp(mockPad)
  .composite([{ input: faded, blend: "over" }])
  .toFile(resolve(outDir, "overlay-50.png"));

writeFileSync(resolve(outDir, "metrics.json"), JSON.stringify(metrics, null, 2));
await browser.close();
console.log(JSON.stringify(metrics, null, 2));
