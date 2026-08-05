import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { editorialStatusFields } from "../fields/editorial";
import { seoFields } from "../fields/seo";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
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
    ...editorialStatusFields,
    seoFields,
  ],
};
