"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCtaConverge() {
  return (
    <section className="relative overflow-hidden scene-dark py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="h-full w-full opacity-40"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 40 C300 40 400 200 600 200 S900 360 1200 360"
            stroke="rgba(25,195,211,0.45)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0 120 C280 120 420 200 600 200 S920 280 1200 280"
            stroke="rgba(230,57,70,0.35)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0 280 C320 280 450 200 600 200 S880 80 1200 80"
            stroke="rgba(59,130,246,0.35)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="600" cy="200" r="6" fill="#19c3d3" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="font-tech text-[0.68rem] uppercase tracking-[0.2em] text-cyan">
            Next conversation
          </p>
          <h2 className="mt-3 font-heading text-[clamp(1.85rem,3.5vw,3rem)] font-semibold">
            Bring your data, decisions and accountability model into one governed
            intelligence programme
          </h2>
          <p className="mt-4 text-muted-dark">
            Book a consultation to explore strategy, CoE design, governance or a
            product demonstration — without invented claims or placeholder
            metrics.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton href="/contact?interest=consultation">
              Book a Consultation
            </PrimaryButton>
            <SecondaryButton href="/products">Explore Products</SecondaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
