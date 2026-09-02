import { redirect } from "next/navigation";
import { impactStories } from "@/data/impactStories";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return impactStories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function ImpactStoryPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/impact-stories#${slug}`);
}
