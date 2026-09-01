export function IndustriesHeroLegend() {
  return (
    <aside className="industries-legend" aria-label="Map legend">
      <p>
        <span className="industries-legend-dot industries-legend-dot--service" />
        Service delivery nodes
      </p>
      <p>
        <span className="industries-legend-dot industries-legend-dot--priority" />
        Priority focus areas
      </p>
      <p>
        <span className="industries-legend-mesh" />
        Data & systems mesh
      </p>
    </aside>
  );
}
