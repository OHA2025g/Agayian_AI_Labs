import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentUpdate,
  isReadOnly,
} from "../access";
import { canEditContent, type UserWithRole } from "../access/roles";
import { isSafeRedirectFrom, isSafeRedirectTo } from "../lib/safe-redirect";

export const Redirects: CollectionConfig = {
  slug: "redirects",
  admin: {
    useAsTitle: "fromPath",
    defaultColumns: ["fromPath", "toPath", "type", "enabled"],
    description:
      "Send old or campaign URLs to a live page. Admin, API and system paths cannot be redirected.",
  },
  access: {
    read: ({ req }) => {
      if (req.user) {
        return (
          canEditContent(req.user as UserWithRole) ||
          isReadOnly(req.user as UserWithRole)
        );
      }
      return { enabled: { equals: true } };
    },
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const fromPath = data?.fromPath?.trim();
        const toPath = data?.toPath?.trim();
        if (fromPath && !isSafeRedirectFrom(fromPath)) {
          throw new Error(
            "From path must be a site path and cannot target /admin, /cms-api or /api.",
          );
        }
        if (toPath && !isSafeRedirectTo(toPath)) {
          throw new Error(
            "To path must be a relative path or an agrayian.ai URL.",
          );
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "fromPath",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Exact path, e.g. /old-contact" },
    },
    {
      name: "toPath",
      type: "text",
      required: true,
      admin: { description: "Destination path or full agrayian.ai URL." },
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "301",
      options: [
        { label: "301 permanent", value: "301" },
        { label: "302 temporary", value: "302" },
      ],
    },
    { name: "enabled", type: "checkbox", defaultValue: true },
    { name: "notes", type: "textarea" },
  ],
};
