import type { CollectionConfig } from "payload";
import { adminOnly, authenticated } from "../access";
import { canManageUsers, ROLES, type UserWithRole } from "../access/roles";
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
    defaultColumns: ["email", "role", "disabled", "updatedAt"],
  },
  access: {
    admin: ({ req }) => req.user?.role === "super_admin",
    read: authenticated,
    create: adminOnly,
    update: ({ req, id }) => {
      if (!req.user) return false;
      if (canManageUsers(req.user as UserWithRole)) return true;
      return req.user.id === id;
    },
    delete: adminOnly,
  },
  hooks: {
    beforeChange: [
      ({ data, req, originalDoc }) => {
        const actor = req.user as UserWithRole | undefined;
        if (!actor || actor.role === "super_admin") return data;
        if (data.role === "super_admin") {
          data.role = originalDoc?.role ?? "editor";
        }
        if (originalDoc?.role === "super_admin") {
          throw new Error("Only a super admin can change a super admin.");
        }
        return data;
      },
    ],
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
      name: "disabled",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Disabled accounts cannot sign in to /admin.",
      },
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
        update: ({ req }) => canManageUsers(req.user as UserWithRole),
      },
      saveToJWT: true,
    },
  ],
};
