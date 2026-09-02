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
    categories: ["Financial Services", "Governance"],
  },
  {
    slug: "smart-hiring",
    name: "vedhire.ai",
    description:
      "AI-driven hiring intelligence for talent discovery, screening and fitment.",
    visual: "vedhire",
    categories: ["Talent", "Decision Intelligence"],
  },
  {
    slug: "wcd-intelligence",
    name: "Women & Child Development Intelligence",
    description:
      "Data-driven programmes that enable targeted interventions and measurable impact.",
    visual: "social",
    categories: ["Government", "Decision Intelligence"],
  },
  {
    slug: "ai-governance-command-centre",
    name: "AI Governance Command Centre",
    description:
      "Real-time visibility, policy enforcement and risk oversight at enterprise scale.",
    visual: "governance",
    categories: ["Government", "Financial Services", "Governance"],
  },
  {
    slug: "enterprise-decision-intelligence",
    name: "Enterprise Decision Intelligence",
    description:
      "Unified data intelligence that powers confident, timely and accountable decisions.",
    visual: "decision",
    categories: ["Government", "Financial Services", "Decision Intelligence"],
  },
  {
    slug: "document-intelligence-copilot",
    name: "Document Intelligence Copilot",
    description:
      "AI copilot that reads, understands and acts on documents across formats.",
    visual: "document",
    categories: ["Government", "Financial Services", "Decision Intelligence"],
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
