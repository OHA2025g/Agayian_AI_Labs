import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { pageBlocks } from "../blocks";
import { hideFromOrdinaryEditors } from "../fields/advanced";
import { editorialStatusFields } from "../fields/editorial";
import { presentationFields } from "../fields/presentation";
import { seoFields } from "../fields/seo";
import { globalPreviewUrl } from "../lib/preview-url";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  admin: {
    preview: () => globalPreviewUrl("home-page"),
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
          ],
        },
        {
          label: "Sections",
          fields: [
            {
              name: "sections",
              type: "group",
              fields: [
                { name: "ambition", type: "text", label: "Ambition title" },
                { name: "products", type: "text", label: "Products title" },
                { name: "industries", type: "text", label: "Industries title" },
                { name: "responsible", type: "text", label: "Responsible AI title" },
                { name: "insights", type: "text", label: "Insights title" },
              ],
            },
            {
              name: "featuredProducts",
              type: "relationship",
              relationTo: "products",
              hasMany: true,
            },
            {
              name: "featuredInsights",
              type: "relationship",
              relationTo: "insights",
              hasMany: true,
            },
            {
              name: "finalCta",
              type: "group",
              fields: [
                { name: "title", type: "text" },
                { name: "description", type: "textarea" },
              ],
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
