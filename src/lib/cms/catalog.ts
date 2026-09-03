import type {
  Capability,
  CareerRole,
  FaqItem,
  ImpactStory,
  Industry,
  Insight,
  Product,
  Resource,
  TeamMember,
} from "@/types";
import { capabilities as staticCapabilities } from "@/data/capabilities";
import { impactStories as staticStories } from "@/data/impactStories";
import { industries as staticIndustries } from "@/data/industries";
import { insights as staticInsights } from "@/data/insights";
import { products as staticProducts } from "@/data/products";
import { resources as staticResources } from "@/data/resources";
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

export async function getIndustry(slug: string): Promise<Industry | undefined> {
  const doc = await findPublishedBySlug<CmsDoc>("industries", slug);
  if (doc) return mapIndustry(doc);
  return staticIndustries.find((item) => item.slug === slug);
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

export async function getResources(): Promise<Resource[]> {
  const docs = await findPublished<CmsDoc>("resources", { depth: 1 });
  if (!docs.length) return staticResources;
  return docs.map(mapResource);
}

export async function getResource(slug: string): Promise<Resource | undefined> {
  const doc = await findPublishedBySlug<CmsDoc>("resources", slug);
  if (doc) return mapResource(doc);
  return staticResources.find((item) => item.slug === slug);
}

export async function getFaqs(placement?: string): Promise<FaqItem[]> {
  const docs = await findPublished<CmsDoc>("faqs");
  const mapped = docs.map(mapFaq);
  if (!placement) return mapped;
  return mapped.filter((item) => item.placement.includes(placement));
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const docs = await findPublished<CmsDoc>("team-members", { sort: "order" });
  return docs.map(mapTeamMember);
}

export async function getCareers(): Promise<CareerRole[]> {
  const docs = await findPublished<CmsDoc>("careers");
  return docs.map(mapCareer);
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
  const slug = String(doc.slug ?? "");
  const fallback = staticIndustries.find((item) => item.slug === slug);
  return {
    id: String(doc.id ?? slug),
    slug,
    name: String(doc.name ?? fallback?.name ?? ""),
    summary: String(doc.summary ?? fallback?.summary ?? ""),
    challenges: asStringArray(doc.challenges).length
      ? asStringArray(doc.challenges)
      : (fallback?.challenges ?? []),
    opportunities: asStringArray(doc.opportunities).length
      ? asStringArray(doc.opportunities)
      : (fallback?.opportunities ?? []),
    capabilities: asStringArray(doc.capabilities),
    relevantCapabilities: fallback?.relevantCapabilities ?? [],
    products: asStringArray(doc.products),
    productCards: fallback?.productCards,
    workflows: Array.isArray(doc.workflows) && doc.workflows.length
      ? (doc.workflows as Industry["workflows"])
      : (fallback?.workflows ?? []),
    governance: asStringArray(doc.governance).length
      ? asStringArray(doc.governance)
      : (fallback?.governance ?? []),
    outcomes: asStringArray(doc.outcomes).length
      ? asStringArray(doc.outcomes)
      : (fallback?.outcomes ?? []),
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

function mapResource(doc: CmsDoc): Resource {
  const file = doc.file;
  let mappedFile: Resource["file"];
  if (file && typeof file === "object" && "url" in file) {
    const media = file as {
      url?: string;
      filename?: string;
      mimeType?: string;
      filesize?: number;
    };
    if (media.url) {
      mappedFile = {
        url: media.url,
        filename: media.filename,
        mimeType: media.mimeType,
        filesize: media.filesize,
      };
    }
  }
  return {
    id: String(doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    title: String(doc.title ?? ""),
    description: String(doc.description ?? ""),
    category: String(doc.category ?? "Guide"),
    publishedAt: String(doc.publishedAt ?? new Date().toISOString()).slice(0, 10),
    featured: Boolean(doc.featured),
    file: mappedFile,
  };
}

function mapFaq(doc: CmsDoc): FaqItem {
  return {
    id: String(doc.id ?? doc.question),
    question: String(doc.question ?? ""),
    answer: String(doc.answer ?? ""),
    placement: asStringArray(doc.placement),
  };
}

function mapTeamMember(doc: CmsDoc): TeamMember {
  const photo = doc.photo;
  const photoUrl =
    photo && typeof photo === "object" && "url" in photo
      ? String((photo as { url?: unknown }).url ?? "")
      : undefined;
  return {
    id: String(doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    name: String(doc.name ?? ""),
    title: String(doc.title ?? ""),
    bio: String(doc.bio ?? ""),
    photoUrl: photoUrl || undefined,
    order: Number(doc.order ?? 0),
  };
}

function mapCareer(doc: CmsDoc): CareerRole {
  return {
    id: String(doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    title: String(doc.title ?? ""),
    location: String(doc.location ?? ""),
    employmentType: String(doc.employmentType ?? ""),
    summary: String(doc.summary ?? ""),
  };
}
