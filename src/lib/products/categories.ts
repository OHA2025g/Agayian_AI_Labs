export const PRODUCT_FILTER_CATEGORIES = [
  "Audit, Risk and Compliance",
  "Government Intelligence",
  "Enterprise Revenue and Operations",
  "Talent and Workforce",
] as const;

export type ProductFilterCategory = (typeof PRODUCT_FILTER_CATEGORIES)[number];

export const PRODUCT_CATEGORY_OPTIONS = PRODUCT_FILTER_CATEGORIES.map(
  (value) => ({ label: value, value }),
);

export const PRODUCT_CATEGORY_BUYERS: Record<ProductFilterCategory, string> = {
  "Audit, Risk and Compliance":
    "CFO, Chief Audit Executive, compliance and government revenue leaders",
  "Government Intelligence":
    "Department heads, commissioners and programme offices",
  "Enterprise Revenue and Operations":
    "Revenue, sales, operations and transformation leaders",
  "Talent and Workforce":
    "HR, talent acquisition and business leadership",
};

/** Defaults for existing catalogue slugs when CMS categories are still empty. */
export const DEFAULT_PRODUCT_CATEGORIES: Record<
  string,
  ProductFilterCategory[]
> = {
  "onetouch-audit": ["Audit, Risk and Compliance"],
  "legal-intent-stamp-duty-integrity": ["Audit, Risk and Compliance"],
  "ai-governance-command-centre": ["Audit, Risk and Compliance"],
  "document-intelligence-copilot": [
    "Audit, Risk and Compliance",
    "Enterprise Revenue and Operations",
  ],
  "wcd-intelligence": ["Government Intelligence"],
  "maha-geo-rr": ["Government Intelligence"],
  "pmu-eit-ai-dashboard": ["Government Intelligence"],
  "revenue-intelligence": ["Government Intelligence"],
  "enterprise-decision-intelligence": ["Enterprise Revenue and Operations"],
  "autonomous-revenue-os": ["Enterprise Revenue and Operations"],
  "marketing-engine": ["Enterprise Revenue and Operations"],
  "sales-engine": ["Enterprise Revenue and Operations"],
  "voice-agent": ["Enterprise Revenue and Operations"],
  "smart-hiring": ["Talent and Workforce"],
  "bhritak-ai": ["Talent and Workforce"],
  "chayanix-ai": ["Talent and Workforce"],
};

function isFilterCategory(value: string): value is ProductFilterCategory {
  return (PRODUCT_FILTER_CATEGORIES as readonly string[]).includes(value);
}

export function normalizeProductCategories(
  value: unknown,
  slug?: string,
): ProductFilterCategory[] {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string" && value.trim()
      ? [value]
      : [];
  const matched = [
    ...new Set(raw.map((item) => String(item).trim()).filter(Boolean)),
  ].filter(isFilterCategory);
  if (matched.length) return matched;
  if (Array.isArray(value) && value.length === 0) return [];
  if (slug && DEFAULT_PRODUCT_CATEGORIES[slug]) {
    return [...DEFAULT_PRODUCT_CATEGORIES[slug]];
  }
  return [];
}
