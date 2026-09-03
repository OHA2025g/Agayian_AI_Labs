import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { getTeamMembers } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Leadership",
    description:
      "Verified people at Agrayian AI Labs. Profiles appear only when approved for publication.",
    path: "/company/leadership",
  });
}

export default async function CompanyLeadershipPage() {
  const people = await getTeamMembers();
  if (!people.length) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Company", path: "/company" },
              { name: "Leadership", path: "/company/leadership" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Company"
        title="Leadership"
        description="Published profiles only. We do not invent biographies."
      />
      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {people.map((person) => (
            <article
              key={person.id}
              className="rounded-2xl border border-[var(--border-soft)] bg-white p-5"
            >
              <h2 className="font-heading text-xl font-semibold text-navy">
                {person.name}
              </h2>
              {person.title ? (
                <p className="mt-1 text-sm text-tech-blue">{person.title}</p>
              ) : null}
              {person.bio ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-light">
                  {person.bio}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <LightCtaBar title="Work with Agrayian" />
    </>
  );
}
