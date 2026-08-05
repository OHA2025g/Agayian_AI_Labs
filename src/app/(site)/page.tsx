import Link from "next/link";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeOrbField } from "@/components/visualisations/HomeOrbField";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getProducts } from "@/lib/cms/catalog";
import { laboratoryProductSlugs } from "@/config/site";

const pillars = [
  {
    title: "Strategy & CoE",
    body: "Build the operating model that makes AI repeatable across the enterprise.",
    href: "/ai-centre-of-excellence",
  },
  {
    title: "Governed products",
    body: "Deploy intelligence systems with human accountability designed in from day one.",
    href: "/products",
  },
  {
    title: "Responsible scale",
    body: "Move from pilots to production with proportionate controls across the lifecycle.",
    href: "/ai-governance",
  },
] as const;

export default async function HomePage() {
  const products = await getProducts();
  const labProducts = laboratoryProductSlugs
    .map((slug) => products.find((item) => item.slug === slug))
    .filter(Boolean);

  return (
    <div id="home-orb-root" className="relative isolate bg-[#050b18]">
      {/* Fixed AI ORB — drifts into each section’s open space on scroll */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <HomeOrbField />
      </div>

      <div className="relative z-10">
        <HomeHero />

        <section
          id="home-what-we-do"
          className="relative border-t border-white/5 py-24 md:py-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-4xl bg-gradient-to-r from-[#050b18]/85 via-[#050b18]/35 to-transparent"
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div data-orb-content>
              <Reveal>
                <p className="font-tech text-[0.65rem] uppercase tracking-[0.22em] text-cyan">
                  What we do
                </p>
                <h2 className="mt-4 max-w-3xl font-heading text-[clamp(1.85rem,3.5vw,3rem)] font-semibold tracking-tight text-balance">
                  One platform for strategy, products and responsible scale
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-dark md:text-lg">
                  Agrayian helps enterprises and governments establish AI
                  capability, govern intelligent systems and ship products that
                  turn complex data into decisions — without noise or invented
                  claims.
                </p>
              </Reveal>

              <RevealGroup className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
                {pillars.map((pillar) => (
                  <RevealItem key={pillar.title}>
                    <Link href={pillar.href} className="group block">
                      <h3 className="font-heading text-xl font-semibold text-text-on-dark transition group-hover:text-cyan">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-dark md:text-base">
                        {pillar.body}
                      </p>
                      <span className="mt-5 inline-block text-sm font-medium text-cyan opacity-0 transition group-hover:opacity-100">
                        Explore →
                      </span>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        <section
          id="home-products"
          className="relative border-t border-white/5 py-24 md:py-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050b18]/75 via-[#050b18]/40 to-transparent"
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div data-orb-content>
              <Reveal>
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-xl">
                    <p className="font-tech text-[0.65rem] uppercase tracking-[0.22em] text-cyan">
                      Products
                    </p>
                    <h2 className="mt-4 font-heading text-[clamp(1.85rem,3.5vw,3rem)] font-semibold tracking-tight">
                      Intelligence systems built for real operating environments
                    </h2>
                  </div>
                  <PrimaryButton href="/products">View all products</PrimaryButton>
                </div>
              </Reveal>

              <RevealGroup className="mt-14 divide-y divide-white/10 border-y border-white/10">
                {labProducts.map((product) =>
                  product ? (
                    <RevealItem key={product.id}>
                      <Link
                        href={`/products?product=${product.slug}`}
                        className="group flex flex-col gap-2 py-7 transition md:flex-row md:items-baseline md:justify-between md:gap-10"
                      >
                        <h3 className="font-heading text-lg font-semibold text-text-on-dark transition group-hover:text-cyan md:text-xl">
                          {product.name}
                        </h3>
                        <p className="max-w-xl text-sm leading-relaxed text-muted-dark md:text-right">
                          {product.shortDescription}
                        </p>
                      </Link>
                    </RevealItem>
                  ) : null,
                )}
              </RevealGroup>
            </div>
          </div>
        </section>

        <section
          id="home-capabilities"
          className="relative border-t border-white/5 py-24 md:py-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-[#050b18]/80 via-[#050b18]/30 to-transparent"
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div data-orb-content>
              <Reveal>
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
                  <div>
                    <p className="font-tech text-[0.65rem] uppercase tracking-[0.22em] text-cyan">
                      Capabilities
                    </p>
                    <h2 className="mt-4 font-heading text-[clamp(1.85rem,3.5vw,3rem)] font-semibold tracking-tight text-balance">
                      From AI strategy to governed production systems
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-dark md:text-lg">
                      Explore how we design CoE models, agentic workflows, data
                      foundations and assurance practices that stay accountable
                      as you scale.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <PrimaryButton href="/capabilities">
                        Explore capabilities
                      </PrimaryButton>
                      <SecondaryButton href="/industries">
                        Industries
                      </SecondaryButton>
                    </div>
                  </div>
                  <ul className="space-y-5 text-sm text-muted-dark md:text-base">
                    {[
                      "AI Centre of Excellence",
                      "AI Governance & assurance",
                      "Generative & agentic systems",
                      "Data and decision intelligence",
                    ].map((item) => (
                      <li
                        key={item}
                        className="border-b border-white/10 pb-4 font-heading text-lg text-text-on-dark"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="home-cta"
          className="relative border-t border-white/5 py-24 md:py-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,11,24,0.55)_0%,rgba(5,11,24,0.15)_55%,transparent_75%)]"
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div data-orb-content>
              <Reveal>
                <p className="font-tech text-[0.65rem] uppercase tracking-[0.22em] text-cyan">
                  Next step
                </p>
                <h2 className="mt-4 font-heading text-[clamp(1.85rem,3.5vw,3rem)] font-semibold tracking-tight text-balance">
                  Ready to build governed intelligence?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-dark">
                  Book a consultation to discuss strategy, CoE design,
                  governance or a product walkthrough.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <PrimaryButton href="/contact?interest=consultation">
                    Book a Consultation
                  </PrimaryButton>
                  <SecondaryButton href="/insights">
                    Read Insights
                  </SecondaryButton>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
