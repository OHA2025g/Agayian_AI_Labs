import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brandCopy } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-white/10 bg-bg-elevated/90 text-center text-xs text-muted-dark backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2">
        <p>{brandCopy.announcement}</p>
        <Link
          href="/ai-centre-of-excellence"
          className="inline-flex items-center gap-1 font-medium text-cyan transition hover:text-white"
        >
          Explore AI CoE
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
