import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { getCareers } from "@/lib/cms/catalog";
import { getCompanyPageContent } from "@/lib/cms/page-content";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const roles = await getCareers();
  if (!roles.length) {
    return buildMetadata({
      title: "Careers",
      description: "Open roles at Agrayian AI Labs appear only when approved for public posting.",
      path: "/company/careers",
    });
  }
  return buildMetadata({
    title: "Careers",
    description: "Open roles at Agrayian AI Labs.",
    path: "/company/careers",
  });
}

export default async function CompanyCareersPage() {
  const [roles, company] = await Promise.all([
    getCareers(),
    getCompanyPageContent(),
  ]);
  if (!roles.length) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Company", path: "/company" },
              { name: "Careers", path: "/company/careers" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Company"
        title="Careers"
        description={company.careersCopy}
      />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-4 sm:px-6 lg:px-8">
          {roles.map((role) => (
            <article
              key={role.id}
              className="rounded-2xl border border-[var(--border-soft)] bg-white p-5"
            >
              <h2 className="font-heading text-xl font-semibold text-navy">
                {role.title}
              </h2>
              <p className="mt-1 text-sm text-muted-light">
                {[role.location, role.employmentType].filter(Boolean).join(" · ")}
              </p>
              {role.summary ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-light">
                  {role.summary}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <LightCtaBar title="Introduce yourself" href="/contact?interest=general" />
    </>
  );
}
