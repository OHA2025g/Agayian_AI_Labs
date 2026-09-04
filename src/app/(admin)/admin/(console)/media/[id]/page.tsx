import { loadCollectionDoc } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";
import { MediaDelete } from "./MediaDelete";

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminUser();
  const { id } = await params;
  const doc = await loadCollectionDoc("media", id);
  return (
    <div className="admin-card max-w-xl">
      <h1 className="text-2xl font-semibold">{String(doc.filename ?? "Media")}</h1>
      <p className="mt-2 text-sm">Alt: {String(doc.alt ?? "—")}</p>
      <p className="text-sm">Type: {String(doc.mimeType ?? "—")}</p>
      <p className="text-sm">Size: {String(doc.filesize ?? "—")}</p>
      <MediaDelete id={id} />
    </div>
  );
}
