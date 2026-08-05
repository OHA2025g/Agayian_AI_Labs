import type { Where } from "payload";
import { getPayloadClient } from "@/lib/payload";

export async function findPublished<T = Record<string, unknown>>(
  collection:
    | "products"
    | "capabilities"
    | "industries"
    | "impact-stories"
    | "insights"
    | "faqs"
    | "team-members"
    | "careers"
    | "partners"
    | "testimonials"
    | "resources",
  options?: {
    limit?: number;
    where?: Where;
    sort?: string;
    depth?: number;
  },
): Promise<T[]> {
  try {
    const payload = await getPayloadClient();
    const clauses: Where[] = [{ status: { equals: "published" } }];
    if (options?.where) clauses.push(options.where);
    const result = await payload.find({
      collection,
      depth: options?.depth ?? 0,
      limit: options?.limit ?? 100,
      sort: options?.sort,
      where: { and: clauses },
      overrideAccess: false,
    });
    return result.docs as T[];
  } catch {
    return [];
  }
}

export async function findPublishedBySlug<T = Record<string, unknown>>(
  collection:
    | "products"
    | "capabilities"
    | "industries"
    | "impact-stories"
    | "insights"
    | "careers"
    | "partners"
    | "team-members"
    | "resources",
  slug: string,
): Promise<T | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection,
      depth: 1,
      limit: 1,
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: "published" } },
        ],
      },
    });
    return (result.docs[0] as T) ?? null;
  } catch {
    return null;
  }
}

export async function getPublishedGlobal<T = Record<string, unknown>>(
  slug:
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
    | "accessibility-statement",
): Promise<T | null> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug,
      depth: 1,
    });
    if (
      doc &&
      typeof doc === "object" &&
      "status" in doc &&
      doc.status &&
      doc.status !== "published"
    ) {
      return null;
    }
    return doc as T;
  } catch {
    return null;
  }
}
