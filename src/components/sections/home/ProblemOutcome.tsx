"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { capabilityProblems } from "@/data/capabilities";
import { cn } from "@/lib/utils";

export function ProblemOutcome() {
  const [active, setActive] = useState(capabilityProblems[0]?.id ?? "");
  const reduce = useReducedMotion();
  const selected =
    capabilityProblems.find((item) => item.id === active) ??
    capabilityProblems[0];

  if (!selected) return null;

  return (
    <section className="scene-dark border-y border-white/10 py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-tech text-[0.68rem] uppercase tracking-[0.2em] text-cyan">
            Problem to outcome
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-[clamp(1.75rem,3vw,2.75rem)] font-semibold">
            Where AI programmes lose momentum — and how Agrayian responds
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[18rem_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {capabilityProblems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  "shrink-0 rounded-lg border px-4 py-3 text-left text-sm transition",
                  active === item.id
                    ? "border-cyan/40 bg-cyan/10 text-white"
                    : "border-white/10 text-muted-dark hover:border-white/20 hover:text-white",
                )}
              >
                {item.problem}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.article
              key={selected.id}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -12 }}
              className="panel-thin rounded-2xl p-6 md:p-8"
            >
              <p className="font-tech text-[0.65rem] uppercase tracking-[0.18em] text-brand">
                Structural barrier
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold">
                {selected.problem}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-dark">
                <span className="font-medium text-brand-hover">Consequence: </span>
                {selected.consequence}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-dark">
                <span className="font-medium text-cyan">Agrayian response: </span>
                {selected.response}
              </p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
