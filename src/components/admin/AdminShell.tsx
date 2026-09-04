"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpenText,
  Boxes,
  Building2,
  FileQuestion,
  Home,
  ImageIcon,
  Inbox,
  Layers,
  LayoutDashboard,
  Mail,
  Menu,
  Newspaper,
  Scale,
  Search,
  Settings,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { AgrayianMark } from "@/components/layout/AgrayianMark";
import { logoutAction } from "@/lib/admin/auth-actions";
import { adminGroups, adminNav } from "@/lib/admin/nav";
import type { AdminUser } from "@/lib/admin/rbac";
import { StatusBadge } from "./StatusBadge";

const NAV_ICONS = {
  "/admin": LayoutDashboard,
  "/admin/home": Home,
  "/admin/capabilities": Layers,
  "/admin/products": Boxes,
  "/admin/industries": Building2,
  "/admin/coe": Sparkles,
  "/admin/governance": Shield,
  "/admin/impact-stories": BookOpenText,
  "/admin/insights": Newspaper,
  "/admin/company": Users,
  "/admin/contact": Mail,
  "/admin/navigation": Menu,
  "/admin/media": ImageIcon,
  "/admin/seo": Search,
  "/admin/enquiries": Inbox,
  "/admin/newsletter": Mail,
  "/admin/legal": Scale,
  "/admin/faqs": FileQuestion,
  "/admin/users": Users,
  "/admin/activity": Activity,
  "/admin/settings": Settings,
} as const;

export function AdminShell({
  user,
  children,
}: {
  user: AdminUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const crumbs = useMemo(() => {
    const match = adminNav.find(
      (item) => item.href !== "/admin" && pathname.startsWith(item.href),
    );
    return match
      ? [
          { href: "/admin", label: "Dashboard" },
          { href: match.href, label: match.label },
        ]
      : [{ href: "/admin", label: "Dashboard" }];
  }, [pathname]);

  return (
    <div className="admin-shell">
      {open ? (
        <button
          type="button"
          className="admin-drawer-backdrop md:hidden"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
        <div className="admin-brand">
          <AgrayianMark variant="light" className="h-8 w-8" />
          <span>
            Agrayian Admin
            <small>Content console</small>
          </span>
        </div>
        <nav className="admin-nav" aria-label="Admin">
          {adminGroups().map((group) => (
            <div key={group}>
              <p className="admin-nav-group">{group}</p>
              {adminNav
                .filter((item) => item.group === group)
                .map((item) => {
                  const current =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = NAV_ICONS[item.href as keyof typeof NAV_ICONS];
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {Icon ? <Icon aria-hidden /> : null}
                      {item.label}
                    </Link>
                  );
                })}
            </div>
          ))}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="admin-btn md:hidden"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
            <nav aria-label="Breadcrumb" className="truncate text-sm text-[var(--admin-muted)]">
              {crumbs.map((crumb, index) => (
                <span key={crumb.href}>
                  {index > 0 ? " / " : null}
                  <Link href={crumb.href} className="font-semibold text-[var(--admin-navy)]">
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="admin-userchip">
              <span className="truncate">{user.name || user.email}</span>
              <StatusBadge value={user.uiRole} />
            </div>
            <form action={logoutAction}>
              <button type="submit" className="admin-btn">
                Sign out
              </button>
            </form>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
