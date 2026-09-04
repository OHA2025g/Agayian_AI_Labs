import type { Where } from "payload";
import { isPreviewMode } from "@/lib/cms/preview-mode";
import { getPayloadClient, isPayloadSkipped } from "@/lib/payload";

const CMS_BUDGET_MS = 1200;

type PublishedCollection =
  | "products"
  | "capabilities"
  | "industries"
  | "impact-stories"
  | "insights"
  | "faqs"
  | "team-members"
  | "careers"
  | "partners"
  | "testimonials";

type SlugCollection =
  | "products"
  | "capabilities"
  | "industries"
  | "impact-stories"
  | "insights"
  | "careers"
  | "partners"
  | "team-members";

type GlobalSlug =
  | "site-settings"
  | "navigation"
  | "home-page"
  | "coe-page"
  | "governance-page"
  | "company-page"
  | "contact-page"
  | "privacy-policy"
  | "terms-of-use"
  | "responsible-ai"
  | "cookie-policy"
  | "accessibility-statement"
  | "trust-page"
  | "capabilities-page"
  | "products-page";

function withCmsBudget<T>(work: Promise<T>, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(fallback);
      }
    }, CMS_BUDGET_MS);

    work.then(
      (value) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(value);
        }
      },
      () => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(fallback);
        }
      },
    );
  });
}

export async function findPublished<T = Record<string, unknown>>(
  collection: PublishedCollection,
  options?: {
    limit?: number;
    where?: Where;
    sort?: string;
    depth?: number;
  },
): Promise<T[]> {
  if (isPayloadSkipped()) return [];
  return withCmsBudget(queryPublished(collection, options), []);
}

async function queryPublished<T>(
  collection: PublishedCollection,
  options?: {
    limit?: number;
    where?: Where;
    sort?: string;
    depth?: number;
  },
): Promise<T[]> {
  const payload = await getPayloadClient();
  const preview = await isPreviewMode();
  const clauses: Where[] = preview ? [] : [{ status: { equals: "published" } }];
  if (options?.where) clauses.push(options.where);
  const result = await payload.find({
    collection,
    depth: options?.depth ?? 0,
    limit: options?.limit ?? 100,
    sort: options?.sort,
    where: clauses.length ? { and: clauses } : undefined,
    draft: preview,
    overrideAccess: preview,
  });
  return result.docs as T[];
}

export async function findPublishedBySlug<T = Record<string, unknown>>(
  collection: SlugCollection,
  slug: string,
): Promise<T | null> {
  if (isPayloadSkipped()) return null;
  return withCmsBudget(queryPublishedBySlug<T>(collection, slug), null);
}

async function queryPublishedBySlug<T>(
  collection: SlugCollection,
  slug: string,
): Promise<T | null> {
  const payload = await getPayloadClient();
  const preview = await isPreviewMode();
  const result = await payload.find({
    collection,
    depth: 1,
    limit: 1,
    draft: preview,
    overrideAccess: preview,
    where: {
      and: preview
        ? [{ slug: { equals: slug } }]
        : [{ slug: { equals: slug } }, { status: { equals: "published" } }],
    },
  });
  return (result.docs[0] as T) ?? null;
}

export async function getPublishedGlobal<T = Record<string, unknown>>(
  slug: GlobalSlug,
): Promise<T | null> {
  if (isPayloadSkipped()) return null;
  return withCmsBudget(queryPublishedGlobal<T>(slug), null);
}

async function queryPublishedGlobal<T>(slug: GlobalSlug): Promise<T | null> {
  const payload = await getPayloadClient();
  const preview = await isPreviewMode();
  const doc = await payload.findGlobal({
    slug: slug as "home-page",
    depth: 1,
    draft: preview,
    overrideAccess: preview,
  });
  const record = doc as { status?: string } | null;
  if (!preview && record?.status && record.status !== "published") {
    return null;
  }
  return doc as T;
}
