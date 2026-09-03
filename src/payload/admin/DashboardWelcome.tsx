"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Counts = {
  products: number;
  insights: number;
  resources: number;
  drafts: number;
  enquiries: number;
};

type EnquiryRow = {
  id: string;
  fullName?: string;
  type?: string;
  createdAt?: string;
};

type EditRow = {
  id: string;
  title: string;
  href: string;
  updatedAt?: string;
};

const pageSurfaces = [
  { href: "/admin/globals/home-page", label: "Home" },
  { href: "/admin/globals/coe-page", label: "AI CoE" },
  { href: "/admin/globals/governance-page", label: "Governance" },
  { href: "/admin/globals/company-page", label: "Company" },
  { href: "/admin/globals/contact-page", label: "Contact" },
  { href: "/admin/collections/products", label: "Products" },
  { href: "/admin/collections/capabilities", label: "Capabilities" },
  { href: "/admin/collections/industries", label: "Industries" },
  { href: "/admin/collections/impact-stories", label: "Impact stories" },
  { href: "/admin/collections/insights", label: "Insights" },
  { href: "/admin/collections/resources", label: "Resources" },
] as const;

async function countPublished(collection: string) {
  const response = await fetch(
    `/cms-api/${collection}?limit=0&where[status][equals]=published`,
    { credentials: "include" },
  );
  if (!response.ok) return 0;
  const json = (await response.json()) as { totalDocs?: number };
  return json.totalDocs ?? 0;
}

async function countDrafts(collection: string) {
  const response = await fetch(
    `/cms-api/${collection}?limit=0&where[or][0][status][equals]=draft&where[or][1][status][equals]=in_review`,
    { credentials: "include" },
  );
  if (!response.ok) return 0;
  const json = (await response.json()) as { totalDocs?: number };
  return json.totalDocs ?? 0;
}

export default function DashboardWelcome() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryRow[]>([]);
  const [edits, setEdits] = useState<EditRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [products, insights, resources, productDrafts, insightDrafts, enquiryRes, insightEdits] =
          await Promise.all([
            countPublished("products"),
            countPublished("insights"),
            countPublished("resources"),
            countDrafts("products"),
            countDrafts("insights"),
            fetch("/cms-api/enquiries?limit=5&sort=-createdAt", {
              credentials: "include",
            }),
            fetch("/cms-api/insights?limit=5&sort=-updatedAt", {
              credentials: "include",
            }),
          ]);
        const enquiryJson = enquiryRes.ok
          ? ((await enquiryRes.json()) as { docs?: EnquiryRow[]; totalDocs?: number })
          : { docs: [], totalDocs: 0 };
        const insightJson = insightEdits.ok
          ? ((await insightEdits.json()) as {
              docs?: { id: string; title?: string; slug?: string; updatedAt?: string }[];
            })
          : { docs: [] };
        if (cancelled) return;
        setCounts({
          products,
          insights,
          resources,
          drafts: productDrafts + insightDrafts,
          enquiries: enquiryJson.totalDocs ?? enquiryJson.docs?.length ?? 0,
        });
        setEnquiries(enquiryJson.docs ?? []);
        setEdits(
          (insightJson.docs ?? []).map((doc) => ({
            id: doc.id,
            title: doc.title || doc.slug || "Insight",
            href: `/admin/collections/insights/${doc.id}`,
            updatedAt: doc.updatedAt,
          })),
        );
      } catch {
        if (!cancelled) setCounts({ products: 0, insights: 0, resources: 0, drafts: 0, enquiries: 0 });
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="agrayian-dash">
      <div className="agrayian-dash__hero">
        <div>
          <p className="agrayian-dash__eyebrow">Agrayian AI Labs</p>
          <h1 className="agrayian-dash__title">Website Administration</h1>
          <p className="agrayian-dash__lead">
            Edit published pages and catalog records. Layout, sculptures and
            motion stay in the website code.
          </p>
        </div>
        <div className="agrayian-dash__actions">
          <Link className="agrayian-dash__btn agrayian-dash__btn--primary" href="/" target="_blank">
            View website
          </Link>
          <Link className="agrayian-dash__btn agrayian-dash__btn--ghost" href="/admin/collections/enquiries">
            Review enquiries
          </Link>
        </div>
      </div>

      <div className="agrayian-dash__section">
        <h2 className="agrayian-dash__section-title">Live counts</h2>
        <div className="agrayian-dash__grid agrayian-dash__grid--stats">
          <Stat label="Published products" value={counts?.products} />
          <Stat label="Published insights" value={counts?.insights} />
          <Stat label="Published resources" value={counts?.resources} />
          <Stat label="Drafts in review" value={counts?.drafts} />
          <Stat label="Enquiries" value={counts?.enquiries} />
        </div>
      </div>

      <div className="agrayian-dash__section">
        <h2 className="agrayian-dash__section-title">Site surfaces</h2>
        <div className="agrayian-dash__grid">
          {pageSurfaces.map((item) => (
            <a key={item.href} className="agrayian-dash__card" href={item.href}>
              <span className="agrayian-dash__card-label">{item.label}</span>
              <span className="agrayian-dash__card-hint">Open editor</span>
            </a>
          ))}
        </div>
      </div>

      <div className="agrayian-dash__section">
        <h2 className="agrayian-dash__section-title">Recent enquiries</h2>
        <ul className="agrayian-dash__list">
          {enquiries.length === 0 ? (
            <li className="agrayian-dash__card-hint">No enquiries yet.</li>
          ) : (
            enquiries.map((item) => (
              <li key={item.id}>
                <a href={`/admin/collections/enquiries/${item.id}`}>
                  {item.fullName || "Enquiry"}
                  {item.type ? ` · ${item.type}` : ""}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="agrayian-dash__section">
        <h2 className="agrayian-dash__section-title">Recent insight edits</h2>
        <ul className="agrayian-dash__list">
          {edits.length === 0 ? (
            <li className="agrayian-dash__card-hint">No insight edits yet.</li>
          ) : (
            edits.map((item) => (
              <li key={item.id}>
                <a href={item.href}>{item.title}</a>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div className="agrayian-dash__card">
      <span className="agrayian-dash__card-label">
        {value === undefined ? "—" : value}
      </span>
      <span className="agrayian-dash__card-hint">{label}</span>
    </div>
  );
}
