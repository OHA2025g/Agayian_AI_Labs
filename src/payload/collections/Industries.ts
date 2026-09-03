import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";
import { seoFields } from "../fields/seo";
import { collectionPreviewUrl } from "../lib/preview-url";

export const Industries: CollectionConfig = {
  slug: "industries",
  admin: {
    useAsTitle: "name",
    preview: (doc) => collectionPreviewUrl("industries", doc?.slug),
  },
  versions: { drafts: true, maxPerDoc: 25 },
  access: {
    read: contentRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "summary", type: "textarea", required: true },
          ],
        },
        {
          label: "Content",
          fields: [
            { name: "challenges", type: "text", hasMany: true },
            { name: "opportunities", type: "text", hasMany: true },
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
          ],
        },
        {
          label: "Relationships",
          fields: [
            { name: "capabilities", type: "text", hasMany: true },
            { name: "products", type: "text", hasMany: true },
          ],
        },
        {
          label: "SEO",
          fields: [seoFields],
        },
        {
          label: "Publishing",
          fields: [slugField(), ...editorialStatusFields],
        },
      ],
    },
  ],
};
