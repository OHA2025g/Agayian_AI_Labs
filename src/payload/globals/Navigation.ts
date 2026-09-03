import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";

const linkFields = [
  { name: "label", type: "text" as const, required: true as const },
  { name: "href", type: "text" as const, required: true as const },
  { name: "shortLabel", type: "text" as const },
];

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Header",
          fields: [
            {
              name: "main",
              type: "array",
              labels: { singular: "Link", plural: "Links" },
              admin: {
                description:
                  "Primary header links. Contact stays the red consultation button.",
              },
              fields: linkFields,
            },
            {
              name: "primaryCta",
              type: "group",
              label: "Consultation button",
              fields: [
                { name: "label", type: "text" },
                { name: "href", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Footer",
          fields: [
            { name: "footerCapabilities", type: "array", fields: linkFields },
            { name: "footerProducts", type: "array", fields: linkFields },
            { name: "footerIndustries", type: "array", fields: linkFields },
            { name: "footerCompany", type: "array", fields: linkFields },
            { name: "footerResources", type: "array", fields: linkFields },
          ],
        },
        {
          label: "Legal",
          fields: [
            { name: "footerLegal", type: "array", fields: linkFields },
          ],
        },
      ],
    },
  ],
};
