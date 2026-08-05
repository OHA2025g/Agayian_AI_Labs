import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { pageBlocks } from "../blocks";
import { editorialStatusFields } from "../fields/editorial";
import { presentationFields } from "../fields/presentation";
import { seoFields } from "../fields/seo";

export const GovernancePage: GlobalConfig = {
  slug: "governance-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    { name: "contentJson", type: "json" },
    { name: "layout", type: "blocks", blocks: pageBlocks },
    ...presentationFields,
    ...editorialStatusFields,
    seoFields,
  ],
};
