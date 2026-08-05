import Link from "next/link";
import { LogoMark } from "@/components/layout/LogoMark";
import { siteConfig } from "@/config/site";
import {
  footerCapabilities,
  footerContact,
  footerExplore,
  footerLegal,
} from "@/data/navigation";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const socialEntries = Object.entries(siteConfig.socialLinks).filter(
  ([, href]) => Boolean(href),
) as [string, string][];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <LogoMark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-dark">
            {siteConfig.description}
          </p>
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-dark">
              Newsletter
            </p>
            <NewsletterForm />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-dark">
            {siteConfig.contactEmail && (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="hover:text-cyan"
              >
                {siteConfig.contactEmail}
              </a>
            )}
            {siteConfig.contactPhone && (
              <a
                href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
                className="hover:text-cyan"
              >
                {siteConfig.contactPhone}
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

        <FooterColumn title="Capabilities" links={footerCapabilities} />
        <FooterColumn title="Explore" links={footerExplore} />
        <FooterColumn title="Contact" links={footerContact} />
        <FooterColumn title="Legal" links={footerLegal} />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-dark sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Responsible AI for enterprise and government transformation.</p>
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
    <div className="lg:col-span-2">
      <p className="font-heading text-sm font-semibold text-text-on-dark">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-dark transition hover:text-cyan"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
