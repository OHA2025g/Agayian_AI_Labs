import Link from "next/link";
import { LogoMark } from "@/components/layout/LogoMark";
import { siteConfig } from "@/config/site";
import {
  footerCapabilities,
  footerCompany,
  footerContact,
  footerIndustries,
  footerLegal,
  footerProducts,
} from "@/data/navigation";

const columns = [
  { title: "Capabilities", links: footerCapabilities },
  { title: "Products", links: footerProducts },
  { title: "Industries", links: footerIndustries },
  { title: "Company", links: footerCompany },
  { title: "Contact", links: footerContact },
] as const;

export function IndustriesFooter() {
  return (
    <footer className="industries-footer">
      <div className="industries-footer-grid">
        <div>
          <LogoMark tone="dark" />
          <p className="industries-footer-about">{siteConfig.description}</p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            <ul className="mt-3">
              {column.links.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="industries-footer-bottom">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-x-4">
          {footerLegal.slice(1, 4).map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
