import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { pageBlocks } from "../blocks";
import { editorialStatusFields } from "../fields/editorial";
import { seoFields } from "../fields/seo";

export const CompanyPage: GlobalConfig = {
  slug: "company-page",
  versions: { drafts: true },
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  fields: [
    { name: "vision", type: "textarea" },
    { name: "mission", type: "textarea" },
    { name: "introduction", type: "textarea" },
    { name: "whyAgrayian", type: "text", hasMany: true },
    { name: "deliveryPhilosophy", type: "text", hasMany: true },
    { name: "responsibleAiCommitment", type: "textarea" },
    { name: "technologyPhilosophy", type: "textarea" },
    { name: "careersCopy", type: "textarea" },
    { name: "partnerEcosystemCopy", type: "textarea" },
    {
      name: "values",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    { name: "layout", type: "blocks", blocks: pageBlocks },
    ...editorialStatusFields,
    seoFields,
  ],
};
