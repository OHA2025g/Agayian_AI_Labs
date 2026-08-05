"use client";

import { motion, useReducedMotion } from "framer-motion";
import { brandCopy } from "@/config/site";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden"
      id="intelligence-engine-hero"
    >
      {/* Stronger veil over copy only — right/left open field stays clear for the orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,42rem)] bg-gradient-to-r from-[#050b18] via-[#050b18]/88 to-transparent md:w-[min(100%,48rem)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050b18]/75 via-transparent to-[#050b18]/35"
      />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-40" />
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-25" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div data-orb-content className="max-w-2xl lg:max-w-3xl">
          <motion.div
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_18px_rgba(230,57,70,0.8)]"
            aria-hidden
          />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-tech text-[0.68rem] uppercase tracking-[0.22em] text-cyan"
          >
            Responsible AI for enterprise & government
          </motion.p>
          <h1 className="mt-5 font-heading text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[0.98] tracking-tight text-balance text-text-on-dark">
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.65 }}
            >
              Agrayian
            </motion.span>
            <motion.span
              className="mt-3 block text-[clamp(1.45rem,2.8vw,2.25rem)] font-semibold text-muted-dark"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.65 }}
            >
              {brandCopy.headlineLines.join(" ")}
            </motion.span>
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-5 max-w-xl text-lead text-muted-dark"
          >
            {brandCopy.supporting}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <PrimaryButton href="/contact?interest=consultation">
              {brandCopy.primaryCta}
            </PrimaryButton>
            <SecondaryButton href="/capabilities">
              {brandCopy.secondaryCta}
            </SecondaryButton>
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-8 max-w-md text-sm text-muted-dark"
          >
            {brandCopy.trustStatement}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
