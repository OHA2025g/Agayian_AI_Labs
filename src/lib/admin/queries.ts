import type { EditableCollection } from "@/lib/admin/content-actions";
import { getAdminPayload, isPayloadSkipped } from "@/lib/payload";

async function adminPayloadOrNull() {
  if (isPayloadSkipped()) return null;
  try {
    return await getAdminPayload();
  } catch {
    return null;
  }
}

function versionPreview(version: unknown) {
  if (!version || typeof version !== "object") return "";
  const record = version as Record<string, unknown>;
  const hero = record.hero as Record<string, unknown> | undefined;
  const candidates = [
    hero?.title,
    hero?.headline,
    hero?.subheadLine1,
    record.title,
    record.name,
    record.question,
  ];
  const match = candidates.find(
    (item) => typeof item === "string" && item.trim(),
  );
  return match ? String(match).slice(0, 80) : "";
}

export async function loadGlobal(slug: string) {
  const payload = await adminPayloadOrNull();
  if (!payload) return {};
  const doc = await payload.findGlobal({
    slug: slug as "home-page",
    depth: 1,
    draft: true,
    overrideAccess: true,
  });
  return (doc ?? {}) as unknown as Record<string, unknown>;
}

export async function loadCollectionList(
  collection: EditableCollection,
  options?: { limit?: number; where?: Record<string, unknown>; sort?: string },
) {
  const payload = await adminPayloadOrNull();
  if (!payload) return { docs: [], total: 0 };
  const result = await payload.find({
    collection,
    depth: 0,
    limit: options?.limit ?? 100,
    sort: options?.sort ?? "-updatedAt",
    where: options?.where as never,
    overrideAccess: true,
    draft: true,
  });
  return {
    docs: result.docs as unknown as Record<string, unknown>[],
    total: result.totalDocs,
  };
}

export async function loadCollectionDoc(
  collection: EditableCollection,
  id: string,
) {
  const payload = await adminPayloadOrNull();
  if (!payload) return {};
  const doc = await payload.findByID({
    collection,
    id,
    depth: 1,
    draft: true,
    overrideAccess: true,
  });
  return doc as unknown as Record<string, unknown>;
}

export async function loadVersions(
  kind: "global" | "collection",
  slug: string,
  id?: string,
) {
  const payload = await adminPayloadOrNull();
  if (!payload) return [];
  try {
    if (kind === "global") {
      const result = await payload.findGlobalVersions({
        slug: slug as "home-page",
        limit: 12,
        sort: "-updatedAt",
      });
      return result.docs.map((doc) => ({
        id: String(doc.id),
        updatedAt: String(doc.updatedAt ?? ""),
        status: String((doc.version as { status?: string } | undefined)?.status ?? ""),
        preview: versionPreview(doc.version),
      }));
    }
    const result = await payload.findVersions({
      collection: slug as "products",
      limit: 12,
      sort: "-updatedAt",
      where: id ? { parent: { equals: id } } : undefined,
    });
    return result.docs.map((doc) => ({
      id: String(doc.id),
      updatedAt: String(doc.updatedAt ?? ""),
      status: String((doc.version as { status?: string } | undefined)?.status ?? ""),
      preview: versionPreview(doc.version),
    }));
  } catch {
    return [];
  }
}
