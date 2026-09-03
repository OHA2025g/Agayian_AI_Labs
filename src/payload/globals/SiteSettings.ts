import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Brand",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "shortName", type: "text" },
            { name: "websiteUrl", type: "text", required: true },
            { name: "description", type: "textarea" },
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
        },
        {
          label: "Contact",
          fields: [
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
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seoDefaults",
              type: "group",
              fields: [
                { name: "title", type: "text" },
                { name: "description", type: "textarea" },
                { name: "ogImage", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
        {
          label: "Announcement",
          fields: [
            {
              name: "announcement",
              type: "group",
              fields: [
                { name: "enabled", type: "checkbox", defaultValue: false },
                { name: "message", type: "text" },
                { name: "href", type: "text" },
                { name: "ctaLabel", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Marketing",
          fields: [
            {
              name: "marketing",
              type: "group",
              admin: {
                description:
                  "IDs load only after a visitor accepts cookies. Leave blank to keep Vercel Analytics only.",
              },
              fields: [
                { name: "googleTagManagerId", type: "text" },
                { name: "gaMeasurementId", type: "text" },
                { name: "metaPixelId", type: "text" },
                { name: "linkedinPartnerId", type: "text" },
                { name: "defaultUtmSource", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Cookies",
          fields: [
            {
              name: "cookie",
              type: "group",
              fields: [
                { name: "title", type: "text" },
                { name: "description", type: "textarea" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
