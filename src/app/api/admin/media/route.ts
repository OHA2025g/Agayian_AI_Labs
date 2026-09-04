import { NextResponse } from "next/server";
import { adminCanManageMedia, asPayloadActor } from "@/lib/admin/rbac";
import { writeAdminAudit } from "@/lib/admin/audit";
import { getAdminUser } from "@/lib/admin/session";
import { getAdminPayload } from "@/lib/payload";

export async function POST(request: Request) {
  const user = await getAdminUser();
  if (!user || !adminCanManageMedia(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const alt = String(form.get("alt") ?? "").trim();
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a file." }, { status: 400 });
  }
  if (!alt) {
    return NextResponse.json({ error: "Alt text is required." }, { status: 400 });
  }

  try {
    const payload = await getAdminPayload();
    const buffer = Buffer.from(await file.arrayBuffer());
    await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
      overrideAccess: true,
      user: asPayloadActor(user),
    });
    await writeAdminAudit(payload, user, {
      action: "media.upload",
      collection: "media",
      summary: `Uploaded ${file.name}`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 },
    );
  }
}
