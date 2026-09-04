"use server";

import { revalidatePath } from "next/cache";
import {
  adminCanEdit,
  adminCanManageInbox,
  adminCanManageMedia,
  adminCanManageUsers,
  adminCanPublish,
  type AdminUser,
} from "@/lib/admin/rbac";
import { writeAdminAudit } from "@/lib/admin/audit";
import { revalidateCollection, revalidateGlobal } from "@/lib/admin/revalidate";
import { requireAdminUser } from "@/lib/admin/session";
import {
  canTransitionPublish,
  detectRedirectLoop,
  rejectsResourcesLink,
} from "@/lib/admin/validation";
import { canonicalGlobalCopy } from "@/lib/cms/canonical-copy";
import { PREVIEW_COOKIE } from "@/lib/cms/preview-mode";
import { getAdminPayload } from "@/lib/payload";
import { cookies } from "next/headers";

export type ActionResult =
  | { ok: true; id?: string; data?: Record<string, unknown> }
  | { ok: false; error: string };

export type GlobalSlug =
  | "home-page"
  | "capabilities-page"
  | "products-page"
  | "coe-page"
  | "governance-page"
  | "company-page"
  | "contact-page"
  | "trust-page"
  | "site-settings"
  | "navigation"
  | "privacy-policy"
  | "terms-of-use"
  | "responsible-ai"
  | "cookie-policy"
  | "accessibility-statement";

export type EditableCollection =
  | "products"
  | "capabilities"
  | "industries"
  | "impact-stories"
  | "insights"
  | "faqs"
  | "team-members"
  | "careers"
  | "redirects"
  | "enquiries"
  | "newsletter-subscribers"
  | "users"
  | "media";

function deny(user: AdminUser, need: "edit" | "publish" | "users" | "inbox" | "media"): string | null {
  if (need === "edit" && !adminCanEdit(user)) return "You cannot edit this content.";
  if (need === "publish" && !adminCanPublish(user)) return "Only Administrators can publish.";
  if (need === "users" && !adminCanManageUsers(user)) return "Only Administrators can manage users.";
  if (need === "inbox" && !adminCanManageInbox(user)) return "You cannot manage inbox records.";
  if (need === "media" && !adminCanManageMedia(user)) return "You cannot manage media.";
  return null;
}

function stripSystem(data: Record<string, unknown>) {
  const next = { ...data };
  delete next.id;
  delete next.createdAt;
  delete next.updatedAt;
  delete next._status;
  return next;
}

function walkLinks(
  value: unknown,
  visit: (label: string, href: string) => void,
) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) walkLinks(item, visit);
    return;
  }
  const record = value as Record<string, unknown>;
  if (typeof record.href === "string") {
    visit(String(record.label ?? ""), record.href);
  }
  for (const child of Object.values(record)) walkLinks(child, visit);
}

function assertNoResources(data: Record<string, unknown>) {
  walkLinks(data, (label, href) => {
    if (rejectsResourcesLink(label, href)) {
      throw new Error("Resources links are not allowed.");
    }
  });
}

export async function saveGlobalAction(
  slug: GlobalSlug,
  data: Record<string, unknown>,
  options?: { status?: string; scheduledPublishAt?: string | null },
): Promise<ActionResult> {
  const user = await requireAdminUser();
  const blocked = deny(user, "edit");
  if (blocked) return { ok: false, error: blocked };

  const editorial = slug !== "site-settings" && slug !== "navigation";
  const status = options?.status ?? String(data.status ?? "draft");
  if (editorial && (status === "published" || status === "archived")) {
    const pub = deny(user, "publish");
    if (pub) return { ok: false, error: pub };
  }
  if (editorial && !canTransitionPublish("draft", status, adminCanPublish(user))) {
    return { ok: false, error: "That publish state is not allowed for your role." };
  }

  try {
    const payload = await getAdminPayload();
    const next = stripSystem({
      ...data,
      ...(editorial
        ? {
            status,
            scheduledPublishAt:
              options?.scheduledPublishAt ?? data.scheduledPublishAt ?? null,
            publishedAt:
              status === "published"
                ? data.publishedAt || new Date().toISOString()
                : data.publishedAt,
          }
        : {}),
    });
    if (slug === "navigation") assertNoResources(next);
    await payload.updateGlobal({
      slug: slug as never,
      data: next as never,
      draft: editorial ? status !== "published" : false,
      overrideAccess: true,
      user: { id: user.id, collection: "users" },
    });
    await writeAdminAudit(payload, user, {
      action: status === "published" ? "global.publish" : "global.save",
      collection: slug,
      summary: `${status === "published" ? "Published" : "Saved"} ${slug}`,
      meta: editorial ? { status } : {},
    });
    if (!editorial || status === "published") revalidateGlobal(slug);
    revalidatePath("/admin", "layout");
    return { ok: true, data: next };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Save failed.",
    };
  }
}

export async function saveCollectionAction(
  collection: EditableCollection,
  id: string | undefined,
  data: Record<string, unknown>,
  options?: { status?: string; scheduledPublishAt?: string | null },
): Promise<ActionResult & { id?: string }> {
  const user = await requireAdminUser();
  const inbox = collection === "enquiries" || collection === "newsletter-subscribers";
  const blocked = deny(
    user,
    collection === "users" ? "users" : inbox ? "inbox" : collection === "media" ? "media" : "edit",
  );
  if (blocked) return { ok: false, error: blocked };

  const status = options?.status ?? String(data.status ?? "draft");
  if (
    collection !== "enquiries" &&
    collection !== "newsletter-subscribers" &&
    collection !== "redirects" &&
    collection !== "users" &&
    collection !== "media"
  ) {
    if (status === "published" || status === "archived") {
      const pub = deny(user, "publish");
      if (pub) return { ok: false, error: pub };
    }
    if (!canTransitionPublish("draft", status, adminCanPublish(user))) {
      return { ok: false, error: "That publish state is not allowed for your role." };
    }
  }

  try {
    const payload = await getAdminPayload();
    if (collection === "redirects") {
      const existing = await payload.find({
        collection: "redirects",
        limit: 500,
        overrideAccess: true,
      });
      const rows = existing.docs
        .filter((doc) => String(doc.id) !== id)
        .map((doc) => ({
          from: String(doc.fromPath ?? ""),
          to: String(doc.toPath ?? ""),
          enabled: Boolean(doc.enabled),
        }));
      rows.push({
        from: String(data.fromPath ?? ""),
        to: String(data.toPath ?? ""),
        enabled: data.enabled !== false,
      });
      if (detectRedirectLoop(rows)) {
        return { ok: false, error: "That redirect would create a loop." };
      }
    }

    const next = stripSystem({
      ...data,
      ...(collection !== "enquiries" &&
      collection !== "newsletter-subscribers" &&
      collection !== "redirects" &&
      collection !== "users" &&
      collection !== "media"
        ? {
            status,
            scheduledPublishAt:
              options?.scheduledPublishAt ?? data.scheduledPublishAt ?? null,
            publishedAt:
              status === "published"
                ? data.publishedAt || new Date().toISOString()
                : data.publishedAt,
          }
        : {}),
    });
    assertNoResources(next);

    const draft =
      collection !== "enquiries" &&
      collection !== "newsletter-subscribers" &&
      collection !== "redirects" &&
      collection !== "users" &&
      collection !== "media" &&
      status !== "published";

    if (id) {
      await payload.update({
        collection,
        id,
        data: next as never,
        draft: draft || undefined,
        overrideAccess: true,
        user: { id: user.id, collection: "users" },
      });
    } else {
      const created = await payload.create({
        collection,
        data: next as never,
        draft: draft || undefined,
        overrideAccess: true,
        user: { id: user.id, collection: "users" },
      });
      id = String(created.id);
    }

    await writeAdminAudit(payload, user, {
      action: `${collection}.save`,
      collection,
      documentId: id,
      summary: `Saved ${collection} ${id}`,
      meta: { status },
    });
    if (status === "published" || collection === "redirects") {
      revalidateCollection(collection, typeof data.slug === "string" ? data.slug : undefined);
    }
    revalidatePath("/admin", "layout");
    return { ok: true, id, data: next };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Save failed.",
    };
  }
}

export async function deleteCollectionAction(
  collection: EditableCollection,
  id: string,
): Promise<ActionResult> {
  const user = await requireAdminUser();
  if (collection === "users") {
    const blocked = deny(user, "users");
    if (blocked) return { ok: false, error: blocked };
    if (id === user.id) return { ok: false, error: "You cannot delete your own account." };
  } else if (collection === "enquiries" || collection === "newsletter-subscribers") {
    const blocked = deny(user, "inbox");
    if (blocked) return { ok: false, error: blocked };
  } else if (!adminCanPublish(user) && collection !== "media") {
    return { ok: false, error: "Only Administrators can delete records." };
  }
  if (collection === "media") {
    const blocked = deny(user, "media");
    if (blocked) return { ok: false, error: blocked };
  }
  try {
    const payload = await getAdminPayload();
    if (collection === "media") {
      const team = await payload.find({
        collection: "team-members",
        limit: 1,
        overrideAccess: true,
        where: { photo: { equals: id } },
      });
      if (team.docs.length) {
        return { ok: false, error: "This asset is used by a team member." };
      }
    }
    await payload.delete({
      collection,
      id,
      overrideAccess: true,
      user: { id: user.id, collection: "users" },
    });
    await writeAdminAudit(payload, user, {
      action: `${collection}.delete`,
      collection,
      documentId: id,
      summary: `Deleted ${collection} ${id}`,
    });
    revalidateCollection(collection);
    revalidatePath("/admin", "layout");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Delete failed.",
    };
  }
}

export async function restoreVersionAction(
  kind: "global" | "collection",
  slug: string,
  versionId: string,
  documentId?: string,
): Promise<ActionResult> {
  const user = await requireAdminUser();
  const blocked = deny(user, "edit");
  if (blocked) return { ok: false, error: blocked };
  try {
    const payload = await getAdminPayload();
    if (kind === "global") {
      await payload.restoreGlobalVersion({
        slug: slug as never,
        id: versionId,
        overrideAccess: true,
      });
    } else {
      await payload.restoreVersion({
        collection: slug as EditableCollection,
        id: versionId,
        overrideAccess: true,
      });
    }

    const publish = adminCanPublish(user);
    let data: Record<string, unknown> = {};
    if (kind === "global") {
      const current = await payload.findGlobal({
        slug: slug as never,
        draft: true,
        overrideAccess: true,
      });
      data = stripSystem(current as unknown as Record<string, unknown>);
      if (publish) {
        data.status = "published";
        data.scheduledPublishAt = null;
        data.publishedAt = new Date().toISOString();
        await payload.updateGlobal({
          slug: slug as never,
          data: data as never,
          draft: false,
          overrideAccess: true,
          user: { id: user.id, collection: "users" },
        });
        revalidateGlobal(slug);
      }
    } else if (documentId) {
      const current = await payload.findByID({
        collection: slug as EditableCollection,
        id: documentId,
        draft: true,
        overrideAccess: true,
      });
      data = stripSystem(current as unknown as Record<string, unknown>);
      if (publish) {
        data.status = "published";
        data.scheduledPublishAt = null;
        data.publishedAt = new Date().toISOString();
        await payload.update({
          collection: slug as EditableCollection,
          id: documentId,
          data: data as never,
          draft: false,
          overrideAccess: true,
          user: { id: user.id, collection: "users" },
        });
        revalidateCollection(slug);
      }
    }

    await writeAdminAudit(payload, user, {
      action: "version.restore",
      collection: slug,
      documentId: versionId,
      summary: publish
        ? `Restored and published revision ${versionId}`
        : `Restored revision ${versionId}`,
    });
    revalidatePath("/admin", "layout");
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Restore failed.",
    };
  }
}

export async function resetGlobalToSiteCopyAction(
  slug: GlobalSlug,
): Promise<ActionResult> {
  const user = await requireAdminUser();
  const blocked = deny(user, "publish");
  if (blocked) return { ok: false, error: blocked };
  const copy = canonicalGlobalCopy(slug);
  if (!copy) {
    return { ok: false, error: "No original site copy is stored for this page." };
  }
  try {
    const payload = await getAdminPayload();
    await payload.updateGlobal({
      slug: slug as never,
      data: copy as never,
      draft: false,
      overrideAccess: true,
      user: { id: user.id, collection: "users" },
    });
    await writeAdminAudit(payload, user, {
      action: "global.reset",
      collection: slug,
      summary: `Reset ${slug} to original site copy`,
    });
    revalidateGlobal(slug);
    revalidatePath("/admin", "layout");
    return { ok: true, data: { ...copy } };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Reset failed.",
    };
  }
}

export async function enablePreviewAction(path: string): Promise<ActionResult & { href?: string }> {
  await requireAdminUser();
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return { ok: false, error: "PREVIEW_SECRET is not configured." };
  const store = await cookies();
  store.set({
    name: PREVIEW_COOKIE,
    value: secret,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 30,
  });
  return { ok: true, href: path };
}

export async function disablePreviewAction() {
  const store = await cookies();
  store.delete(PREVIEW_COOKIE);
  revalidatePath("/");
}

export async function addEnquiryNoteAction(
  id: string,
  body: string,
): Promise<ActionResult> {
  const user = await requireAdminUser();
  const blocked = deny(user, "inbox");
  if (blocked) return { ok: false, error: blocked };
  if (!body.trim()) return { ok: false, error: "Note cannot be empty." };
  try {
    const payload = await getAdminPayload();
    const current = await payload.findByID({
      collection: "enquiries",
      id,
      overrideAccess: true,
    });
    const notes = Array.isArray(current.notes) ? [...current.notes] : [];
    notes.push({ body: body.trim(), createdAt: new Date().toISOString() });
    await payload.update({
      collection: "enquiries",
      id,
      data: { notes },
      overrideAccess: true,
    });
    await writeAdminAudit(payload, user, {
      action: "enquiry.note",
      collection: "enquiries",
      documentId: id,
      summary: `Added note to enquiry ${id}`,
    });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not add note.",
    };
  }
}
