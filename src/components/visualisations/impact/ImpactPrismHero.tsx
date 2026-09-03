import Image from "next/image";
import Link from "next/link";
import { mockupAssets } from "@/config/mockup-assets";

const storyHotspots: {
  title: string;
  href: string;
  left: string;
  top: string;
  width: string;
  height: string;
}[] = [
  {
    title: "AI-Powered Talent Intelligence Transformation",
    href: "#ai-powered-talent-intelligence-transformation",
    left: "1.6%",
    top: "3%",
    width: "23.6%",
    height: "40%",
  },
  {
    title: "Social Development Decision-Intelligence Platform",
    href: "#social-development-decision-intelligence-platform",
    left: "26%",
    top: "3%",
    width: "23.6%",
    height: "40%",
  },
  {
    title: "Enterprise Audit & Assurance Command Centre",
    href: "#enterprise-audit-and-assurance-command-centre",
    left: "50.4%",
    top: "3%",
    width: "23.6%",
    height: "40%",
  },
  {
    title: "Regulated AI Governance & Assurance Enablement",
    href: "#regulated-ai-governance-and-assurance-enablement",
    left: "74.8%",
    top: "3%",
    width: "23.6%",
    height: "40%",
  },
];

export function ImpactPrismHero() {
  return (
    <div className="relative mx-auto w-full max-w-3xl lg:max-w-none">
      <Image
        src={mockupAssets.impactStoriesHero}
        alt="Glass impact prism connected to talent, social development, audit, and governance stories"
        width={1024}
        height={576}
        priority
        quality={100}
        sizes="(max-width: 1024px) 94vw, 56vw"
        className="h-auto w-full"
      />
      {storyHotspots.map((spot) => (
        <Link
          key={spot.href}
          href={spot.href}
          className="absolute rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech-blue"
          style={{
            left: spot.left,
            top: spot.top,
            width: spot.width,
            height: spot.height,
          }}
        >
          <span className="sr-only">{spot.title}</span>
        </Link>
      ))}
    </div>
  );
}
