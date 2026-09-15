import {
  DEFAULT_PRODUCT_CATEGORIES,
  PRODUCT_FILTER_CATEGORIES,
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

export type ProductCategory = "All" | (typeof PRODUCT_FILTER_CATEGORIES)[number];

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
    slug: "legal-intent-stamp-duty-integrity",
    name: "Agentic Legal-Intent and Stamp-Duty Integrity System",
    description:
      "Governed legal-intent and stamp-duty integrity for high-volume document and revenue workflows.",
    visual: "audit",
    categories: DEFAULT_PRODUCT_CATEGORIES["legal-intent-stamp-duty-integrity"],
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
    slug: "document-intelligence-copilot",
    name: "Document Intelligence Copilot",
    description:
      "AI copilot that reads, understands and acts on documents across formats.",
    visual: "document",
    categories: DEFAULT_PRODUCT_CATEGORIES["document-intelligence-copilot"],
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
    slug: "maha-geo-rr",
    name: "Maha Geo-RR",
    description:
      "Geospatial intelligence for government programme visibility and field execution.",
    visual: "social",
    categories: DEFAULT_PRODUCT_CATEGORIES["maha-geo-rr"],
  },
  {
    slug: "pmu-eit-ai-dashboard",
    name: "PMU and EIT&AI Dashboard",
    description:
      "Programme and EIT&AI dashboards for department heads and commissioners.",
    visual: "decision",
    categories: DEFAULT_PRODUCT_CATEGORIES["pmu-eit-ai-dashboard"],
  },
  {
    slug: "revenue-intelligence",
    name: "Revenue Intelligence",
    description:
      "Government revenue intelligence for leakage, recovery and collection oversight.",
    visual: "decision",
    categories: DEFAULT_PRODUCT_CATEGORIES["revenue-intelligence"],
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
    slug: "autonomous-revenue-os",
    name: "Autonomous Revenue OS",
    description:
      "An operating system for revenue teams to plan, execute and govern growth workflows.",
    visual: "decision",
    categories: DEFAULT_PRODUCT_CATEGORIES["autonomous-revenue-os"],
  },
  {
    slug: "marketing-engine",
    name: "Marketing Engine",
    description:
      "Governed marketing intelligence that connects campaigns to measurable pipeline.",
    visual: "decision",
    categories: DEFAULT_PRODUCT_CATEGORIES["marketing-engine"],
  },
  {
    slug: "sales-engine",
    name: "Sales Engine",
    description:
      "Sales workflow intelligence for forecasting, coaching and execution control.",
    visual: "decision",
    categories: DEFAULT_PRODUCT_CATEGORIES["sales-engine"],
  },
  {
    slug: "voice-agent",
    name: "Voice Agent",
    description:
      "Human-controlled voice agents for high-volume operational conversations.",
    visual: "document",
    categories: DEFAULT_PRODUCT_CATEGORIES["voice-agent"],
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
    slug: "bhritak-ai",
    name: "Bhritak.ai",
    description:
      "Workforce intelligence for staffing, capability mapping and workforce planning.",
    visual: "vedhire",
    categories: DEFAULT_PRODUCT_CATEGORIES["bhritak-ai"],
  },
  {
    slug: "chayanix-ai",
    name: "chayanix.ai",
    description:
      "Selection intelligence that supports consistent, reviewable hiring decisions.",
    visual: "vedhire",
    categories: DEFAULT_PRODUCT_CATEGORIES["chayanix-ai"],
  },
];

export const productCategories: ProductCategory[] = [
  "All",
  ...PRODUCT_FILTER_CATEGORIES,
];

/** First slide when a category has more than one product. */
export const categorySpotlights = {
  All: "onetouch-audit",
  "Audit, Risk and Compliance": "onetouch-audit",
  "Government Intelligence": "maha-geo-rr",
  "Enterprise Revenue and Operations": "autonomous-revenue-os",
  "Talent and Workforce": "smart-hiring",
} as const satisfies Record<ProductCategory, string>;

export const SPOTLIGHT_CAROUSEL_MS = 5500;

function visualForSlug(slug: string): ProductVisual {
  const known = productsCatalog.find((product) => product.slug === slug);
  if (known) return known.visual;
  if (
    slug.includes("audit") ||
    slug.includes("legal") ||
    slug.includes("stamp")
  ) {
    return "audit";
  }
  if (
    slug.includes("hire") ||
    slug.includes("talent") ||
    slug.includes("bhritak") ||
    slug.includes("chayanix")
  ) {
    return "vedhire";
  }
  if (slug.includes("govern")) return "governance";
  if (slug.includes("document") || slug.includes("voice")) return "document";
  if (
    slug.includes("wcd") ||
    slug.includes("child") ||
    slug.includes("maha") ||
    slug.includes("geo")
  ) {
    return "social";
  }
  return "decision";
}

export function catalogFromCms(items: Product[]): CatalogProduct[] {
  const liveBySlug = new Map(items.map((item) => [item.slug, item]));

  const fromCatalog = productsCatalog.map((product) => {
    const live = liveBySlug.get(product.slug);
    const categories = normalizeProductCategories(
      live?.categories?.length ? live.categories : live?.category,
    );
    return {
      ...product,
      categories: categories.length ? categories : product.categories,
    };
  });

  const extras = items
    .filter((item) => !productsCatalog.some((product) => product.slug === item.slug))
    .map((item) => ({
      slug: item.slug,
      name: item.name,
      description: item.shortDescription,
      visual: visualForSlug(item.slug),
      categories: normalizeProductCategories(
        item.categories?.length ? item.categories : item.category,
      ),
    }));

  return [...fromCatalog, ...extras];
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
