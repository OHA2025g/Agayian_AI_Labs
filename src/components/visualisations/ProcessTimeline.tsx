"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export type TimelineStep = {
  title: string;
  objective: string;
  activities: string[];
  deliverable: string;
};

export function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <RevealGroup className="grid gap-4 md:grid-cols-5">
      {steps.map((step, index) => (
        <RevealItem key={step.title}>
          <div className="relative h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand-hover">
                {index + 1}
              </span>
              <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                {step.title}
              </h3>
            </div>
            <p className="text-sm text-muted-dark">{step.objective}</p>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-dark">
              {step.activities.map((activity) => (
                <li key={activity}>• {activity}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-medium text-cyan">
              Deliverable: {step.deliverable}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function ProcessTimelineReveal({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: TimelineStep[];
}) {
  return (
    <div>
      <Reveal>
        <h2 className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-semibold">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-muted-dark">{description}</p>
      </Reveal>
      <div className="mt-8">
        <ProcessTimeline steps={steps} />
      </div>
    </div>
  );
}
