import type {
  Capability,
  ImpactStory,
  Industry,
  Insight,
  Product,
} from "@/types";
import { capabilities as staticCapabilities } from "@/data/capabilities";
import { impactStories as staticStories } from "@/data/impactStories";
import { industries as staticIndustries } from "@/data/industries";
import { insights as staticInsights } from "@/data/insights";
import { products as staticProducts } from "@/data/products";
import { findPublished, findPublishedBySlug } from "./published";

type CmsDoc = Record<string, unknown> & { id?: string | number; slug?: string };

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object" && "text" in item) {
      return String((item as { text: unknown }).text);
    }
    return String(item);
  });
}

export async function getProducts(): Promise<Product[]> {
  const docs = await findPublished<CmsDoc>("products");
  if (!docs.length) return staticProducts;
  return docs.map(mapProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const doc = await findPublishedBySlug<CmsDoc>("products", slug);
  if (doc) return mapProduct(doc);
  return staticProducts.find((item) => item.slug === slug);
}

export async function getCapabilities(): Promise<Capability[]> {
  const docs = await findPublished<CmsDoc>("capabilities");
  if (!docs.length) return staticCapabilities;
  return docs.map(mapCapability);
}

export async function getIndustries(): Promise<Industry[]> {
  const docs = await findPublished<CmsDoc>("industries");
  if (!docs.length) return staticIndustries;
  return docs.map(mapIndustry);
}

export async function getImpactStories(): Promise<ImpactStory[]> {
  const docs = await findPublished<CmsDoc>("impact-stories");
  if (!docs.length) return staticStories;
  return docs.map(mapStory);
}

export async function getImpactStory(
  slug: string,
): Promise<ImpactStory | undefined> {
  const doc = await findPublishedBySlug<CmsDoc>("impact-stories", slug);
  if (doc) return mapStory(doc);
  return staticStories.find((item) => item.slug === slug);
}

export async function getInsights(): Promise<Insight[]> {
  const docs = await findPublished<CmsDoc>("insights");
  if (!docs.length) return staticInsights;
  return docs.map(mapInsight);
}

export async function getInsight(slug: string): Promise<Insight | undefined> {
  const doc = await findPublishedBySlug<CmsDoc>("insights", slug);
  if (doc) return mapInsight(doc);
  return staticInsights.find((item) => item.slug === slug);
}

function mapProduct(doc: CmsDoc): Product {
  return {
    id: String(doc.id ?? doc.slug),
    name: String(doc.name ?? ""),
    slug: String(doc.slug ?? ""),
    category: String(doc.category ?? ""),
    industries: asStringArray(doc.industries),
    technologies: asStringArray(doc.technologies),
    shortDescription: String(doc.shortDescription ?? ""),
    valueProposition: String(doc.valueProposition ?? ""),
    businessProblem: String(doc.businessProblem ?? ""),
    solutionOverview: String(doc.solutionOverview ?? ""),
    targetUsers: asStringArray(doc.targetUsers),
    modules: Array.isArray(doc.modules)
      ? (doc.modules as Product["modules"])
      : [],
    capabilities: asStringArray(doc.capabilities),
    workflow: Array.isArray(doc.workflow)
      ? (doc.workflow as Product["workflow"])
      : [],
    dataSources: asStringArray(doc.dataSources),
    aiCapabilities: asStringArray(doc.aiCapabilities),
    governance: asStringArray(doc.governance),
    architecture: asStringArray(doc.architecture),
    deploymentOptions: asStringArray(doc.deploymentOptions),
    outcomes: asStringArray(doc.outcomes),
    featured: Boolean(doc.featured),
    status: String(doc.productStatus ?? "Available for demonstration"),
    relatedCapabilities: asStringArray(doc.relatedCapabilities),
  };
}

function mapCapability(doc: CmsDoc): Capability {
  return {
    id: String(doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    name: String(doc.name ?? ""),
    shortName: String(doc.shortName ?? doc.name ?? ""),
    icon: String(doc.icon ?? "sparkles"),
    summary: String(doc.summary ?? ""),
    description: String(doc.description ?? ""),
    businessChallenge: String(doc.businessChallenge ?? ""),
    deliverables: asStringArray(doc.deliverables),
    engagementActivities: asStringArray(doc.engagementActivities),
    typicalDeliverables: asStringArray(doc.typicalDeliverables),
    useCases: asStringArray(doc.useCases),
    outcomes: asStringArray(doc.outcomes),
    relatedProducts: asStringArray(doc.relatedProducts),
    topics: asStringArray(doc.topics),
  };
}

function mapIndustry(doc: CmsDoc): Industry {
  return {
    id: String(doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    name: String(doc.name ?? ""),
    summary: String(doc.summary ?? ""),
    challenges: asStringArray(doc.challenges),
    opportunities: asStringArray(doc.opportunities),
    capabilities: asStringArray(doc.capabilities),
    relevantCapabilities: [],
    products: asStringArray(doc.products),
    workflows: Array.isArray(doc.workflows)
      ? (doc.workflows as Industry["workflows"])
      : [],
    governance: asStringArray(doc.governance),
    outcomes: asStringArray(doc.outcomes),
  };
}

function mapStory(doc: CmsDoc): ImpactStory {
  return {
    id: String(doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    title: String(doc.title ?? ""),
    clientLabel: String(doc.clientLabel ?? ""),
    industry: String(doc.industry ?? ""),
    capability: String(doc.capability ?? ""),
    solutionType: String(doc.solutionType ?? ""),
    outcomeCategory: String(doc.outcomeCategory ?? ""),
    challenge: String(doc.challenge ?? ""),
    context: String(doc.context ?? ""),
    approach: String(doc.approach ?? ""),
    architecture: String(doc.architecture ?? ""),
    governance: String(doc.governance ?? ""),
    outcomes: asStringArray(doc.outcomes),
    relatedProducts: asStringArray(doc.relatedProducts),
    relatedCapabilities: asStringArray(doc.relatedCapabilities),
  };
}

function mapInsight(doc: CmsDoc): Insight {
  const paragraphs = Array.isArray(doc.bodyParagraphs)
    ? doc.bodyParagraphs.map((item) =>
        typeof item === "string"
          ? item
          : String((item as { text?: string }).text ?? ""),
      )
    : [];
  return {
    id: String(doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    title: String(doc.title ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    category: String(doc.category ?? ""),
    type: String(doc.type ?? "Articles"),
    author: String(doc.author ?? "Agrayian AI Labs"),
    publishedAt: String(doc.publishedAt ?? new Date().toISOString()).slice(
      0,
      10,
    ),
    readingTime: String(doc.readingTime ?? "1 min"),
    featured: Boolean(doc.featured),
    body: paragraphs,
  };
}
