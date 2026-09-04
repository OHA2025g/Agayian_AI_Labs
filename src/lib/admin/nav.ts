export type AdminNavItem = {
  href: string;
  label: string;
  group: "Overview" | "Website content" | "Site management" | "Administration";
};

export const adminNav: AdminNavItem[] = [
  { group: "Overview", href: "/admin", label: "Dashboard" },
  { group: "Website content", href: "/admin/home", label: "Home" },
  { group: "Website content", href: "/admin/capabilities", label: "Capabilities" },
  { group: "Website content", href: "/admin/products", label: "Products" },
  { group: "Website content", href: "/admin/industries", label: "Industries" },
  {
    group: "Website content",
    href: "/admin/coe",
    label: "AI Centre of Excellence",
  },
  { group: "Website content", href: "/admin/governance", label: "AI Governance" },
  {
    group: "Website content",
    href: "/admin/impact-stories",
    label: "Impact Stories",
  },
  { group: "Website content", href: "/admin/insights", label: "Insights" },
  { group: "Website content", href: "/admin/company", label: "Company" },
  { group: "Website content", href: "/admin/contact", label: "Contact Page" },
  { group: "Site management", href: "/admin/navigation", label: "Header & Footer" },
  { group: "Site management", href: "/admin/media", label: "Media" },
  { group: "Site management", href: "/admin/seo", label: "SEO & Redirects" },
  {
    group: "Site management",
    href: "/admin/enquiries",
    label: "Contact Submissions",
  },
  { group: "Site management", href: "/admin/newsletter", label: "Newsletter" },
  { group: "Site management", href: "/admin/legal", label: "Legal & Trust" },
  { group: "Site management", href: "/admin/faqs", label: "FAQs" },
  { group: "Administration", href: "/admin/users", label: "Users & Roles" },
  { group: "Administration", href: "/admin/activity", label: "Activity Log" },
  { group: "Administration", href: "/admin/settings", label: "Settings" },
];

export function adminGroups() {
  return [
    "Overview",
    "Website content",
    "Site management",
    "Administration",
  ] as const;
}
