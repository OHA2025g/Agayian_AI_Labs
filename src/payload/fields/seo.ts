import type { Field } from "payload";

export const seoFields: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
