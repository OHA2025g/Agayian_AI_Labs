import {
  Code2,
  Database,
  Landmark,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { mockupAssets } from "@/config/mockup-assets";

const groups: Array<{
  title: string;
  icon: LucideIcon;
  items: readonly string[];
}> = [
  {
    title: "Data Sources",
    icon: Database,
    items: ["Databases", "Applications", "Documents", "APIs & Feeds"],
  },
  {
    title: "Ingestion Layer",
    icon: Code2,
    items: ["Connectors", "ETL/ELT", "Streaming"],
  },
  {
    title: "AI & Intelligence Layer",
    icon: Sparkles,
    items: [
      "Foundational Models",
      "Domain Models",
      "Rules & Policies",
      "Knowledge Graph",
    ],
  },
  {
    title: "Application Layer",
    icon: Code2,
    items: ["Product Modules", "APIs", "Workflows", "Reporting"],
  },
  {
    title: "Enterprise Systems",
    icon: Landmark,
    items: ["ERP / CRM", "HCM / HRMS", "GRC / ITSM", "Custom Systems"],
  },
];

function FlowConnector() {
  return (
    <div className="products-flow-connector" aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}

function ArchitectureGroup({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: LucideIcon;
  items: readonly string[];
}) {
  return (
    <div className="products-arch-group">
      <strong>{title}</strong>
      {items.map((item) => (
        <span key={item}>
          <Icon aria-hidden />
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProductsArchitecture({
  title = "Built to integrate. Designed to scale.",
  coreTitle = "Governance & Security Core",
  coreSubtitle = "Policy · Privacy · Compliance · Audit",
}: {
  title?: string;
  coreTitle?: string;
  coreSubtitle?: string;
}) {
  return (
    <section className="products-architecture">
      <h2>{title}</h2>
      <span className="products-title-rule" />
      <div className="products-arch-flow">
        {groups.slice(0, 3).map((group, index) => (
          <div key={group.title} className="contents">
            {index > 0 ? <FlowConnector /> : null}
            <ArchitectureGroup {...group} />
          </div>
        ))}
        <FlowConnector />
        <div className="products-governance-core">
          <OriginalSculpture
            src={mockupAssets.originalInfinityHero}
            alt=""
            loading="eager"
            className="products-arch-infinity"
          />
          <strong>{coreTitle}</strong>
          <small>{coreSubtitle}</small>
        </div>
        {groups.slice(3).map((group) => (
          <div key={group.title} className="contents">
            <FlowConnector />
            <ArchitectureGroup {...group} />
          </div>
        ))}
      </div>
    </section>
  );
}
