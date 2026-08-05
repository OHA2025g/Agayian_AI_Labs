import Link from "next/link";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function SecondaryButton({
  href,
  children,
  className,
  type = "button",
  onClick,
}: SecondaryButtonProps) {
  const classes = cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 text-sm font-semibold text-text-on-dark transition hover:border-cyan/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
