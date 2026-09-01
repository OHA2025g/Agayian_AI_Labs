import { cn } from "@/lib/utils";
import { mockupAssets } from "@/config/mockup-assets";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";

/** Original glass thumbnail for insight cards. */
export function InsightGlassThumb({
  variant = 0,
  className,
  priority = false,
}: {
  variant?: number;
  className?: string;
  priority?: boolean;
}) {
  const src = mockupAssets.originalInsightThumbs[variant % 4];

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#f3f8fc]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,159,230,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(20,159,230,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 58%, #000 18%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 58%, #000 18%, transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] bottom-[6%] h-[42%]"
        style={{
          transform: "perspective(420px) rotateX(58deg)",
          transformOrigin: "50% 100%",
          backgroundImage:
            "linear-gradient(rgba(20,159,230,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(20,159,230,0.2) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.55) 8%, transparent 90%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.55) 8%, transparent 90%)",
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 160 120"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <circle cx="22" cy="28" r="2.1" fill="#149fe6" opacity="0.45" />
        <circle cx="138" cy="24" r="2.4" fill="#149fe6" opacity="0.4" />
        <circle cx="148" cy="72" r="2" fill="#ff4d5e" opacity="0.7" />
        <circle cx="18" cy="86" r="1.7" fill="#149fe6" opacity="0.35" />
        <path
          d="M22 28 C48 12, 112 10, 138 24"
          fill="none"
          stroke="#149fe6"
          strokeWidth="0.9"
          opacity="0.28"
        />
      </svg>
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <OriginalSculpture
          src={src}
          alt=""
          priority={priority}
          className="h-full w-full max-w-none scale-[1.12] object-contain"
        />
      </div>
    </div>
  );
}
