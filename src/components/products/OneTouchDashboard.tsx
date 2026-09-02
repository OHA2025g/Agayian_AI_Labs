const metrics = [
  ["Audit Progress", "68%", "32 of 47 audits completed"],
  ["High Risk Areas", "12", "Require immediate attention"],
  ["Open Issues", "24", "8 awaiting management response"],
  ["Evidence Collected", "1,348", "+16% vs last cycle"],
] as const;

const nav = [
  "Overview",
  "Audit Universe",
  "Risk Assessment",
  "Audit Plan",
  "Fieldwork",
  "Issues",
  "Analytics",
  "Reports",
  "Settings",
] as const;

const risks = [
  ["IT Access Management", "High"],
  ["Vendor Management", "High"],
  ["Financial Close Process", "Medium"],
  ["Change Management", "Medium"],
] as const;

/** Original OneTouch dashboard — HTML/CSS, not a screenshot crop. */
export function OneTouchDashboard() {
  return (
    <div
      className="products-dashboard"
      aria-label="OneTouch Audit dashboard preview"
    >
      <aside>
        <div className="products-dashboard-brand">
          <span>∞</span> OneTouch Audit
        </div>
        {nav.map((item, index) => (
          <div
            key={item}
            className={index === 0 ? "products-dashboard-active" : undefined}
          >
            {item}
          </div>
        ))}
      </aside>
      <div className="products-dashboard-main">
        <div className="products-dashboard-top">
          <div>
            <small>Welcome back, Auditor</small>
            <strong>
              Here&apos;s what&apos;s happening across your audit universe.
            </strong>
          </div>
          <span className="products-dashboard-action">Download Report</span>
        </div>
        <div className="products-metric-grid">
          {metrics.map(([title, value, sub]) => (
            <div key={title}>
              <span>{title}</span>
              <strong>{value}</strong>
              <small>{sub}</small>
            </div>
          ))}
        </div>
        <div className="products-dashboard-charts">
          <div className="products-donut">
            <span>68%</span>
          </div>
          <div className="products-risk-list">
            <strong>Top Risk Areas</strong>
            {risks.map(([item, level]) => (
              <span key={item}>
                {item}
                <b>{level}</b>
              </span>
            ))}
          </div>
          <div className="products-status-donut">
            <span />
            <small>
              Open 24
              <br />
              In Progress 16
              <br />
              Closed 40
            </small>
          </div>
        </div>
        <div className="products-dashboard-footer">
          <span>Recent Activity</span>
          <span>Upcoming Milestones</span>
        </div>
      </div>
    </div>
  );
}
