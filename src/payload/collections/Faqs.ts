import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields } from "../fields/editorial";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  admin: { useAsTitle: "question" },
  versions: { drafts: true },
  access: {
    read: contentRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "placement",
      type: "select",
      hasMany: true,
      options: [
        { label: "Contact", value: "contact" },
        { label: "AI CoE", value: "coe" },
        { label: "Governance", value: "governance" },
        { label: "Products", value: "products" },
        { label: "Company", value: "company" },
        { label: "General", value: "general" },
      ],
    },
    ...editorialStatusFields,
  ],
};
