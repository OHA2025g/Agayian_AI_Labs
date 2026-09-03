import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("home loads with intelligence headline", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Governed Intelligence/i,
    );
    await expect(page.getByText(/Agrayian/i).first()).toBeVisible();
  });

  test("insight article returns 200", async ({ page }) => {
    const response = await page.goto(
      "/insights/agentic-ai-from-demos-to-governed-operating-systems",
    );
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Agentic AI/i,
    );
  });

  test("product slug is a real product page", async ({ page }) => {
    const response = await page.goto("/products/smart-hiring");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/products\/smart-hiring/);
    await expect(
      page.getByRole("heading", { name: /Smart Hiring/i }).first(),
    ).toBeVisible();
  });

  test("impact story slug is a real story page", async ({ page }) => {
    const response = await page.goto(
      "/impact-stories/ai-powered-talent-intelligence-transformation",
    );
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(
      /\/impact-stories\/ai-powered-talent-intelligence-transformation/,
    );
    await expect(
      page.getByRole("heading", { name: /Talent Intelligence/i }).first(),
    ).toBeVisible();
  });

  test("header contains Impact and Insights", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "Impact" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Insights" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Resources" })).toHaveCount(0);
  });

  test("products laboratory opens detail modal", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem("agrayian-cookie-preference", "essential");
      } catch {
        /* ignore */
      }
    });
    await page.goto("/products");
    await page.getByRole("button", { name: /View details/i }).first().click();
    const dialog = page.getByRole("dialog").filter({
      hasNot: page.locator("#cookie-preferences"),
    });
    await expect(dialog).toBeVisible({ timeout: 15_000 });
    await expect(dialog.getByRole("heading").first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("products ?product= opens laboratory modal", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem("agrayian-cookie-preference", "essential");
      } catch {
        /* ignore */
      }
    });
    await page.goto("/products?product=smart-hiring");
    const dialog = page.getByRole("dialog").filter({
      hasNot: page.locator("#cookie-preferences"),
    });
    await expect(dialog).toBeVisible({ timeout: 15_000 });
    await expect(dialog.getByText(/Smart Hiring|vedhire/i).first()).toBeVisible();
  });

  test("cookie Accept all and Essential only", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.removeItem("agrayian-cookie-preference");
      } catch {
        /* ignore */
      }
    });

    await page.goto("/");
    const banner = page.locator("#cookie-preferences");
    await expect(banner).toBeVisible({ timeout: 15_000 });
    await banner.getByRole("button", { name: "Accept all" }).click();
    await expect(banner).toBeHidden();

    await page.evaluate(() => {
      localStorage.removeItem("agrayian-cookie-preference");
      window.dispatchEvent(new Event("agrayian-cookie-change"));
    });
    await page.reload();
    const again = page.locator("#cookie-preferences");
    await expect(again).toBeVisible({ timeout: 15_000 });
    await again.getByRole("button", { name: "Essential only" }).click();
    await expect(again).toBeHidden();
  });

  test("mobile nav opens", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem("agrayian-cookie-preference", "essential");
      } catch {
        /* ignore */
      }
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator("header[data-nav-ready='true']")).toBeVisible();
    await page.getByRole("button", { name: /Open menu/i }).click();
    await expect(page.locator("#mobile-navigation")).toBeVisible();
    await expect(
      page.locator("#mobile-navigation").getByRole("link").first(),
    ).toBeVisible();
  });

  test("resources route is gone", async ({ page }) => {
    const response = await page.goto("/resources");
    expect(response?.status()).toBe(404);
  });

  test("404 page", async ({ page }) => {
    const response = await page.goto("/not-a-page");
    expect(response?.status()).toBe(404);
    // Dual root layouts use the framework fallback for unmatched paths.
    await expect(
      page.getByText(/This page could not be found|Page not found/i),
    ).toBeVisible();
  });

  test("contact page shows form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("#fullName")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Submit enquiry/i }),
    ).toBeVisible();
  });

  test("newsletter form visible in footer", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByPlaceholder("Work email")).toBeVisible();
    await expect(footer.getByRole("button", { name: "Subscribe" })).toBeVisible();
  });

  test("cookie preferences reopen from footer", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem("agrayian-cookie-preference", "essential");
      } catch {
        /* ignore */
      }
    });

    await page.goto("/");
    await expect(page.locator("#cookie-preferences")).toBeHidden();
    await page.getByRole("link", { name: /Cookie Preferences/i }).click();
    await expect(page.locator("#cookie-preferences")).toBeVisible({
      timeout: 15_000,
    });
  });
});
