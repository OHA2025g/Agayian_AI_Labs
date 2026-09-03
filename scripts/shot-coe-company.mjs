import { chromium } from "@playwright/test";

const browser = await chromium.launch({ headless: true });
const hide =
  '#cookie-preferences,button[aria-label="Back to top"],nextjs-portal{display:none!important}';

async function open(path, width = 1440, height = 980) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`http://localhost:3000${path}`, {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });
  await page.addStyleTag({ content: hide });
  await page.waitForTimeout(1200);
  return page;
}

const hero = await open("/ai-centre-of-excellence", 1440, 900);
await hero.screenshot({
  path: "docs/parity-screenshots/coe-rebuild/hero-stack.png",
});
await hero.close();

const modelPage = await open("/ai-centre-of-excellence");
const model = modelPage.locator("#operating-model");
await model.scrollIntoViewIfNeeded();
await modelPage.waitForTimeout(400);
await model.screenshot({
  path: "docs/parity-screenshots/coe-rebuild/operating-model.png",
});
await modelPage.close();

const company = await open("/company");
await company.screenshot({
  path: "docs/parity-screenshots/company-hub.png",
});
await company.close();

const mobile = await open("/ai-centre-of-excellence", 390, 844);
await mobile.screenshot({
  path: "docs/parity-screenshots/coe-rebuild/hero-stack-mobile.png",
});
await mobile.close();

console.log("ok");
await browser.close();
