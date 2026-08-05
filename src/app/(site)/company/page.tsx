import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { companyIntro, companyValues } from "@/data/company";
import { getPublishedGlobal } from "@/lib/cms/published";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Company",
  description:
    "Learn about Agrayian AI Labs — our vision, mission, values and commitment to responsible AI for enterprises and governments.",
  path: "/company",
});

type CompanyGlobal = {
  vision?: string;
  mission?: string;
  introduction?: string;
  whyAgrayian?: { text?: string }[] | string[];
  deliveryPhilosophy?: string[] | string;
  responsibleAiCommitment?: string;
  technologyPhilosophy?: string;
  careersCopy?: string;
  partnerEcosystemCopy?: string;
  values?: { title?: string; description?: string }[];
};

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) =>
    typeof item === "string"
      ? item
      : String((item as { text?: string }).text ?? ""),
  );
}

export default async function CompanyPage() {
  const doc = await getPublishedGlobal<CompanyGlobal>("company-page");
  const intro = {
    vision: doc?.vision || companyIntro.vision,
    mission: doc?.mission || companyIntro.mission,
    introduction: doc?.introduction || companyIntro.introduction,
    whyAgrayian: doc?.whyAgrayian
      ? asStringList(doc.whyAgrayian)
      : companyIntro.whyAgrayian,
    deliveryPhilosophy: doc?.deliveryPhilosophy
      ? asStringList(
          Array.isArray(doc.deliveryPhilosophy)
            ? doc.deliveryPhilosophy
            : [doc.deliveryPhilosophy],
        )
      : companyIntro.deliveryPhilosophy,
    responsibleAiCommitment:
      doc?.responsibleAiCommitment || companyIntro.responsibleAiCommitment,
    technologyPhilosophy:
      doc?.technologyPhilosophy || companyIntro.technologyPhilosophy,
    careers: doc?.careersCopy || companyIntro.careers,
    partnerEcosystem:
      doc?.partnerEcosystemCopy || companyIntro.partnerEcosystem,
  };
  const values =
    doc?.values?.length && doc.values.every((v) => v.title)
      ? doc.values.map((v) => ({
          title: String(v.title),
          description: String(v.description ?? ""),
        }))
      : companyValues;

  return (
    <>
      <Section
        eyebrow="Company"
        title="Agrayian AI Labs"
        description={intro.introduction}
        className="pt-10 md:pt-16"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-bg-elevated/40 p-6">
            <h2 className="font-heading text-xl font-semibold">Vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-dark">
              {intro.vision}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-bg-elevated/40 p-6">
            <h2 className="font-heading text-xl font-semibold">Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-dark">
              {intro.mission}
            </p>
          </div>
        </div>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Why Agrayian"
        title="Why organisations work with Agrayian AI Labs"
      >
        <ul className="grid gap-3 md:grid-cols-2">
          {intro.whyAgrayian.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-bg-primary/40 p-5 text-sm text-muted-dark"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Values" title="How we work">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-xl border border-white/10 bg-bg-elevated/40 p-5"
            >
              <h3 className="font-heading text-lg font-semibold">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-muted-dark">{value.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Delivery"
        title="Delivery philosophy"
      >
        <ul className="mb-8 grid gap-3 md:grid-cols-2">
          {intro.deliveryPhilosophy.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-bg-primary/40 p-5 text-sm text-muted-dark"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-bg-primary/40 p-5 text-sm text-muted-dark">
            <h3 className="font-heading text-lg font-semibold text-text-on-dark">
              Responsible AI
            </h3>
            <p className="mt-2">{intro.responsibleAiCommitment}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-bg-primary/40 p-5 text-sm text-muted-dark">
            <h3 className="font-heading text-lg font-semibold text-text-on-dark">
              Technology
            </h3>
            <p className="mt-2">{intro.technologyPhilosophy}</p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Careers & partners"
        title="Join the work — when roles and partnerships are real"
        description="We do not invent job openings or partner logos. When verified opportunities exist, they appear here and in the CMS."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-bg-elevated/40 p-5 text-sm text-muted-dark">
            <h3 className="font-heading text-lg font-semibold text-text-on-dark">
              Careers
            </h3>
            <p className="mt-2">{intro.careers}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-bg-elevated/40 p-5 text-sm text-muted-dark">
            <h3 className="font-heading text-lg font-semibold text-text-on-dark">
              Partners
            </h3>
            <p className="mt-2">{intro.partnerEcosystem}</p>
          </div>
        </div>
        <div className="mt-8">
          <PrimaryButton href="/contact">Contact Agrayian</PrimaryButton>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
