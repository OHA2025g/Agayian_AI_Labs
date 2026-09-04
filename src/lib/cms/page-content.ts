import { cache } from "react";
import { brandCopy } from "@/config/site";
import { companyIntro, companyValues } from "@/data/company";
import { consultationFlow } from "@/lib/contact-schema";
import {
  CAPABILITIES_JOURNEY_LABELS,
  CAPABILITIES_STACK_ACTIVITIES,
} from "@/lib/cms/canonical-copy";
import { getPublishedGlobal } from "@/lib/cms/published";
import type { CompanyValue, FaqItem } from "@/types";

function asText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function asOptional(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asStringList(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const mapped = value
    .map((item) =>
      typeof item === "string"
        ? item
        : String((item as { text?: string }).text ?? ""),
    )
    .filter((item) => item.trim());
  return mapped.length ? mapped : fallback;
}

function relationSlugs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && "slug" in item) {
        return String((item as { slug?: unknown }).slug ?? "");
      }
      return "";
    })
    .filter(Boolean);
}

function asObjectArray<T>(
  value: unknown,
  fallback: T[],
  map: (item: Record<string, unknown>) => T | null,
): T[] {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const mapped = value
    .map((item) =>
      item && typeof item === "object"
        ? map(item as Record<string, unknown>)
        : null,
    )
    .filter((item): item is T => Boolean(item));
  return mapped.length ? mapped : fallback;
}

function asSeo(
  value: unknown,
  fallback: { title: string; description: string },
) {
  const seo = (value as Record<string, unknown> | undefined) ?? {};
  return {
    title: asText(seo.title, fallback.title),
    description: asText(seo.description, fallback.description),
  };
}

export type HomePageContent = {
  hero: {
    eyebrow: string;
    headline: string;
    supporting: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    trustLine: string;
  };
  sections: {
    ambition: string;
    products: string;
    industries: string;
    responsible: string;
    insights: string;
  };
  featuredProductSlugs: string[];
  featuredInsightSlugs: string[];
  cta: { title: string; description: string };
  flagshipOverrides: {
    slug: string;
    displayName: string;
    displayDescription?: string;
  }[];
  seo: { title: string; description: string };
};

const defaultHomeInsightSlugs = [
  "operationalizing-responsible-ai-in-the-enterprise",
  "from-data-to-decisions-the-enterprise-ai-playbook",
  "agentic-ai-building-systems-that-act-with-accountability",
  "governance-frameworks-for-the-age-of-ai",
];

export const getHomePageContent = cache(async (): Promise<HomePageContent> => {
  const doc = await getPublishedGlobal<Record<string, unknown>>("home-page");
  const hero = (doc?.hero as Record<string, unknown> | undefined) ?? {};
  const sections = (doc?.sections as Record<string, unknown> | undefined) ?? {};
  const cta = (doc?.finalCta as Record<string, unknown> | undefined) ?? {};
  const headline = [hero.headlineLine1, hero.headlineLine2]
    .filter((part): part is string => Boolean(asOptional(part)))
    .join(" ");

  return {
    hero: {
      eyebrow: asText(hero.eyebrow, brandCopy.eyebrow),
      headline: headline || asText(hero.headline, brandCopy.headline),
      supporting: asText(
        hero.supporting,
        "We help enterprises and governments turn complex data into responsible AI systems, measurable decisions and action.",
      ),
      primaryCtaLabel: asText(hero.primaryCtaLabel, brandCopy.primaryCta),
      primaryCtaHref: asText(hero.primaryCtaHref, "/contact?interest=consultation"),
      secondaryCtaLabel: asText(hero.secondaryCtaLabel, brandCopy.secondaryCta),
      secondaryCtaHref: asText(hero.secondaryCtaHref, "/capabilities"),
      trustLine: asText(hero.trustLine, brandCopy.trustStatement),
    },
    sections: {
      ambition: asText(sections.ambition, "From ambition to accountable intelligence"),
      products: asText(sections.products, "Flagship products"),
      industries: asText(sections.industries, "Industries we empower"),
      responsible: asText(sections.responsible, "Responsible AI by design"),
      insights: asText(sections.insights, "Insights that inspire"),
    },
    featuredProductSlugs: relationSlugs(doc?.featuredProducts),
    featuredInsightSlugs: (() => {
      const slugs = relationSlugs(doc?.featuredInsights);
      return slugs.length ? slugs : defaultHomeInsightSlugs;
    })(),
    cta: {
      title: asText(cta.title, "Ready to build governed intelligence?"),
      description: asText(
        cta.description,
        "Strategy to scale. Governance by design. Human accountability throughout.",
      ),
    },
    flagshipOverrides: asObjectArray(
      doc?.flagshipOverrides,
      [],
      (item) => {
        const slug = asOptional(item.slug);
        const displayName = asOptional(item.displayName);
        if (!slug || !displayName) return null;
        return {
          slug,
          displayName,
          displayDescription: asOptional(item.displayDescription),
        };
      },
    ),
    seo: asSeo(doc?.seo, {
      title: "Agrayian AI Labs",
      description: brandCopy.supporting,
    }),
  };
});

export type CoePageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  outcomesTitle: string;
  whatTitle: string;
  whatBody: string;
  whyTitle: string;
  whyBody: string;
  operatingTitle: string;
  operatingDescription: string;
  ideaTitle: string;
  ideaDescription: string;
  pillarsTitle: string;
  pillarsDescription: string;
  maturityTitle: string;
  maturityDescription: string;
  roadmapTitle: string;
  roadmapDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  layers: {
    number: string;
    title: string;
    description: string;
    icon: string;
  }[];
  outcomes: string[];
  whatFeatures: { title: string; detail: string; icon: string }[];
  whyFeatures: { title: string; detail: string; icon: string }[];
  intakeSteps: { title: string; description: string; icon: string }[];
  pillars: { title: string; description: string; icon: string }[];
  foundations: {
    title: string;
    description: string;
    icon: string;
    sculpture: string;
    items: string[];
  }[];
  maturity: { name: string; description: string; icon: string }[];
  roadmap: { name: string; description: string; icon: string }[];
  faqItems: { question: string; answer: string }[];
  seo: { title: string; description: string };
};

export const getCoePageContent = cache(async (): Promise<CoePageContent> => {
  const doc = await getPublishedGlobal<Record<string, unknown>>("coe-page");
  const hero = (doc?.hero as Record<string, unknown> | undefined) ?? {};
  const seoFallback = {
    title: "AI Centre of Excellence",
    description:
      "An operating model that makes AI repeatable — connect strategy, governance, platforms, talent and delivery so every use case stops restarting from zero.",
  };

  return {
    hero: {
      eyebrow: asText(hero.eyebrow, "AI Centre of Excellence"),
      title: asText(
        hero.title ?? doc?.title,
        "AI Centre of Excellence — An operating model that makes AI repeatable",
      ),
      description: asText(
        hero.description ?? doc?.description,
        "Connect strategy, governance, platforms, talent and delivery so every use case stops restarting from zero.",
      ),
      primaryCtaLabel: asText(hero.primaryCtaLabel, "Book a Consultation"),
      primaryCtaHref: asText(hero.primaryCtaHref, "/contact?interest=consultation"),
      secondaryCtaLabel: asText(hero.secondaryCtaLabel, "Explore the Operating Model"),
      secondaryCtaHref: asText(hero.secondaryCtaHref, "#operating-model"),
    },
    outcomesTitle: asText(doc?.outcomesTitle, "Core outcomes"),
    whatTitle: asText(doc?.whatTitle, "What an AI CoE is"),
    whatBody: asText(
      doc?.whatBody,
      "A cross-functional capability that sets direction, enables standards, funds the right work and accelerates delivery across the enterprise.",
    ),
    whyTitle: asText(doc?.whyTitle, "Why organisations need an AI CoE"),
    whyBody: asText(
      doc?.whyBody,
      "Without a centre of excellence, AI efforts remain inconsistent, costly and hard to sustain.",
    ),
    operatingTitle: asText(doc?.operatingTitle, "The AI CoE operating model"),
    operatingDescription: asText(
      doc?.operatingDescription,
      "Nine integrated layers that turn strategy into measurable value.",
    ),
    ideaTitle: asText(doc?.ideaTitle, "From idea to impact"),
    ideaDescription: asText(
      doc?.ideaDescription,
      "A governed intake and decision process that funds and scales the right work.",
    ),
    pillarsTitle: asText(doc?.pillarsTitle, "The CoE works on three pillars"),
    pillarsDescription: asText(
      doc?.pillarsDescription,
      "Three connected mandates that keep the model focused and outcomes-driven.",
    ),
    maturityTitle: asText(doc?.maturityTitle, "AI CoE maturity levels"),
    maturityDescription: asText(
      doc?.maturityDescription,
      "A progressive maturity journey to build capability and value over time.",
    ),
    roadmapTitle: asText(doc?.roadmapTitle, "Your roadmap to build and scale"),
    roadmapDescription: asText(
      doc?.roadmapDescription,
      "A phased approach tailored to your organisation's goals and context.",
    ),
    ctaTitle: asText(
      doc?.ctaTitle,
      "Build an AI CoE that delivers governed, measurable outcomes.",
    ),
    ctaDescription: asText(
      doc?.ctaDescription,
      "Partner with Agrayian AI Labs to design, build and scale your Centre of Excellence.",
    ),
    layers: asObjectArray(
      doc?.layers,
      [],
      (item) => {
        const title = asOptional(item.title);
        if (!title) return null;
        return {
          number: asText(item.number, ""),
          title,
          description: asText(item.description, ""),
          icon: asText(item.icon, "blocks"),
        };
      },
    ),
    outcomes: asStringList(doc?.outcomes, []),
    whatFeatures: asObjectArray(
      doc?.whatFeatures,
      [],
      (item) => {
        const title = asOptional(item.title);
        if (!title) return null;
        return {
          title,
          detail: asText(item.detail, ""),
          icon: asText(item.icon, "blocks"),
        };
      },
    ),
    whyFeatures: asObjectArray(
      doc?.whyFeatures,
      [],
      (item) => {
        const title = asOptional(item.title);
        if (!title) return null;
        return {
          title,
          detail: asText(item.detail, ""),
          icon: asText(item.icon, "blocks"),
        };
      },
    ),
    intakeSteps: asObjectArray(
      doc?.intakeSteps,
      [],
      (item) => {
        const title = asOptional(item.title);
        if (!title) return null;
        return {
          title,
          description: asText(item.description, ""),
          icon: asText(item.icon, "idea"),
        };
      },
    ),
    pillars: asObjectArray(
      doc?.pillars,
      [],
      (item) => {
        const title = asOptional(item.title);
        if (!title) return null;
        return {
          title,
          description: asText(item.description, ""),
          icon: asText(item.icon, "direct"),
        };
      },
    ),
    foundations: asObjectArray(
      doc?.foundations,
      [],
      (item) => {
        const title = asOptional(item.title);
        if (!title) return null;
        return {
          title,
          description: asText(item.description, ""),
          icon: asText(item.icon, "blocks"),
          sculpture: asText(item.sculpture, ""),
          items: asStringList(item.items, []),
        };
      },
    ),
    maturity: asObjectArray(
      doc?.maturity,
      [],
      (item) => {
        const name = asOptional(item.name);
        if (!name) return null;
        return {
          name,
          description: asText(item.description, ""),
          icon: asText(item.icon, "score"),
        };
      },
    ),
    roadmap: asObjectArray(
      doc?.roadmap,
      [],
      (item) => {
        const name = asOptional(item.name);
        if (!name) return null;
        return {
          name,
          description: asText(item.description, ""),
          icon: asText(item.icon, "scale"),
        };
      },
    ),
    faqItems: asObjectArray(
      doc?.faqItems,
      [],
      (item) => {
        const question = asOptional(item.question);
        const answer = asOptional(item.answer);
        if (!question || !answer) return null;
        return { question, answer };
      },
    ),
    seo: asSeo(doc?.seo, seoFallback),
  };
});

export type GovernancePageContent = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  pillarsTitle: string;
  raciTitle: string;
  raciDescription: string;
  commandTitle: string;
  commandDescription: string;
  engagementTitle: string;
  engagementDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  lifecycle: { label: string; icon: string }[];
  pillars: { title: string; description: string; icon: string }[];
  raciRows: { role: string; cells: string[] }[];
  engagementSteps: { title: string; description: string; icon: string }[];
  seo: { title: string; description: string };
};

export const getGovernancePageContent = cache(
  async (): Promise<GovernancePageContent> => {
    const doc = await getPublishedGlobal<Record<string, unknown>>("governance-page");
    const hero = (doc?.hero as Record<string, unknown> | undefined) ?? {};
    const seoFallback = {
      title: "AI Governance",
      description:
        "Implement responsible AI governance with Agrayian — risk classification, model lifecycle control, explainability, human oversight, monitoring, audit and third-party AI risk management.",
    };

    return {
      hero: {
        title: asText(hero.title ?? doc?.title, "AI Governance"),
        subtitle: asText(hero.subtitle, "Responsible AI, made operational"),
        description: asText(
          hero.description ?? doc?.description,
          "Inventory AI systems, classify risk, enforce lifecycle controls and preserve evidence for leadership and audit.",
        ),
        primaryCtaLabel: asText(hero.primaryCtaLabel, "Book a Consultation"),
        primaryCtaHref: asText(hero.primaryCtaHref, "/contact?interest=consultation"),
        secondaryCtaLabel: asText(hero.secondaryCtaLabel, "Explore Governance"),
        secondaryCtaHref: asText(hero.secondaryCtaHref, "#pillars"),
      },
      pillarsTitle: asText(doc?.pillarsTitle, "Governance framework pillars"),
      raciTitle: asText(doc?.raciTitle, "Operating model: Who does what"),
      raciDescription: asText(
        doc?.raciDescription,
        "Clear ownership across the AI lifecycle — from ideation through retirement — so policy, delivery and control functions stay aligned.",
      ),
      commandTitle: asText(doc?.commandTitle, "AI Governance command centre"),
      commandDescription: asText(
        doc?.commandDescription,
        "A shared operating surface for inventory, risk posture, assessments and incidents.",
      ),
      engagementTitle: asText(doc?.engagementTitle, "Engagement model"),
      engagementDescription: asText(
        doc?.engagementDescription,
        "Whether you need a diagnostic, a full framework or an operating command centre, Agrayian structures governance work as a practical delivery programme.",
      ),
      ctaTitle: asText(
        doc?.ctaTitle,
        "Make responsible AI measurable, reviewable and operable.",
      ),
      ctaDescription: asText(
        doc?.ctaDescription,
        "Strengthen trust, reduce risk and scale AI with confidence.",
      ),
      lifecycle: asObjectArray(
        doc?.lifecycle,
        [],
        (item) => {
          const label = asOptional(item.label);
          if (!label) return null;
          return { label, icon: asText(item.icon, "") };
        },
      ),
      pillars: asObjectArray(
        doc?.pillars,
        [],
        (item) => {
          const title = asOptional(item.title);
          if (!title) return null;
          return {
            title,
            description: asText(item.description, ""),
            icon: asText(item.icon, ""),
          };
        },
      ),
      raciRows: asObjectArray(
        doc?.raciRows,
        [],
        (item) => {
          const role = asOptional(item.role);
          if (!role) return null;
          return { role, cells: asStringList(item.cells, []) };
        },
      ),
      engagementSteps: asObjectArray(
        doc?.engagementSteps,
        [],
        (item) => {
          const title = asOptional(item.title);
          if (!title) return null;
          return {
            title,
            description: asText(item.description, ""),
            icon: asText(item.icon, ""),
          };
        },
      ),
      seo: asSeo(doc?.seo, seoFallback),
    };
  },
);

export type CompanyPageContent = {
  vision: string;
  mission: string;
  introduction: string;
  whyAgrayian: string[];
  deliveryPhilosophy: string[];
  responsibleAiCommitment: string;
  technologyPhilosophy: string;
  careersCopy: string;
  partnerEcosystemCopy: string;
  values: CompanyValue[];
  howWeWork: { title: string; description: string }[];
  seo: { title: string; description: string };
};

export const getCompanyPageContent = cache(
  async (): Promise<CompanyPageContent> => {
    const doc = await getPublishedGlobal<Record<string, unknown>>("company-page");
    const values = Array.isArray(doc?.values)
      ? (doc.values as { title?: string; description?: string }[])
          .filter((item) => item.title)
          .map((item) => ({
            title: String(item.title),
            description: String(item.description ?? ""),
          }))
      : [];

    return {
      vision: asText(doc?.vision, companyIntro.vision),
      mission: asText(doc?.mission, companyIntro.mission),
      introduction: asText(doc?.introduction, companyIntro.introduction),
      whyAgrayian: asStringList(doc?.whyAgrayian, companyIntro.whyAgrayian),
      deliveryPhilosophy: asStringList(
        doc?.deliveryPhilosophy,
        companyIntro.deliveryPhilosophy,
      ),
      responsibleAiCommitment: asText(
        doc?.responsibleAiCommitment,
        companyIntro.responsibleAiCommitment,
      ),
      technologyPhilosophy: asText(
        doc?.technologyPhilosophy,
        companyIntro.technologyPhilosophy,
      ),
      careersCopy: asText(doc?.careersCopy, companyIntro.careers),
      partnerEcosystemCopy: asText(
        doc?.partnerEcosystemCopy,
        companyIntro.partnerEcosystem,
      ),
      values: values.length ? values : companyValues,
      howWeWork: asObjectArray(
        doc?.howWeWork,
        [],
        (item) => {
          const title = asOptional(item.title);
          if (!title) return null;
          return { title, description: asText(item.description, "") };
        },
      ),
      seo: asSeo(doc?.seo, {
        title: "Company",
        description:
          "Learn about Agrayian AI Labs — our vision, mission, values and commitment to responsible AI for enterprises and governments.",
      }),
    };
  },
);

export type ContactPageContent = {
  title: string;
  description: string;
  enquiryThemes: string[];
  consultationFlow: { title: string; description: string }[];
  faqIds: string[];
  form: {
    heading: string;
    successMessage: string;
    errorMessage: string;
    consentText: string;
    submitLabel: string;
  };
  seo: { title: string; description: string };
};

const defaultThemes = [
  "AI Strategy",
  "AI CoE",
  "AI Governance",
  "Product Demonstration",
  "Generative AI",
  "Agentic AI",
  "Data & Analytics",
];

export const getContactPageContent = cache(
  async (): Promise<ContactPageContent> => {
    const doc = await getPublishedGlobal<Record<string, unknown>>("contact-page");
    const form = (doc?.form as Record<string, unknown> | undefined) ?? {};
    const flow = Array.isArray(doc?.consultationFlow)
      ? (doc.consultationFlow as { title?: string; description?: string }[])
          .filter((step) => step.title)
          .map((step) => ({
            title: String(step.title),
            description: String(step.description ?? ""),
          }))
      : [];

    return {
      title: asText(doc?.title, "Contact"),
      description: asText(
        doc?.description,
        "Tell us about your AI ambition, governance needs or product interest. We will review the requirement and propose a suitable discovery discussion.",
      ),
      enquiryThemes: asStringList(doc?.enquiryThemes, defaultThemes),
      consultationFlow: flow.length ? flow : [...consultationFlow],
      faqIds: Array.isArray(doc?.faqs)
        ? doc.faqs.map((item) =>
            typeof item === "object" && item && "id" in item
              ? String((item as { id: unknown }).id)
              : String(item),
          )
        : [],
      form: {
        heading: asText(form.heading, "Submit enquiry"),
        successMessage: asText(
          form.successMessage,
          "Our team will review your requirement and follow up using your preferred contact method.",
        ),
        errorMessage: asText(
          form.errorMessage,
          "We could not submit your request. Please try again or email hello@agrayian.ai.",
        ),
        consentText: asText(
          form.consentText,
          "I consent to Agrayian AI Labs contacting me about this enquiry and storing my details in line with the Privacy Policy.",
        ),
        submitLabel: asText(form.submitLabel, "Submit enquiry"),
      },
      seo: asSeo(doc?.seo, {
        title: asText(doc?.title, "Contact"),
        description: asText(
          doc?.description,
          "Book a consultation with Agrayian AI Labs for AI strategy, CoE design, governance, products and enterprise or government programmes.",
        ),
      }),
    };
  },
);

export type CapabilitiesPageContent = {
  hero: {
    title: string;
    subheadLine1: string;
    subheadLine2: string;
    body: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  journeyLabels: { label: string; href: string }[];
  stackActivities: { label: string; mark: string }[];
  seo: { title: string; description: string };
};

export const getCapabilitiesPageContent = cache(
  async (): Promise<CapabilitiesPageContent> => {
    const doc = await getPublishedGlobal<Record<string, unknown>>(
      "capabilities-page",
    );
    const hero = (doc?.hero as Record<string, unknown> | undefined) ?? {};
    return {
      hero: {
        title: asText(hero.title, "Capabilities"),
        subheadLine1: asText(hero.subheadLine1, "From strategy to governed"),
        subheadLine2: asText(hero.subheadLine2, "production systems"),
        body: asText(
          hero.body,
          "Seven integrated capability layers connect ambition, data foundations, AI modalities, governance, engineering and managed operations.",
        ),
        primaryCtaLabel: asText(hero.primaryCtaLabel, "Book a Consultation"),
        primaryCtaHref: asText(
          hero.primaryCtaHref,
          "/contact?interest=consultation",
        ),
        secondaryCtaLabel: asText(
          hero.secondaryCtaLabel,
          "Explore Related Products",
        ),
        secondaryCtaHref: asText(hero.secondaryCtaHref, "/products"),
      },
      journeyLabels: asObjectArray(
        doc?.journeyLabels,
        CAPABILITIES_JOURNEY_LABELS.map((item) => ({ ...item })),
        (item) => {
          const label = asOptional(item.label);
          const href = asOptional(item.href);
          if (!label || !href) return null;
          return { label, href };
        },
      ),
      stackActivities: asObjectArray(
        doc?.stackActivities,
        CAPABILITIES_STACK_ACTIVITIES.map((item) => ({ ...item })),
        (item) => {
          const label = asOptional(item.label);
          if (!label) return null;
          return { label, mark: asOptional(item.mark) ?? "" };
        },
      ),
      seo: asSeo(doc?.seo, {
        title: "Capabilities",
        description:
          "Explore Agrayian AI Labs capabilities spanning AI strategy, Centres of Excellence, governance, generative and agentic AI, data and analytics, product engineering and managed services.",
      }),
    };
  },
);

export type ProductsPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    searchPlaceholder: string;
  };
  architecture: {
    title: string;
    coreTitle: string;
    coreSubtitle: string;
  };
  seo: { title: string; description: string };
};

export const getProductsPageContent = cache(
  async (): Promise<ProductsPageContent> => {
    const doc = await getPublishedGlobal<Record<string, unknown>>("products-page");
    const hero = (doc?.hero as Record<string, unknown> | undefined) ?? {};
    const architecture =
      (doc?.architecture as Record<string, unknown> | undefined) ?? {};
    return {
      hero: {
        eyebrow: asText(hero.eyebrow, "Products"),
        title: asText(
          hero.title,
          "AI products built\nfor real-world\ndecisions",
        ),
        description: asText(
          hero.description,
          "Governed intelligence systems designed for complex operating environments.",
        ),
        searchPlaceholder: asText(
          hero.searchPlaceholder,
          "Search products, capabilities, modules...",
        ),
      },
      architecture: {
        title: asText(
          architecture.title,
          "Built to integrate. Designed to scale.",
        ),
        coreTitle: asText(architecture.coreTitle, "Governance & Security Core"),
        coreSubtitle: asText(
          architecture.coreSubtitle,
          "Policy · Privacy · Compliance · Audit",
        ),
      },
      seo: asSeo(doc?.seo, {
        title: "Products",
        description:
          "Explore Agrayian AI Labs' enterprise platforms, government solutions, governance systems and AI-powered decision tools.",
      }),
    };
  },
);

export type TrustPageContent = {
  title: string;
  description: string;
  intro: string;
  principles: { title: string; description: string }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
  seo: { title: string; description: string };
};

export const getTrustPageContent = cache(async (): Promise<TrustPageContent> => {
  const doc = await getPublishedGlobal<Record<string, unknown>>("trust-page");
  return {
    title: asText(doc?.title, "Responsible AI you can explain and defend"),
    description: asText(
      doc?.description,
      "How Agrayian AI Labs approaches accountability, transparency, privacy, fairness and continuous oversight for responsible AI systems.",
    ),
    intro: asText(
      doc?.intro,
      "This centre summarises how we approach accountability, transparency, privacy, fairness and continuous oversight. It links to our Responsible AI statement and legal documents. We do not claim certifications unless independently verifiable evidence is published here.",
    ),
    principles: asObjectArray(
      doc?.principles,
      [],
      (item) => {
        const title = asOptional(item.title);
        if (!title) return null;
        return { title, description: asText(item.description, "") };
      },
    ),
    ctaTitle: asText(
      doc?.ctaTitle,
      "Questions about responsible AI or governance?",
    ),
    ctaDescription: asText(doc?.ctaDescription, ""),
    ctaLabel: asText(doc?.ctaLabel, "Discuss governance"),
    ctaHref: asText(doc?.ctaHref, "/contact?interest=governance"),
    seo: asSeo(doc?.seo, {
      title: "Trust & Legal Centre",
      description:
        "How Agrayian AI Labs approaches accountability, transparency, privacy, fairness and continuous oversight for responsible AI systems.",
    }),
  };
});

export function mapFaqsFromDocs(
  docs: Array<Record<string, unknown>>,
): FaqItem[] {
  return docs.map((doc) => ({
    id: String(doc.id ?? doc.question),
    question: String(doc.question ?? ""),
    answer: String(doc.answer ?? ""),
    placement: Array.isArray(doc.placement)
      ? doc.placement.map(String)
      : [],
  }));
}
