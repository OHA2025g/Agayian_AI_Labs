import { Suspense } from "react";
import { ProductsLaboratory } from "@/components/sections/ProductsLaboratory";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { LoadingState } from "@/components/states/LoadingState";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { MockupCard } from "@/components/ui/MockupCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockupAssets } from "@/config/mockup-assets";
import { getProducts } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  return buildMetadata({
    title: "Products",
    description:
      "Explore Agrayian AI Labs' enterprise platforms, government solutions, governance systems and AI-powered decision tools.",
    path: "/products",
  });
}

const architectureLayers = [
  {
    title: "Data Sources",
    items: ["Databases", "Applications", "Documents", "APIs"],
  },
  {
    title: "Ingestion",
    items: ["Connectors", "ETL / ELT", "Streaming"],
  },
  {
    title: "AI Layer",
    items: ["Foundational models", "Domain models", "Rules & policies"],
  },
  {
    title: "Applications",
    items: ["Product modules", "APIs", "Workflows", "Reporting"],
  },
  {
    title: "Enterprise Systems",
    items: ["ERP / CRM", "HCM / HRIS", "GRC / ITSM", "Collaboration"],
  },
] as const;

export default async function ProductsPage() {
  const items = await getProducts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
            ]),
          ),
        }}
      />

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <LoadingState label="Loading products…" />
          </div>
        }
      >
        <ProductsLaboratory items={items} />
      </Suspense>

      <section className="border-t border-[var(--border-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle>Built to integrate. Designed to scale.</SectionTitle>
          <p className="mt-3 max-w-2xl text-muted-light">
            Five operating layers around a governance and security core — so
            products connect into enterprise systems without losing
            accountability.
          </p>

          <div className="relative mt-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {architectureLayers.map((stage) => (
                <MockupCard
                  key={stage.title}
                  className="flex flex-col px-4 py-5 text-center"
                >
                  <p className="text-sm font-semibold text-navy">{stage.title}</p>
                  <ul className="mt-3 space-y-1 text-xs leading-snug text-muted-light">
                    {stage.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </MockupCard>
              ))}
            </div>

            <div className="mx-auto mt-6 flex max-w-sm flex-col items-center rounded-2xl border border-[#dce8f2] bg-white px-5 py-4 text-center shadow-[0_10px_30px_rgba(11,31,58,0.05)]">
              <OriginalSculpture
                src={mockupAssets.originalInfinityHero}
                alt=""
                className="w-[9.5rem]"
              />
              <p className="mt-2 font-heading text-sm font-semibold text-navy">
                Governance &amp; Security Core
              </p>
              <p className="mt-1 text-xs text-muted-light">
                Policy, privacy, compliance and audit sit at the centre of every
                product path.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LightCtaBar
        title="Ready to see the right product in action for your organisation?"
        href="/contact?interest=demo"
        label="Request a Product Demonstration"
      />
    </>
  );
}
