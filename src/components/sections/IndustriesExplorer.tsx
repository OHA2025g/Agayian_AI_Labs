"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Badge } from "@/components/ui/badge";
import { capabilities as staticCapabilities } from "@/data/capabilities";
import { industries as staticIndustries } from "@/data/industries";
import { products as staticProducts } from "@/data/products";
import type { Capability, Industry, Product } from "@/types";
import { cn } from "@/lib/utils";

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-text-on-dark">
        {title}
      </h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-muted-dark"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IndustriesExplorer({
  items = staticIndustries,
  capabilities = staticCapabilities,
  products = staticProducts,
}: {
  items?: Industry[];
  capabilities?: Capability[];
  products?: Product[];
}) {
  const getCapabilityBySlug = (slug: string) =>
    capabilities.find((item) => item.slug === slug);
  const getProductBySlug = (slug: string) =>
    products.find((item) => item.slug === slug);

  const [active, setActive] = useState(items[0]?.slug ?? "");
  const reduce = useReducedMotion();
  const selected =
    items.find((industry) => industry.slug === active) ?? items[0];

  if (!selected) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] xl:grid-cols-[19rem_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
          Select industry
        </p>
        <div
          role="tablist"
          aria-label="Industries"
          className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {items.map((industry) => {
            const isActive = industry.slug === active;
            return (
              <button
                key={industry.id}
                type="button"
                role="tab"
                id={`industry-tab-${industry.slug}`}
                aria-controls={`industry-panel-${industry.slug}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(industry.slug)}
                className={cn(
                  "relative shrink-0 rounded-xl border px-4 py-3 text-left transition lg:w-full",
                  isActive
                    ? "border-cyan/50 bg-cyan/15 text-text-on-dark shadow-sm"
                    : "border-black/10 bg-white text-muted-dark hover:border-cyan/35 hover:text-text-on-dark",
                )}
              >
                {isActive && !reduce && (
                  <motion.span
                    layoutId="industry-active"
                    className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="font-heading text-sm font-semibold">
                  {industry.name}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.slug}
          id={`industry-panel-${selected.slug}`}
          role="tabpanel"
          aria-labelledby={`industry-tab-${selected.slug}`}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="space-y-10"
        >
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <Badge variant="brand">Industry focus</Badge>
            <h2 className="mt-4 font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-semibold text-balance text-text-on-dark">
              {selected.name}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-dark md:text-lg">
              {selected.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton href="/contact">
                Book an Industry Consultation
              </PrimaryButton>
              <SecondaryButton href="/capabilities">
                View Related Capabilities
              </SecondaryButton>
            </div>
          </div>

          <RevealGroup className="grid gap-6 md:grid-cols-2">
            <RevealItem>
              <div className="h-full rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <ListBlock title="Challenges" items={selected.challenges} />
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <ListBlock
                  title="Opportunities"
                  items={selected.opportunities}
                />
              </div>
            </RevealItem>
          </RevealGroup>

          <Reveal>
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                Relevant capabilities
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.capabilities.map((slug) => {
                  const capability = getCapabilityBySlug(slug);
                  return (
                    <Badge key={slug} variant="cyan">
                      {capability?.name ?? slug}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                Related products
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {selected.products.map((slug) => {
                  const product = getProductBySlug(slug);
                  return (
                    <Link
                      key={slug}
                      href={`/products?product=${slug}`}
                      className="rounded-lg border border-black/10 bg-[#f4f7fb] p-4 transition hover:border-cyan/40"
                    >
                      <p className="font-medium text-text-on-dark">
                        {product?.name ?? slug}
                      </p>
                      <p className="mt-1 text-sm text-muted-dark">
                        {product?.shortDescription ??
                          "Explore this product in the portfolio."}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                Typical workflows
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {selected.workflows.map((workflow) => (
                  <article
                    key={workflow.title}
                    className="rounded-xl border border-black/10 bg-white p-5 shadow-sm"
                  >
                    <h4 className="font-heading font-semibold text-text-on-dark">
                      {workflow.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-dark">
                      {workflow.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <RevealGroup className="grid gap-6 md:grid-cols-2">
            <RevealItem>
              <div className="h-full rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <ListBlock
                  title="Governance considerations"
                  items={selected.governance}
                />
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <ListBlock title="Expected outcomes" items={selected.outcomes} />
              </div>
            </RevealItem>
          </RevealGroup>

          <Reveal>
            <div className="rounded-2xl border border-black/10 bg-[#eef3f9] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                Next step
              </p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-text-on-dark">
                Discuss {selected.name} with Agrayian
              </h3>
              <p className="mt-3 max-w-2xl text-muted-dark">
                Share your operating context, priority use cases and governance
                constraints. We will help you shape a practical, industry-aware AI
                engagement.
              </p>
              <div className="mt-6">
                <PrimaryButton href="/contact">Book a Consultation</PrimaryButton>
              </div>
            </div>
          </Reveal>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
