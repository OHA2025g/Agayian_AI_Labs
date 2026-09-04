import type { CollectionConfig } from "payload";
import {
  PRODUCT_CATEGORY_OPTIONS,
  normalizeProductCategories,
} from "@/lib/products/categories";
import {
  contentCreate,
  contentDelete,
  contentRead,
  contentUpdate,
} from "../access";
import { editorialStatusFields, slugField } from "../fields/editorial";
import { seoFields } from "../fields/seo";
import { collectionPreviewUrl } from "../lib/preview-url";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status", "featured"],
    preview: (doc) => collectionPreviewUrl("products", doc?.slug),
  },
  versions: { drafts: true, maxPerDoc: 25 },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const categories = normalizeProductCategories(
          data.categories ?? data.category,
          typeof data.slug === "string" ? data.slug : undefined,
        );
        data.categories = categories;
        if (!data.category && categories[0]) {
          data.category = categories[0];
        }
        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        doc.categories = normalizeProductCategories(
          doc.categories ?? doc.category,
          typeof doc.slug === "string" ? doc.slug : undefined,
        );
        return doc;
      },
    ],
  },
  access: {
    read: contentRead,
    create: contentCreate,
    update: contentUpdate,
    delete: contentDelete,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            { name: "name", type: "text", required: true },
            {
              name: "categories",
              type: "select",
              label: "Categories",
              required: true,
              hasMany: true,
              options: PRODUCT_CATEGORY_OPTIONS,
              admin: {
                description:
                  "A product can belong to more than one filter on the Products page.",
              },
            },
            {
              name: "category",
              type: "text",
              label: "Display category",
              admin: {
                description:
                  "Optional badge label. Leave blank to use the first selected category.",
              },
            },
            { name: "shortDescription", type: "textarea", required: true },
            { name: "featured", type: "checkbox", defaultValue: false },
            {
              name: "productStatus",
              type: "text",
              label: "Product Availability",
            },
          ],
        },
        {
          label: "Content",
          fields: [
            { name: "valueProposition", type: "textarea" },
            { name: "businessProblem", type: "textarea" },
            { name: "solutionOverview", type: "textarea" },
            { name: "industries", type: "text", hasMany: true },
            { name: "technologies", type: "text", hasMany: true },
            { name: "targetUsers", type: "text", hasMany: true },
            { name: "outcomes", type: "text", hasMany: true },
            { name: "dataSources", type: "text", hasMany: true },
            { name: "aiCapabilities", type: "text", hasMany: true },
            { name: "governance", type: "text", hasMany: true },
            { name: "architecture", type: "text", hasMany: true },
            { name: "deploymentOptions", type: "text", hasMany: true },
            {
              name: "modules",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea" },
              ],
            },
            {
              name: "workflow",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea" },
              ],
            },
          ],
        },
        {
          label: "Relationships",
          fields: [
            { name: "capabilities", type: "text", hasMany: true },
            {
              name: "relatedCapabilities",
              type: "text",
              hasMany: true,
              label: "Related Capabilities",
            },
          ],
        },
        {
          label: "SEO",
          fields: [seoFields],
        },
        {
          label: "Publishing",
          fields: [slugField(), ...editorialStatusFields],
        },
      ],
    },
  ],
};
