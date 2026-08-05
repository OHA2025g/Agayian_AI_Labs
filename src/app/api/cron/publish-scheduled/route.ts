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
  "resources",
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

  return NextResponse.json({ ok: true, published });
}
