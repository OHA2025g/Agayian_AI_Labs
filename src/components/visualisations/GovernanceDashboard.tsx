"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const demoBars = [
  { name: "Ideate", count: 8 },
  { name: "Assess", count: 11 },
  { name: "Approve", count: 6 },
  { name: "Deploy", count: 14 },
  { name: "Monitor", count: 9 },
];

const metrics = [
  { label: "Total AI systems", value: "48", tone: "default" },
  { label: "High-risk use cases", value: "11", tone: "alert" },
  { label: "Pending assessments", value: "7", tone: "warn" },
  { label: "Models in production", value: "23", tone: "ok" },
  { label: "Monitoring alerts", value: "4", tone: "warn" },
  { label: "Upcoming reviews", value: "9", tone: "default" },
  { label: "Open incidents", value: "2", tone: "alert" },
  { label: "Policy compliance", value: "94%", tone: "ok" },
] as const;

const queue = [
  {
    name: "Credit exception assistant",
    risk: "High",
    stage: "Review",
    owner: "Risk CoE",
  },
  {
    name: "Policy knowledge copilot",
    risk: "Medium",
    stage: "Validate",
    owner: "Legal Ops",
  },
  {
    name: "Programme indicator monitor",
    risk: "Medium",
    stage: "Monitor",
    owner: "Public Sector Unit",
  },
  {
    name: "Supplier document triage",
    risk: "Low",
    stage: "Approve",
    owner: "Procurement",
  },
] as const;

function toneClass(tone: (typeof metrics)[number]["tone"]) {
  switch (tone) {
    case "ok":
      return "text-success";
    case "warn":
      return "text-warning";
    case "alert":
      return "text-critical";
    case "default":
      return "text-text-on-dark";
    default: {
      const _exhaustive: never = tone;
      return _exhaustive;
    }
  }
}

export function GovernanceDashboard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-bg-elevated/50",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-warning/10 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="violet">Illustrative preview</Badge>
          <p className="text-sm text-warning">
            Sample interface only — metrics are not live client data.
          </p>
        </div>
        <p className="font-tech text-[0.55rem] uppercase tracking-[0.18em] text-muted-dark">
          Illustrative preview
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-heading text-xl font-semibold text-text-on-dark">
              AI Governance Command View
            </h3>
            <p className="mt-1 text-sm text-muted-dark">
              Inventory, risk posture, assessments and oversight workflow at a
              glance.
            </p>
          </div>
          <Badge variant="cyan">Demo environment</Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-white/10 bg-bg-primary/60 p-4"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-dark">
                {metric.label}
              </p>
              <p
                className={cn(
                  "mt-2 font-heading text-3xl font-semibold",
                  toneClass(metric.tone),
                )}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 h-52 rounded-xl border border-white/10 bg-bg-primary/50 p-4">
          <p className="mb-2 text-xs text-muted-dark">
            Use cases by lifecycle stage (demo)
          </p>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={demoBars}>
              <XAxis dataKey="name" stroke="#9CA9BC" fontSize={12} />
              <YAxis stroke="#9CA9BC" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "#0E1B30",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="count" fill="#19C3D3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-white/10 bg-bg-primary/50 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h4 className="font-heading text-base font-semibold text-text-on-dark">
                Assessment queue
              </h4>
              <span className="text-xs text-muted-dark">Demonstration</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.12em] text-muted-dark">
                  <tr className="border-b border-white/10">
                    <th className="pb-2 pr-3 font-medium">Use case</th>
                    <th className="pb-2 pr-3 font-medium">Risk</th>
                    <th className="pb-2 pr-3 font-medium">Stage</th>
                    <th className="pb-2 font-medium">Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-white/5 text-muted-dark last:border-0"
                    >
                      <td className="py-2.5 pr-3 text-text-on-dark">
                        {row.name}
                      </td>
                      <td className="py-2.5 pr-3">{row.risk}</td>
                      <td className="py-2.5 pr-3">{row.stage}</td>
                      <td className="py-2.5">{row.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-bg-primary/50 p-4">
            <h4 className="font-heading text-base font-semibold text-text-on-dark">
              Oversight signals
            </h4>
            <ul className="mt-3 space-y-3 text-sm text-muted-dark">
              <li className="rounded-lg border border-white/10 px-3 py-2">
                Drift review due for two production ranking models this week.
              </li>
              <li className="rounded-lg border border-white/10 px-3 py-2">
                Three vendor AI tools awaiting third-party risk questionnaire.
              </li>
              <li className="rounded-lg border border-white/10 px-3 py-2">
                Human-oversight log completeness flagged for one shared-services
                assistant.
              </li>
              <li className="rounded-lg border border-warning/30 bg-warning/5 px-3 py-2 text-warning">
                All values above are sample demonstration data for UI preview.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
