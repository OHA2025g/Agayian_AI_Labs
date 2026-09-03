import type { ImpactStory } from "@/types";
import { AuditEvidenceSculpture } from "@/components/visualisations/impact/AuditEvidenceSculpture";
import { CandidateJourneySculpture } from "@/components/visualisations/impact/CandidateJourneySculpture";
import { DistrictHeatmapSculpture } from "@/components/visualisations/impact/DistrictHeatmapSculpture";
import { LifecycleSculpture } from "@/components/visualisations/impact/LifecycleSculpture";

export function ImpactStorySculpture({ story }: { story: ImpactStory }) {
  if (story.slug.includes("talent") || story.industry === "hr") {
    return <CandidateJourneySculpture />;
  }
  if (story.industry === "government") {
    return <DistrictHeatmapSculpture />;
  }
  if (story.slug.includes("audit")) {
    return <AuditEvidenceSculpture />;
  }
  return <LifecycleSculpture />;
}
