import type { Payload } from "payload";
import type { AdminUser } from "@/lib/admin/rbac";

const REDACT = new Set([
  "password",
  "token",
  "secret",
  "projectSummary",
  "message",
  "body",
]);

export function sanitizeAuditMeta(meta?: Record<string, unknown>) {
  if (!meta) return {};
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (REDACT.has(key)) continue;
    next[key] = value;
  }
  return next;
}

export async function writeAdminAudit(
  payload: Payload,
  user: AdminUser,
  input: {
    action: string;
    collection?: string;
    documentId?: string;
    summary: string;
    meta?: Record<string, unknown>;
  },
) {
  try {
    await payload.create({
      collection: "audit-logs",
      data: {
        action: input.action,
        collectionSlug: input.collection,
        documentId: input.documentId,
        summary: input.summary,
        meta: sanitizeAuditMeta(input.meta),
        actor: user.id,
      },
      overrideAccess: true,
    });
  } catch {
    // Never block the primary write
  }
}
