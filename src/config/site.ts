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
    "Agrayian AI Labs helps enterprises and governments design, govern and deploy responsible AI systems that transform data into decisions, automation and measurable impact.",
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
    "Agrayian AI Labs helps enterprises and governments establish AI capabilities, govern intelligent systems and build products that transform complex data into decisions and action.",
  tagline: "Growth reimagined with AI",
  eyebrow: "ENTERPRISE AI · GOVERNMENT AI · RESPONSIBLE INTELLIGENCE",
  headline: "Growth reimagined with AI",
  headlineLines: ["Growth reimagined with AI"] as const,
  supporting:
    "Agrayian AI Labs helps enterprises and governments establish AI capabilities, govern intelligent systems and build products that transform complex data into decisions and action.",
  primaryCta: "Book a Consultation",
  secondaryCta: "Explore Our Capabilities",
  productsCta: "Explore Our AI Portfolio",
  trustStatement:
    "Strategy to scale. Governance by design. Human accountability throughout.",
  announcement:
    "Building Responsible AI Systems for Enterprises and Government",
} as const;

/** Featured product laboratory set (all products remain in catalog/filters). */
export const laboratoryProductSlugs = [
  "smart-hiring",
  "wcd-intelligence",
  "onetouch-audit",
  "ai-governance-command-centre",
] as const;
