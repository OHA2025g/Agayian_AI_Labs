import type { ArrayField, Field } from "payload";

export function titledItems(name: string, extra: Field[] = []): ArrayField {
  return {
    name,
    type: "array",
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
      { name: "icon", type: "text" },
      ...extra,
    ],
  };
}

export function labeledItems(name: string): ArrayField {
  return {
    name,
    type: "array",
    fields: [
      { name: "label", type: "text", required: true },
      { name: "icon", type: "text" },
    ],
  };
}

export function faqArray(name = "faqItems"): ArrayField {
  return {
    name,
    type: "array",
    fields: [
      { name: "question", type: "text", required: true },
      { name: "answer", type: "textarea", required: true },
    ],
  };
}
