import Link from "next/link";
import { LogoMark } from "@/components/layout/LogoMark";
import { siteConfig } from "@/config/site";
import {
  footerCapabilities,
  footerCompany,
  footerIndustries,
  footerLegal,
  footerProducts,
} from "@/data/navigation";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { ResolvedNav, ResolvedSite } from "@/lib/cms/site";

type Props = {
  site?: ResolvedSite | typeof siteConfig;
  nav?: Pick<
    ResolvedNav,
    | "footerCapabilities"
    | "footerProducts"
    | "footerIndustries"
    | "footerCompany"
    | "footerLegal"
  >;
};

export function SiteFooter({
  site = siteConfig,
  nav,
}: Props) {
  const capabilities = nav?.footerCapabilities ?? footerCapabilities;
  const products = nav?.footerProducts ?? footerProducts;
  const industries = nav?.footerIndustries ?? footerIndustries;
  const company = nav?.footerCompany ?? footerCompany;
  const legal = nav?.footerLegal ?? footerLegal;
  const socialEntries = Object.entries(site.socialLinks).filter(
    ([, href]) => Boolean(href),
  ) as [string, string][];

  return (
    <footer className="on-dark-surface bg-navy-deep text-text-on-dark">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-3">
          <LogoMark tone="dark" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-dark">
            {site.description}
          </p>
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-dark">
              Newsletter
            </p>
            <NewsletterForm />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-dark">
            {site.contactEmail && (
              <a
                href={`mailto:${site.contactEmail}`}
                className="transition hover:text-cyan"
              >
                {site.contactEmail}
              </a>
            )}
            {site.contactPhone && (
              <a
                href={`tel:${site.contactPhone.replace(/\s+/g, "")}`}
                className="transition hover:text-cyan"
              >
                {site.contactPhone}
              </a>
            )}
          </div>
          {socialEntries.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {socialEntries.map(([network, href]) => (
                <a
                  key={network}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capitalize text-muted-dark transition hover:text-cyan"
                >
                  {network === "x" ? "X" : network}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
          <FooterColumn title="Capabilities" links={capabilities} />
          <FooterColumn title="Products" links={products} />
          <FooterColumn title="Industries" links={industries} />
          <FooterColumn title="Company" links={company} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-dark sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-cyan">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-dark">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-[#d8e4f0] transition hover:text-cyan"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
