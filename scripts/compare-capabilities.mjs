import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "docs/parity-screenshots/capabilities-rebuild");
const targetPath = resolve(
  root,
  "ChatGPT Image Aug 11, 2026, 09_49_38 PM (1).png",
);

mkdirSync(outDir, { recursive: true });

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await page.goto(`${baseURL}/capabilities`, {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.addStyleTag({
  content: `
    footer,
    #cookie-preferences,
    button[aria-label="Back to top"] {
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
    documentHeight: document.documentElement.scrollHeight,
    header: box("header"),
    hero: box(".capabilities-hero"),
    copy: box(".capabilities-hero-copy"),
    stack: box("#capabilities-stack"),
    toc: box(".capabilities-toc"),
    journey: box(".capabilities-journey"),
    rows: [...document.querySelectorAll(".capabilities-row")].map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        i,
        top: Math.round(r.top + window.scrollY),
        left: Math.round(r.left),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    }),
    related: box(".capabilities-related"),
    products: box(".capabilities-product-grid"),
    cta: box(".capabilities-cta"),
  };
});

const fullPath = resolve(outDir, "current-1440.png");
await page.screenshot({ path: fullPath, fullPage: true });
await browser.close();

const currentMeta = await sharp(fullPath).metadata();
const resized = await sharp(fullPath).resize({ width: 862 }).png().toBuffer();
writeFileSync(resolve(outDir, "current-862.png"), resized);

if (!existsSync(targetPath)) {
  throw new Error(`Target mockup missing: ${targetPath}`);
}

const targetBuf = await sharp(targetPath).resize({ width: 862 }).png().toBuffer();
const targetMeta = await sharp(targetBuf).metadata();
const current862Meta = await sharp(resized).metadata();
const height = Math.max(targetMeta.height || 1824, current862Meta.height || 1824);

const pad = async (input, h) => {
  const m = await sharp(input).metadata();
  return sharp(input)
    .extend({
      bottom: Math.max(0, h - (m.height || 0)),
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .resize(862, h)
    .png()
    .toBuffer();
};

const targetCanvas = await pad(targetBuf, height);
const currentCanvas = await pad(resized, height);
const faded = await sharp(currentCanvas).ensureAlpha(0.5).png().toBuffer();

await sharp(targetCanvas)
  .composite([{ input: faded, blend: "over" }])
  .toFile(resolve(outDir, "overlay-50.png"));

await sharp(targetCanvas)
  .composite([{ input: currentCanvas, blend: "difference" }])
  .toFile(resolve(outDir, "diff.png"));

writeFileSync(
  resolve(outDir, "metrics.json"),
  JSON.stringify(
    {
      ...metrics,
      screenshot: { width: currentMeta.width, height: currentMeta.height },
      resized: current862Meta,
      target: targetMeta,
    },
    null,
    2,
  ),
);

console.log(JSON.stringify({ metrics, screenshot: currentMeta }, null, 2));
