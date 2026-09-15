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
  { label: "AI Strategy", href: "#strategy" },
  { label: "Data Modernisation", href: "#data" },
  { label: "Generative AI and RAG", href: "#generative-ai" },
  { label: "Agentic Workflow Automation", href: "#agentic-ai" },
  { label: "AI Governance", href: "#governance" },
  { label: "Product Engineering", href: "#product-engineering" },
  { label: "AI Managed Services", href: "#managed-services" },
] as const;

export const CAPABILITIES_PAGE_COPY = {
  status: "published" as const,
  hero: {
    title: "Capabilities",
    subheadLine1: "From strategy to governed",
    subheadLine2: "production systems",
    body: "Delivery capability explained through business outcomes: AI strategy, data modernisation, generative AI and RAG, agentic workflow automation, document intelligence, predictive analytics, AI governance and product engineering.",
    primaryCtaLabel: "Discuss Your AI Initiative",
    primaryCtaHref: "/contact?interest=consultation",
    secondaryCtaLabel: "Explore Our Solutions",
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
