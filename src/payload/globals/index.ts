import { withGlobalGroup } from "../admin/withAdminGroup";
import { CoePage as CoePageBase } from "./CoePage";
import { CompanyPage as CompanyPageBase } from "./CompanyPage";
import { ContactPage as ContactPageBase } from "./ContactPage";
import { GovernancePage as GovernancePageBase } from "./GovernancePage";
import { HomePage as HomePageBase } from "./HomePage";
import {
  AccessibilityStatement as AccessibilityStatementBase,
  CookiePolicy as CookiePolicyBase,
  PrivacyPolicy as PrivacyPolicyBase,
  ResponsibleAi as ResponsibleAiBase,
  TermsOfUse as TermsOfUseBase,
} from "./LegalPages";
import { Navigation as NavigationBase } from "./Navigation";
import { SiteSettings as SiteSettingsBase } from "./SiteSettings";

const PAGES = "Pages";
const SETTINGS = "Settings";
const LEGAL = "Legal";

export const SiteSettings = withGlobalGroup(SiteSettingsBase, SETTINGS);
export const Navigation = withGlobalGroup(NavigationBase, SETTINGS);
export const HomePage = withGlobalGroup(HomePageBase, PAGES);
export const CoePage = withGlobalGroup(CoePageBase, PAGES);
export const GovernancePage = withGlobalGroup(GovernancePageBase, PAGES);
export const CompanyPage = withGlobalGroup(CompanyPageBase, PAGES);
export const ContactPage = withGlobalGroup(ContactPageBase, PAGES);
export const PrivacyPolicy = withGlobalGroup(PrivacyPolicyBase, LEGAL);
export const TermsOfUse = withGlobalGroup(TermsOfUseBase, LEGAL);
export const ResponsibleAi = withGlobalGroup(ResponsibleAiBase, LEGAL);
export const CookiePolicy = withGlobalGroup(CookiePolicyBase, LEGAL);
export const AccessibilityStatement = withGlobalGroup(
  AccessibilityStatementBase,
  LEGAL,
);
