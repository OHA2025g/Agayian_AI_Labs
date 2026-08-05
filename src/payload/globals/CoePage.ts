import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { pageBlocks } from "../blocks";
import { editorialStatusFields } from "../fields/editorial";
import { presentationFields } from "../fields/presentation";
import { seoFields } from "../fields/seo";

export const CoePage: GlobalConfig = {
  slug: "coe-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    { name: "contentJson", type: "json", admin: { description: "Migrated structured CoE page content." } },
    { name: "layout", type: "blocks", blocks: pageBlocks },
    ...presentationFields,
    ...editorialStatusFields,
    seoFields,
  ],
};
