import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";

export const Partners: CollectionConfig = {
  slug: "partners",
  admin: {
    useAsTitle: "name",
    description: "Publish only when agreements allow public reference.",
  },
  versions: { drafts: true },
  access: {
    read: contentRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    slugField(),
    { name: "name", type: "text", required: true },
    { name: "summary", type: "textarea" },
    { name: "website", type: "text" },
    { name: "logo", type: "upload", relationTo: "media" },
    ...editorialStatusFields,
  ],
};
