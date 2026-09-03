import type { CollectionConfig } from "payload";
import { enquiryAccess, enquiryMutate } from "../access";
import { logAudit } from "../hooks/audit";

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "type", "status", "assignee", "createdAt"],
  },
  access: {
    read: enquiryAccess,
    create: () => true,
    update: enquiryMutate,
    delete: enquiryMutate,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === "update") {
          await logAudit(req, {
            action: "enquiry.update",
            collection: "enquiries",
            documentId: String(doc.id),
            summary: `Updated enquiry ${doc.reference || doc.id}`,
            meta: { status: doc.status },
          });
        }
      },
    ],
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Contact", value: "contact" },
        { label: "Product demo", value: "demo" },
        { label: "Consultation", value: "consultation" },
        { label: "Career application", value: "career" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In progress", value: "in_progress" },
        { label: "Waiting on client", value: "waiting" },
        { label: "Closed", value: "closed" },
        { label: "Spam", value: "spam" },
      ],
    },
    { name: "reference", type: "text", index: true },
    { name: "fullName", type: "text", required: true },
    { name: "workEmail", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "organisation", type: "text" },
    { name: "designation", type: "text" },
    { name: "country", type: "text" },
    { name: "areaOfInterest", type: "text" },
    { name: "projectSummary", type: "textarea" },
    { name: "preferredContactMethod", type: "text" },
    { name: "product", type: "text" },
    { name: "capability", type: "text" },
    { name: "careerRole", type: "text" },
    {
      name: "assignee",
      type: "relationship",
      relationTo: "users",
    },
    {
      type: "collapsible",
      label: "Campaign attribution",
      admin: { initCollapsed: true },
      fields: [
        { name: "utmSource", type: "text" },
        { name: "utmMedium", type: "text" },
        { name: "utmCampaign", type: "text" },
        { name: "utmContent", type: "text" },
        { name: "utmTerm", type: "text" },
        { name: "landingPath", type: "text" },
        {
          name: "campaign",
          type: "relationship",
          relationTo: "campaigns",
        },
      ],
    },
    {
      name: "notes",
      type: "array",
      fields: [
        { name: "body", type: "textarea", required: true },
        { name: "createdAt", type: "date", admin: { readOnly: true } },
      ],
    },
  ],
};
