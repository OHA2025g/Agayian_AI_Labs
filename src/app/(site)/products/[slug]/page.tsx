import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Product detail lives in the laboratory modal on /products. */
export default async function ProductSlugRedirect({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/products?product=${encodeURIComponent(slug)}`);
}
