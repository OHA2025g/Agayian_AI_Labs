import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LightCtaPanel } from "@/components/ui/DarkCtaBand";
import { MockupCard } from "@/components/ui/MockupCard";
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
    <section
      id="capabilities-related"
      className="border-t border-[#eef2f7] bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-[clamp(1.65rem,3vw,2.5rem)] font-semibold tracking-tight text-navy">
              Related products
            </h2>
            <div
              aria-hidden
              className="mt-3 flex h-[2px] w-36 overflow-hidden rounded-full"
            >
              <span className="w-10 bg-brand" />
              <span className="flex-1 bg-[#e4eaf1]" />
            </div>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy/70 transition hover:text-navy"
          >
            Explore all products
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current">
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>

        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <RevealItem key={product.id}>
              <Link
                href={`/products?product=${product.slug}`}
                className="block h-full"
              >
                <MockupCard className="flex h-full flex-col overflow-hidden p-5 hover:translate-y-0">
                  <ProductGlassArt
                    slug={product.slug}
                    variant="home"
                    frame="card"
                    alt={`${product.name} glass illustration`}
                  />
                  <h3 className="mt-5 font-heading text-base font-semibold leading-snug text-navy md:text-[1.05rem]">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-navy/55">
                    {product.shortDescription}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-tech-blue">
                    Learn more
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </span>
                </MockupCard>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <LightCtaPanel
          className="mt-14 md:mt-16"
          title="Sequence your AI investment into a governed delivery agenda."
        />
      </div>
    </section>
  );
}
