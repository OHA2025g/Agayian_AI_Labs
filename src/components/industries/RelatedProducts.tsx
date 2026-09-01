import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IndustryPanel, SectionHeading } from "@/components/industries/primitives";
import { ProductGlassArt } from "@/components/visualisations/glass/ProductGlassArt";
import type { IndustryProductCard, Product } from "@/types";

export function RelatedProducts({
  items,
  cards = [],
}: {
  items: Product[];
  cards?: IndustryProductCard[];
}) {
  const highlights = new Map(cards.map((card) => [card.slug, card]));

  return (
    <IndustryPanel className="industries-products">
      <div className="industries-products-head">
        <SectionHeading>Related products</SectionHeading>
        <Link href="/products" className="industries-products-all">
          Explore all products
          <span aria-hidden>
            <ArrowRight strokeWidth={2} />
          </span>
        </Link>
      </div>
      <div className="industries-product-grid">
        {items.slice(0, 4).map((product) => {
          const card = highlights.get(product.slug);
          return (
            <Link
              key={product.id}
              href={`/products?product=${product.slug}`}
              className="industries-product-card"
            >
              <ProductGlassArt
                slug={product.slug}
                variant="products"
                className="industries-product-art"
                alt=""
              />
              <h4>{card?.title ?? product.name}</h4>
              <p>{card?.description ?? product.shortDescription}</p>
              <span>
                Learn more
                <ArrowRight strokeWidth={2} />
              </span>
            </Link>
          );
        })}
      </div>
    </IndustryPanel>
  );
}
