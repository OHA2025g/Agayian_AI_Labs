import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";
import { seoFields } from "../fields/seo";

export const Insights: CollectionConfig = {
  slug: "insights",
  admin: { useAsTitle: "title", defaultColumns: ["title", "type", "status"] },
  versions: { drafts: true, maxPerDoc: 40 },
  access: {
    read: contentRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    slugField(),
    { name: "title", type: "text", required: true },
    { name: "excerpt", type: "textarea", required: true },
    { name: "category", type: "text" },
    { name: "type", type: "text" },
    { name: "author", type: "text", defaultValue: "Agrayian AI Labs" },
    { name: "readingTime", type: "text" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "body", type: "richText" },
    {
      name: "bodyParagraphs",
      type: "array",
      fields: [{ name: "text", type: "textarea", required: true }],
      admin: {
        description: "Plain paragraphs used by the public site and seed import.",
      },
    },
    ...editorialStatusFields,
    seoFields,
  ],
};
