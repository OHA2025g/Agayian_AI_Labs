import { describe, expect, it } from "vitest";
import { catalogFromCms } from "@/components/products/products-catalog";
import { normalizeProductCategories } from "./categories";

describe("normalizeProductCategories", () => {
  it("keeps multiple valid page categories", () => {
    expect(
      normalizeProductCategories(["Government", "Decision Intelligence"]),
    ).toEqual(["Government", "Decision Intelligence"]);
  });

  it("maps a leftover single string when it matches a filter", () => {
    expect(normalizeProductCategories("Governance")).toEqual(["Governance"]);
  });

  it("falls back to the catalogue slug when the old label is not a filter", () => {
    expect(
      normalizeProductCategories("AI Products", "document-intelligence-copilot"),
    ).toEqual(["Decision Intelligence"]);
  });

  it("does not invent categories for an explicit empty list", () => {
    expect(normalizeProductCategories([], "onetouch-audit")).toEqual([]);
  });
});

describe("catalogFromCms", () => {
  it("lets one CMS product appear in multiple page filters", () => {
    const catalog = catalogFromCms([
      {
        id: "1",
        name: "Document Intelligence Copilot",
        slug: "document-intelligence-copilot",
        category: "AI Products",
        categories: ["Decision Intelligence", "Government"],
        industries: [],
        technologies: [],
        shortDescription: "Reads documents.",
        valueProposition: "",
        businessProblem: "",
        solutionOverview: "",
        targetUsers: [],
        modules: [],
        capabilities: [],
        workflow: [],
        outcomes: [],
        featured: false,
        status: "Available for demonstration",
      },
    ]);
    const copilot = catalog.find(
      (item) => item.slug === "document-intelligence-copilot",
    );
    expect(copilot?.categories).toEqual([
      "Decision Intelligence",
      "Government",
    ]);
  });

  it("shows Document Intelligence under Government when CMS says so", () => {
    const catalog = catalogFromCms([
      {
        id: "1",
        name: "Document Intelligence Copilot",
        slug: "document-intelligence-copilot",
        category: "AI Products",
        categories: ["Decision Intelligence", "Government"],
        industries: [],
        technologies: [],
        shortDescription: "Reads documents.",
        valueProposition: "",
        businessProblem: "",
        solutionOverview: "",
        targetUsers: [],
        modules: [],
        capabilities: [],
        workflow: [],
        outcomes: [],
        featured: false,
        status: "Available for demonstration",
      },
    ]);
    const government = catalog.filter((item) =>
      item.categories.includes("Government"),
    );
    expect(government.map((item) => item.slug)).toContain(
      "document-intelligence-copilot",
    );
    expect(government.map((item) => item.slug)).toContain("wcd-intelligence");
  });
});
