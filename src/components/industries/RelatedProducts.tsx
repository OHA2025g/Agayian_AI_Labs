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
          const title = card?.title?.trim() || product.name;
          const description =
            card?.description?.trim() || product.shortDescription;

          return (
            <Link
              key={product.id}
              href={`/products?product=${product.slug}`}
              className="industries-product-card"
            >
              <div className="industries-product-art-wrap">
                <ProductGlassArt
                  slug={product.slug}
                  variant="products"
                  frame="card"
                  className="industries-product-art"
                  alt=""
                />
              </div>
              <div className="industries-product-copy">
                <h4>{title}</h4>
                <p>{description}</p>
                <span>
                  Learn more
                  <ArrowRight strokeWidth={2} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </IndustryPanel>
  );
}
