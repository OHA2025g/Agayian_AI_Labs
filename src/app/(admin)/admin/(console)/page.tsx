import Link from "next/link";
import {
  getAttentionItems,
  getDashboardData,
  getRecentAudit,
} from "@/lib/admin/dashboard";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminDashboardPage() {
  await requireAdminUser();
  const [counts, attention, audit] = await Promise.all([
    getDashboardData(),
    getAttentionItems(),
    getRecentAudit(),
  ]);

  const cards = [
    { label: "Published", value: counts.published, tone: "#24b8ef" },
    { label: "Drafts", value: counts.drafts, tone: "#f0b429" },
    { label: "Scheduled", value: counts.scheduled, tone: "#0a6f96" },
    { label: "New enquiries", value: counts.newEnquiries, tone: "#ff4551" },
    { label: "Media", value: counts.media, tone: "#061a3a" },
    { label: "Missing alt", value: counts.missingAlt, tone: "#c12332" },
    { label: "Missing SEO titles", value: counts.missingSeo, tone: "#8a5b00" },
  ];

  return (
    <div>
      <div className="admin-panel-head">
        <div>
          <p className="admin-kicker">Overview</p>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-lede">
            What needs publishing, what arrived in the inbox, and the last
            changes made in this console.
          </p>
        </div>
        <div className="admin-toolbar">
          <Link href="/admin/home" className="admin-btn">
            Edit Home
          </Link>
          <Link href="/admin/enquiries" className="admin-btn">
            Open inbox
          </Link>
          <Link href="/admin/capabilities" className="admin-btn admin-btn-primary">
            Capabilities
          </Link>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="admin-card admin-stat"
            style={{ ["--admin-stat" as string]: card.tone }}
          >
            <p className="text-xs uppercase tracking-wide text-[var(--admin-muted)]">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="admin-card">
          <h2 className="admin-card-title">Needs attention</h2>
          {attention.length ? (
            <ul className="mt-3 space-y-2 text-sm">
              {attention.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="admin-table-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="admin-empty">Nothing waiting.</p>
          )}
        </section>
        <section className="admin-card">
          <h2 className="admin-card-title">Site status</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-[var(--admin-muted)]">Public URL</dt>
              <dd>{counts.siteUrl || "Not set"}</dd>
            </div>
            <div>
              <dt className="text-[var(--admin-muted)]">Database</dt>
              <dd>{counts.databaseOk ? "Connected" : "Unavailable"}</dd>
            </div>
            <div>
              <dt className="text-[var(--admin-muted)]">Form delivery</dt>
              <dd>{counts.formsOk ? "Resend configured" : "Resend not configured"}</dd>
            </div>
            <div>
              <dt className="text-[var(--admin-muted)]">Last activity</dt>
              <dd>
                {counts.lastUpdated
                  ? new Date(counts.lastUpdated).toLocaleString()
                  : "—"}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="admin-card mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="admin-card-title">Recent activity</h2>
          <Link href="/admin/activity" className="admin-table-link text-sm">
            View log
          </Link>
        </div>
        <ul className="space-y-2 text-sm">
          {audit.length ? (
            audit.map((item) => (
              <li key={item.id}>
                {item.summary} · {new Date(item.createdAt).toLocaleString()}
              </li>
            ))
          ) : (
            <li className="text-[var(--admin-muted)]">No audit events yet.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
