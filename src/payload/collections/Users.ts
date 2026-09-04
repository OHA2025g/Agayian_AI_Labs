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
      async ({ data, req, originalDoc }) => {
        const raw = req.user as UserWithRole | undefined;
        let role = raw?.role;
        if (raw?.id && !role) {
          const fresh = await req.payload.findByID({
            collection: "users",
            id: String(raw.id),
            depth: 0,
            overrideAccess: true,
          });
          role = (fresh as UserWithRole).role;
        }
        const actor = raw ? { ...raw, role } : undefined;
        if (!actor || canManageUsers(actor)) return data;
        if (data.role && data.role !== originalDoc?.role) {
          throw new Error("You cannot change roles.");
        }
        if (originalDoc?.role === "super_admin") {
          throw new Error("Only an Administrator can change a Super Admin.");
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
