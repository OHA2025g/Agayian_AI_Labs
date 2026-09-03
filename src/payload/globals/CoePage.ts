import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { pageBlocks } from "../blocks";
import { hideFromOrdinaryEditors } from "../fields/advanced";
import { editorialStatusFields } from "../fields/editorial";
import { presentationFields } from "../fields/presentation";
import { seoFields } from "../fields/seo";
import { globalPreviewUrl } from "../lib/preview-url";

export const CoePage: GlobalConfig = {
  slug: "coe-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  admin: {
    preview: () => globalPreviewUrl("coe-page"),
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
                { name: "eyebrow", type: "text" },
                { name: "title", type: "text" },
                { name: "description", type: "textarea" },
                { name: "primaryCtaLabel", type: "text" },
                { name: "primaryCtaHref", type: "text" },
                { name: "secondaryCtaLabel", type: "text" },
                { name: "secondaryCtaHref", type: "text" },
              ],
            },
            { name: "outcomesTitle", type: "text" },
          ],
        },
        {
          label: "Sections",
          fields: [
            { name: "whatTitle", type: "text" },
            { name: "whatBody", type: "textarea" },
            { name: "whyTitle", type: "text" },
            { name: "whyBody", type: "textarea" },
            { name: "operatingTitle", type: "text" },
            { name: "operatingDescription", type: "textarea" },
            { name: "ideaTitle", type: "text" },
            { name: "ideaDescription", type: "textarea" },
            { name: "pillarsTitle", type: "text" },
            { name: "pillarsDescription", type: "textarea" },
            { name: "maturityTitle", type: "text" },
            { name: "maturityDescription", type: "textarea" },
            { name: "roadmapTitle", type: "text" },
            { name: "roadmapDescription", type: "textarea" },
            { name: "ctaTitle", type: "text" },
            { name: "ctaDescription", type: "textarea" },
            {
              name: "faqs",
              type: "relationship",
              relationTo: "faqs",
              hasMany: true,
            },
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
            hideFromOrdinaryEditors({
              name: "title",
              type: "text",
              admin: { description: "Legacy title field." },
            }),
            hideFromOrdinaryEditors({
              name: "description",
              type: "textarea",
            }),
            hideFromOrdinaryEditors({
              name: "contentJson",
              type: "json",
              admin: { description: "Legacy structured content. Not rendered on the public page." },
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
