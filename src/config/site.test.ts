import { describe, expect, it } from "vitest";
import { replaceRetiredContactEmail, siteConfig } from "@/config/site";

describe("replaceRetiredContactEmail", () => {
  it("replaces the retired placeholder with the official address", () => {
    expect(replaceRetiredContactEmail("hello@agrayian.ai")).toBe(
      siteConfig.contactEmail,
    );
    expect(
      replaceRetiredContactEmail("Email hello@agrayian.ai for help."),
    ).toBe(`Email ${siteConfig.contactEmail} for help.`);
    expect(replaceRetiredContactEmail("aghoreshwar@agrayianailabs.com")).toBe(
      siteConfig.contactEmail,
    );
  });

  it("leaves any other address unchanged", () => {
    expect(replaceRetiredContactEmail("editor@example.com")).toBe(
      "editor@example.com",
    );
  });
});
