import type { CollectionConfig } from "payload";
import {
  contentCreate,
  contentDelete,
  contentUpdate,
  studioRead,
} from "../access";

function buildTrackingUrl(data: {
  landingUrl?: string | null;
  code?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
}) {
  const raw = data.landingUrl?.trim();
  if (!raw) return undefined;
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://agrayian.ai";
  const absolute = raw.startsWith("http")
    ? raw
    : `${origin}${raw.startsWith("/") ? raw : `/${raw}`}`;
  try {
    const url = new URL(absolute);
    if (data.utmSource) url.searchParams.set("utm_source", data.utmSource);
    if (data.utmMedium) url.searchParams.set("utm_medium", data.utmMedium);
    const campaign = data.utmCampaign || data.code;
    if (campaign) url.searchParams.set("utm_campaign", campaign);
    if (data.utmContent) url.searchParams.set("utm_content", data.utmContent);
    if (data.utmTerm) url.searchParams.set("utm_term", data.utmTerm);
    return url.toString();
  } catch {
    return raw;
  }
}

export const Campaigns: CollectionConfig = {
  slug: "campaigns",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "channel", "status", "startDate"],
    description:
      "Plan paid, organic and email campaigns. The tracking URL is built from the landing page and UTM fields.",
  },
  access: {
    read: studioRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const trackingUrl = buildTrackingUrl(data);
        return trackingUrl ? { ...data, trackingUrl } : data;
      },
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Campaign",
          fields: [
            { name: "name", type: "text", required: true },
            {
              name: "code",
              type: "text",
              admin: {
                description: "Short code used as utm_campaign when that field is empty.",
              },
            },
            {
              name: "channel",
              type: "select",
              required: true,
              options: [
                { label: "Google Ads", value: "google_ads" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "Email", value: "email" },
                { label: "Organic search", value: "organic" },
                { label: "Social", value: "social" },
                { label: "Event", value: "event" },
                { label: "Partner", value: "partner" },
                { label: "Other", value: "other" },
              ],
            },
            {
              name: "status",
              type: "select",
              required: true,
              defaultValue: "planned",
              options: [
                { label: "Planned", value: "planned" },
                { label: "Live", value: "live" },
                { label: "Paused", value: "paused" },
                { label: "Completed", value: "completed" },
              ],
            },
            { name: "objective", type: "textarea" },
            {
              name: "landingUrl",
              type: "text",
              required: true,
              admin: {
                description: "Path or full URL, e.g. /contact?interest=consultation",
              },
            },
            {
              name: "trackingUrl",
              type: "text",
              admin: {
                readOnly: true,
                description: "Generated on save from the landing URL and UTM fields.",
              },
            },
          ],
        },
        {
          label: "UTM tracking",
          fields: [
            { name: "utmSource", type: "text" },
            { name: "utmMedium", type: "text" },
            { name: "utmCampaign", type: "text" },
            { name: "utmContent", type: "text" },
            { name: "utmTerm", type: "text" },
          ],
        },
        {
          label: "Schedule & notes",
          fields: [
            {
              type: "row",
              fields: [
                { name: "startDate", type: "date", admin: { width: "50%" } },
                { name: "endDate", type: "date", admin: { width: "50%" } },
              ],
            },
            { name: "budgetNote", type: "text" },
            { name: "notes", type: "textarea" },
            {
              name: "relatedInsight",
              type: "relationship",
              relationTo: "insights",
            },
          ],
        },
      ],
    },
  ],
};
