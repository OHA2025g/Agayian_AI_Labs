import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { CTA } from "@/config/cta";
import { products } from "@/data/products";
import { getProduct } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return buildMetadata({
      title: "Product not found",
      description: "This product is not published.",
      path: `/products/${slug}`,
    });
  }
  return buildMetadata({
    title: product.name,
    description: product.shortDescription || product.valueProposition,
    path: `/products/${product.slug}`,
    image: product.ogImage,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: product.name, path: `/products/${product.slug}` },
            ]),
          ),
        }}
      />
      <ProductDetailView product={product} />
      <LightCtaBar
        title="See this product in your operating context"
        href={`${CTA.demo.href}&product=${product.slug}`}
        label={CTA.demo.label}
      />
    </>
  );
}
