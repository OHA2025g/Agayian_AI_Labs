const BLOCKED_PREFIXES = ["/admin", "/cms-api", "/api", "/_next"];

export function isSafeRedirectFrom(from: string) {
  if (!from.startsWith("/") || from.startsWith("//")) return false;
  return !BLOCKED_PREFIXES.some(
    (prefix) => from === prefix || from.startsWith(`${prefix}/`),
  );
}

export function isSafeRedirectTo(to: string) {
  if (to.startsWith("/") && !to.startsWith("//")) {
    return isSafeRedirectFrom(to) || to === "/";
  }
  try {
    const url = new URL(to);
    const allowed = ["agrayian.ai", "www.agrayian.ai"];
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    if (site) {
      try {
        allowed.push(new URL(site).hostname);
      } catch {
        /* ignore */
      }
    }
    return allowed.includes(url.hostname);
  } catch {
    return false;
  }
}
