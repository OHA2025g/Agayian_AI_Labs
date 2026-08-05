import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/15 bg-white/5 text-muted-dark",
        brand: "border-brand/30 bg-brand/10 text-brand-hover",
        cyan: "border-cyan/30 bg-cyan/10 text-cyan",
        violet: "border-violet/30 bg-violet/10 text-violet",
        light: "border-border-light bg-surface-light text-muted-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
