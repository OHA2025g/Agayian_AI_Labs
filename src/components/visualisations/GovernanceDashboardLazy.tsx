"use client";

import dynamic from "next/dynamic";
import { LoadingState } from "@/components/states/LoadingState";

const GovernanceDashboard = dynamic(
  () =>
    import("@/components/visualisations/GovernanceDashboard").then(
      (mod) => mod.GovernanceDashboard,
    ),
  {
    ssr: false,
    loading: () => <LoadingState label="Loading dashboard preview" />,
  },
);

export function GovernanceDashboardLazy({ className }: { className?: string }) {
  return <GovernanceDashboard className={className} />;
}
