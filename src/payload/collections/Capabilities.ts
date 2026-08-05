import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";
import { seoFields } from "../fields/seo";

export const Capabilities: CollectionConfig = {
  slug: "capabilities",
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
    { name: "shortName", type: "text" },
    { name: "icon", type: "text" },
    { name: "summary", type: "textarea", required: true },
    { name: "description", type: "textarea" },
    { name: "businessChallenge", type: "textarea" },
    { name: "deliverables", type: "text", hasMany: true },
    { name: "engagementActivities", type: "text", hasMany: true },
    { name: "typicalDeliverables", type: "text", hasMany: true },
    { name: "useCases", type: "text", hasMany: true },
    { name: "outcomes", type: "text", hasMany: true },
    { name: "relatedProducts", type: "text", hasMany: true },
    { name: "topics", type: "text", hasMany: true },
    ...editorialStatusFields,
    seoFields,
  ],
};
