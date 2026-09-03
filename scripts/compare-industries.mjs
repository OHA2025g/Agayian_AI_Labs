import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "docs/parity-screenshots/industries-rebuild");
const targetPath = resolve(outDir, "industries-target.png");

mkdirSync(outDir, { recursive: true });

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});

await page.goto(`${baseURL}/industries`, {
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
    documentWidth: document.documentElement.scrollWidth,
    header: box("header"),
    hero: box(".industries-hero"),
    copy: box(".industries-hero-copy"),
    map: box(".industries-map-stage"),
    legend: box(".industries-legend"),
    selector: box(".industries-selector"),
    overview: box(".industries-overview"),
    challenges: box(".industries-challenges"),
    opportunity: box(".industries-opportunity"),
    workflows: box(".industries-workflows"),
    capProd: box(".industries-cap-prod"),
    capabilities: box(".industries-capabilities"),
    products: box(".industries-products"),
    govOut: box(".industries-gov-out"),
    cta: box(".industries-cta"),
    footer: box(".industries-footer"),
  };
});

const fullPath = resolve(outDir, "current-1440.png");
await page.screenshot({ path: fullPath, fullPage: true });
await browser.close();

const currentMeta = await sharp(fullPath).metadata();
const resized = await sharp(fullPath).resize({ width: 752 }).png().toBuffer();
writeFileSync(resolve(outDir, "current-752.png"), resized);

if (!existsSync(targetPath)) {
  throw new Error(`Target mockup missing: ${targetPath}`);
}

const targetBuf = await sharp(targetPath).png().toBuffer();
const targetMeta = await sharp(targetBuf).metadata();
const current752Meta = await sharp(resized).metadata();
const height = Math.max(targetMeta.height || 2048, current752Meta.height || 2048);

const pad = async (input, h) => {
  const m = await sharp(input).metadata();
  return sharp(input)
    .extend({
      bottom: Math.max(0, h - (m.height || 0)),
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .resize(752, h)
    .png()
    .toBuffer();
};

const targetCanvas = await pad(targetBuf, height);
const currentCanvas = await pad(resized, height);
const fadedPath = resolve(outDir, "current-752-fade.png");
await sharp(currentCanvas).ensureAlpha().linear(1, 0).toFile(fadedPath);
const faded = await sharp(fadedPath)
  .composite([
    {
      input: {
        create: {
          width: 752,
          height,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 0.5 },
        },
      },
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

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
      resized: current752Meta,
      target: targetMeta,
    },
    null,
    2,
  ),
);

console.log(JSON.stringify({ metrics, screenshot: currentMeta }, null, 2));
