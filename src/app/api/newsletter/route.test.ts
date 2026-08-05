import { beforeEach, describe, expect, it, vi } from "vitest";
import { __resetMemoryRateLimitForTests } from "@/lib/rate-limit";

vi.mock("@/lib/mail", () => ({
  getResendClient: () => null,
  getContactToEmail: () => "hello@agrayian.ai",
  getMailFromAddress: () => "test@example.com",
  deliveryNotConfiguredResponse: () => ({
    success: false,
    message: "not configured",
  }),
}));

vi.mock("@/lib/turnstile", () => ({
  verifyTurnstileToken: vi.fn(async () => ({ ok: true })),
}));

vi.mock("@/lib/cms/persist-enquiry", () => ({
  persistEnquiry: vi.fn(async () => true),
  persistNewsletterSubscriber: vi.fn(async () => true),
}));

import { POST } from "@/app/api/newsletter/route";

const baseBody = {
  email: "ada@example.com",
  website: "",
};

function request(body: unknown, ip = "203.0.113.20") {
  return new Request("http://localhost/api/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    __resetMemoryRateLimitForTests();
    vi.clearAllMocks();
  });

  it("returns validation errors for invalid email", async () => {
    const response = await POST(request({ email: "not-an-email", website: "" }));
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it("returns silent success for honeypot submissions", async () => {
    const response = await POST(
      request({ email: "ada@example.com", website: "http://spam" }),
    );
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it("rate limits repeated submissions", async () => {
    for (let i = 0; i < 8; i += 1) {
      const response = await POST(request(baseBody));
      expect([200, 503]).toContain(response.status);
    }
    const limited = await POST(request(baseBody));
    expect(limited.status).toBe(429);
  });
});
