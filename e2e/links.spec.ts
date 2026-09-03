import { expect, test } from "@playwright/test";

test("header, footer and key CTAs do not 404", async ({ page, request }) => {
  test.setTimeout(180_000);

  await page.addInitScript(() => {
    try {
      localStorage.setItem("agrayian-cookie-preference", "essential");
    } catch {
      /* ignore */
    }
  });

  await page.goto("/");
  const hrefs = await page.evaluate(() => {
    const nodes = [
      ...document.querySelectorAll<HTMLAnchorElement>("header a[href], footer a[href]"),
    ];
    return [
      ...new Set(
        nodes
          .map((node) => node.getAttribute("href") || "")
          .filter(
            (href) =>
              href.startsWith("/") &&
              !href.startsWith("//") &&
              !href.startsWith("/#") &&
              href !== "#cookie-preferences",
          )
          .map((href) => href.split("#")[0].split("?")[0] || href),
      ),
    ];
  });

  expect(hrefs.length).toBeGreaterThan(8);
  for (const href of hrefs) {
    const response = await request.get(href, { timeout: 45_000 });
    expect(response.status(), href).toBeLessThan(400);
  }
});
