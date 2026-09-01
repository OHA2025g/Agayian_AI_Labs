import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  showArrow?: boolean;
};

export function SecondaryButton({
  href,
  children,
  className,
  type = "button",
  onClick,
  showArrow = true,
}: SecondaryButtonProps) {
  const classes = cn(
    "group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-light)] bg-white px-7 text-sm font-semibold text-navy shadow-[0_8px_24px_rgba(7,26,61,0.06)] transition hover:border-tech-blue/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech-blue",
    className,
  );

  const content = (
    <>
      {children}
      {showArrow ? (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
