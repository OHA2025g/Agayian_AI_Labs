import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { pageBlocks } from "../blocks";
import { hideFromOrdinaryEditors } from "../fields/advanced";
import { editorialStatusFields } from "../fields/editorial";
import { presentationFields } from "../fields/presentation";
import { seoFields } from "../fields/seo";
import { globalPreviewUrl } from "../lib/preview-url";

export const GovernancePage: GlobalConfig = {
  slug: "governance-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  admin: {
    preview: () => globalPreviewUrl("governance-page"),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                { name: "title", type: "text" },
                { name: "subtitle", type: "text" },
                { name: "description", type: "textarea" },
                { name: "primaryCtaLabel", type: "text" },
                { name: "primaryCtaHref", type: "text" },
                { name: "secondaryCtaLabel", type: "text" },
                { name: "secondaryCtaHref", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Sections",
          fields: [
            { name: "pillarsTitle", type: "text" },
            { name: "raciTitle", type: "text" },
            { name: "raciDescription", type: "textarea" },
            { name: "commandTitle", type: "text" },
            { name: "commandDescription", type: "textarea" },
            { name: "engagementTitle", type: "text" },
            { name: "engagementDescription", type: "textarea" },
            { name: "ctaTitle", type: "text" },
            { name: "ctaDescription", type: "textarea" },
          ],
        },
        {
          label: "SEO",
          fields: [seoFields],
        },
        {
          label: "Publishing",
          fields: [...editorialStatusFields],
        },
        {
          label: "Advanced",
          fields: [
            hideFromOrdinaryEditors({ name: "title", type: "text" }),
            hideFromOrdinaryEditors({ name: "description", type: "textarea" }),
            hideFromOrdinaryEditors({
              name: "contentJson",
              type: "json",
              admin: { description: "Legacy JSON. Not rendered on the public page." },
            }),
            hideFromOrdinaryEditors({
              name: "layout",
              type: "blocks",
              blocks: pageBlocks,
            }),
            ...presentationFields.map(hideFromOrdinaryEditors),
          ],
        },
      ],
    },
  ],
};
