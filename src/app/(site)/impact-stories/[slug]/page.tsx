import { notFound } from "next/navigation";
import { ImpactStoryDetailView } from "@/components/stories/ImpactStoryDetailView";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { impactStories } from "@/data/impactStories";
import { getImpactStory } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return impactStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const story = await getImpactStory(slug);
  if (!story) {
    return buildMetadata({
      title: "Impact story not found",
      description: "This impact story is not published.",
      path: `/impact-stories/${slug}`,
    });
  }
  return buildMetadata({
    title: story.title,
    description: story.challenge,
    path: `/impact-stories/${story.slug}`,
  });
}

export default async function ImpactStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await getImpactStory(slug);
  if (!story) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Impact Stories", path: "/impact-stories" },
              { name: story.title, path: `/impact-stories/${story.slug}` },
            ]),
          ),
        }}
      />
      <ImpactStoryDetailView story={story} />
      <LightCtaBar title="Discuss a similar engagement" />
    </>
  );
}
