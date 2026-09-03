import { chromium } from "@playwright/test";

const out =
  "C:/Users/pc/.cursor/projects/c-Users-pc-Downloads-Website-Agrayian-AI-Labs/agent-tools";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/company", {
  waitUntil: "networkidle",
  timeout: 60_000,
});
await page.locator(".scene-hero").screenshot({ path: `${out}/company-hero.png` });
const delivery = page.locator("h2", { hasText: "Our delivery philosophy" });
await delivery.scrollIntoViewIfNeeded();
await page.locator("h2", { hasText: "Our delivery philosophy" })
  .locator("xpath=ancestor::section[1]")
  .screenshot({ path: `${out}/company-delivery.png` });
const impact = page.locator("h2", { hasText: "Where we create impact" });
await impact.scrollIntoViewIfNeeded();
await page.locator("h2", { hasText: "Where we create impact" })
  .locator("xpath=ancestor::section[1]")
  .screenshot({ path: `${out}/company-impact.png` });
await browser.close();
console.log("ok");
