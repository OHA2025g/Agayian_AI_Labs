import { describe, expect, it } from "vitest";
import {
  canTransitionPublish,
  detectRedirectLoop,
  isUniqueSlug,
  rejectsResourcesLink,
  slugify,
  validateInternalHref,
} from "./validation";

describe("admin validation", () => {
  it("slugifies titles", () => {
    expect(slugify("Smart Hiring")).toBe("smart-hiring");
  });

  it("enforces unique slugs", () => {
    expect(isUniqueSlug("smart-hiring", ["onetouch-audit"], "smart-hiring")).toBe(
      true,
    );
    expect(isUniqueSlug("smart-hiring", ["smart-hiring"], undefined)).toBe(false);
  });

  it("blocks Resources nav labels and hrefs", () => {
    expect(rejectsResourcesLink("Resources", "/insights")).toBe(true);
    expect(rejectsResourcesLink("Insights", "/resources")).toBe(true);
    expect(rejectsResourcesLink("Insights", "/insights")).toBe(false);
  });

  it("detects redirect loops", () => {
    expect(
      detectRedirectLoop([
        { from: "/a", to: "/b" },
        { from: "/b", to: "/a" },
      ]),
    ).toBe(true);
    expect(
      detectRedirectLoop([
        { from: "/old", to: "/contact" },
        { from: "/legacy", to: "/company" },
      ]),
    ).toBe(false);
  });

  it("limits editor publish transitions", () => {
    expect(canTransitionPublish("draft", "published", false)).toBe(false);
    expect(canTransitionPublish("draft", "in_review", false)).toBe(true);
    expect(canTransitionPublish("draft", "published", true)).toBe(true);
  });

  it("rejects resources internal hrefs", () => {
    expect(validateInternalHref("/resources/old")).toBe(false);
    expect(validateInternalHref("/insights")).toBe(true);
  });
});
