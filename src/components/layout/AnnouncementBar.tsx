import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ResolvedAnnouncement } from "@/lib/cms/site";

export function AnnouncementBar({
  announcement,
}: {
  announcement: ResolvedAnnouncement;
}) {
  if (!announcement.enabled) return null;

  return (
    <div className="relative z-50 border-b border-[var(--border-soft)] bg-[#f5f8fb] text-center text-xs text-navy">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2">
        <p>{announcement.message}</p>
        <Link
          href={announcement.href}
          className="inline-flex items-center gap-1 font-medium text-tech-blue transition hover:text-navy"
        >
          {announcement.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
