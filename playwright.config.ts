import { defineConfig, devices } from "@playwright/test";

// Only treat explicit CI markers as CI (avoids sticky empty/odd CI env values).
const isCI = process.env.CI === "true" || process.env.CI === "1";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? "github" : "list",
  timeout: 60_000,
  use: {
    baseURL: "http://localhost:3000",
    navigationTimeout: 60_000,
    trace: "on-first-retry",
  },
  webServer: {
    // CI already runs `npm run build` before e2e. Locally, build then start
    // unless a server is already running (reuseExistingServer).
    command: isCI ? "npm run start" : "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !isCI,
    timeout: 180_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
