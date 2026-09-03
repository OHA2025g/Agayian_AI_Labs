import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const refDir = resolve(root, "reference");
const targetPath = resolve(refDir, "industries-target.png");
mkdirSync(refDir, { recursive: true });

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
    body > footer:not(.industries-footer),
    nextjs-portal,
    [data-next-badge-root],
    [data-nextjs-toast] {
      display: none !important;
    }
  `,
});
await page.evaluate(() => {
  document.querySelectorAll("nextjs-portal").forEach((node) => node.remove());
});
await page.waitForTimeout(600);

const scale = 752 / 1440;
const metrics = await page.evaluate((s) => {
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      css: {
        top: Math.round(r.top + window.scrollY),
        left: Math.round(r.left),
        width: Math.round(r.width),
        height: Math.round(r.height),
      },
      n752: {
        top: Math.round((r.top + window.scrollY) * s),
        left: Math.round(r.left * s),
        width: Math.round(r.width * s),
        height: Math.round(r.height * s),
      },
    };
  };
  const h1 = document.querySelector(".industries-hero-copy h1");
  return {
    header: box("header"),
    logo: box('header a[aria-label="Agrayian AI Labs home"]'),
    nav: box('header nav[aria-label="Primary"]'),
    headerCta: box('header a[href="/contact?interest=consultation"]'),
    hero: box(".industries-hero"),
    copy: box(".industries-hero-copy"),
    eyebrow: box(".industries-eyebrow"),
    h1: box(".industries-hero-copy h1"),
    h1Lines: h1
      ? [...h1.getClientRects()].map((r) => ({
          top: Math.round((r.top + window.scrollY) * s),
          left: Math.round(r.left * s),
          width: Math.round(r.width * s),
        }))
      : [],
    body: box(".industries-body"),
    ctas: box(".industries-ctas"),
    primary: box(".industries-ctas a:first-child"),
    secondary: box(".industries-ctas a:last-child"),
    map: box(".industries-hero-map"),
    legend: box(".industries-legend"),
    selector: box(".industries-selector-wrap"),
  };
}, scale);

const fullPath = resolve(refDir, "industries-current-1440.png");
await page.screenshot({ path: fullPath, fullPage: true });
await browser.close();

const currentMeta = await sharp(fullPath).metadata();
const resized = await sharp(fullPath).resize({ width: 752 }).png().toBuffer();
const current752Path = resolve(refDir, "industries-current-752.png");
writeFileSync(current752Path, resized);

const targetBuf = await sharp(targetPath).png().toBuffer();
const targetMeta = await sharp(targetBuf).metadata();
const current752Meta = await sharp(resized).metadata();
const cropH = 404;

const targetTop = await sharp(targetBuf)
  .extract({
    left: 0,
    top: 0,
    width: 752,
    height: Math.min(cropH, targetMeta.height || cropH),
  })
  .png()
  .toBuffer();
const currentTop = await sharp(resized)
  .extract({
    left: 0,
    top: 0,
    width: 752,
    height: Math.min(cropH, current752Meta.height || cropH),
  })
  .png()
  .toBuffer();

const faded = await sharp(currentTop)
  .ensureAlpha()
  .composite([
    {
      input: {
        create: {
          width: 752,
          height: cropH,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 0.5 },
        },
      },
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

await sharp(targetTop)
  .composite([{ input: faded, blend: "over" }])
  .toFile(resolve(refDir, "industries-overlay.png"));

await sharp(targetTop)
  .composite([{ input: currentTop, blend: "difference" }])
  .toFile(resolve(refDir, "industries-diff.png"));

writeFileSync(resolve(refDir, "industries-hero-metrics.json"), JSON.stringify(metrics, null, 2));

console.log(
  JSON.stringify(
    {
      screenshot: currentMeta,
      resized: current752Meta,
      target: targetMeta,
      metrics,
    },
    null,
    2,
  ),
);
