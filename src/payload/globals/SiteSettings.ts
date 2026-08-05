import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "shortName", type: "text" },
    { name: "websiteUrl", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "contactEmail", type: "email" },
    { name: "contactPhone", type: "text" },
    { name: "address", type: "textarea" },
    {
      name: "socialLinks",
      type: "group",
      fields: [
        { name: "linkedin", type: "text" },
        { name: "youtube", type: "text" },
        { name: "instagram", type: "text" },
        { name: "x", type: "text" },
      ],
    },
    {
      name: "seoDefaults",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "announcement",
      type: "group",
      fields: [
        { name: "enabled", type: "checkbox", defaultValue: false },
        { name: "message", type: "text" },
        { name: "href", type: "text" },
      ],
    },
    {
      name: "cookie",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "brandCopy",
      type: "group",
      fields: [
        { name: "headline", type: "text" },
        { name: "supporting", type: "textarea" },
        { name: "primaryCta", type: "text" },
        { name: "secondaryCta", type: "text" },
      ],
    },
  ],
};
