export const CTA = {
  primary: {
    label: "Discuss Your AI Initiative",
    href: "/contact?interest=consultation",
  },
  secondary: {
    label: "Explore Our Solutions",
    href: "/products",
  },
  demo: {
    label: "Request a Product Demo",
    href: "/contact?interest=demo",
  },
  challenge: {
    label: "Submit Your Business Challenge",
    href: "/contact?interest=challenge",
  },
} as const;

function normalizeCtaKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/\s+/g, " ");
}

const STALE_PRIMARY_LABELS = new Set([
  "book a consultation",
  "book consultation",
  "book a consult",
]);

const STALE_SECONDARY_LABELS = new Set([
  "explore capabilities",
  "explore our capabilities",
]);

/** Prefer the canonical primary CTA when CMS still stores the old consultation label. */
export function resolvePrimaryCtaLabel(value: unknown): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text || STALE_PRIMARY_LABELS.has(normalizeCtaKey(text))) {
    return CTA.primary.label;
  }
  return text;
}

/** Prefer the canonical secondary CTA when CMS still stores the old capabilities label. */
export function resolveSecondaryCtaLabel(value: unknown): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text || STALE_SECONDARY_LABELS.has(normalizeCtaKey(text))) {
    return CTA.secondary.label;
  }
  return text;
}
