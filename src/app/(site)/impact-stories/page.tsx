import {
  FileCheck2,
  Shield,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { mockupAssets } from "@/config/mockup-assets";
import { ImpactStoriesCinematic } from "@/components/sections/ImpactStoriesCinematic";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import {
  getCapabilities,
  getImpactStories,
  getIndustries,
  getProducts,
} from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Impact Stories",
  description:
    "Explore anonymised sector-level impact stories showing how Agrayian approaches AI transformation, governance and product delivery.",
  path: "/impact-stories",
});

const floatingStories: {
  title: string;
  icon: LucideIcon;
  position: string;
}[] = [
  {
    title: "AI-Powered Talent Intelligence Transformation",
    icon: Users,
    position: "left-2 top-4 sm:left-4 sm:top-6",
  },
  {
    title: "Social Development Decision-Intelligence Platform",
    icon: Sparkles,
    position: "right-2 top-10 sm:right-6 sm:top-12",
  },
  {
    title: "Enterprise Audit & Assurance Command Centre",
    icon: FileCheck2,
    position: "left-4 bottom-16 sm:left-8 sm:bottom-20",
  },
  {
    title: "Regulated AI Governance & Assurance Enablement",
    icon: Shield,
    position: "right-3 bottom-8 sm:right-8 sm:bottom-12",
  },
];

const heroPrinciples = [
  "Patterns over projects",
  "Evidence over claims",
  "Impact through governance",
] as const;

function PrismHeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#dce8f2] bg-white p-4 md:p-6">
      <div className="relative w-full overflow-hidden rounded-xl">
        <OriginalSculpture
          src={mockupAssets.originalImpactPrism}
          alt=""
          priority
        />

        {floatingStories.map(({ title, icon: Icon, position }) => (
          <div
            key={title}
            className={`absolute max-w-[10.5rem] rounded-xl border border-[#dce8f2] bg-white px-2.5 py-2 shadow-[0_10px_28px_rgba(11,31,58,0.08)] sm:max-w-[12rem] ${position}`}
          >
            <span className="mb-1.5 flex h-6 w-6 items-center justify-center rounded-md text-navy">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <p className="text-[0.65rem] font-semibold leading-snug text-navy sm:text-xs">
              {title}
            </p>
          </div>
        ))}

        <ul className="absolute bottom-3 right-3 hidden space-y-1.5 rounded-xl border border-[#dce8f2] bg-white px-3 py-2 text-[0.65rem] shadow-sm sm:block">
          {heroPrinciples.map((item) => (
            <li key={item} className="flex items-center gap-2 text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function ImpactStoriesPage() {
  const [stories, industries, capabilities, products] = await Promise.all([
    getImpactStories(),
    getIndustries(),
    getCapabilities(),
    getProducts(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Impact Stories", path: "/impact-stories" },
            ]),
          ),
        }}
      />

      <PageHero
        title="Impact Stories"
        subtitle="Transformation patterns, told with evidence"
        description="Anonymised engagement stories showing the challenge, design response, governance approach and outcome pathway."
        primaryCta={{
          href: "/contact?interest=consultation",
          label: "Book a Consultation",
        }}
        secondaryCta={{
          href: "/capabilities",
          label: "Explore Capabilities",
        }}
        visual={<PrismHeroVisual />}
      />

      <ImpactStoriesCinematic
        stories={stories}
        industries={industries}
        capabilities={capabilities}
        products={products}
      />

      <LightCtaBar
        title="Turn AI ambition into governed, measurable impact."
        description="Numerical outcomes are shared only when validated with clients."
      />
    </>
  );
}
