import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LightCtaPanel } from "@/components/ui/DarkCtaBand";
import { ProductGlassArt } from "@/components/visualisations/glass/ProductGlassArt";

export type RelatedProductCard = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
};

export function RelatedProductsRow({
  products,
}: {
  products: RelatedProductCard[];
}) {
  if (products.length === 0) return null;

  return (
    <section id="capabilities-related" className="capabilities-related">
      <div className="capabilities-main">
        <div className="capabilities-related-head">
          <div>
            <h2 className="capabilities-related-title">Related products</h2>
            <div
              aria-hidden
              className="capabilities-related-rule mt-3 flex h-[2px] overflow-hidden"
            >
              <span />
              <span />
            </div>
          </div>
          <Link href="/products" className="capabilities-related-link">
            Explore all products
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-current">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        <div className="capabilities-product-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products?product=${product.slug}`}
              className="capabilities-product-card"
            >
              <ProductGlassArt
                slug={product.slug}
                variant="home"
                frame="card"
                className="capabilities-product-art"
                alt={`${product.name} glass illustration`}
              />
              <h3 className="capabilities-product-name">{product.name}</h3>
              <p className="capabilities-product-copy">
                {product.shortDescription}
              </p>
              <span className="capabilities-product-cta">
                Learn more
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <LightCtaPanel
          className="capabilities-cta"
          title="Sequence your AI investment into a governed delivery agenda."
        />
      </div>
    </section>
  );
}
