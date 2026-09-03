import { mockupAssets } from "@/config/mockup-assets";

export type InsightSculptureAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const insightSculptures = {
  heroBook: {
    src: mockupAssets.insightsHeroBookGlow,
    width: 970,
    height: 547,
    alt: "Open knowledge book of frameworks, notes and governance signals",
  },
  featuredStack: {
    src: mockupAssets.insightsFeaturedStack,
    width: 847,
    height: 734,
    alt: "Layered agentic operating stack from value outcomes to infrastructure",
  },
  governanceModel: {
    src: mockupAssets.insightsCardGovernanceModel,
    width: 878,
    height: 697,
    alt: "Governed operating model with a central shield and orbital controls",
  },
  governanceGuide: {
    src: mockupAssets.insightsCardGovernanceGuide,
    width: 807,
    height: 727,
    alt: "Institutional governance shield with surrounding accountability nodes",
  },
  coe: {
    src: mockupAssets.insightsCardCoe,
    width: 843,
    height: 710,
    alt: "Centre of Excellence building blocks as stacked glass cubes",
  },
  strategy: {
    src: mockupAssets.insightsCardStrategy,
    width: 999,
    height: 686,
    alt: "Operating strategy network connecting people, process and platforms",
  },
  government: {
    src: mockupAssets.insightsCardGovernment,
    width: 978,
    height: 668,
    alt: "Public-sector decision intelligence over a civic institution",
  },
  talent: {
    src: mockupAssets.insightsCardTalent,
    width: 996,
    height: 746,
    alt: "Talent network of people connected through a governed centre",
  },
  audit: {
    src: mockupAssets.insightsCardAudit,
    width: 1002,
    height: 708,
    alt: "Audit and evidence workflow across people, documents and controls",
  },
  ctaShield: {
    src: mockupAssets.insightsCtaShield,
    width: 854,
    height: 574,
    alt: "Governed assurance shield connecting strategy through operate",
  },
} as const satisfies Record<string, InsightSculptureAsset>;

export const insightListingOrder = [
  "building-an-enterprise-ai-governance-operating-model",
  "ai-governance-guide-for-accountable-institutions",
  "ai-centre-of-excellence-framework",
  "ai-strategy-that-survives-contact-with-operations",
  "decision-intelligence-for-government-transformation",
  "responsible-ai-in-talent-and-hr-technology",
  "ai-assisted-audit-and-compliance-without-losing-control",
] as const;

const sculptureBySlug: Record<string, InsightSculptureAsset> = {
  "building-an-enterprise-ai-governance-operating-model":
    insightSculptures.governanceModel,
  "ai-governance-guide-for-accountable-institutions":
    insightSculptures.governanceGuide,
  "ai-centre-of-excellence-framework": insightSculptures.coe,
  "ai-strategy-that-survives-contact-with-operations":
    insightSculptures.strategy,
  "decision-intelligence-for-government-transformation":
    insightSculptures.government,
  "responsible-ai-in-talent-and-hr-technology": insightSculptures.talent,
  "ai-assisted-audit-and-compliance-without-losing-control":
    insightSculptures.audit,
  "operationalizing-responsible-ai-in-the-enterprise":
    insightSculptures.governanceModel,
  "governance-frameworks-for-the-age-of-ai": insightSculptures.governanceGuide,
  "from-data-to-decisions-the-enterprise-ai-playbook":
    insightSculptures.strategy,
  "agentic-ai-building-systems-that-act-with-accountability":
    insightSculptures.featuredStack,
  "agentic-ai-from-demos-to-governed-operating-systems":
    insightSculptures.featuredStack,
};

const fallbackThumbs = [
  insightSculptures.governanceModel,
  insightSculptures.governanceGuide,
  insightSculptures.coe,
  insightSculptures.strategy,
] as const;

export function insightSculptureForSlug(
  slug?: string,
  variant = 0,
): InsightSculptureAsset {
  if (slug && sculptureBySlug[slug]) return sculptureBySlug[slug];
  return fallbackThumbs[Math.abs(variant) % fallbackThumbs.length];
}
