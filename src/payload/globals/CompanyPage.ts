import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { pageBlocks } from "../blocks";
import { hideFromOrdinaryEditors } from "../fields/advanced";
import { editorialStatusFields } from "../fields/editorial";
import { seoFields } from "../fields/seo";
import { globalPreviewUrl } from "../lib/preview-url";

export const CompanyPage: GlobalConfig = {
  slug: "company-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  admin: {
    preview: () => globalPreviewUrl("company-page"),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            { name: "introduction", type: "textarea" },
            { name: "vision", type: "textarea" },
            { name: "mission", type: "textarea" },
            { name: "whyAgrayian", type: "text", hasMany: true },
          ],
        },
        {
          label: "Content",
          fields: [
            {
              name: "values",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea" },
              ],
            },
            { name: "deliveryPhilosophy", type: "text", hasMany: true },
            { name: "responsibleAiCommitment", type: "textarea" },
            { name: "technologyPhilosophy", type: "textarea" },
            { name: "careersCopy", type: "textarea" },
            { name: "partnerEcosystemCopy", type: "textarea" },
            {
              name: "howWeWork",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
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
          ],
        },
      ],
    },
  ],
};
