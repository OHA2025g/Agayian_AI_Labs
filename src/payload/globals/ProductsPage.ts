import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { editorialStatusFields } from "../fields/editorial";
import { seoFields } from "../fields/seo";
import { globalPreviewUrl } from "../lib/preview-url";

export const ProductsPage: GlobalConfig = {
  slug: "products-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  admin: {
    preview: () => globalPreviewUrl("products-page"),
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "title", type: "textarea" },
        { name: "description", type: "textarea" },
        { name: "searchPlaceholder", type: "text" },
      ],
    },
    {
      name: "architecture",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "coreTitle", type: "text" },
        { name: "coreSubtitle", type: "text" },
      ],
    },
    ...editorialStatusFields,
    seoFields,
  ],
};
