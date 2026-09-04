import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { editorialStatusFields } from "../fields/editorial";
import { seoFields } from "../fields/seo";
import { globalPreviewUrl } from "../lib/preview-url";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  admin: {
    preview: () => globalPreviewUrl("contact-page"),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            { name: "title", type: "text" },
            { name: "description", type: "textarea" },
            { name: "enquiryThemes", type: "text", hasMany: true },
            {
              name: "consultationFlow",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea" },
              ],
            },
            {
              name: "faqs",
              type: "relationship",
              relationTo: "faqs",
              hasMany: true,
            },
            {
              name: "form",
              type: "group",
              fields: [
                { name: "heading", type: "text" },
                { name: "successMessage", type: "textarea" },
                { name: "errorMessage", type: "textarea" },
                { name: "consentText", type: "textarea" },
                { name: "submitLabel", type: "text" },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [seoFields],
        },
        {
          label: "Publishing",
          fields: [...editorialStatusFields],
        },
      ],
    },
  ],
};
