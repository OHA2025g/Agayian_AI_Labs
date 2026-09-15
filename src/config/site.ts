export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  websiteUrl: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks: {
    linkedin?: string;
    youtube?: string;
    instagram?: string;
    x?: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Agrayian AI Labs",
  shortName: "Agrayian",
  description:
    "Agrayian AI Labs converts complex government, banking and enterprise workflows into secure, intelligent and measurable AI systems.",
  websiteUrl: "https://agrayian.ai",
  contactEmail: "hello@agrayian.ai",
  contactPhone: undefined,
  address: undefined,
  socialLinks: {
    linkedin: undefined,
    youtube: undefined,
    instagram: undefined,
    x: undefined,
  },
};

export const brandCopy = {
  positioning:
    "Agrayian AI Labs converts complex government, banking and enterprise workflows into secure, intelligent and measurable AI systems.",
  tagline: "Growth reimagined with AI",
  eyebrow: "GOVERNMENT · BANKING · ENTERPRISE AI",
  headline:
    "Build AI systems that improve decisions, control risk and accelerate execution.",
  headlineLines: [
    "Build AI systems that improve decisions,",
    "control risk and accelerate execution.",
  ] as const,
  supporting:
    "Agrayian AI Labs helps governments, banks and enterprises deploy practical AI, agentic automation and data intelligence into high-value operational workflows.",
  primaryCta: "Discuss Your AI Initiative",
  secondaryCta: "Explore Our Solutions",
  productsCta: "Explore Our Solutions",
  trustStatement:
    "Designed around real operational problems. Governed for enterprise and public-sector use. Built to move from pilot to production.",
  announcement:
    "Secure, intelligent and measurable AI systems for government, banking and enterprise workflows",
} as const;

/** Report page 3 — one narrative used across Company, About and sales material. */
export const messagingLayers = {
  whoWeAre: "An applied AI company for high-complexity institutions.",
  whatWeDo:
    "Design, build and deploy governed AI and agentic workflow systems.",
  whoWeServe:
    "Government, banking and financial services, manufacturing, conglomerates and public institutions.",
  whyUs:
    "Business-led problem definition, production-grade engineering, measurable outcomes and human-controlled AI.",
} as const;

export const positioningPoints = [
  "Designed around real operational problems",
  "Governed for enterprise and public-sector use",
  "Built to move from pilot to production",
  "Human-controlled and evidence-oriented",
  "Focused on measurable outcomes",
] as const;

/** Featured product laboratory set (all products remain in catalog/filters). */
export const laboratoryProductSlugs = [
  "onetouch-audit",
  "maha-geo-rr",
  "legal-intent-stamp-duty-integrity",
  "autonomous-revenue-os",
  "smart-hiring",
] as const;
