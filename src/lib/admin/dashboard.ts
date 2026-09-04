import { databaseUriMissingName, publicWebsiteUrl } from "@/lib/admin/seed-site";
import { getAdminPayload } from "@/lib/payload";

export type DashboardCounts = {
  published: number;
  drafts: number;
  scheduled: number;
  catalogRecords: number;
  newEnquiries: number;
  media: number;
  missingAlt: number;
  missingSeo: number;
  siteUrl: string;
  lastUpdated: string | null;
  databaseOk: boolean;
  formsOk: boolean;
  databaseNameMissing: boolean;
};

const COUNTED = [
  "products",
  "capabilities",
  "industries",
  "impact-stories",
  "insights",
] as const;

async function countWhere(
  payload: Awaited<ReturnType<typeof getAdminPayload>>,
  collection: (typeof COUNTED)[number] | "enquiries" | "media",
  where?: Record<string, unknown>,
) {
  const result = await payload.count({
    collection,
    overrideAccess: true,
    where: where as never,
  });
  return result.totalDocs;
}

export async function getDashboardData(): Promise<DashboardCounts> {
  try {
    const payload = await getAdminPayload();
    let published = 0;
    let drafts = 0;
    let scheduled = 0;
    let catalogRecords = 0;
    let missingSeo = 0;

    for (const collection of COUNTED) {
      catalogRecords += await countWhere(payload, collection);
      published += await countWhere(payload, collection, {
        status: { equals: "published" },
      });
      drafts += await countWhere(payload, collection, {
        status: { in: ["draft", "in_review", "approved"] },
      });
      scheduled += await countWhere(payload, collection, {
        scheduledPublishAt: { exists: true },
        status: { not_equals: "published" },
      });
      const noSeo = await payload.find({
        collection,
        limit: 100,
        depth: 0,
        overrideAccess: true,
        where: {
          and: [
            { status: { equals: "published" } },
            {
              or: [
                { "seo.title": { exists: false } },
                { "seo.title": { equals: "" } },
              ],
            },
          ],
        },
      });
      missingSeo += noSeo.docs.length;
    }

    const newEnquiries = await countWhere(payload, "enquiries", {
      and: [
        { status: { equals: "new" } },
        { archived: { not_equals: true } },
      ],
    });
    const media = await countWhere(payload, "media");
    const missingAltResult = await payload.find({
      collection: "media",
      limit: 100,
      depth: 0,
      overrideAccess: true,
      where: {
        or: [{ alt: { exists: false } }, { alt: { equals: "" } }],
      },
    });

    const settings = await payload.findGlobal({
      slug: "site-settings",
      overrideAccess: true,
    });

    const recent = await payload.find({
      collection: "audit-logs",
      limit: 1,
      sort: "-createdAt",
      overrideAccess: true,
    });

    return {
      published,
      drafts,
      scheduled,
      newEnquiries,
      media,
      missingAlt: missingAltResult.docs.length,
      missingSeo,
      catalogRecords,
      siteUrl: String(settings.websiteUrl || publicWebsiteUrl()),
      lastUpdated: recent.docs[0]
        ? String(recent.docs[0].createdAt ?? "")
        : null,
      databaseOk: true,
      formsOk: Boolean(process.env.RESEND_API_KEY),
      databaseNameMissing: databaseUriMissingName(),
    };
  } catch {
    return {
      published: 0,
      drafts: 0,
      scheduled: 0,
      catalogRecords: 0,
      newEnquiries: 0,
      media: 0,
      missingAlt: 0,
      missingSeo: 0,
      siteUrl: publicWebsiteUrl(),
      lastUpdated: null,
      databaseOk: false,
      formsOk: Boolean(process.env.RESEND_API_KEY),
      databaseNameMissing: databaseUriMissingName(),
    };
  }
}

export async function getRecentAudit(limit = 8) {
  try {
    const payload = await getAdminPayload();
    const result = await payload.find({
      collection: "audit-logs",
      limit,
      sort: "-createdAt",
      depth: 1,
      overrideAccess: true,
    });
    return result.docs.map((doc) => ({
      id: String(doc.id),
      action: String(doc.action ?? ""),
      summary: String(doc.summary ?? ""),
      collection: String(doc.collectionSlug ?? ""),
      createdAt: String(doc.createdAt ?? ""),
    }));
  } catch {
    return [];
  }
}

export async function getAttentionItems() {
  const data = await getDashboardData();
  const items: { href: string; label: string }[] = [];
  if (data.newEnquiries) {
    items.push({
      href: "/admin/enquiries",
      label: `${data.newEnquiries} new contact submission${data.newEnquiries === 1 ? "" : "s"}`,
    });
  }
  if (data.drafts) {
    items.push({
      href: "/admin/insights",
      label: `${data.drafts} draft catalog items`,
    });
  }
  if (data.missingAlt) {
    items.push({
      href: "/admin/media",
      label: `${data.missingAlt} media items missing alt text`,
    });
  }
  if (data.missingSeo) {
    items.push({
      href: "/admin/seo",
      label: `${data.missingSeo} published items missing SEO titles`,
    });
  }
  if (data.scheduled) {
    items.push({
      href: "/admin",
      label: `${data.scheduled} items scheduled to publish`,
    });
  }
  return items;
}
