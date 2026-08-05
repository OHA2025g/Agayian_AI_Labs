import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields } from "../fields/editorial";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "quote" },
  versions: { drafts: true },
  access: {
    read: contentRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "attribution", type: "text" },
    { name: "organisation", type: "text" },
    { name: "role", type: "text" },
    ...editorialStatusFields,
  ],
};
