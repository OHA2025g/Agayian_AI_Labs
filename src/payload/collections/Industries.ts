import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";
import { seoFields } from "../fields/seo";

export const Industries: CollectionConfig = {
  slug: "industries",
  admin: { useAsTitle: "name" },
  versions: { drafts: true, maxPerDoc: 25 },
  access: {
    read: contentRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    slugField(),
    { name: "name", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "challenges", type: "text", hasMany: true },
    { name: "opportunities", type: "text", hasMany: true },
    { name: "capabilities", type: "text", hasMany: true },
    { name: "products", type: "text", hasMany: true },
    { name: "governance", type: "text", hasMany: true },
    { name: "outcomes", type: "text", hasMany: true },
    {
      name: "workflows",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    ...editorialStatusFields,
    seoFields,
  ],
};
