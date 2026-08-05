import { describe, expect, it } from "vitest";
import { newsletterSchema } from "@/lib/newsletter-schema";

describe("newsletterSchema", () => {
  it("accepts a valid email", () => {
    expect(
      newsletterSchema.safeParse({ email: "leader@example.com", website: "" })
        .success,
    ).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(
      newsletterSchema.safeParse({ email: "not-an-email", website: "" }).success,
    ).toBe(false);
  });
});
