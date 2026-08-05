import type { GlobalConfig } from "payload";
import { globalRead, contentUpdate } from "../access";
import { editorialStatusFields } from "../fields/editorial";
import { seoFields } from "../fields/seo";

function legalGlobal(slug: string, label: string): GlobalConfig {
  return {
    slug,
    label,
    versions: { drafts: true },
    access: {
      read: globalRead,
      update: contentUpdate,
    },
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
      { name: "body", type: "richText" },
      {
        name: "sections",
        type: "array",
        fields: [
          { name: "heading", type: "text", required: true },
          { name: "body", type: "textarea", required: true },
        ],
      },
      ...editorialStatusFields,
      seoFields,
    ],
  };
}

export const PrivacyPolicy = legalGlobal("privacy-policy", "Privacy Policy");
export const TermsOfUse = legalGlobal("terms-of-use", "Terms of Use");
export const ResponsibleAi = legalGlobal(
  "responsible-ai",
  "Responsible AI Statement",
);
export const CookiePolicy = legalGlobal("cookie-policy", "Cookie Policy");
export const AccessibilityStatement = legalGlobal(
  "accessibility-statement",
  "Accessibility Statement",
);
