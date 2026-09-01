import { cn } from "@/lib/utils";

const tiles = [
  {
    title: "Planning",
    body: "Scope, risk class and evidence plan before fieldwork starts.",
  },
  {
    title: "Evidence",
    body: "Source documents, samples and working papers in one trail.",
  },
  {
    title: "Testing",
    body: "Control tests and exceptions queued for human review.",
  },
  {
    title: "Reporting",
    body: "Findings, residual risk and sign-off packaged for assurance.",
  },
] as const;

/** Labeled illustrative OneTouch panel — no fake auditor names or KPIs. */
export function OneTouchSpotlight({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#dce8f2] bg-[#f6fbff] p-4 md:p-5",
        className,
      )}
    >
      <p className="font-tech text-[0.6rem] uppercase tracking-[0.18em] text-muted-light">
        Illustrative preview · sample layout only
      </p>
      <div className="mt-3 rounded-xl border border-[#e8eef5] bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-heading text-sm font-semibold text-navy">
            OneTouch Audit
          </p>
          <span className="rounded-full bg-cyan/10 px-2 py-0.5 text-[0.65rem] font-semibold text-cyan">
            Assurance workspace
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {tiles.map((tile) => (
            <article
              key={tile.title}
              className="rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-3"
            >
              <p className="text-xs font-semibold text-navy">{tile.title}</p>
              <p className="mt-1 text-[0.7rem] leading-relaxed text-muted-light">
                {tile.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
