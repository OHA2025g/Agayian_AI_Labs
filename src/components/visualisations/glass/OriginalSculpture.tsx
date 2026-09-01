import Image from "next/image";
import { cn } from "@/lib/utils";
import { originalSculptureSize } from "@/config/mockup-assets";

type OriginalSculptureProps = {
  src: string;
  alt?: string;
  orientation?: "landscape" | "portrait";
  className?: string;
  priority?: boolean;
};

/**
 * Isolated original glass sculptures. Always shown at native aspect,
 * never upscaled past the generated pixel size.
 */
export function OriginalSculpture({
  src,
  alt = "",
  orientation = "landscape",
  className,
  priority = false,
}: OriginalSculptureProps) {
  const { width, height } = originalSculptureSize[orientation];

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      unoptimized
      priority={priority}
      className={cn("h-auto w-full max-w-full object-contain", className)}
    />
  );
}
