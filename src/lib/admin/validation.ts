import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isUniqueSlug(
  slug: string,
  existing: string[],
  current?: string,
) {
  if (!slug) return false;
  return existing
    .filter((item) => item !== current)
    .every((item) => item !== slug);
}

const ADMIN_ROLES = [
  "super_admin",
  "administrator",
  "editor",
  "reviewer",
  "publisher",
  "enquiry_manager",
  "media_manager",
  "viewer",
] as const;

export const PUBLISH_STATES = [
  "draft",
  "in_review",
  "approved",
  "published",
  "archived",
] as const;

export function canTransitionPublish(
  from: string,
  to: string,
  canPublish: boolean,
) {
  if (!PUBLISH_STATES.includes(to as (typeof PUBLISH_STATES)[number])) {
    return false;
  }
  if (to === "published" || to === "archived") return canPublish;
  if (from === "published" && to !== "published") return canPublish;
  return true;
}

const RESOURCE_HREF = /^\/resources(\/|$)/i;

export function rejectsResourcesLink(label: string, href: string) {
  if (label.trim().toLowerCase() === "resources") return true;
  return RESOURCE_HREF.test(href.trim());
}

export function detectRedirectLoop(
  redirects: Array<{ from: string; to: string; enabled?: boolean }>,
) {
  const map = new Map(
    redirects
      .filter((item) => item.enabled !== false)
      .map((item) => [item.from, item.to]),
  );
  for (const start of map.keys()) {
    const seen = new Set<string>();
    let current = start;
    while (map.has(current)) {
      if (seen.has(current)) return true;
      seen.add(current);
      current = map.get(current) ?? "";
    }
  }
  return false;
}

export function validateInternalHref(href: string) {
  if (!href.startsWith("/")) return href.startsWith("http");
  return !RESOURCE_HREF.test(href);
}

export { ADMIN_ROLES };
