import { chromium } from "@playwright/test";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/ai-centre-of-excellence", {
  waitUntil: "networkidle",
  timeout: 120_000,
});

const consults = await page.$$eval('main a[href*="contact"]', (els) =>
  els.map((el) => ({
    href: el.getAttribute("href"),
    text: (el.textContent || "").replace(/\s+/g, " ").trim(),
  })),
);

await page.click('a[href="#operating-model"]');
await page.waitForTimeout(500);
const modelTop = await page.evaluate(
  () => document.getElementById("operating-model")?.getBoundingClientRect().top,
);

await page.locator("#faq button").nth(2).click();
await page.waitForTimeout(250);
const faq = await page.evaluate(() =>
  [...document.querySelectorAll("#faq button")].map((button) =>
    button.getAttribute("aria-expanded"),
  ),
);

const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth > window.innerWidth + 2,
);

console.log(JSON.stringify({ consults, modelTop, faq, overflow }, null, 2));
await browser.close();
