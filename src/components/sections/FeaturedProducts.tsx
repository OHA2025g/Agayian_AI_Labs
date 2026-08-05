import Link from "next/link";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Product } from "@/types";

export function FeaturedProducts({ items }: { items: Product[] }) {
  const featured = items.filter((item) => item.featured).slice(0, 6);
  const list = featured.length ? featured : items.slice(0, 6);

  return (
    <>
      <RevealGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => (
          <RevealItem key={item.id}>
            <ProductCard product={item} />
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mt-8">
        <Link
          href="/products"
          className="inline-flex text-sm font-semibold text-cyan hover:text-white"
        >
          View All Products →
        </Link>
      </Reveal>
    </>
  );
}
