import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstileToken } from "@/lib/turnstile";

describe("verifyTurnstileToken", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("fails closed in production when secret is unset", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");

    const result = await verifyTurnstileToken("token");
    expect(result.ok).toBe(false);
  });

  it("skips verification locally when secret is unset", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("VERCEL_ENV", "development");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");

    const result = await verifyTurnstileToken(undefined);
    expect(result.ok).toBe(true);
  });
});
