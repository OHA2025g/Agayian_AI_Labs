import { describe, expect, it } from "vitest";
import {
  catalogFromCms,
  productsCatalog,
} from "@/components/products/products-catalog";
import {
  DEFAULT_PRODUCT_CATEGORIES,
  PRODUCT_FILTER_CATEGORIES,
  normalizeProductCategories,
} from "./categories";

describe("normalizeProductCategories", () => {
  it("keeps multiple valid portfolio groups", () => {
    expect(
      normalizeProductCategories([
        "Audit, Risk and Compliance",
        "Enterprise Revenue and Operations",
      ]),
    ).toEqual([
      "Audit, Risk and Compliance",
      "Enterprise Revenue and Operations",
    ]);
  });

  it("maps a leftover single string when it matches a filter", () => {
    expect(normalizeProductCategories("Government Intelligence")).toEqual([
      "Government Intelligence",
    ]);
  });

  it("falls back to the catalogue slug when the old label is not a filter", () => {
    expect(
      normalizeProductCategories("AI Products", "document-intelligence-copilot"),
    ).toEqual([
      "Audit, Risk and Compliance",
      "Enterprise Revenue and Operations",
    ]);
  });

  it("does not invent categories for an explicit empty list", () => {
    expect(normalizeProductCategories([], "onetouch-audit")).toEqual([]);
  });
});

describe("portfolio groups", () => {
  it("defines the four report groups", () => {
    expect([...PRODUCT_FILTER_CATEGORIES]).toEqual([
      "Audit, Risk and Compliance",
      "Government Intelligence",
      "Enterprise Revenue and Operations",
      "Talent and Workforce",
    ]);
  });

  it("places every catalog product in at least one group", () => {
    expect(productsCatalog).toHaveLength(16);
    for (const product of productsCatalog) {
      expect(product.categories.length).toBeGreaterThan(0);
      expect(
        product.categories.every((category) =>
          (PRODUCT_FILTER_CATEGORIES as readonly string[]).includes(category),
        ),
      ).toBe(true);
    }
  });

  it("keeps default mappings for all sixteen slugs", () => {
    expect(Object.keys(DEFAULT_PRODUCT_CATEGORIES)).toHaveLength(16);
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
        categories: [
          "Audit, Risk and Compliance",
          "Enterprise Revenue and Operations",
        ],
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
        status: "Demonstration",
      },
    ]);
    const copilot = catalog.find(
      (item) => item.slug === "document-intelligence-copilot",
    );
    expect(copilot?.categories).toEqual([
      "Audit, Risk and Compliance",
      "Enterprise Revenue and Operations",
    ]);
  });

  it("shows Document Intelligence under Audit when CMS says so", () => {
    const catalog = catalogFromCms([
      {
        id: "1",
        name: "Document Intelligence Copilot",
        slug: "document-intelligence-copilot",
        category: "AI Products",
        categories: [
          "Audit, Risk and Compliance",
          "Government Intelligence",
        ],
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
        status: "Demonstration",
      },
    ]);
    const audit = catalog.filter((item) =>
      item.categories.includes("Audit, Risk and Compliance"),
    );
    expect(audit.map((item) => item.slug)).toContain(
      "document-intelligence-copilot",
    );
    expect(audit.map((item) => item.slug)).toContain("onetouch-audit");
  });
});
