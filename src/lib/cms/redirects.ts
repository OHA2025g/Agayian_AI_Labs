import { cache } from "react";
import { getPayloadClient, isPayloadSkipped } from "@/lib/payload";
import {
  isSafeRedirectFrom,
  isSafeRedirectTo,
} from "@/payload/lib/safe-redirect";

export type CmsRedirect = {
  fromPath: string;
  toPath: string;
  type: "301" | "302";
};

export const getEnabledRedirects = cache(async (): Promise<CmsRedirect[]> => {
  if (isPayloadSkipped()) return [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "redirects",
      depth: 0,
      limit: 200,
      where: { enabled: { equals: true } },
      overrideAccess: false,
    });
    return result.docs
      .map((doc) => {
        const fromPath = String(doc.fromPath || "").trim();
        const toPath = String(doc.toPath || "").trim();
        const type = doc.type === "302" ? "302" : "301";
        if (!isSafeRedirectFrom(fromPath) || !isSafeRedirectTo(toPath)) {
          return null;
        }
        return { fromPath, toPath, type } satisfies CmsRedirect;
      })
      .filter((item): item is CmsRedirect => Boolean(item));
  } catch {
    return [];
  }
});

export async function matchRedirect(pathname: string) {
  if (!pathname || pathname === "/") return null;
  const redirects = await getEnabledRedirects();
  return redirects.find((item) => item.fromPath === pathname) ?? null;
}
