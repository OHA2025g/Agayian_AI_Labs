import type { CollectionConfig } from "payload";
import { adminOnly } from "../access";
import { isSuperAdmin, type UserWithRole } from "../access/roles";

export const AuditLogs: CollectionConfig = {
  slug: "audit-logs",
  admin: {
    useAsTitle: "summary",
    defaultColumns: ["action", "collectionSlug", "summary", "createdAt"],
  },
  access: {
    read: ({ req }) =>
      isSuperAdmin(req.user as UserWithRole) ||
      req.user?.role === "administrator",
    create: () => false,
    update: () => false,
    delete: adminOnly,
  },
  fields: [
    { name: "action", type: "text", required: true },
    { name: "collectionSlug", type: "text" },
    { name: "documentId", type: "text" },
    { name: "summary", type: "text", required: true },
    { name: "meta", type: "json" },
    {
      name: "actor",
      type: "relationship",
      relationTo: "users",
    },
  ],
};
