import { Section } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { siteConfig } from "@/config/site";
import { consultationFlow } from "@/lib/contact-schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Book a consultation with Agrayian AI Labs for AI strategy, CoE design, governance, products and enterprise or government programmes.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    interest?: string;
    product?: string;
    capability?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <Section
      eyebrow="Contact"
      title="Book a consultation"
      description="Tell us about your AI ambition, governance needs or product interest. We will review the requirement and propose a suitable discovery discussion."
      className="pt-10 md:pt-16"
    >
      <Reveal className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {consultationFlow.map((step, index) => (
          <article
            key={step.title}
            className="rounded-xl border border-white/10 bg-bg-elevated/40 p-5"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              Step {index + 1}
            </span>
            <h2 className="mt-3 font-heading text-lg font-semibold text-text-on-dark">
              {step.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-dark">
              {step.description}
            </p>
          </article>
        ))}
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-bg-elevated/40 p-6 md:p-8">
            <ContactForm
              defaultInterest={params.interest}
              defaultProduct={params.product}
              defaultCapability={params.capability}
            />
          </div>
        </Reveal>

        <RevealGroup className="space-y-6">
          <RevealItem>
            <aside className="rounded-2xl border border-white/10 bg-bg-elevated/40 p-6 text-sm text-muted-dark">
              <h2 className="font-heading text-xl font-semibold text-text-on-dark">
                Direct contact
              </h2>
              {siteConfig.contactEmail && (
                <p className="mt-3">
                  Email:{" "}
                  <a
                    className="text-cyan hover:underline"
                    href={`mailto:${siteConfig.contactEmail}`}
                  >
                    {siteConfig.contactEmail}
                  </a>
                </p>
              )}
              {siteConfig.contactPhone && (
                <p className="mt-2">
                  Phone:{" "}
                  <a
                    className="text-cyan hover:underline"
                    href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
                  >
                    {siteConfig.contactPhone}
                  </a>
                </p>
              )}
              {siteConfig.address && (
                <p className="mt-2">Address: {siteConfig.address}</p>
              )}
              {!siteConfig.contactPhone && !siteConfig.address && (
                <p className="mt-2 text-xs">
                  Additional phone and address details can be published from the
                  central site configuration when verified.
                </p>
              )}
            </aside>
          </RevealItem>
          <RevealItem>
            <aside className="rounded-2xl border border-white/10 bg-bg-elevated/40 p-6">
              <h2 className="font-heading text-xl font-semibold text-text-on-dark">
                Typical enquiry themes
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-dark">
                <li>AI consultation and strategy</li>
                <li>AI Centre of Excellence design</li>
                <li>AI governance and responsible AI</li>
                <li>Product demonstration</li>
                <li>Government and enterprise programmes</li>
                <li>Partnership discussions</li>
              </ul>
            </aside>
          </RevealItem>
        </RevealGroup>
      </div>

      <div className="mt-16">
        <FAQSection
          items={[
            {
              question: "What happens after I submit an enquiry?",
              answer:
                "We review the requirement, confirm fit and propose a discovery discussion. You will hear from us using your preferred contact method.",
            },
            {
              question: "Can I request a product demonstration?",
              answer:
                "Yes. Select Product demonstration as the area of interest, or open a product page from Products and use Request a demo. Share the decision context so we can prepare a relevant walkthrough.",
            },
            {
              question: "Do you work with government departments?",
              answer:
                "Yes. We support government and public-sector programmes with governance-aware delivery, decision-intelligence platforms and CoE design.",
            },
          ]}
        />
      </div>
    </Section>
  );
}
