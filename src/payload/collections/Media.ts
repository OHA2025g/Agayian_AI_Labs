import type { CollectionConfig } from "payload";
import { mediaMutate } from "../access";
import { auditAfterChange, auditAfterDelete } from "../hooks/collection-audit";

const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const MAX_BYTES = 25 * 1024 * 1024;

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: mediaMutate,
    update: mediaMutate,
    delete: mediaMutate,
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "mimeType", "filesize", "updatedAt"],
  },
  upload: {
    staticDir: "media",
    mimeTypes: ALLOWED_MIME,
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800, height: 450, position: "centre" },
      { name: "og", width: 1200, height: 630, position: "centre" },
    ],
    adminThumbnail: "thumbnail",
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        if (operation === "create" && args.req?.file) {
          const file = args.req.file as { size?: number; mimetype?: string };
          if (file.size && file.size > MAX_BYTES) {
            throw new Error("File exceeds 25MB limit.");
          }
          if (file.mimetype && !ALLOWED_MIME.includes(file.mimetype)) {
            throw new Error("File type is not allowed.");
          }
        }
        return args;
      },
    ],
    afterChange: [auditAfterChange],
    afterDelete: [auditAfterDelete],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Required for accessibility on images.",
      },
    },
    { name: "caption", type: "textarea" },
    {
      name: "credit",
      type: "text",
    },
  ],
};
