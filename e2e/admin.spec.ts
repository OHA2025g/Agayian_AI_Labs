import { expect, test } from "@playwright/test";

test.describe("custom admin", () => {
  test("unauthenticated /admin goes to login", async ({ page }) => {
    const response = await page.goto("/admin");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Admin sign in/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "Resources" })).toHaveCount(0);
  });

  test("resources route stays 404", async ({ page }) => {
    const response = await page.goto("/resources");
    expect(response?.status()).toBe(404);
  });

  test("login page has no Resources surface", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByText(/^Resources$/)).toHaveCount(0);
  });
});

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

test.describe("admin session", () => {
  test.skip(!email || !password, "ADMIN_EMAIL / ADMIN_PASSWORD not set");

  test("administrator can open dashboard without Resources nav", async ({
    page,
  }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Work email").fill(email!);
    await page.getByLabel("Password").fill(password!);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    const nav = page.getByRole("navigation", { name: "Admin" });
    await expect(nav.getByRole("link", { name: "Insights" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Resources" })).toHaveCount(0);
    await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
  });
});
