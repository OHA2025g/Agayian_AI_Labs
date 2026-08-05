import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { pageBlocks } from "../blocks";
import { editorialStatusFields } from "../fields/editorial";
import { presentationFields } from "../fields/presentation";
import { seoFields } from "../fields/seo";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "headlineLine1", type: "text" },
        { name: "headlineLine2", type: "text" },
        { name: "supporting", type: "textarea" },
        { name: "primaryCtaLabel", type: "text" },
        { name: "primaryCtaHref", type: "text" },
        { name: "secondaryCtaLabel", type: "text" },
        { name: "secondaryCtaHref", type: "text" },
        { name: "trustLine", type: "text" },
      ],
    },
    {
      name: "layout",
      type: "blocks",
      blocks: pageBlocks,
    },
    ...presentationFields,
    ...editorialStatusFields,
    seoFields,
  ],
};
