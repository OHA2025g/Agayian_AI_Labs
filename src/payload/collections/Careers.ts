import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";

export const Careers: CollectionConfig = {
  slug: "careers",
  admin: {
    useAsTitle: "title",
    description: "Only list roles approved for public posting.",
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
    { name: "title", type: "text", required: true },
    { name: "location", type: "text" },
    { name: "employmentType", type: "text" },
    { name: "summary", type: "textarea" },
    { name: "description", type: "richText" },
    ...editorialStatusFields,
  ],
};
