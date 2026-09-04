import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getAdminPayload } from "@/lib/payload";
import { canManageEnquiries, type UserWithRole } from "@/payload/access/roles";
import { logAudit } from "@/payload/hooks/audit";

export async function GET() {
  try {
    const payload = await getAdminPayload();
    const headerStore = await headers();
    const { user } = await payload.auth({ headers: headerStore });
    if (!canManageEnquiries(user as UserWithRole)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const result = await payload.find({
      collection: "enquiries",
      limit: 5000,
      depth: 0,
      overrideAccess: true,
    });

    const rows = [
      [
        "id",
        "reference",
        "type",
        "status",
        "fullName",
        "workEmail",
        "organisation",
        "areaOfInterest",
        "createdAt",
      ].join(","),
      ...result.docs.map((doc) =>
        [
          doc.id,
          csv(doc.reference),
          csv(doc.type),
          csv(doc.status),
          csv(doc.fullName),
          csv(doc.workEmail),
          csv(doc.organisation),
          csv(doc.areaOfInterest),
          csv(doc.createdAt),
        ].join(","),
      ),
    ];

    await logAudit(
      { payload, user } as never,
      {
        action: "enquiry.export",
        collection: "enquiries",
        summary: `Exported ${result.docs.length} enquiries`,
      },
    );

    return new NextResponse(rows.join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="enquiries.csv"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Export failed" }, { status: 500 });
  }
}

function csv(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}
