import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { editorialStatusFields } from "../fields/editorial";
import { seoFields } from "../fields/seo";
import { globalPreviewUrl } from "../lib/preview-url";

export const CapabilitiesPage: GlobalConfig = {
  slug: "capabilities-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  admin: {
    preview: () => globalPreviewUrl("capabilities-page"),
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "subheadLine1", type: "text" },
        { name: "subheadLine2", type: "text" },
        { name: "body", type: "textarea" },
        { name: "primaryCtaLabel", type: "text" },
        { name: "primaryCtaHref", type: "text" },
        { name: "secondaryCtaLabel", type: "text" },
        { name: "secondaryCtaHref", type: "text" },
      ],
    },
    {
      name: "stackActivities",
      type: "array",
      labels: { singular: "Activity", plural: "Activities" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "mark", type: "text" },
      ],
    },
    {
      name: "journeyLabels",
      type: "array",
      labels: { singular: "Page label", plural: "On this page" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    ...editorialStatusFields,
    seoFields,
  ],
};
