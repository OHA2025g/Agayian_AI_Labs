import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentUpdate,
  studioRead,
} from "../access";

export const ContentCalendar: CollectionConfig = {
  slug: "content-calendar",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "channel", "status", "scheduledAt"],
    description:
      "Plan LinkedIn, email, blog and web updates. This is an editorial calendar, not an auto-poster.",
  },
  access: {
    read: studioRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "channel",
      type: "select",
      required: true,
      options: [
        { label: "LinkedIn", value: "linkedin" },
        { label: "Instagram", value: "instagram" },
        { label: "YouTube", value: "youtube" },
        { label: "X", value: "x" },
        { label: "Blog / insights", value: "blog" },
        { label: "Email", value: "email" },
        { label: "Website", value: "website" },
        { label: "Event", value: "event" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "idea",
      options: [
        { label: "Idea", value: "idea" },
        { label: "Drafting", value: "drafting" },
        { label: "Scheduled", value: "scheduled" },
        { label: "Published", value: "published" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      name: "scheduledAt",
      type: "date",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    { name: "copy", type: "textarea" },
    { name: "publishedUrl", type: "text" },
    {
      name: "asset",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "campaign",
      type: "relationship",
      relationTo: "campaigns",
    },
    {
      name: "relatedInsight",
      type: "relationship",
      relationTo: "insights",
    },
    { name: "notes", type: "textarea" },
  ],
};
