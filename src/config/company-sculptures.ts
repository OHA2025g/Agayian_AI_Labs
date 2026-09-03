import { mockupAssets } from "@/config/mockup-assets";

export type CompanySculptureAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const companySculptures = {
  heroHub: {
    src: mockupAssets.companySculptHeroHub,
    width: 1024,
    height: 768,
    alt: "Glass hub connecting public systems, enterprise and human impact",
  },
  responsible: {
    src: mockupAssets.companySculptResponsible,
    width: 1024,
    height: 1024,
    alt: "Stacked glass cubes for responsible AI delivery",
  },
  technology: {
    src: mockupAssets.companySculptTechnology,
    width: 1024,
    height: 1024,
    alt: "Layered glass cubes for technology architecture",
  },
  partnership: {
    src: mockupAssets.companySculptPartnership,
    width: 1024,
    height: 1024,
    alt: "Interlocking glass pieces for partnership",
  },
  impact: {
    src: mockupAssets.companySculptImpact,
    width: 1024,
    height: 768,
    alt: "Hexagonal core connecting where Agrayian creates impact",
  },
} as const satisfies Record<string, CompanySculptureAsset>;
