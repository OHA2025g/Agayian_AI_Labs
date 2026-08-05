import type { CollectionConfig } from "payload";
import { adminOnly, authenticated } from "../access";
import { ROLES } from "../access/roles";
import { logAudit } from "../hooks/audit";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 8,
    lockTime: 10 * 60 * 1000,
    forgotPassword: {},
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "role", "updatedAt"],
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    read: authenticated,
    create: adminOnly,
    update: ({ req, id }) => {
      if (!req.user) return false;
      if (req.user.role === "super_admin") return true;
      return req.user.id === id;
    },
    delete: adminOnly,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req, operation }) => {
        await logAudit(req, {
          action: operation === "create" ? "user.create" : "user.update",
          collection: "users",
          documentId: String(doc.id),
          summary: `${operation} user ${doc.email}`,
          meta: { role: doc.role, previousRole: previousDoc?.role },
        });
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "viewer",
      options: ROLES.map((role) => ({
        label: role
          .split("_")
          .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
          .join(" "),
        value: role,
      })),
      access: {
        update: ({ req }) => req.user?.role === "super_admin",
      },
      saveToJWT: true,
    },
  ],
};
