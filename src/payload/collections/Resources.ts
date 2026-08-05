import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";

export const Resources: CollectionConfig = {
  slug: "resources",
  admin: { useAsTitle: "title" },
  versions: { drafts: true },
  access: {
    read: contentRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    slugField(),
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "file", type: "upload", relationTo: "media", required: true },
    { name: "category", type: "text" },
    ...editorialStatusFields,
  ],
};
