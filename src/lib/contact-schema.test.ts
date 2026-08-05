import { describe, expect, it } from "vitest";
import { contactSchema, resolveInterestFromQuery } from "@/lib/contact-schema";

const valid = {
  fullName: "Ada Lovelace",
  workEmail: "ada@example.com",
  phone: "+91 98765 43210",
  organisation: "Analytical Engines",
  designation: "Director",
  country: "India",
  areaOfInterest: "AI consultation" as const,
  projectSummary:
    "We need help designing a governed AI roadmap for enterprise operations.",
  preferredContactMethod: "Email" as const,
  consent: true,
  website: "",
};

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects short project summaries", () => {
    const result = contactSchema.safeParse({
      ...valid,
      projectSummary: "Too short",
    });
    expect(result.success).toBe(false);
  });

  it("requires consent", () => {
    const result = contactSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
  });
});

describe("resolveInterestFromQuery", () => {
  it("maps query aliases", () => {
    expect(resolveInterestFromQuery("coe")).toBe("AI CoE");
    expect(resolveInterestFromQuery("demo")).toBe("Product demonstration");
  });
});
