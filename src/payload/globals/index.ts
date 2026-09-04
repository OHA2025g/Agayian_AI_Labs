import { withGlobalGroup } from "../admin/withAdminGroup";
import { hideWebsiteFromSpecialists } from "../admin/visibility";
import { CapabilitiesPage as CapabilitiesPageBase } from "./CapabilitiesPage";
import { CoePage as CoePageBase } from "./CoePage";
import { CompanyPage as CompanyPageBase } from "./CompanyPage";
import { ContactPage as ContactPageBase } from "./ContactPage";
import { GovernancePage as GovernancePageBase } from "./GovernancePage";
import { HomePage as HomePageBase } from "./HomePage";
import { ProductsPage as ProductsPageBase } from "./ProductsPage";
import { TrustPage as TrustPageBase } from "./TrustPage";
import {
  AccessibilityStatement as AccessibilityStatementBase,
  CookiePolicy as CookiePolicyBase,
  PrivacyPolicy as PrivacyPolicyBase,
  ResponsibleAi as ResponsibleAiBase,
  TermsOfUse as TermsOfUseBase,
} from "./LegalPages";
import { Navigation as NavigationBase } from "./Navigation";
import { SiteSettings as SiteSettingsBase } from "./SiteSettings";

const WEBSITE = "Website";
const SETTINGS = "Settings";

export const SiteSettings = withGlobalGroup(SiteSettingsBase, SETTINGS, {
  label: "Site settings",
  description: "Brand, contact, SEO, announcement and marketing tags.",
  hidden: hideWebsiteFromSpecialists,
});
export const Navigation = withGlobalGroup(NavigationBase, SETTINGS, {
  label: "Navigation",
  description: "Header and footer links used on the public site.",
  hidden: hideWebsiteFromSpecialists,
});
export const HomePage = withGlobalGroup(HomePageBase, WEBSITE, {
  label: "Home page",
  hidden: hideWebsiteFromSpecialists,
});
export const CoePage = withGlobalGroup(CoePageBase, WEBSITE, {
  label: "AI CoE page",
  hidden: hideWebsiteFromSpecialists,
});
export const GovernancePage = withGlobalGroup(GovernancePageBase, WEBSITE, {
  label: "Governance page",
  hidden: hideWebsiteFromSpecialists,
});
export const CompanyPage = withGlobalGroup(CompanyPageBase, WEBSITE, {
  label: "Company page",
  hidden: hideWebsiteFromSpecialists,
});
export const ContactPage = withGlobalGroup(ContactPageBase, WEBSITE, {
  label: "Contact page",
  hidden: hideWebsiteFromSpecialists,
});
export const CapabilitiesPage = withGlobalGroup(CapabilitiesPageBase, WEBSITE, {
  label: "Capabilities page",
  hidden: hideWebsiteFromSpecialists,
});
export const ProductsPage = withGlobalGroup(ProductsPageBase, WEBSITE, {
  label: "Products page",
  hidden: hideWebsiteFromSpecialists,
});
export const TrustPage = withGlobalGroup(TrustPageBase, WEBSITE, {
  label: "Trust Centre",
  hidden: hideWebsiteFromSpecialists,
});
export const PrivacyPolicy = withGlobalGroup(PrivacyPolicyBase, SETTINGS, {
  hidden: hideWebsiteFromSpecialists,
});
export const TermsOfUse = withGlobalGroup(TermsOfUseBase, SETTINGS, {
  hidden: hideWebsiteFromSpecialists,
});
export const ResponsibleAi = withGlobalGroup(ResponsibleAiBase, SETTINGS, {
  hidden: hideWebsiteFromSpecialists,
});
export const CookiePolicy = withGlobalGroup(CookiePolicyBase, SETTINGS, {
  hidden: hideWebsiteFromSpecialists,
});
export const AccessibilityStatement = withGlobalGroup(
  AccessibilityStatementBase,
  SETTINGS,
  { hidden: hideWebsiteFromSpecialists },
);
