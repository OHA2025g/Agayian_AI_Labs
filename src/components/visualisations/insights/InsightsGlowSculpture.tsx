import Image from "next/image";
import { cn } from "@/lib/utils";
import type { InsightSculptureAsset } from "@/config/insight-sculptures";

export function InsightsGlowSculpture({
  asset,
  priority = false,
  className,
  sizes = "(max-width: 1024px) 92vw, 42vw",
}: {
  asset: InsightSculptureAsset;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      quality={100}
      unoptimized
      priority={priority}
      sizes={sizes}
      style={{ backgroundColor: "transparent" }}
      className={cn(
        "h-auto w-full bg-transparent object-contain opacity-[0.8] saturate-[0.7]",
        className,
      )}
    />
  );
}
