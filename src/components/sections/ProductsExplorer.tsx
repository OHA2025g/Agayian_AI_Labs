"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/states/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  industryFilters,
  productTypeFilters,
  products as staticProducts,
  technologyFilters,
} from "@/data/products";
import type { Product } from "@/types";

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

export function ProductsExplorer({
  items = staticProducts,
}: {
  items?: Product[];
}) {
  const [query, setQuery] = useState("");
  const [productType, setProductType] = useState<ProductTypeFilter>("All");
  const [industry, setIndustry] = useState<string>("All");
  const [technology, setTechnology] = useState<string>("All");

  const filteredProducts = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    return items.filter((product) => {
      if (productType !== "All") {
        const labels = product.categories?.length
          ? product.categories
          : [product.category];
        if (!labels.includes(productType)) return false;
      }
      if (industry !== "All" && !product.industries.includes(industry)) {
        return false;
      }
      if (technology !== "All" && !product.technologies.includes(technology)) {
        return false;
      }
      return matchesSearch(product, normalisedQuery);
    });
  }, [items, query, productType, industry, technology]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    productType !== "All" ||
    industry !== "All" ||
    technology !== "All";

  const clearFilters = () => {
    setQuery("");
    setProductType("All");
    setIndustry("All");
    setTechnology("All");
  };

  return (
    <>
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
              placeholder="Search by name, industry, technology or capability"
              className="pl-10"
            />
          </label>

          <FilterSelect
            label="Product type"
            value={productType}
            onValueChange={(value) =>
              setProductType(value as ProductTypeFilter)
            }
            options={[...productTypeFilters]}
          />
          <FilterSelect
            label="Industry"
            value={industry}
            onValueChange={setIndustry}
            options={["All", ...industryFilters]}
          />
          <FilterSelect
            label="Technology"
            value={technology}
            onValueChange={setTechnology}
            options={["All", ...technologyFilters]}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="cyan">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </Badge>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-dark transition hover:text-white"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
              Clear filters
            </button>
          )}
        </div>
      </Reveal>

      {filteredProducts.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No products match your filters"
            description="Adjust the search terms or clear filters to browse the full Agrayian AI Labs product portfolio."
          />
        </div>
      ) : (
        <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </>
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
