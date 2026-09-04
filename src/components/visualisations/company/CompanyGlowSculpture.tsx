import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CompanySculptureAsset } from "@/config/company-sculptures";

export function CompanyGlowSculpture({
  asset,
  priority = false,
  className,
  sizes = "(max-width: 1024px) 90vw, 40vw",
}: {
  asset: CompanySculptureAsset;
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
        "h-auto w-full bg-transparent object-contain opacity-[0.78] saturate-[0.75]",
        className,
      )}
    />
  );
}
