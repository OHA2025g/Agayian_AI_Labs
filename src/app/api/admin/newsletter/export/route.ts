import { NextResponse } from "next/server";
import { adminCanManageInbox } from "@/lib/admin/rbac";
import { writeAdminAudit } from "@/lib/admin/audit";
import { getAdminUser } from "@/lib/admin/session";
import { getAdminPayload } from "@/lib/payload";

export async function GET() {
  const user = await getAdminUser();
  if (!user || !adminCanManageInbox(user)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await getAdminPayload();
  const result = await payload.find({
    collection: "newsletter-subscribers",
    limit: 5000,
    depth: 0,
    overrideAccess: true,
  });

  const rows = [
    ["id", "email", "status", "createdAt"].join(","),
    ...result.docs.map((doc) =>
      [doc.id, csv(doc.email), csv(doc.status), csv(doc.createdAt)].join(","),
    ),
  ];

  await writeAdminAudit(payload, user, {
    action: "newsletter.export",
    collection: "newsletter-subscribers",
    summary: `Exported ${result.docs.length} subscribers`,
  });

  return new NextResponse(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="newsletter.csv"',
    },
  });
}

function csv(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}
