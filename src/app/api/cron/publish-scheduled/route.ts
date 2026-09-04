import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

const COLLECTIONS = [
  "products",
  "capabilities",
  "industries",
  "impact-stories",
  "insights",
  "faqs",
  "team-members",
  "careers",
  "partners",
  "testimonials",
] as const;

export async function POST(request: Request) {
  const secret = request.headers.get("x-cron-secret");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayloadClient();
  const now = new Date().toISOString();
  let published = 0;

  for (const collection of COLLECTIONS) {
    const due = await payload.find({
      collection,
      limit: 100,
      overrideAccess: true,
      where: {
        and: [
          { scheduledPublishAt: { less_than_equal: now } },
          { status: { not_equals: "published" } },
        ],
      },
    });

    for (const doc of due.docs) {
      await payload.update({
        collection,
        id: doc.id,
        overrideAccess: true,
        data: {
          status: "published",
          publishedAt: now,
        },
      });
      published += 1;
    }
  }

  const globals = [
    "home-page",
    "capabilities-page",
    "products-page",
    "coe-page",
    "governance-page",
    "company-page",
    "contact-page",
    "trust-page",
  ] as const;

  for (const slug of globals) {
    const doc = await payload.findGlobal({
      slug: slug as never,
      overrideAccess: true,
      draft: true,
    });
    const scheduled = (doc as { scheduledPublishAt?: string; status?: string })
      .scheduledPublishAt;
    const status = (doc as { status?: string }).status;
    if (
      scheduled &&
      scheduled <= now &&
      status &&
      status !== "published"
    ) {
      await payload.updateGlobal({
        slug: slug as never,
        overrideAccess: true,
        data: { status: "published", publishedAt: now } as never,
      });
      published += 1;
    }
  }

  return NextResponse.json({ ok: true, published });
}
