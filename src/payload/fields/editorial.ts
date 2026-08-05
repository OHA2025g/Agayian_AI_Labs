import type { Field } from "payload";
import { statusFieldAccess } from "../access";

export const slugField = (unique = true): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique,
  index: true,
  admin: {
    position: "sidebar",
  },
});

export const editorialStatusFields: Field[] = [
  {
    name: "status",
    type: "select",
    required: true,
    defaultValue: "draft",
    options: [
      { label: "Draft", value: "draft" },
      { label: "In Review", value: "in_review" },
      { label: "Approved", value: "approved" },
      { label: "Published", value: "published" },
      { label: "Archived", value: "archived" },
    ],
    access: {
      update: statusFieldAccess,
    },
    admin: {
      position: "sidebar",
    },
  },
  {
    name: "publishedAt",
    type: "date",
    admin: {
      position: "sidebar",
      date: { pickerAppearance: "dayAndTime" },
    },
  },
  {
    name: "scheduledPublishAt",
    type: "date",
    admin: {
      position: "sidebar",
      date: { pickerAppearance: "dayAndTime" },
      description: "When set in the future, a secured cron can promote to published.",
    },
  },
];
