"use client";

import { usePathname } from "next/navigation";

/**
 * Route change marker for analytics/keying without opacity fades.
 * Framer opacity enter animations were stranding content at opacity:0
 * (blank main) in Chromium/Playwright and risked the same for users.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return <div key={pathname}>{children}</div>;
}
