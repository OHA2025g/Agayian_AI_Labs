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

  test("product slug redirects into laboratory query", async ({ page }) => {
    await page.goto("/products/smart-hiring");
    await expect(page).toHaveURL(/\/products\?product=smart-hiring/);
    await expect(
      page.getByRole("heading", { name: /Smart Hiring/i }).first(),
    ).toBeVisible();
  });

  test("impact story slug redirects to hash panel", async ({ page }) => {
    await page.goto(
      "/impact-stories/ai-powered-talent-intelligence-transformation",
    );
    await expect(page).toHaveURL(
      /\/impact-stories#ai-powered-talent-intelligence-transformation/,
    );
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
    await expect(dialog).toBeVisible();
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
    const dialog = page.getByRole("dialog", { name: /Smart Hiring/i });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/Smart Hiring/i).first()).toBeVisible();
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
    const banner = page.getByRole("dialog", { name: /Cookie preferences/i });
    await expect(banner).toBeVisible();
    await banner.getByRole("button", { name: "Accept all" }).click();
    await expect(banner).toBeHidden();

    await page.evaluate(() => {
      localStorage.removeItem("agrayian-cookie-preference");
      window.dispatchEvent(new Event("agrayian-cookie-change"));
    });
    await page.reload();
    const again = page.getByRole("dialog", { name: /Cookie preferences/i });
    await expect(again).toBeVisible();
    await again.getByRole("button", { name: "Essential only" }).click();
    await expect(again).toBeHidden();
  });

  test("mobile nav opens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: /Open menu/i }).click();
    await expect(page.locator("#mobile-navigation")).toBeVisible();
    await expect(
      page.locator("#mobile-navigation").getByRole("link").first(),
    ).toBeVisible();
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
    await expect(
      page.getByRole("dialog", { name: /Cookie preferences/i }),
    ).toBeHidden();
    await page.getByRole("link", { name: /Cookie Preferences/i }).click();
    await expect(
      page.getByRole("dialog", { name: /Cookie preferences/i }),
    ).toBeVisible();
  });
});
