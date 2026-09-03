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

export const ImpactStories: CollectionConfig = {
  slug: "impact-stories",
  admin: {
    useAsTitle: "title",
    preview: (doc) => collectionPreviewUrl("impact-stories", doc?.slug),
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
            { name: "title", type: "text", required: true },
            { name: "clientLabel", type: "text", required: true },
            { name: "industry", type: "text", required: true },
            { name: "capability", type: "text" },
            { name: "solutionType", type: "text" },
            { name: "outcomeCategory", type: "text" },
          ],
        },
        {
          label: "Content",
          fields: [
            { name: "challenge", type: "textarea" },
            { name: "context", type: "textarea" },
            { name: "approach", type: "textarea" },
            { name: "architecture", type: "textarea" },
            { name: "governance", type: "textarea" },
            { name: "outcomes", type: "text", hasMany: true },
          ],
        },
        {
          label: "Relationships",
          fields: [
            { name: "relatedProducts", type: "text", hasMany: true },
            {
              name: "relatedCapabilities",
              type: "text",
              hasMany: true,
              label: "Related Capabilities",
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
