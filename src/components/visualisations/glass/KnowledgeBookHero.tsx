import { cn } from "@/lib/utils";
import { mockupAssets } from "@/config/mockup-assets";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";

/** Original glass book sculpture with live HTML knowledge chips. */
export function KnowledgeBookHero({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_24px_60px_rgba(7,26,61,0.1)]",
        className,
      )}
    >
      <OriginalSculpture
        src={mockupAssets.originalInsightsBook}
        alt="Open glass book of operating knowledge"
        priority
      />

      <div className="absolute left-4 top-6 rounded-lg border border-white/85 bg-white/90 px-2.5 py-1.5 text-[0.65rem] font-semibold text-navy shadow-sm backdrop-blur-md">
        Frameworks
      </div>
      <div className="absolute right-4 top-16 rounded-lg border border-white/85 bg-white/90 px-2.5 py-1.5 text-[0.65rem] font-semibold text-navy shadow-sm backdrop-blur-md">
        Operating notes
      </div>
      <div className="absolute bottom-6 right-6 rounded-lg border border-white/85 bg-white/90 px-2.5 py-1.5 text-[0.65rem] font-semibold text-navy shadow-sm backdrop-blur-md">
        Governance
      </div>
    </div>
  );
}
