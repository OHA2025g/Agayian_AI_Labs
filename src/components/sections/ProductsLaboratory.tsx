"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Building2,
  Landmark,
  Scale,
  Search,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { products as staticProducts } from "@/data/products";
import { OneTouchDashboard } from "@/components/products/OneTouchDashboard";
import { ProductSculpture } from "@/components/products/ProductSculptures";
import { ProductsInfinityGraphic } from "@/components/products/ProductsInfinityGraphic";
import {
  productCategories,
  productsCatalog,
  type ProductCategory,
} from "@/components/products/products-catalog";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { AccessibleModal } from "@/components/ui/AccessibleModal";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import type { Product } from "@/types";

const categoryIcons: Record<ProductCategory, LucideIcon> = {
  All: Sparkles,
  Government: Landmark,
  "Financial Services": Building2,
  Talent: Users,
  Governance: Scale,
  "Decision Intelligence": Sparkles,
};

const spotlightFeatures = [
  {
    title: "Risk-based planning",
    body: "Focus audits where risk is highest and impact is greatest.",
    icon: Scale,
  },
  {
    title: "Evidence intelligence",
    body: "Auto-collect, classify and link evidence with confidence.",
    icon: Search,
  },
  {
    title: "Test automation",
    body: "Execute controls and validations at scale.",
    icon: Sparkles,
  },
  {
    title: "Audit analytics",
    body: "Real-time insights across engagements and findings.",
    icon: Building2,
  },
] as const;

const spotlightTags = [
  "Audit Planning",
  "Evidence Hub",
  "Control Testing",
  "Issue Management",
  "Reporting",
] as const;

export function ProductsLaboratory({ items }: { items: Product[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ProductCategory>("All");
  const searchParams = useSearchParams();
  const router = useRouter();
  const querySlug = searchParams.get("product");
  const [localSlug, setLocalSlug] = useState<string | null>(null);
  const [ignoreQuery, setIgnoreQuery] = useState(false);
  const modalSlug = localSlug ?? (ignoreQuery ? null : querySlug);

  const liveBySlug = useMemo(() => {
    const map = new Map(items.map((item) => [item.slug, item]));
    return map;
  }, [items]);

  const modalProduct = useMemo(() => {
    if (!modalSlug) return undefined;
    const needle = modalSlug.replace(/-/g, " ").toLowerCase();
    return (
      items.find((item) => item.slug === modalSlug) ??
      staticProducts.find((item) => item.slug === modalSlug) ??
      items.find((item) => item.name.toLowerCase().includes(needle)) ??
      staticProducts.find((item) => item.name.toLowerCase().includes(needle))
    );
  }, [items, modalSlug]);

  const closeModal = () => {
    setLocalSlug(null);
    setIgnoreQuery(true);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    const next = params.toString();
    router.replace(next ? `/products?${next}` : "/products", { scroll: false });
  };

  const openModal = (slug: string) => {
    setIgnoreQuery(false);
    setLocalSlug(slug);
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", slug);
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return productsCatalog.filter((product) => {
      if (active !== "All" && !product.categories.includes(active)) {
        return false;
      }
      if (!q) return true;
      const live = liveBySlug.get(product.slug);
      const haystack = [
        product.name,
        product.description,
        live?.shortDescription,
        live?.category,
        ...(live?.capabilities ?? []),
        ...(live?.modules.map((module) => module.title) ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [active, liveBySlug, query]);

  return (
    <>
      <section className="products-hero">
        <div className="products-hero-inner">
          <div className="products-hero-copy">
            <span className="products-eyebrow">Products</span>
            <h1>
              AI products built
              <br />
              for real-world
              <br />
              decisions
            </h1>
            <p>
              Governed intelligence systems designed for complex operating
              environments.
            </p>
            <label className="products-search">
              <span className="sr-only">Search products</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, capabilities, modules..."
              />
              <Search aria-hidden />
            </label>
          </div>
          <ProductsInfinityGraphic />
        </div>
      </section>

      <div className="products-main">
        <div
          className="products-category-bar"
          role="tablist"
          aria-label="Product categories"
        >
          {productCategories.map((label) => {
            const Icon = categoryIcons[label];
            const selected = active === label;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={selected}
                className={selected ? "products-category-active" : undefined}
                onClick={() => setActive(label)}
              >
                {label !== "All" ? <Icon aria-hidden /> : null}
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <section className="products-featured">
          <div className="products-featured-copy">
            <span className="products-spotlight">Spotlight</span>
            <h2>OneTouch Audit</h2>
            <p>
              AI-powered audit automation for smarter, faster and
              evidence-driven assurance.
            </p>
            <div className="products-feature-list">
              {spotlightFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="products-feature-item">
                    <span className="products-feature-icon">
                      <Icon aria-hidden />
                    </span>
                    <span>
                      <strong>{feature.title}</strong>
                      <small>{feature.body}</small>
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="products-tags">
              {spotlightTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="products-feature-actions">
              <PrimaryButton href="/products/onetouch-audit">
                Explore Product
              </PrimaryButton>
              <SecondaryButton href="/capabilities">
                View Documentation
              </SecondaryButton>
            </div>
          </div>
          <OneTouchDashboard />
        </section>

        <section className="products-explore">
          <h2>Explore our products</h2>
          <span className="products-title-rule" />
          {visible.length === 0 ? (
            <p className="products-empty">
              No products match your filters. Try another category or search.
            </p>
          ) : (
            <div className="products-grid">
              {visible.map((product) => (
                <article key={product.slug} className="products-card">
                  <ProductSculpture type={product.visual} name={product.name} />
                  <div className="products-card-body">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openModal(product.slug)}
                        className="text-sm font-semibold text-tech-blue"
                      >
                        View details
                      </button>
                      <Link href={`/products/${product.slug}`}>
                        Open page <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <AccessibleModal
        open={Boolean(modalProduct)}
        onClose={closeModal}
        title={modalProduct?.name ?? "Product"}
        className="bg-white text-navy md:border-[var(--border-soft)]"
      >
        {modalProduct ? (
          <div>
            <ProductDetailView product={modalProduct} compact />
            <p className="mt-6">
              <Link
                href={`/products/${modalProduct.slug}`}
                className="text-sm font-semibold text-tech-blue hover:text-navy"
              >
                Open full page
              </Link>
            </p>
          </div>
        ) : null}
      </AccessibleModal>
    </>
  );
}
