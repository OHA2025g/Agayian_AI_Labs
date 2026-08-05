import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";
import { seoFields } from "../fields/seo";

export const ImpactStories: CollectionConfig = {
  slug: "impact-stories",
  admin: { useAsTitle: "title" },
  versions: { drafts: true, maxPerDoc: 25 },
  access: {
    read: contentRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    slugField(),
    { name: "title", type: "text", required: true },
    { name: "clientLabel", type: "text", required: true },
    { name: "industry", type: "text", required: true },
    { name: "capability", type: "text" },
    { name: "solutionType", type: "text" },
    { name: "outcomeCategory", type: "text" },
    { name: "challenge", type: "textarea" },
    { name: "context", type: "textarea" },
    { name: "approach", type: "textarea" },
    { name: "architecture", type: "textarea" },
    { name: "governance", type: "textarea" },
    { name: "outcomes", type: "text", hasMany: true },
    { name: "relatedProducts", type: "text", hasMany: true },
    { name: "relatedCapabilities", type: "text", hasMany: true },
    ...editorialStatusFields,
    seoFields,
  ],
};
