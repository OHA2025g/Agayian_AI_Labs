import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";

const linkFields = [
  { name: "label", type: "text" as const, required: true as const },
  { name: "href", type: "text" as const, required: true as const },
];

export const Navigation: GlobalConfig = {
  slug: "navigation",
  access: {
    read: globalRead,
    update: contentUpdate,
  },
  fields: [
    { name: "main", type: "array", fields: linkFields },
    { name: "capabilityNav", type: "array", fields: linkFields },
    { name: "footerCapabilities", type: "array", fields: linkFields },
    { name: "footerExplore", type: "array", fields: linkFields },
    { name: "footerContact", type: "array", fields: linkFields },
    { name: "footerLegal", type: "array", fields: linkFields },
    { name: "capabilityRibbon", type: "text", hasMany: true },
  ],
};
