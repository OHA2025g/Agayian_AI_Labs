import React from "react";

const shortcuts = [
  {
    href: "/admin/collections/products",
    label: "Products",
    hint: "Lab portfolio & detail pages",
  },
  {
    href: "/admin/collections/insights",
    label: "Insights",
    hint: "Articles and thought leadership",
  },
  {
    href: "/admin/collections/enquiries",
    label: "Enquiries",
    hint: "Inbound contact submissions",
  },
  {
    href: "/admin/globals/home-page",
    label: "Home page",
    hint: "Hero and homepage globals",
  },
  {
    href: "/admin/collections/media",
    label: "Media",
    hint: "Images and downloadable assets",
  },
  {
    href: "/admin/globals/site-settings",
    label: "Site settings",
    hint: "Brand copy and contact defaults",
  },
] as const;

export default function DashboardWelcome() {
  return (
    <section className="agrayian-dash">
      <div className="agrayian-dash__hero">
        <p className="agrayian-dash__eyebrow">Agrayian AI Labs</p>
        <h1 className="agrayian-dash__title">Content Command Centre</h1>
        <p className="agrayian-dash__lead">
          Publish products, insights, and page content with the same clarity
          standards as the public site — no invented metrics or clients.
        </p>
        <div className="agrayian-dash__actions">
          <a className="agrayian-dash__btn agrayian-dash__btn--primary" href="/">
            View live site
          </a>
          <a
            className="agrayian-dash__btn agrayian-dash__btn--ghost"
            href="/admin/collections/enquiries"
          >
            Review enquiries
          </a>
        </div>
      </div>

      <div className="agrayian-dash__grid">
        {shortcuts.map((item) => (
          <a key={item.href} className="agrayian-dash__card" href={item.href}>
            <span className="agrayian-dash__card-label">{item.label}</span>
            <span className="agrayian-dash__card-hint">{item.hint}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
