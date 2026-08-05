"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  ensureGsap,
  getStaticScrollModeSnapshot,
  gsap,
  subscribeStaticScrollMode,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

const stages = [
  {
    id: "ideate",
    label: "Ideate",
    note: "Capture purpose, users, data touchpoints and decision impact before build begins.",
  },
  {
    id: "classify",
    label: "Classify",
    note: "Assign risk tier using decision impact, data sensitivity, autonomy and reversibility.",
    tag: "Risk",
  },
  {
    id: "assess",
    label: "Assess",
    note: "Document evaluation plan, fairness questions, privacy scope and residual risks.",
    tag: "Risk",
  },
  {
    id: "approve",
    label: "Approve",
    note: "Named sponsor and governance forum sign-off with explicit success criteria.",
    tag: "Human approval",
  },
  {
    id: "develop",
    label: "Develop",
    note: "Implement controls, logging, human-oversight pathways and evaluation evidence in build.",
  },
  {
    id: "validate",
    label: "Validate",
    note: "Test against agreed thresholds; record limitations and known failure modes.",
    tag: "Human approval",
  },
  {
    id: "deploy",
    label: "Deploy",
    note: "Release readiness review confirms monitoring, documentation and operational ownership.",
  },
  {
    id: "monitor",
    label: "Monitor",
    note: "Observe drift, misuse, fairness signals and control failures with defined escalation.",
  },
  {
    id: "audit",
    label: "Audit",
    note: "Retain intake records, approvals, evaluation results and oversight logs for assurance.",
    tag: "Audit",
  },
  {
    id: "retire",
    label: "Retire",
    note: "Decommission with data handling, dependency review and inventory status update.",
    tag: "Audit",
  },
] as const;

export function GovernanceLifecyclePath() {
  const root = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const staticMode = useSyncExternalStore(
    subscribeStaticScrollMode,
    getStaticScrollModeSnapshot,
    () => true,
  );

  useEffect(() => {
    if (staticMode || !root.current || !pathRef.current) return;

    ensureGsap();
    const path = pathRef.current;
    const length = path.getTotalLength();
    const nodes = root.current.querySelectorAll<HTMLElement>("[data-lifecycle-node]");

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.8,
        },
      });

      nodes.forEach((node, index) => {
        gsap.fromTo(
          node,
          { opacity: 0.25, y: 12 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: root.current,
              start: `top ${72 - index * 2}%`,
              end: "bottom 30%",
              scrub: 0.6,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [staticMode]);

  return (
    <section ref={root} className="scene-minimal py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-tech text-[0.68rem] uppercase tracking-[0.2em] text-cyan">
          AI system lifecycle
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold text-text-on-dark">
          From ideation to retirement with proportionate control
        </h2>

        <div className="relative mt-10">
          {!staticMode && (
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                ref={pathRef}
                d="M 20 60 C 120 20, 220 100, 320 60 S 520 20, 620 60 S 820 100, 980 60"
                fill="none"
                stroke="rgba(25, 195, 211, 0.45)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}

          <ol
            className={cn(
              staticMode
                ? "space-y-4"
                : "grid gap-6 md:grid-cols-5 md:gap-4 lg:grid-cols-10",
            )}
          >
            {stages.map((stage, index) => (
              <li
                key={stage.id}
                data-lifecycle-node
                className={cn(
                  "relative rounded-xl border border-white/10 bg-bg-elevated/50 p-4",
                  !staticMode && "md:text-center",
                )}
              >
                <div className="flex items-center gap-2 md:flex-col md:items-center">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-xs font-semibold text-brand-hover">
                    {index + 1}
                  </span>
                  <span className="font-heading text-sm font-semibold text-text-on-dark">
                    {stage.label}
                  </span>
                  {"tag" in stage && stage.tag && (
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 font-tech text-[0.6rem] uppercase tracking-wider",
                        stage.tag === "Risk" && "bg-warning/15 text-warning",
                        stage.tag === "Human approval" && "bg-cyan/15 text-cyan",
                        stage.tag === "Audit" && "bg-violet/15 text-violet",
                      )}
                    >
                      {stage.tag}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-dark md:mt-3">
                  {stage.note}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
