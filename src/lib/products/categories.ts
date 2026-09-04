export const PRODUCT_FILTER_CATEGORIES = [
  "Government",
  "Financial Services",
  "Talent",
  "Governance",
  "Decision Intelligence",
] as const;

export type ProductFilterCategory = (typeof PRODUCT_FILTER_CATEGORIES)[number];

export const PRODUCT_CATEGORY_OPTIONS = PRODUCT_FILTER_CATEGORIES.map(
  (value) => ({ label: value, value }),
);

/** Defaults for existing catalogue slugs when CMS categories are still empty. */
export const DEFAULT_PRODUCT_CATEGORIES: Record<
  string,
  ProductFilterCategory[]
> = {
  "onetouch-audit": ["Financial Services"],
  "smart-hiring": ["Talent"],
  "wcd-intelligence": ["Government"],
  "ai-governance-command-centre": ["Governance"],
  "enterprise-decision-intelligence": ["Decision Intelligence"],
  "document-intelligence-copilot": ["Decision Intelligence"],
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
