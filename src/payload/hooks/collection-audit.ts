import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { logAudit } from "./audit";

export const auditAfterChange: CollectionAfterChangeHook = async ({
  collection,
  doc,
  operation,
  req,
}) => {
  await logAudit(req, {
    action: `${collection.slug}.${operation}`,
    collection: collection.slug,
    documentId: String(doc.id),
    summary: `${operation} ${collection.slug} ${doc.id}`,
    meta: {
      status: "status" in doc ? doc.status : undefined,
    },
  });
  return doc;
};

export const auditAfterDelete: CollectionAfterDeleteHook = async ({
  collection,
  doc,
  req,
}) => {
  await logAudit(req, {
    action: `${collection.slug}.delete`,
    collection: collection.slug,
    documentId: String(doc.id),
    summary: `delete ${collection.slug} ${doc.id}`,
  });
  return doc;
};
