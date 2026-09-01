"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Landmark,
  Scale,
  Search,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/states/EmptyState";
import { AccessibleModal } from "@/components/ui/AccessibleModal";
import { Badge } from "@/components/ui/badge";
import { MockupCard } from "@/components/ui/MockupCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { OneTouchSpotlight } from "@/components/visualisations/OneTouchSpotlight";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { ProductGlassArt } from "@/components/visualisations/glass/ProductGlassArt";
import { mockupAssets } from "@/config/mockup-assets";
import { laboratoryProductSlugs } from "@/config/site";
import { industryFilters, productTypeFilters } from "@/data/products";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

type PillId =
  | "all"
  | "government"
  | "financial"
  | "talent"
  | "governance"
  | "decision";

type FilterPill = {
  id: PillId;
  label: string;
  icon: LucideIcon;
  /** Map mockup labels onto existing industryFilters / productTypeFilters. */
  industry?: (typeof industryFilters)[number];
  productType?: (typeof productTypeFilters)[number];
  slugIncludes?: string;
};

const filterPills: FilterPill[] = [
  { id: "all", label: "All", icon: Sparkles },
  {
    id: "government",
    label: "Government",
    icon: Landmark,
    industry: "Government",
  },
  {
    id: "financial",
    label: "Financial Services",
    icon: Building2,
    industry: "Finance",
  },
  {
    id: "talent",
    label: "Talent",
    icon: Users,
    industry: "Human Resources",
  },
  {
    id: "governance",
    label: "Governance",
    icon: Scale,
    productType: "Governance",
  },
  {
    id: "decision",
    label: "Decision Intelligence",
    icon: Sparkles,
    productType: "Analytics",
    slugIncludes: "decision",
  },
];

function matchesSearch(product: Product, query: string): boolean {
  if (!query) return true;
  const haystack = [
    product.name,
    product.shortDescription,
    product.valueProposition,
    product.category,
    ...product.industries,
    ...product.technologies,
    ...product.capabilities,
    ...product.modules.map((module) => `${module.title} ${module.description}`),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function matchesPill(product: Product, pill: FilterPill): boolean {
  if (pill.id === "all") return true;
  if (pill.industry && product.industries.includes(pill.industry)) return true;
  if (pill.productType && product.category === pill.productType) return true;
  if (pill.slugIncludes && product.slug.includes(pill.slugIncludes)) return true;
  if (pill.id === "governance") {
    return (
      product.category === "Governance" ||
      product.slug.includes("governance") ||
      product.capabilities.some((c) => c.toLowerCase().includes("governance"))
    );
  }
  if (pill.id === "decision") {
    return (
      product.slug.includes("decision") ||
      product.name.toLowerCase().includes("decision") ||
      product.category === "Analytics"
    );
  }
  return false;
}

function resolveSpotlight(items: Product[]): Product | undefined {
  const bySlug = (slug: string) => items.find((item) => item.slug === slug);
  return (
    bySlug("onetouch-audit") ||
    items.find((item) => item.slug.includes("audit")) ||
    bySlug(laboratoryProductSlugs[2]) ||
    bySlug(laboratoryProductSlugs[0]) ||
    items[0]
  );
}

export function ProductsLaboratory({ items }: { items: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activePill, setActivePill] = useState<PillId>("all");
  const [scrollY, setScrollY] = useState(0);

  const queryProduct = searchParams.get("product");
  const modalProduct = items.find((item) => item.slug === queryProduct) ?? null;
  const spotlight = useMemo(() => resolveSpotlight(items), [items]);
  const activeFilter =
    filterPills.find((pill) => pill.id === activePill) ?? filterPills[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((product) => {
      if (!matchesPill(product, activeFilter)) return false;
      return matchesSearch(product, q);
    });
  }, [items, query, activeFilter]);

  function openModal(slug: string) {
    setScrollY(window.scrollY);
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", slug);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function closeModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    requestAnimationFrame(() => window.scrollTo(0, scrollY));
  }

  const spotlightFeatures = (spotlight?.modules ?? []).slice(0, 4);
  const spotlightTags = (spotlight?.capabilities ?? []).slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="scene-hero relative overflow-hidden border-b border-[var(--border-soft)]">
        <div className="pointer-events-none absolute inset-0 grid-texture opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_70%_40%,rgba(59,130,246,0.12),transparent_65%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:py-20">
          <div>
            <p className="flex items-center gap-2 font-tech text-[0.65rem] uppercase tracking-[0.22em] text-cyan">
              <span aria-hidden className="h-[2px] w-4 rounded-full bg-brand" />
              Products
            </p>
            <h1 className="mt-3 font-heading text-[clamp(2.1rem,4.2vw,3.4rem)] font-semibold tracking-tight text-navy text-balance">
              AI products built for real-world decisions
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-light md:text-lg">
              Governed intelligence systems designed for complex operating
              environments.
            </p>
            <label className="relative mt-8 block max-w-xl">
              <span className="sr-only">Search products</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light"
                aria-hidden
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, capabilities, modules..."
                className="h-12 w-full rounded-full border border-[var(--border-soft)] bg-white/80 pl-11 pr-4 text-sm text-navy shadow-[0_10px_30px_rgba(11,31,58,0.06)] backdrop-blur-md placeholder:text-muted-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech-blue"
              />
            </label>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_70%)] blur-2xl"
            />
            <OriginalSculpture
              src={mockupAssets.originalInfinityHero}
              alt="Glass infinity with product capability tiles"
              priority
              className="relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Filter pills */}
      <section className="border-b border-[var(--border-soft)] bg-bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-5 sm:px-6 lg:px-8">
          {filterPills.map((pill) => {
            const Icon = pill.icon;
            const active = pill.id === activePill;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setActivePill(pill.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
                  active
                    ? "border-brand bg-brand text-white shadow-[0_8px_20px_rgba(255,77,94,0.28)]"
                    : "border-[var(--border-soft)] bg-white/70 text-navy hover:border-tech-blue/40 hover:bg-white",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {pill.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Spotlight */}
      {spotlight ? (
        <section className="border-b border-[var(--border-soft)] py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MockupCard className="overflow-hidden p-5 md:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
                <div>
                  <p className="font-tech text-[0.65rem] uppercase tracking-[0.2em] text-brand">
                    Spotlight
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-navy md:text-3xl">
                    {spotlight.name}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-light md:text-base">
                    {spotlight.shortDescription}
                  </p>

                  {spotlightFeatures.length > 0 ? (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {spotlightFeatures.map((feature) => (
                        <div key={feature.title}>
                          <h3 className="font-heading text-sm font-semibold text-navy">
                            {feature.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-muted-light md:text-sm">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {spotlightTags.length > 0 ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {spotlightTags.map((tag) => (
                        <Badge key={tag} variant="light">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryButton
                      type="button"
                      onClick={() => openModal(spotlight.slug)}
                      showArrow={false}
                    >
                      Explore Product
                    </PrimaryButton>
                    <SecondaryButton href="/capabilities">
                      View Documentation
                    </SecondaryButton>
                  </div>
                </div>

                <div className="relative flex flex-col justify-center">
                  <OneTouchSpotlight />
                </div>
              </div>
            </MockupCard>
          </div>
        </section>
      ) : null}

      {/* Explore grid */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-tight text-navy">
              Explore our products
            </h2>
          </Reveal>

          {filtered.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                className="border-[var(--border-soft)] bg-white/60 text-navy [&_h3]:text-navy [&_p]:text-muted-light"
                title="No products match your filters"
                description="Adjust search or choose another category to browse the portfolio."
              />
            </div>
          ) : (
            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <RevealItem key={product.id}>
                  <MockupCard className="flex h-full flex-col overflow-hidden p-4">
                    <ProductGlassArt
                      slug={product.slug}
                      variant="products"
                      className="h-36"
                    />
                    <p className="mt-4 px-1 text-xs font-medium uppercase tracking-wider text-muted-light">
                      {product.category}
                    </p>
                    <h3 className="mt-1 px-1 font-heading text-lg font-semibold text-navy">
                      {product.name}
                    </h3>
                    <p className="mt-2 flex-1 px-1 text-sm leading-relaxed text-muted-light">
                      {product.shortDescription}
                    </p>
                    <button
                      type="button"
                      onClick={() => openModal(product.slug)}
                      className="mt-5 inline-flex items-center gap-1.5 px-1 text-sm font-semibold text-tech-blue transition hover:text-navy"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </MockupCard>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      <AccessibleModal
        open={Boolean(modalProduct)}
        onClose={closeModal}
        title={modalProduct?.name || "Product"}
      >
        {modalProduct ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="cyan">{modalProduct.category}</Badge>
              {modalProduct.industries.map((item) => (
                <Badge key={item} variant="light">
                  {item}
                </Badge>
              ))}
            </div>
            <p className="text-muted-dark">{modalProduct.valueProposition}</p>
            <div>
              <OneTouchSpotlight />
            </div>
            <section>
              <h3 className="font-heading text-lg font-semibold">Problem</h3>
              <p className="mt-2 text-sm text-muted-dark">
                {modalProduct.businessProblem}
              </p>
            </section>
            <section>
              <h3 className="font-heading text-lg font-semibold">Solution</h3>
              <p className="mt-2 text-sm text-muted-dark">
                {modalProduct.solutionOverview}
              </p>
            </section>
            <section>
              <h3 className="font-heading text-lg font-semibold">Modules</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-dark">
                {modalProduct.modules.map((module) => (
                  <li key={module.title}>
                    <span className="font-medium text-white">
                      {module.title}
                    </span>
                    {module.description ? ` — ${module.description}` : ""}
                  </li>
                ))}
              </ul>
            </section>
            {modalProduct.governance?.length ? (
              <section>
                <h3 className="font-heading text-lg font-semibold">
                  Governance
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-dark">
                  {modalProduct.governance.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section>
              <h3 className="font-heading text-lg font-semibold">Outcomes</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-dark">
                {modalProduct.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <PrimaryButton href="/contact?interest=demo">
              Request a demo
            </PrimaryButton>
          </div>
        ) : null}
      </AccessibleModal>
    </>
  );
}
