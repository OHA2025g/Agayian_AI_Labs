"use client";

import type { ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  Check,
  ClipboardList,
  FileCheck,
  FileText,
  FolderKanban,
  LayoutGrid,
  Settings,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems: { label: string; icon: LucideIcon }[] = [
  { label: "Overview", icon: LayoutGrid },
  { label: "Use-case inventory", icon: FolderKanban },
  { label: "Risk & controls", icon: Shield },
  { label: "Approvals", icon: ClipboardList },
  { label: "Evidence", icon: FileCheck },
  { label: "Monitoring", icon: Activity },
  { label: "Incidents", icon: AlertTriangle },
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings },
];

const heatmapRows = [
  {
    likelihood: "High",
    cells: ["#7cb342", "#c4a017", "#e67e22", "#c0392b"],
  },
  {
    likelihood: "Medium",
    cells: ["#43a047", "#f1c40f", "#e67e22", "#d35400"],
  },
  {
    likelihood: "Low",
    cells: ["#2ecc71", "#9ccc65", "#f4d03f", "#e67e22"],
  },
] as const;

const impactLabels = ["Low", "Medium", "High", "Critical"] as const;

const approvals = [
  { label: "Approved", value: 78, color: "#2ecc71" },
  { label: "In review", value: 28, color: "#82e0aa" },
  { label: "Changes requested", value: 14, color: "#e67e22" },
  { label: "Rejected", value: 8, color: "#e74c3c" },
] as const;

const evidenceSegments = [
  { label: "Complete", value: 86, color: "#2ecc71" },
  { label: "In progress", value: 10, color: "#82e0aa" },
  { label: "Missing", value: 4, color: "#e74c3c" },
] as const;

const incidents = [
  { label: "High", value: 3, color: "#e74c3c" },
  { label: "Medium", value: 6, color: "#e67e22" },
  { label: "Low", value: 3, color: "#2ecc71" },
] as const;

type RiskLevel = "High" | "Medium" | "Low";
type ApprovalStatus = "Approved" | "In review" | "Changes requested";

const useCases: {
  name: string;
  owner: string;
  risk: RiskLevel;
  stage: string;
  approval: ApprovalStatus;
  evidence: number;
  updated: string;
}[] = [
  {
    name: "Customer Support Copilot",
    owner: "Customer Experience",
    risk: "High",
    stage: "Deploy",
    approval: "Approved",
    evidence: 92,
    updated: "May 23, 2024",
  },
  {
    name: "Fraud Detection Model",
    owner: "Risk & Compliance",
    risk: "High",
    stage: "Monitor",
    approval: "In review",
    evidence: 88,
    updated: "May 21, 2024",
  },
  {
    name: "Marketing Campaign Generator",
    owner: "Marketing",
    risk: "Medium",
    stage: "Validate",
    approval: "Changes requested",
    evidence: 61,
    updated: "May 18, 2024",
  },
  {
    name: "Pricing Optimization",
    owner: "Commercial",
    risk: "Medium",
    stage: "Build",
    approval: "In review",
    evidence: 76,
    updated: "May 16, 2024",
  },
  {
    name: "HR Resume Screening",
    owner: "People Operations",
    risk: "Low",
    stage: "Assess",
    approval: "Approved",
    evidence: 45,
    updated: "May 12, 2024",
  },
];

function riskTone(risk: RiskLevel) {
  switch (risk) {
    case "High":
      return "text-[#e74c3c]";
    case "Medium":
      return "text-[#f1c40f]";
    case "Low":
      return "text-[#2ecc71]";
    default: {
      const _exhaustive: never = risk;
      return _exhaustive;
    }
  }
}

function approvalTone(status: ApprovalStatus) {
  switch (status) {
    case "Approved":
      return { box: "bg-[#2ecc71]", icon: true };
    case "In review":
      return { box: "bg-[#f1c40f]", icon: false };
    case "Changes requested":
      return { box: "bg-[#e67e22]", icon: false };
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function evidenceBarColor(value: number) {
  return value >= 76 ? "#2ecc71" : "#f1c40f";
}

function conicStops(segments: readonly { value: number; color: string }[]) {
  const total = segments.reduce((sum, item) => sum + item.value, 0);
  let acc = 0;
  return segments
    .map((item) => {
      const start = (acc / total) * 360;
      acc += item.value;
      const end = (acc / total) * 360;
      return `${item.color} ${start}deg ${end}deg`;
    })
    .join(", ");
}

function PreviewLink({ children }: { children: ReactNode }) {
  return (
    <span className="mt-auto inline-flex items-center gap-1 pt-1.5 text-[0.62rem] font-medium text-[#5dade2]">
      {children}
      <span aria-hidden>→</span>
    </span>
  );
}

function Donut({
  segments,
  label,
  caption,
}: {
  segments: readonly { value: number; color: string }[];
  label: string;
  caption: string;
}) {
  return (
    <div
      className="relative h-[4.75rem] w-[4.75rem] shrink-0 rounded-full"
      style={{ background: `conic-gradient(${conicStops(segments)})` }}
    >
      <div className="absolute inset-[15%] flex flex-col items-center justify-center rounded-full bg-[#121a2c] text-center">
        <p className="font-heading text-[0.95rem] font-semibold leading-none text-white">
          {label}
        </p>
        <p className="mt-0.5 text-[0.52rem] text-[#9aa8bc]">{caption}</p>
      </div>
    </div>
  );
}

export function GovernanceDashboard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "on-dark-surface overflow-hidden rounded-2xl bg-[#0b1220] text-[#f8fafc] shadow-[0_24px_60px_rgba(7,26,61,0.28)]",
        className,
      )}
      aria-label="AI Governance command centre preview"
    >
      <div className="grid lg:grid-cols-[11.5rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/10 bg-[#0a101c] px-2 py-2.5 lg:block">
          <nav aria-label="Command centre sections">
            <ul className="space-y-px">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = index === 0;
                return (
                  <li key={item.label}>
                    <span
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.7rem]",
                        active
                          ? "bg-[#d7dee8] font-medium text-[#0b1220]"
                          : "text-[#9aa8bc]",
                      )}
                    >
                      <Icon className="h-3 w-3 shrink-0" aria-hidden />
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 bg-[linear-gradient(180deg,#10192c_0%,#0b1220_40%)] p-3 sm:p-3.5">
          <div>
            <h3 className="font-heading text-base font-semibold tracking-tight text-white sm:text-lg">
              AI Governance command centre
            </h3>
            <div className="mt-1 flex gap-1" aria-hidden>
              <span className="h-0.5 w-7 rounded-full bg-[#5dade2]" />
              <span className="h-0.5 w-7 rounded-full bg-[#ff6b6b]" />
            </div>
          </div>

          <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            <article className="flex flex-col rounded-lg border border-white/10 bg-[#141c2f]/90 p-2.5">
              <h4 className="text-xs font-semibold text-white">Risk heatmap</h4>
              <div className="mt-1.5 grid grid-cols-[auto_1fr] items-center gap-1.5">
                <p className="[writing-mode:vertical-rl] rotate-180 text-center text-[0.55rem] uppercase tracking-[0.14em] text-[#8b97ab]">
                  Likelihood
                </p>
                <div className="min-w-0">
                  <div className="space-y-0.5">
                    {heatmapRows.map((row) => (
                      <div
                        key={row.likelihood}
                        className="grid grid-cols-[2.1rem_repeat(4,minmax(0,1fr))] items-center gap-0.5"
                      >
                        <span className="text-right text-[0.52rem] text-[#8b97ab]">
                          {row.likelihood}
                        </span>
                        {row.cells.map((color, index) => (
                          <div
                            key={`${row.likelihood}-${impactLabels[index]}`}
                            className="relative h-5 rounded-[2px]"
                            style={{ backgroundColor: color }}
                          >
                            {row.likelihood === "Low" &&
                            impactLabels[index] === "High" ? (
                              <span className="absolute left-1/2 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b1220] text-[0.5rem] font-semibold text-white">
                                23
                              </span>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-[2.1rem_repeat(4,minmax(0,1fr))] gap-0.5">
                    <span />
                    {impactLabels.map((label) => (
                      <span
                        key={label}
                        className="text-center text-[0.55rem] text-[#8b97ab]"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <p className="mt-0.5 text-center text-[0.55rem] uppercase tracking-[0.14em] text-[#8b97ab]">
                    Impact
                  </p>
                </div>
              </div>
              <PreviewLink>View risk register</PreviewLink>
            </article>

            <article className="flex flex-col rounded-lg border border-white/10 bg-[#141c2f]/90 p-2.5">
              <h4 className="text-xs font-semibold text-white">Approvals</h4>
              <div className="mt-1.5 flex items-center gap-2.5">
                <Donut segments={approvals} label="128" caption="Total" />
                <ul className="min-w-0 space-y-1 text-[0.62rem]">
                  {approvals.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between gap-3 text-[#c5d0de]"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-[2px]"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.label}
                      </span>
                      <span className="font-medium text-white">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <PreviewLink>View all approvals</PreviewLink>
            </article>

            <article className="flex flex-col rounded-lg border border-white/10 bg-[#141c2f]/90 p-2.5">
              <h4 className="text-xs font-semibold text-white">
                Evidence completeness
              </h4>
              <div className="mt-1.5 flex items-center gap-2.5">
                <Donut
                  segments={evidenceSegments}
                  label="86%"
                  caption="Complete"
                />
                <ul className="min-w-0 space-y-1 text-[0.62rem]">
                  {evidenceSegments.map((item) => (
                    <li
                      key={item.label}
                      className="inline-flex items-center gap-1.5 text-[#c5d0de]"
                    >
                      <span
                        className="h-2 w-2 rounded-[2px]"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <PreviewLink>View gaps</PreviewLink>
            </article>

            <article className="flex flex-col rounded-lg border border-white/10 bg-[#141c2f]/90 p-2.5">
              <h4 className="text-xs font-semibold text-white">Incidents</h4>
              <p className="mt-2 font-heading text-2xl font-semibold leading-none text-white">
                12
              </p>
              <p className="mt-0.5 text-[0.7rem] text-[#9aa8bc]">Open incidents</p>
              <ul className="mt-2 space-y-1 text-[0.62rem] text-[#c5d0de]">
                {incidents.map((item) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-[3px]"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="w-14">{item.label}</span>
                    <span className="font-medium text-white">{item.value}</span>
                  </li>
                ))}
              </ul>
              <PreviewLink>View incidents</PreviewLink>
            </article>
          </div>

          <div className="mt-2.5 overflow-hidden rounded-lg border border-white/10 bg-[#141c2f]/90">
            <h4 className="px-3 py-1.5 text-xs font-semibold text-white">
              Recent use cases
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[52rem] text-left text-[0.7rem]">
                <thead>
                  <tr className="border-y border-white/10 text-[#8b97ab]">
                    <th className="px-3 py-1.5 font-medium">Use case</th>
                    <th className="px-2.5 py-1.5 font-medium">Business owner</th>
                    <th className="px-2.5 py-1.5 font-medium">Risk level</th>
                    <th className="px-2.5 py-1.5 font-medium">Stage</th>
                    <th className="px-2.5 py-1.5 font-medium">Approval status</th>
                    <th className="px-2.5 py-1.5 font-medium">Evidence</th>
                    <th className="px-3 py-1.5 font-medium">Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {useCases.map((row) => {
                    const approval = approvalTone(row.approval);
                    return (
                      <tr
                        key={row.name}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="px-3 py-1.5 font-medium text-white">
                          {row.name}
                        </td>
                        <td className="px-2.5 py-1.5 text-[#c5d0de]">{row.owner}</td>
                        <td className={cn("px-2.5 py-1.5", riskTone(row.risk))}>
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className="grid h-3.5 w-3.5 grid-cols-2 gap-px"
                              aria-hidden
                            >
                              {Array.from({ length: 4 }).map((_, index) => (
                                <span
                                  key={index}
                                  className="rounded-[1px] bg-current"
                                />
                              ))}
                            </span>
                            {row.risk}
                          </span>
                        </td>
                        <td className="px-2.5 py-1.5 text-[#c5d0de]">
                          <span className="inline-flex items-center gap-1.5">
                            <FileText
                              className="h-3.5 w-3.5 text-[#8b97ab]"
                              aria-hidden
                            />
                            {row.stage}
                          </span>
                        </td>
                        <td className="px-2.5 py-1.5 text-[#c5d0de]">
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className={cn(
                                "inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px]",
                                approval.box,
                              )}
                              aria-hidden
                            >
                              {approval.icon ? (
                                <Check className="h-2.5 w-2.5 text-white" />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                              )}
                            </span>
                            {row.approval}
                          </span>
                        </td>
                        <td className="px-2.5 py-1.5">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${row.evidence}%`,
                                  backgroundColor: evidenceBarColor(
                                    row.evidence,
                                  ),
                                }}
                              />
                            </div>
                            <span className="text-[#c5d0de]">{row.evidence}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-1.5 text-[#c5d0de]">{row.updated}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
