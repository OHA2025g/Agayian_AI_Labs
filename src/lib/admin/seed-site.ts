import type { Payload } from "payload";
import { products } from "@/data/products";
import { capabilities } from "@/data/capabilities";
import { industries } from "@/data/industries";
import { impactStories } from "@/data/impactStories";
import { insights } from "@/data/insights";
import { companyIntro, companyValues } from "@/data/company";
import {
  defaultHeaderCta,
  footerCapabilities,
  footerCompany,
  footerIndustries,
  footerLegal,
  footerProducts,
  footerResources,
  mainNavigation,
} from "@/data/navigation";
import { brandCopy, siteConfig } from "@/config/site";
import { mongoUrlMissingDatabasePath, rawMongoUrl } from "@/lib/cms/mongo-env";
import { consultationFlow } from "@/lib/contact-schema";
import { legalByGlobal } from "@/data/legal";
import { importHardcodedPageCopy } from "../../scripts/import-page-copy";

async function upsertBySlug(
  payload: Payload,
  collection:
    | "products"
    | "capabilities"
    | "industries"
    | "impact-stories"
    | "insights",
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs[0]) {
    await payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    });
    return;
  }
  await payload.create({
    collection,
    data: { slug, ...data },
    draft: false,
    overrideAccess: true,
  });
}

export function publicWebsiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return siteConfig.websiteUrl;
}

export function databaseUriMissingName(uri?: string) {
  if (process.env.DB_NAME?.trim() && uri === undefined) {
    return false;
  }
  return mongoUrlMissingDatabasePath(uri ?? rawMongoUrl());
}

export async function seedSiteContent(payload: Payload) {
  for (const product of products) {
    await upsertBySlug(payload, "products", product.slug, {
      name: product.name,
      category: product.category,
      shortDescription: product.shortDescription,
      valueProposition: product.valueProposition,
      businessProblem: product.businessProblem,
      solutionOverview: product.solutionOverview,
      industries: product.industries,
      technologies: product.technologies,
      targetUsers: product.targetUsers,
      capabilities: product.capabilities,
      modules: product.modules,
      workflow: product.workflow,
      dataSources: product.dataSources,
      aiCapabilities: product.aiCapabilities,
      governance: product.governance,
      architecture: product.architecture,
      deploymentOptions: product.deploymentOptions,
      outcomes: product.outcomes,
      relatedCapabilities: product.relatedCapabilities,
      featured: product.featured,
      productStatus: product.status,
      status: "published",
      publishedAt: new Date().toISOString(),
    });
  }

  for (const capability of capabilities) {
    await upsertBySlug(payload, "capabilities", capability.slug, {
      name: capability.name,
      shortName: capability.shortName,
      icon: capability.icon,
      summary: capability.summary,
      description: capability.description,
      businessChallenge: capability.businessChallenge,
      deliverables: capability.deliverables,
      engagementActivities: capability.engagementActivities,
      typicalDeliverables: capability.typicalDeliverables,
      useCases: capability.useCases,
      outcomes: capability.outcomes,
      relatedProducts: capability.relatedProducts,
      topics: capability.topics,
      status: "published",
      publishedAt: new Date().toISOString(),
    });
  }

  for (const industry of industries) {
    await upsertBySlug(payload, "industries", industry.slug, {
      name: industry.name,
      summary: industry.summary,
      challenges: industry.challenges,
      opportunities: industry.opportunities,
      capabilities: industry.capabilities,
      products: industry.products,
      workflows: industry.workflows,
      governance: industry.governance,
      outcomes: industry.outcomes,
      status: "published",
      publishedAt: new Date().toISOString(),
    });
  }

  for (const story of impactStories) {
    await upsertBySlug(payload, "impact-stories", story.slug, {
      title: story.title,
      clientLabel: story.clientLabel,
      industry: story.industry,
      capability: story.capability,
      solutionType: story.solutionType,
      outcomeCategory: story.outcomeCategory,
      challenge: story.challenge,
      context: story.context,
      approach: story.approach,
      architecture: story.architecture,
      governance: story.governance,
      outcomes: story.outcomes,
      relatedProducts: story.relatedProducts,
      relatedCapabilities: story.relatedCapabilities,
      status: "published",
      publishedAt: new Date().toISOString(),
    });
  }

  for (const insight of insights) {
    await upsertBySlug(payload, "insights", insight.slug, {
      title: insight.title,
      excerpt: insight.excerpt,
      category: insight.category,
      type: insight.type,
      author: insight.author,
      readingTime: insight.readingTime,
      featured: Boolean(insight.featured),
      bodyParagraphs: insight.body.map((text) => ({ text })),
      status: "published",
      publishedAt: insight.publishedAt,
    });
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      websiteUrl: publicWebsiteUrl(),
      description: siteConfig.description,
      contactEmail: siteConfig.contactEmail,
      contactPhone: siteConfig.contactPhone,
      address: siteConfig.address,
      socialLinks: siteConfig.socialLinks,
      seoDefaults: {
        title: `${siteConfig.name} | Responsible AI`,
        description: brandCopy.supporting,
      },
      announcement: {
        enabled: false,
        message: brandCopy.announcement,
        href: "/ai-centre-of-excellence",
        ctaLabel: "Explore AI CoE",
      },
      marketing: {
        defaultUtmSource: "agrayian.ai",
      },
      cookie: {
        title: "Cookie preferences",
        description:
          "Essential cookies keep the site working. Accept all to load Vercel Analytics and Speed Insights.",
      },
      brandCopy: {
        headline: brandCopy.headline,
        supporting: brandCopy.supporting,
        primaryCta: brandCopy.primaryCta,
        secondaryCta: brandCopy.secondaryCta,
      },
    },
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "navigation",
    data: {
      main: mainNavigation,
      primaryCta: {
        label: defaultHeaderCta.label,
        href: defaultHeaderCta.href,
      },
      footerCapabilities,
      footerProducts,
      footerIndustries,
      footerCompany,
      footerResources,
      footerLegal,
    },
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "company-page",
    data: {
      vision: companyIntro.vision,
      mission: companyIntro.mission,
      introduction: companyIntro.introduction,
      whyAgrayian: companyIntro.whyAgrayian,
      deliveryPhilosophy: companyIntro.deliveryPhilosophy,
      responsibleAiCommitment: companyIntro.responsibleAiCommitment,
      technologyPhilosophy: companyIntro.technologyPhilosophy,
      careersCopy: companyIntro.careers,
      partnerEcosystemCopy: companyIntro.partnerEcosystem,
      values: companyValues,
      status: "published",
    },
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "contact-page",
    data: {
      title: "Book a consultation",
      description:
        "Tell us about your AI ambition, governance needs or product interest.",
      enquiryThemes: [
        "AI consultation and strategy",
        "AI Centre of Excellence design",
        "AI governance and responsible AI",
        "Product demonstration",
        "Government and enterprise programmes",
        "Partnership discussions",
      ],
      consultationFlow,
      status: "published",
    },
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "home-page",
    data: {
      status: "published",
      sectionTheme: "dark",
      animationPreset: "fade_up",
      hero: {
        eyebrow: brandCopy.eyebrow,
        headlineLine1: brandCopy.headlineLines[0],
        headlineLine2: brandCopy.headlineLines[1] ?? "",
        supporting:
          "We help enterprises and governments turn complex data into responsible AI systems, measurable decisions and action.",
        primaryCtaLabel: brandCopy.primaryCta,
        primaryCtaHref: "/contact?interest=consultation",
        secondaryCtaLabel: brandCopy.secondaryCta,
        secondaryCtaHref: "/capabilities",
        trustLine: brandCopy.trustStatement,
      },
      layout: [],
    },
    overrideAccess: true,
  });

  for (const [slug, doc] of Object.entries(legalByGlobal)) {
    await payload.updateGlobal({
      slug: slug as keyof typeof legalByGlobal,
      data: {
        title: doc.title,
        description: doc.description,
        sections: doc.sections,
        status: "published",
      },
      overrideAccess: true,
    });
  }

  await importHardcodedPageCopy(payload);

  const campaignExisting = await payload.find({
    collection: "campaigns",
    where: { code: { equals: "consult-linkedin" } },
    limit: 1,
    overrideAccess: true,
  });
  if (!campaignExisting.docs[0]) {
    await payload.create({
      collection: "campaigns",
      data: {
        name: "Consultation — LinkedIn",
        code: "consult-linkedin",
        channel: "linkedin",
        status: "planned",
        objective: "Invite enterprise and government readers to a consultation.",
        landingUrl: "/contact?interest=consultation",
        utmSource: "linkedin",
        utmMedium: "social",
        utmCampaign: "consult-linkedin",
      },
      overrideAccess: true,
    });
  }

  const calendarExisting = await payload.find({
    collection: "content-calendar",
    where: { title: { equals: "Responsible AI operating model" } },
    limit: 1,
    overrideAccess: true,
  });
  if (!calendarExisting.docs[0]) {
    await payload.create({
      collection: "content-calendar",
      data: {
        title: "Responsible AI operating model",
        channel: "linkedin",
        status: "idea",
        copy: "Draft a LinkedIn note on how a CoE makes responsible AI operational.",
      },
      overrideAccess: true,
    });
  }

  return {
    products: products.length,
    capabilities: capabilities.length,
    industries: industries.length,
    impactStories: impactStories.length,
    insights: insights.length,
  };
}
