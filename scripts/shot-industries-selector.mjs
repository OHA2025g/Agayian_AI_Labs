import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const out = "docs/parity-screenshots/industries-selector";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await page.goto("http://127.0.0.1:3000/industries", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.addStyleTag({
  content: "footer, #cookie-preferences { display:none !important }",
});
await page.waitForTimeout(400);

const tablist = page.locator('[role=tablist][aria-label="Select industry"]');
await tablist.waitFor();

const box = await tablist.evaluate((el) => {
  const bar = el.parentElement;
  const r = bar.getBoundingClientRect();
  return {
    y: Math.round(r.top),
    h: Math.round(r.height),
    w: Math.round(r.width),
    overflow: el.scrollWidth > el.clientWidth,
    tabs: el.querySelectorAll("[role=tab]").length,
    labels: [...el.querySelectorAll("[role=tab]")].map((tab) =>
      tab.getAttribute("aria-label"),
    ),
  };
});

await page.screenshot({
  path: `${out}/desktop-hero.png`,
  clip: { x: 0, y: 0, width: 1440, height: 820 },
});

await page.locator("#industry-tab-banking").click();
await page.waitForFunction(
  () =>
    document
      .querySelector("#industry-tab-banking")
      ?.getAttribute("aria-selected") === "true",
  { timeout: 5000 },
);
const barBox = await tablist.evaluate((el) => {
  const bar = el.parentElement;
  const r = bar.getBoundingClientRect();
  return {
    y: Math.max(0, Math.round(r.top) - 16),
    h: Math.round(r.height) + 32,
    active: document.querySelector("[role=tab][aria-selected=true]")?.getAttribute("aria-label"),
    panel: document.querySelector("[role=tabpanel] h2")?.textContent,
  };
});
await page.screenshot({
  path: `${out}/desktop-banking.png`,
  clip: { x: 0, y: barBox.y, width: 1440, height: barBox.h },
});

await page.setViewportSize({ width: 390, height: 844 });
await tablist.evaluate((el) => {
  el.parentElement?.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(400);
await page.screenshot({ path: `${out}/mobile-bar.png` });
console.log(JSON.stringify({ ...box, barBox }, null, 2));

await browser.close();
