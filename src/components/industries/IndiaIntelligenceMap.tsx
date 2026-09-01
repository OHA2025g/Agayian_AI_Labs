import { IndiaNetworkMap } from "@/components/visualisations/IndiaNetworkMap";

export function IndiaIntelligenceMap() {
  return (
    <div className="industries-map-stage">
      <IndiaNetworkMap
        variant="hero"
        showLegend={false}
        className="industries-map min-h-0"
      />
      <aside className="industries-legend" aria-label="Map legend">
        <p>
          <span className="h-2 w-2 rounded-full bg-[#38b7eb]" />
          Service delivery nodes
        </p>
        <p>
          <span className="h-2 w-2 rounded-full bg-[#ff5360]" />
          Priority focus areas
        </p>
        <p className="text-[#5d7394]">
          <span className="inline-block h-px w-3.5 border-t border-dashed border-[#38b7eb]" />
          Data & systems mesh
        </p>
      </aside>
    </div>
  );
}
