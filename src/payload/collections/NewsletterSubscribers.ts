import type { CollectionConfig } from "payload";
import { enquiryAccess, enquiryMutate } from "../access";

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "status", "createdAt"],
  },
  access: {
    read: enquiryAccess,
    create: () => true,
    update: enquiryMutate,
    delete: enquiryMutate,
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Unsubscribed", value: "unsubscribed" },
      ],
    },
  ],
};
