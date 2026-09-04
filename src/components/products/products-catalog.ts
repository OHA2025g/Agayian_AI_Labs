import {
  DEFAULT_PRODUCT_CATEGORIES,
  normalizeProductCategories,
} from "@/lib/products/categories";
import type { Product } from "@/types";

export type ProductVisual =
  | "audit"
  | "vedhire"
  | "social"
  | "governance"
  | "decision"
  | "document";

export type ProductCategory =
  | "All"
  | "Government"
  | "Financial Services"
  | "Talent"
  | "Governance"
  | "Decision Intelligence";

export type CatalogProduct = {
  slug: string;
  name: string;
  description: string;
  visual: ProductVisual;
  categories: ProductCategory[];
};

/** Mockup catalogue — display names and copy from the approved Products page. */
export const productsCatalog: CatalogProduct[] = [
  {
    slug: "onetouch-audit",
    name: "OneTouch Audit",
    description:
      "AI-powered audit automation for smarter, faster and evidence-driven assurance.",
    visual: "audit",
    categories: DEFAULT_PRODUCT_CATEGORIES["onetouch-audit"],
  },
  {
    slug: "smart-hiring",
    name: "vedhire.ai",
    description:
      "AI-driven hiring intelligence for talent discovery, screening and fitment.",
    visual: "vedhire",
    categories: DEFAULT_PRODUCT_CATEGORIES["smart-hiring"],
  },
  {
    slug: "wcd-intelligence",
    name: "Women & Child Development Intelligence",
    description:
      "Data-driven programmes that enable targeted interventions and measurable impact.",
    visual: "social",
    categories: DEFAULT_PRODUCT_CATEGORIES["wcd-intelligence"],
  },
  {
    slug: "ai-governance-command-centre",
    name: "AI Governance Command Centre",
    description:
      "Real-time visibility, policy enforcement and risk oversight at enterprise scale.",
    visual: "governance",
    categories: DEFAULT_PRODUCT_CATEGORIES["ai-governance-command-centre"],
  },
  {
    slug: "enterprise-decision-intelligence",
    name: "Enterprise Decision Intelligence",
    description:
      "Unified data intelligence that powers confident, timely and accountable decisions.",
    visual: "decision",
    categories: DEFAULT_PRODUCT_CATEGORIES["enterprise-decision-intelligence"],
  },
  {
    slug: "document-intelligence-copilot",
    name: "Document Intelligence Copilot",
    description:
      "AI copilot that reads, understands and acts on documents across formats.",
    visual: "document",
    categories: DEFAULT_PRODUCT_CATEGORIES["document-intelligence-copilot"],
  },
];

export const productCategories: ProductCategory[] = [
  "All",
  "Government",
  "Financial Services",
  "Talent",
  "Governance",
  "Decision Intelligence",
];

/** First slide when a category has more than one product. */
export const categorySpotlights = {
  All: "onetouch-audit",
  Government: "wcd-intelligence",
  "Financial Services": "onetouch-audit",
  Talent: "smart-hiring",
  Governance: "ai-governance-command-centre",
  "Decision Intelligence": "enterprise-decision-intelligence",
} as const satisfies Record<ProductCategory, string>;

export const SPOTLIGHT_CAROUSEL_MS = 5500;

function visualForSlug(slug: string): ProductVisual {
  const known = productsCatalog.find((product) => product.slug === slug);
  if (known) return known.visual;
  if (slug.includes("audit")) return "audit";
  if (slug.includes("hire") || slug.includes("talent")) return "vedhire";
  if (slug.includes("govern")) return "governance";
  if (slug.includes("document")) return "document";
  if (slug.includes("wcd") || slug.includes("child")) return "social";
  return "decision";
}

export function catalogFromCms(items: Product[]): CatalogProduct[] {
  const seen = new Set<string>();
  const merged: CatalogProduct[] = items.map((item) => {
    seen.add(item.slug);
    const fallback = productsCatalog.find((product) => product.slug === item.slug);
    const categories = normalizeProductCategories(
      item.categories?.length ? item.categories : item.category,
      item.slug,
    );
    return {
      slug: item.slug,
      name: fallback?.name ?? item.name,
      description: fallback?.description ?? item.shortDescription,
      visual: fallback?.visual ?? visualForSlug(item.slug),
      categories: categories.length ? categories : (fallback?.categories ?? []),
    };
  });

  for (const product of productsCatalog) {
    if (!seen.has(product.slug)) merged.push(product);
  }

  return merged;
}

export function catalogForCategory(
  category: ProductCategory,
  catalog: CatalogProduct[] = productsCatalog,
) {
  const filtered =
    category === "All"
      ? catalog
      : catalog.filter((product) => product.categories.includes(category));
  const preferred = categorySpotlights[category];
  const lead = filtered.filter((product) => product.slug === preferred);
  const rest = filtered.filter((product) => product.slug !== preferred);
  return [...lead, ...rest];
}
