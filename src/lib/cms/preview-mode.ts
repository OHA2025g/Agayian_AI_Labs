import { cookies } from "next/headers";

export const PREVIEW_COOKIE = "agrayian-preview";

export async function isPreviewMode() {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return false;
  try {
    const store = await cookies();
    return store.get(PREVIEW_COOKIE)?.value === secret;
  } catch {
    return false;
  }
}
