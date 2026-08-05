"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/states/EmptyState";
import { AccessibleModal } from "@/components/ui/AccessibleModal";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardPreview } from "@/components/visualisations/DashboardPreview";
import { laboratoryProductSlugs } from "@/config/site";
import {
  industryFilters,
  productTypeFilters,
  technologyFilters,
} from "@/data/products";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

type ProductTypeFilter = (typeof productTypeFilters)[number];

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
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export function ProductsLaboratory({ items }: { items: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [productType, setProductType] = useState<ProductTypeFilter>("All");
  const [industry, setIndustry] = useState("All");
  const [technology, setTechnology] = useState("All");
  const queryProduct = searchParams.get("product");
  const [labSlug, setLabSlug] = useState(
    () =>
      queryProduct ||
      laboratoryProductSlugs[0] ||
      items[0]?.slug ||
      "",
  );
  const [scrollY, setScrollY] = useState(0);

  const labProducts = useMemo(
    () =>
      laboratoryProductSlugs
        .map((slug) => items.find((item) => item.slug === slug))
        .filter(Boolean) as Product[],
    [items],
  );

  const resolvedLabSlug =
    queryProduct &&
    laboratoryProductSlugs.includes(
      queryProduct as (typeof laboratoryProductSlugs)[number],
    )
      ? queryProduct
      : labSlug;

  const activeLab =
    labProducts.find((item) => item.slug === resolvedLabSlug) ||
    labProducts[0];
  const modalProduct = items.find((item) => item.slug === queryProduct) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((product) => {
      if (productType !== "All" && product.category !== productType) return false;
      if (industry !== "All" && !product.industries.includes(industry))
        return false;
      if (technology !== "All" && !product.technologies.includes(technology))
        return false;
      return matchesSearch(product, q);
    });
  }, [items, query, productType, industry, technology]);

  function openModal(slug: string) {
    setScrollY(window.scrollY);
    if (
      laboratoryProductSlugs.includes(
        slug as (typeof laboratoryProductSlugs)[number],
      )
    ) {
      setLabSlug(slug);
    }
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

  const hasFilters =
    query.trim() ||
    productType !== "All" ||
    industry !== "All" ||
    technology !== "All";

  return (
    <div className="space-y-12">
      {activeLab ? (
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-bg-secondary via-bg-elevated to-bg-primary">
          <div className="grid gap-6 p-5 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div>
              <p className="font-tech text-[0.65rem] uppercase tracking-[0.18em] text-cyan">
                Featured laboratory
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {labProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setLabSlug(product.slug)}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-xs font-medium transition",
                      product.slug === activeLab.slug
                        ? "border-cyan/40 bg-cyan/10 text-white"
                        : "border-white/10 text-muted-dark hover:text-white",
                    )}
                  >
                    {product.name}
                  </button>
                ))}
              </div>
              <h2 className="mt-5 font-heading text-2xl font-semibold md:text-3xl">
                {activeLab.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-dark md:text-base">
                {activeLab.valueProposition || activeLab.shortDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeLab.technologies.slice(0, 5).map((tech) => (
                  <Badge key={tech} variant="cyan">
                    {tech}
                  </Badge>
                ))}
              </div>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="font-tech text-[0.6rem] uppercase tracking-[0.16em] text-muted-dark">
                    Industry
                  </dt>
                  <dd className="mt-1 text-sm">{activeLab.industries.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-tech text-[0.6rem] uppercase tracking-[0.16em] text-muted-dark">
                    Outcome
                  </dt>
                  <dd className="mt-1 text-sm">
                    {activeLab.outcomes[0] || activeLab.status}
                  </dd>
                </div>
              </dl>
              <ul className="mt-5 space-y-2 text-sm text-muted-dark">
                {activeLab.modules.slice(0, 4).map((module) => (
                  <li key={module.title} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    <span>
                      <span className="font-medium text-white">{module.title}</span>
                      {module.description ? ` — ${module.description}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton
                  type="button"
                  onClick={() => openModal(activeLab.slug)}
                  showArrow={false}
                >
                  Open full detail
                </PrimaryButton>
                <SecondaryButton href="/contact?interest=demo">
                  Request a demo
                </SecondaryButton>
              </div>
              {activeLab.governance?.length ? (
                <p className="mt-5 text-xs text-muted-dark">
                  Governance: {activeLab.governance.slice(0, 3).join(" · ")}
                </p>
              ) : null}
            </div>
            <div className="relative min-h-[16rem] rounded-xl border border-white/10 bg-bg-primary/50 p-4">
              <div className="absolute inset-0 grid-texture opacity-40" />
              <DashboardPreview
                variant={activeLab.slug}
                className="relative"
              />
              <p className="relative mt-3 font-tech text-[0.55rem] uppercase tracking-[0.18em] text-muted-dark">
                Demonstration interface preview
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <Reveal className="rounded-xl border border-white/10 bg-bg-elevated/40 p-4 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-dark"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="pl-9"
            />
          </label>
          <FilterSelect
            label="Product type"
            value={productType}
            onValueChange={(value) =>
              setProductType(value as ProductTypeFilter)
            }
            options={productTypeFilters}
          />
          <FilterSelect
            label="Industry"
            value={industry}
            onValueChange={setIndustry}
            options={industryFilters}
          />
          <FilterSelect
            label="Technology"
            value={technology}
            onValueChange={setTechnology}
            options={technologyFilters}
          />
        </div>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setProductType("All");
              setIndustry("All");
              setTechnology("All");
            }}
            className="mt-3 inline-flex items-center gap-1 text-xs text-muted-dark hover:text-white"
          >
            <X className="h-3.5 w-3.5" /> Clear filters
          </button>
        ) : null}
      </Reveal>

      {filtered.length === 0 ? (
        <EmptyState
          title="No products match your filters"
          description="Adjust search or clear filters to browse the portfolio."
        />
      ) : (
        <RevealGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard
                product={product}
                onOpen={() => openModal(product.slug)}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      )}

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
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <p className="text-muted-dark">{modalProduct.valueProposition}</p>
            <DashboardPreview variant={modalProduct.slug} />
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
                    <span className="font-medium text-white">{module.title}</span>
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
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly string[] | string[];
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-dark">
        {label}
      </p>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger aria-label={label}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
