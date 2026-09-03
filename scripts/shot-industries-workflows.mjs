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

async function shot(slug, name) {
  await page.goto(`${baseURL}/industries?industry=${slug}`, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.addStyleTag({ content: hideChrome });
  await page.waitForSelector(".industries-workflows");
  await page.waitForTimeout(400);
  const panel = page.locator(".industries-workflows");
  await panel.scrollIntoViewIfNeeded();
  const info = await page.evaluate(() => {
    const grid = document.querySelector(".industries-workflow-grid");
    const steps = [...document.querySelectorAll(".industries-workflow-step")];
    const style = grid ? getComputedStyle(grid) : null;
    return {
      titles: steps.map((el) => el.querySelector("h4")?.textContent ?? ""),
      columns: style?.gridTemplateColumns ?? "",
      stepCount: steps.length,
      connectors: document.querySelectorAll(".industries-workflow-connector")
        .length,
    };
  });
  await panel.screenshot({
    path: resolve(outDir, name),
  });
  return info;
}

const government = await shot("government", "workflows-gov.png");
const enterprise = await shot("enterprise", "workflows-ent.png");
await browser.close();
console.log(JSON.stringify({ government, enterprise }, null, 2));
