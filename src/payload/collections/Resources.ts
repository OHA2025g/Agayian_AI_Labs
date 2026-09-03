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

export const resourceCategories = [
  { label: "Guide", value: "Guide" },
  { label: "Framework", value: "Framework" },
  { label: "Briefing", value: "Briefing" },
  { label: "Checklist", value: "Checklist" },
  { label: "Research", value: "Research" },
] as const;

export const Resources: CollectionConfig = {
  slug: "resources",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt"],
    preview: (doc) => collectionPreviewUrl("resources", doc?.slug),
  },
  versions: { drafts: true },
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
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea" },
            {
              name: "category",
              type: "select",
              options: [...resourceCategories],
              defaultValue: "Guide",
            },
            { name: "featured", type: "checkbox", defaultValue: false },
          ],
        },
        {
          label: "Content",
          fields: [
            {
              name: "file",
              type: "upload",
              relationTo: "media",
              required: false,
              admin: {
                description:
                  "Optional download. Leave empty if the resource is a page only — never invent a file.",
              },
            },
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
