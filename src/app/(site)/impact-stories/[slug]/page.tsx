import { redirect } from "next/navigation";
import { impactStories } from "@/data/impactStories";
import { getImpactStories } from "@/lib/cms/catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const list = await getImpactStories();
  return (list.length ? list : impactStories).map((story) => ({
    slug: story.slug,
  }));
}

export default async function ImpactStoryPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/impact-stories#${slug}`);
}
