import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const outDir = resolve("docs/parity-screenshots/coe-rebuild");
mkdirSync(outDir, { recursive: true });

const baseURL = process.env.BASE_URL || "http://localhost:3000";
const widths = [1440, 1024, 768, 390];

const browser = await chromium.launch({ headless: true });

const hideChrome = `
  #cookie-preferences,
  button[aria-label="Back to top"],
  nextjs-portal {
    display: none !important;
  }
`;

async function capture(width) {
  const page = await browser.newPage({
    viewport: { width, height: width <= 768 ? 844 : 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(`${baseURL}/ai-centre-of-excellence`, {
    waitUntil: "networkidle",
    timeout: 120_000,
  });
  await page.addStyleTag({ content: hideChrome });
  await page.waitForTimeout(600);

  const metrics = await page.evaluate(() => {
    const box = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        y: Math.round(r.top + window.scrollY),
      };
    };
    return {
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
      overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
      header: box("header"),
      hero: box("h1")?.y ?? null,
      outcomes: document.querySelector("aside h3")?.textContent ?? null,
      sections: [
        "what",
        "why",
        "operating-model",
        "idea-to-impact",
        "pillars",
        "foundations",
        "maturity",
        "roadmap",
        "faq",
      ].map((id) => ({ id, exists: Boolean(document.getElementById(id)) })),
      faqCount: document.querySelectorAll("#faq button").length,
      consultHref: document.querySelector('a[href*="contact"]')?.getAttribute("href"),
    };
  });

  await page.screenshot({
    path: resolve(outDir, `full-${width}.png`),
    fullPage: true,
  });
  await page.screenshot({
    path: resolve(outDir, `hero-${width}.png`),
    clip: { x: 0, y: 0, width, height: Math.min(900, width <= 768 ? 844 : 900) },
  });

  const faq = page.locator("#faq button").first();
  if (await faq.count()) {
    await faq.click();
    await page.waitForTimeout(300);
  }
  const faqOpen = await page.evaluate(() => {
    const button = document.querySelector("#faq button");
    return button?.getAttribute("aria-expanded") === "true";
  });

  await page.close();
  return { width, ...metrics, faqOpen };
}

const results = [];
for (const width of widths) {
  results.push(await capture(width));
}

writeFileSync(resolve(outDir, "metrics.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));

await browser.close();
