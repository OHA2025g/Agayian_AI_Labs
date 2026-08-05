import type { PayloadRequest } from "payload";

type AuditInput = {
  action: string;
  collection?: string;
  documentId?: string;
  summary: string;
  meta?: Record<string, unknown>;
};

export async function logAudit(
  req: PayloadRequest | undefined,
  input: AuditInput,
) {
  if (!req?.payload) return;
  try {
    await req.payload.create({
      collection: "audit-logs",
      data: {
        action: input.action,
        collectionSlug: input.collection,
        documentId: input.documentId,
        summary: input.summary,
        meta: input.meta ?? {},
        actor: req.user?.id,
      },
      overrideAccess: true,
      req,
    });
  } catch {
    // Never block primary writes if audit insert fails
  }
}
