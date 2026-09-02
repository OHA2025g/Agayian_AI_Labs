import Image from "next/image";
import { cn } from "@/lib/utils";

type WhiteSculptureProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  multiply?: boolean;
};

/**
 * Page-embedded sculpture. The frame stays transparent so the page
 * tint and grid show through; multiply only hides leftover studio pale.
 */
export function WhiteSculpture({
  src,
  alt = "",
  width = 1024,
  height = 1024,
  className,
  imageClassName,
  priority = false,
  multiply = true,
}: WhiteSculptureProps) {
  return (
    <div className={cn("relative bg-transparent", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={100}
        unoptimized
        priority={priority}
        style={{ backgroundColor: "transparent" }}
        className={cn(
          "h-auto w-full max-w-full bg-transparent object-contain",
          multiply && "mix-blend-multiply",
          imageClassName,
        )}
      />
    </div>
  );
}
