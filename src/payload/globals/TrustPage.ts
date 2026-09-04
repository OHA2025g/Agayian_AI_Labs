import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { editorialStatusFields } from "../fields/editorial";
import { seoFields } from "../fields/seo";
import { titledItems } from "../fields/repeatable";
import { globalPreviewUrl } from "../lib/preview-url";

export const TrustPage: GlobalConfig = {
  slug: "trust-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  admin: {
    preview: () => globalPreviewUrl("trust-page"),
  },
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    { name: "intro", type: "textarea" },
    titledItems("principles"),
    { name: "ctaTitle", type: "text" },
    { name: "ctaDescription", type: "textarea" },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    ...editorialStatusFields,
    seoFields,
  ],
};
