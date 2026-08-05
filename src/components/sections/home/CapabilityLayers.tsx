"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Capability } from "@/types";
import { ensureGsap, gsap, prefersReducedMotion } from "@/lib/gsap";

const journeyOrder = [
  "strategy",
  "data",
  "generative-ai",
  "agentic-ai",
  "governance",
  "product-engineering",
  "managed-services",
] as const;

export function CapabilityLayers({ items }: { items: Capability[] }) {
  const root = useRef<HTMLElement>(null);
  const ordered = journeyOrder
    .map((slug) => items.find((item) => item.slug === slug))
    .filter(Boolean) as Capability[];

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    ensureGsap();
    const layers = root.current.querySelectorAll<HTMLElement>("[data-layer]");
    const ctx = gsap.context(() => {
      gsap.from(layers, {
        opacity: 0.15,
        y: 40,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 55%",
          scrub: 0.8,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [ordered.length]);

  return (
    <section ref={root} className="scene-light py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <p className="font-tech text-[0.68rem] uppercase tracking-[0.2em] text-[#0e7490]">
          Intelligence capability layers
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-text-light">
          From strategy and data to agents, governance and managed delivery
        </h2>
        <div className="mt-10 space-y-3">
          {ordered.map((cap, index) => (
            <article
              key={cap.id}
              data-layer
              className="panel-thin-light flex flex-col gap-3 rounded-xl p-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">
                <span className="font-tech text-xs text-[#0e7490]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-light">
                    {cap.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-muted-light">
                    {cap.summary}
                  </p>
                </div>
              </div>
              <Link
                href={`/capabilities#${cap.slug}`}
                className="shrink-0 text-sm font-semibold text-[#0e7490] hover:text-text-light"
              >
                Explore layer →
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-light">
          Designing an operating model?{" "}
          <Link
            href="/ai-centre-of-excellence"
            className="font-semibold text-[#0e7490] underline-offset-2 hover:underline"
          >
            Explore the AI Centre of Excellence
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
