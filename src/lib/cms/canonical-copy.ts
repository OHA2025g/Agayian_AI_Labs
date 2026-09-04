export const CAPABILITIES_STACK_ACTIVITIES = [
  { label: "Executive intent", mark: "intent" },
  { label: "Strategy & roadmap", mark: "strategy" },
  { label: "Data foundation", mark: "data" },
  { label: "AI modalities", mark: "modalities" },
  { label: "Governance & risk", mark: "governance" },
  { label: "Engineering & integration", mark: "product-engineering" },
  { label: "Managed operations", mark: "managed-services" },
] as const;

export const CAPABILITIES_JOURNEY_LABELS = [
  { label: "AI Strategy & Consulting", href: "#strategy" },
  { label: "Data & Analytics", href: "#data" },
  { label: "Generative AI", href: "#generative-ai" },
  { label: "Agentic AI", href: "#agentic-ai" },
  { label: "AI Governance", href: "#governance" },
  { label: "AI Product Engineering", href: "#product-engineering" },
  { label: "AI Managed Services", href: "#managed-services" },
] as const;

export const CAPABILITIES_PAGE_COPY = {
  status: "published" as const,
  hero: {
    title: "Capabilities",
    subheadLine1: "From strategy to governed",
    subheadLine2: "production systems",
    body: "Seven integrated capability layers connect ambition, data foundations, AI modalities, governance, engineering and managed operations.",
    primaryCtaLabel: "Book a Consultation",
    primaryCtaHref: "/contact?interest=consultation",
    secondaryCtaLabel: "Explore Related Products",
    secondaryCtaHref: "/products",
  },
  journeyLabels: CAPABILITIES_JOURNEY_LABELS.map((item) => ({ ...item })),
  stackActivities: CAPABILITIES_STACK_ACTIVITIES.map((item) => ({ ...item })),
  seo: {
    title: "Capabilities",
    description:
      "Explore Agrayian AI Labs capabilities spanning AI strategy, Centres of Excellence, governance, generative and agentic AI, data and analytics, product engineering and managed services.",
  },
};

export function canonicalGlobalCopy(slug: string) {
  switch (slug) {
    case "capabilities-page":
      return CAPABILITIES_PAGE_COPY;
    default:
      return null;
  }
}
