import { MetricCard } from "@/components/cards/MetricCard";
import { cn } from "@/lib/utils";

export type DashboardVariant =
  | "smart-hiring"
  | "wcd-intelligence"
  | "onetouch-audit"
  | "ai-governance-command-centre"
  | "enterprise-decision-intelligence"
  | "document-intelligence-copilot"
  | "default";

const variantConfig: Record<
  DashboardVariant,
  {
    title: string;
    metrics: { label: string; value: string; tone?: "cyan" | "brand" | "violet" | "success" | "warning" }[];
    rows: string[];
  }
> = {
  "smart-hiring": {
    title: "Hiring intelligence",
    metrics: [
      { label: "Pipeline", value: "124", tone: "cyan" },
      { label: "Shortlists", value: "18", tone: "violet" },
      { label: "Explainable", value: "On", tone: "success" },
    ],
    rows: ["Match score · Role fit", "Assessment pack", "Interview signals"],
  },
  "wcd-intelligence": {
    title: "Programme pulse",
    metrics: [
      { label: "Districts", value: "36", tone: "cyan" },
      { label: "Risk flags", value: "7", tone: "warning" },
      { label: "Actions", value: "12", tone: "brand" },
    ],
    rows: ["Indicator board", "Intervention queue", "Geo overview"],
  },
  "onetouch-audit": {
    title: "Assurance centre",
    metrics: [
      { label: "Exceptions", value: "9", tone: "warning" },
      { label: "Evidence", value: "Ready", tone: "success" },
      { label: "Remediation", value: "5", tone: "cyan" },
    ],
    rows: ["Risk heatmap", "Evidence tracker", "Control status"],
  },
  "ai-governance-command-centre": {
    title: "AI registry",
    metrics: [
      { label: "Systems", value: "48", tone: "cyan" },
      { label: "High risk", value: "7", tone: "brand" },
      { label: "Reviews", value: "9", tone: "violet" },
    ],
    rows: ["Use-case inventory", "Approval queue", "Monitoring"],
  },
  "enterprise-decision-intelligence": {
    title: "Executive view",
    metrics: [
      { label: "KPIs", value: "22", tone: "cyan" },
      { label: "Alerts", value: "4", tone: "warning" },
      { label: "Forecast", value: "Live", tone: "success" },
    ],
    rows: ["Decision board", "Driver tree", "Scenario compare"],
  },
  "document-intelligence-copilot": {
    title: "Document workspace",
    metrics: [
      { label: "Docs", value: "86", tone: "cyan" },
      { label: "Extracts", value: "31", tone: "violet" },
      { label: "Citations", value: "On", tone: "success" },
    ],
    rows: ["Source panel", "Answer draft", "Review trail"],
  },
  default: {
    title: "Product preview",
    metrics: [
      { label: "Modules", value: "6", tone: "cyan" },
      { label: "Signals", value: "14", tone: "violet" },
      { label: "Governed", value: "Yes", tone: "success" },
    ],
    rows: ["Overview", "Workflow", "Controls"],
  },
};

function resolveVariant(slug?: string): DashboardVariant {
  if (!slug) return "default";
  if (slug in variantConfig) return slug as DashboardVariant;
  return "default";
}

export function DashboardPreview({
  variant,
  compact = false,
  className,
  showDemoLabel = false,
}: {
  variant?: string;
  compact?: boolean;
  className?: string;
  showDemoLabel?: boolean;
}) {
  const key = resolveVariant(variant);
  const config = variantConfig[key];

  if (compact) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-cyan/20 bg-bg-primary/80 p-2",
          className,
        )}
        aria-hidden
      >
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[0.55rem] font-medium uppercase tracking-wider text-cyan">
            {config.title}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
        </div>
        <div className="grid grid-cols-3 gap-1">
          {config.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded border border-white/10 bg-white/[0.03] px-1 py-1"
            >
              <p className="text-[0.45rem] text-muted-dark">{metric.label}</p>
              <p className="font-heading text-[0.7rem] font-semibold text-text-on-dark">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-1.5 space-y-1">
          {config.rows.slice(0, 2).map((row) => (
            <div
              key={row}
              className="h-1.5 rounded-full bg-gradient-to-r from-white/10 via-cyan/20 to-transparent"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-bg-elevated/60",
        className,
      )}
    >
      {showDemoLabel && (
        <div className="border-b border-white/10 bg-warning/10 px-4 py-2 text-xs text-warning">
          Conceptual demonstration view — not live client data.
        </div>
      )}
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-sm font-semibold text-text-on-dark">
            {config.title}
          </p>
          <span className="rounded-full bg-cyan/15 px-2 py-0.5 text-[0.65rem] text-cyan">
            Preview
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {config.metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              tone={metric.tone}
            />
          ))}
        </div>
        <ul className="mt-4 space-y-2">
          {config.rows.map((row) => (
            <li
              key={row}
              className="flex items-center justify-between rounded-md border border-white/10 bg-bg-primary/50 px-3 py-2 text-xs text-muted-dark"
            >
              <span>{row}</span>
              <span className="h-1.5 w-12 rounded-full bg-gradient-to-r from-brand/60 to-cyan/50" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
