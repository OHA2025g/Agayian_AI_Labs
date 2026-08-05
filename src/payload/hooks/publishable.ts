import type { CollectionConfig } from "payload";
import { auditAfterChange, auditAfterDelete } from "./collection-audit";
import { enforceEditorialStatus } from "./editorial-workflow";

/** Shared hooks for draft/review/publish collections. */
export function withPublishableHooks(
  collection: CollectionConfig,
): CollectionConfig {
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      beforeChange: [
        ...(collection.hooks?.beforeChange ?? []),
        enforceEditorialStatus,
      ],
      afterChange: [
        ...(collection.hooks?.afterChange ?? []),
        auditAfterChange,
      ],
      afterDelete: [
        ...(collection.hooks?.afterDelete ?? []),
        auditAfterDelete,
      ],
    },
  };
}
