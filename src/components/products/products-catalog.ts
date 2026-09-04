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
    categories: ["Financial Services"],
  },
  {
    slug: "smart-hiring",
    name: "vedhire.ai",
    description:
      "AI-driven hiring intelligence for talent discovery, screening and fitment.",
    visual: "vedhire",
    categories: ["Talent"],
  },
  {
    slug: "wcd-intelligence",
    name: "Women & Child Development Intelligence",
    description:
      "Data-driven programmes that enable targeted interventions and measurable impact.",
    visual: "social",
    categories: ["Government"],
  },
  {
    slug: "ai-governance-command-centre",
    name: "AI Governance Command Centre",
    description:
      "Real-time visibility, policy enforcement and risk oversight at enterprise scale.",
    visual: "governance",
    categories: ["Governance"],
  },
  {
    slug: "enterprise-decision-intelligence",
    name: "Enterprise Decision Intelligence",
    description:
      "Unified data intelligence that powers confident, timely and accountable decisions.",
    visual: "decision",
    categories: ["Decision Intelligence"],
  },
  {
    slug: "document-intelligence-copilot",
    name: "Document Intelligence Copilot",
    description:
      "AI copilot that reads, understands and acts on documents across formats.",
    visual: "document",
    categories: ["Decision Intelligence"],
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

export function catalogForCategory(category: ProductCategory) {
  const filtered =
    category === "All"
      ? productsCatalog
      : productsCatalog.filter((product) =>
          product.categories.includes(category),
        );
  const preferred = categorySpotlights[category];
  const lead = filtered.filter((product) => product.slug === preferred);
  const rest = filtered.filter((product) => product.slug !== preferred);
  return [...lead, ...rest];
}
