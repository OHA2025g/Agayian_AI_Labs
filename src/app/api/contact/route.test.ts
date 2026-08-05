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
  mapInterestToEnquiryType: (interest?: string) =>
    interest?.toLowerCase().includes("demo") ? "demo" : "contact",
}));

import { POST } from "@/app/api/contact/route";

const baseBody = {
  fullName: "Ada Lovelace",
  workEmail: "ada@example.com",
  phone: "+91 98765 43210",
  organisation: "Analytical Engines",
  designation: "Director",
  country: "India",
  areaOfInterest: "AI consultation",
  projectSummary:
    "We need help designing a governed AI roadmap for enterprise operations.",
  preferredContactMethod: "Email",
  consent: true,
  website: "",
};

function request(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.10",
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    __resetMemoryRateLimitForTests();
    vi.clearAllMocks();
  });

  it("returns validation errors for incomplete payloads", async () => {
    const response = await POST(request({ workEmail: "bad" }));
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it("returns silent success for honeypot submissions", async () => {
    const response = await POST(request({ ...baseBody, website: "http://spam" }));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it("rate limits repeated submissions", async () => {
    for (let i = 0; i < 5; i += 1) {
      const response = await POST(request(baseBody));
      // 503 when mail not configured after passing rate limit
      expect([200, 503]).toContain(response.status);
    }
    const limited = await POST(request(baseBody));
    expect(limited.status).toBe(429);
  });
});
