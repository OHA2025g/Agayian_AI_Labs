import type { Block } from "payload";
import { presentationFields } from "../fields/presentation";

/** Pre-approved section blocks only — no arbitrary CSS/JS. */
export const pageBlocks: Block[] = [
  {
    slug: "hero",
    labels: { singular: "Hero", plural: "Heroes" },
    fields: [
      { name: "eyebrow", type: "text" },
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
      { name: "primaryCtaLabel", type: "text" },
      { name: "primaryCtaHref", type: "text" },
      { name: "secondaryCtaLabel", type: "text" },
      { name: "secondaryCtaHref", type: "text" },
      ...presentationFields,
    ],
  },
  {
    slug: "richText",
    labels: { singular: "Rich text", plural: "Rich text" },
    fields: [{ name: "content", type: "richText", required: true }],
  },
  {
    slug: "cta",
    labels: { singular: "CTA", plural: "CTAs" },
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
      { name: "primaryLabel", type: "text" },
      { name: "primaryHref", type: "text" },
      { name: "secondaryLabel", type: "text" },
      { name: "secondaryHref", type: "text" },
    ],
  },
  {
    slug: "cardGrid",
    labels: { singular: "Card grid", plural: "Card grids" },
    fields: [
      { name: "eyebrow", type: "text" },
      { name: "title", type: "text" },
      { name: "description", type: "textarea" },
      {
        name: "cards",
        type: "array",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "body", type: "textarea" },
          { name: "href", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "faqList",
    labels: { singular: "FAQ list", plural: "FAQ lists" },
    fields: [
      { name: "title", type: "text" },
      {
        name: "faqs",
        type: "relationship",
        relationTo: "faqs",
        hasMany: true,
      },
    ],
  },
  {
    slug: "timeline",
    labels: { singular: "Timeline", plural: "Timelines" },
    fields: [
      { name: "title", type: "text" },
      {
        name: "steps",
        type: "array",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "description", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "metricStrip",
    labels: { singular: "Metric strip", plural: "Metric strips" },
    fields: [
      {
        name: "metrics",
        type: "array",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "value", type: "text", required: true },
          {
            name: "note",
            type: "text",
            admin: {
              description: "Must remain illustrative unless verified.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "productShowcase",
    labels: { singular: "Product showcase", plural: "Product showcases" },
    fields: [
      { name: "title", type: "text" },
      { name: "description", type: "textarea" },
      {
        name: "products",
        type: "relationship",
        relationTo: "products",
        hasMany: true,
      },
    ],
  },
  {
    slug: "insightList",
    labels: { singular: "Insight list", plural: "Insight lists" },
    fields: [
      { name: "title", type: "text" },
      {
        name: "insights",
        type: "relationship",
        relationTo: "insights",
        hasMany: true,
      },
    ],
  },
  {
    slug: "mediaFeature",
    labels: { singular: "Media feature", plural: "Media features" },
    fields: [
      { name: "title", type: "text" },
      { name: "body", type: "textarea" },
      { name: "media", type: "upload", relationTo: "media" },
    ],
  },
];
