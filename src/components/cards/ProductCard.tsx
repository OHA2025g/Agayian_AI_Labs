"use client";

import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { DashboardPreview } from "@/components/visualisations/DashboardPreview";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
  onOpen,
}: {
  product: Product;
  className?: string;
  onOpen?: () => void;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-bg-elevated/40 transition hover:-translate-y-1 hover:border-brand/40",
        className,
      )}
    >
      <div className="relative border-b border-white/10 bg-gradient-to-br from-bg-secondary via-bg-elevated to-bg-primary p-4">
        <div className="absolute inset-0 grid-texture opacity-40" />
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Badge variant="cyan">{product.category}</Badge>
            <p className="mt-3 font-heading text-lg font-semibold text-text-on-dark">
              {product.name}
            </p>
          </div>
          <DashboardPreview
            variant={product.slug}
            compact
            className="w-[9.5rem] shrink-0 opacity-90 transition group-hover:opacity-100"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-wider text-muted-dark">
          {product.industries.join(" · ")}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-dark">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.capabilities.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-text-on-dark transition group-hover:text-cyan"
        >
          View details
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
