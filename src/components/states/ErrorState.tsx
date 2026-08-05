import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error interrupted this view. You can try again or return home.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center px-6 py-20 text-center",
        className,
      )}
      role="alert"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        Error
      </p>
      <h2 className="mt-3 font-heading text-2xl font-semibold text-text-on-dark md:text-3xl">
        {title}
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-dark md:text-base">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {onRetry && (
          <PrimaryButton type="button" onClick={onRetry} showArrow={false}>
            Try again
          </PrimaryButton>
        )}
        <SecondaryButton href="/">Return home</SecondaryButton>
      </div>
    </div>
  );
}
