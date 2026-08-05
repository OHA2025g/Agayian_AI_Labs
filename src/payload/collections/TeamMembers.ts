import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    description:
      "Publish only verified people. Do not invent leadership biographies.",
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
    { name: "title", type: "text" },
    { name: "bio", type: "textarea" },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "order", type: "number", defaultValue: 0 },
    ...editorialStatusFields,
  ],
};
