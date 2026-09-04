import Link from "next/link";
import { GlobalModule } from "@/components/admin/GlobalModule";
import { legalTabs, trustTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

const docs = [
  { slug: "trust-page", label: "Trust Centre", path: "/trust" },
  { slug: "privacy-policy", label: "Privacy Policy", path: "/privacy-policy" },
  { slug: "terms-of-use", label: "Terms of Use", path: "/terms-of-use" },
  { slug: "responsible-ai", label: "Responsible AI", path: "/responsible-ai" },
  { slug: "cookie-policy", label: "Cookie Policy", path: "/cookie-policy" },
  {
    slug: "accessibility-statement",
    label: "Accessibility",
    path: "/accessibility-statement",
  },
] as const;

export default async function AdminLegalPage({
  searchParams,
}: {
  searchParams: Promise<{ doc?: string }>;
}) {
  const user = await requireAdminUser();
  const params = await searchParams;
  const current =
    docs.find((item) => item.slug === params.doc) ?? docs[0];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {docs.map((item) => (
          <Link
            key={item.slug}
            href={`/admin/legal?doc=${item.slug}`}
            className="admin-btn"
            aria-current={item.slug === current.slug ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {current.slug === "trust-page" ? (
        <GlobalModule
          user={user}
          slug="trust-page"
          title="Trust Centre"
          tabs={trustTabs}
          previewPath="/trust"
        />
      ) : (
        <GlobalModule
          user={user}
          slug={current.slug}
          title={current.label}
          tabs={legalTabs}
          previewPath={current.path}
        />
      )}
    </div>
  );
}
