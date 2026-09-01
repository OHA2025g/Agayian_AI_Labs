import { cn } from "@/lib/utils";

type MockupCardProps = {
  children: React.ReactNode;
  className?: string;
};

/** Light mockup card — white, soft border, no frosted glass chrome. */
export function MockupCard({ children, className }: MockupCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#e8eef5] bg-white shadow-[0_10px_30px_rgba(11,31,58,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(11,31,58,0.09)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
