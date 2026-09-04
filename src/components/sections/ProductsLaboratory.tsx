"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
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
  catalogForCategory,
  productCategories,
  SPOTLIGHT_CAROUSEL_MS,
  type ProductCategory,
} from "@/components/products/products-catalog";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { AccessibleModal } from "@/components/ui/AccessibleModal";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { Product } from "@/types";

const categoryIcons: Record<ProductCategory, LucideIcon> = {
  All: Sparkles,
  Government: Landmark,
  "Financial Services": Building2,
  Talent: Users,
  Governance: Scale,
  "Decision Intelligence": Sparkles,
};

const featureIcons = [Scale, Search, Sparkles, Building2] as const;

const onetouchSpotlightFeatures = [
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

const onetouchSpotlightTags = [
  "Audit Planning",
  "Evidence Hub",
  "Control Testing",
  "Issue Management",
  "Reporting",
] as const;

export function ProductsLaboratory({
  items,
  eyebrow = "Products",
  title = "AI products built\nfor real-world\ndecisions",
  description = "Governed intelligence systems designed for complex operating environments.",
  searchPlaceholder = "Search products, capabilities, modules...",
}: {
  items: Product[];
  eyebrow?: string;
  title?: string;
  description?: string;
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ProductCategory>("All");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
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
    return catalogForCategory(active).filter((product) => {
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

  useEffect(() => {
    setCarouselIndex(0);
  }, [active, query]);

  useEffect(() => {
    if (carouselPaused || visible.length < 2) {
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setCarouselIndex((index) => (index + 1) % visible.length);
    }, SPOTLIGHT_CAROUSEL_MS);

    return () => window.clearInterval(timer);
  }, [active, carouselPaused, query, visible.length]);

  const spotlight = useMemo(() => {
    if (visible.length === 0) return undefined;
    return visible[carouselIndex % visible.length];
  }, [carouselIndex, visible]);

  const spotlightLive = useMemo(() => {
    if (!spotlight) return undefined;
    return (
      liveBySlug.get(spotlight.slug) ??
      staticProducts.find((product) => product.slug === spotlight.slug)
    );
  }, [liveBySlug, spotlight]);

  const spotlightFeatures =
    spotlight?.slug === "onetouch-audit"
      ? onetouchSpotlightFeatures.slice(0, 2)
      : (spotlightLive?.modules.slice(0, 2).map((module, index) => ({
          title: module.title,
          body: module.description,
          icon: featureIcons[index] ?? Sparkles,
        })) ?? []);

  const spotlightTags =
    spotlight?.slug === "onetouch-audit"
      ? onetouchSpotlightTags.slice(0, 3)
      : (spotlightLive?.capabilities.slice(0, 3) ??
        spotlight?.categories.filter((label) => label !== "All").slice(0, 3) ??
        []);

  const stepCarousel = (delta: number) => {
    if (visible.length === 0) return;
    setCarouselIndex(
      (index) => (index + delta + visible.length) % visible.length,
    );
  };

  return (
    <>
      <section className="products-hero">
        <div className="products-hero-inner">
          <div className="products-hero-copy">
            <span className="products-eyebrow">{eyebrow}</span>
            <h1>
              {title.split("\n").map((line, index, all) => (
                <span key={line}>
                  {line}
                  {index < all.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>
            <p>{description}</p>
            <label className="products-search">
              <span className="sr-only">Search products</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
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

        {spotlight ? (
          <section
            className="products-featured"
            aria-live="polite"
            aria-roledescription={visible.length > 1 ? "carousel" : undefined}
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocusCapture={() => setCarouselPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setCarouselPaused(false);
              }
            }}
          >
            <div className="products-featured-copy">
              <span className="products-spotlight">Spotlight</span>
              <h2>{spotlight.name}</h2>
              <p>{spotlight.description}</p>
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
                <PrimaryButton href={`/products/${spotlight.slug}`}>
                  Explore Product
                </PrimaryButton>
              </div>
            </div>
            <div className="products-featured-stage">
              {visible.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="products-carousel-arrow products-carousel-arrow-prev"
                    aria-label="Previous product"
                    onClick={() => stepCarousel(-1)}
                  >
                    <ChevronLeft aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="products-carousel-arrow products-carousel-arrow-next"
                    aria-label="Next product"
                    onClick={() => stepCarousel(1)}
                  >
                    <ChevronRight aria-hidden />
                  </button>
                </>
              ) : null}
              <div className="products-featured-visual">
                {spotlight.slug === "onetouch-audit" ? (
                  <OneTouchDashboard />
                ) : (
                  <ProductSculpture
                    type={spotlight.visual}
                    name={spotlight.name}
                  />
                )}
              </div>
              {visible.length > 1 ? (
                <div
                  className="products-carousel-dots"
                  role="tablist"
                  aria-label="Spotlight products"
                >
                  {visible.map((product, index) => (
                    <button
                      key={product.slug}
                      type="button"
                      role="tab"
                      aria-label={product.name}
                      aria-selected={product.slug === spotlight.slug}
                      className={
                        product.slug === spotlight.slug
                          ? "products-carousel-dot-active"
                          : undefined
                      }
                      onClick={() => setCarouselIndex(index)}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

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
                    <div className="products-card-links">
                      <button
                        type="button"
                        onClick={() => openModal(product.slug)}
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
