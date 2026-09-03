import {
  Activity,
  Database,
  Layers3,
  Server,
  Shield,
  Target,
  Wrench,
} from "lucide-react";
import { InsightsGlowSculpture } from "@/components/visualisations/insights/InsightsGlowSculpture";
import { insightSculptures } from "@/config/insight-sculptures";

const featuredStack = [
  { label: "Value & outcomes", icon: Target },
  { label: "Policy & guardrails", icon: Shield },
  { label: "Orchestration layer", icon: Layers3 },
  { label: "Tools & integrations", icon: Wrench },
  { label: "Data & context", icon: Database },
  { label: "Observability & feedback", icon: Activity },
  { label: "Infrastructure & security", icon: Server },
] as const;

export function InsightsFeaturedVisual() {
  return (
    <div className="flex items-center gap-5 md:gap-7">
      <div className="min-w-0 flex-1">
        <InsightsGlowSculpture
          asset={insightSculptures.featuredStack}
          sizes="(max-width: 1024px) 90vw, 28vw"
        />
      </div>
      <ol className="w-[11.5rem] shrink-0 space-y-2.5 sm:w-[13.5rem]">
        {featuredStack.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d4e6f2] bg-white text-tech-blue">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="text-[0.8rem] font-medium leading-snug text-navy">
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
