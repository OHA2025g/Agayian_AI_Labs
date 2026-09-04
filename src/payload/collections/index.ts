import { withAdminGroup } from "../admin/withAdminGroup";
import {
  hideLeadsFromMedia,
  hideMediaFromEnquiry,
  hideUnlessSuperAdmin,
  hideWebsiteFromSpecialists,
} from "../admin/visibility";
import { withPublishableHooks } from "../hooks/publishable";
import { AuditLogs as AuditLogsBase } from "./AuditLogs";
import { Campaigns as CampaignsBase } from "./Campaigns";
import { Capabilities as CapabilitiesBase } from "./Capabilities";
import { Careers as CareersBase } from "./Careers";
import { ContentCalendar as ContentCalendarBase } from "./ContentCalendar";
import { Enquiries as EnquiriesBase } from "./Enquiries";
import { Faqs as FaqsBase } from "./Faqs";
import { ImpactStories as ImpactStoriesBase } from "./ImpactStories";
import { Industries as IndustriesBase } from "./Industries";
import { Insights as InsightsBase } from "./Insights";
import { Media as MediaBase } from "./Media";
import { NewsletterSubscribers as NewsletterSubscribersBase } from "./NewsletterSubscribers";
import { Partners as PartnersBase } from "./Partners";
import { Products as ProductsBase } from "./Products";
import { Redirects as RedirectsBase } from "./Redirects";
import { TeamMembers as TeamMembersBase } from "./TeamMembers";
import { Testimonials as TestimonialsBase } from "./Testimonials";
import { Users as UsersBase } from "./Users";

const WEBSITE = "Website";
const PEOPLE = "People and company";
const LEADS = "Leads";
const MEDIA = "Media";
const MARKETING = "Marketing";
const SYSTEM = "System";

export const Users = withAdminGroup(UsersBase, SYSTEM, {
  labels: { singular: "User", plural: "Users" },
  hidden: hideUnlessSuperAdmin,
});
export const Media = withAdminGroup(MediaBase, MEDIA, {
  labels: { singular: "Asset", plural: "Media" },
  hidden: hideMediaFromEnquiry,
});
export const Enquiries = withAdminGroup(EnquiriesBase, LEADS, {
  labels: { singular: "Enquiry", plural: "Enquiries" },
  hidden: hideLeadsFromMedia,
});
export const NewsletterSubscribers = withAdminGroup(
  NewsletterSubscribersBase,
  LEADS,
  {
    labels: { singular: "Subscriber", plural: "Newsletter" },
    hidden: hideLeadsFromMedia,
  },
);
export const AuditLogs = withAdminGroup(AuditLogsBase, SYSTEM, {
  labels: { singular: "Audit log", plural: "Audit logs" },
  hidden: hideUnlessSuperAdmin,
});

export const Products = withAdminGroup(
  withPublishableHooks(ProductsBase),
  WEBSITE,
  {
    labels: { singular: "Product", plural: "Products" },
    hidden: hideWebsiteFromSpecialists,
  },
);
export const Capabilities = withAdminGroup(
  withPublishableHooks(CapabilitiesBase),
  WEBSITE,
  {
    labels: { singular: "Capability", plural: "Capabilities" },
    hidden: hideWebsiteFromSpecialists,
  },
);
export const Industries = withAdminGroup(
  withPublishableHooks(IndustriesBase),
  WEBSITE,
  {
    labels: { singular: "Industry", plural: "Industries" },
    hidden: hideWebsiteFromSpecialists,
  },
);
export const ImpactStories = withAdminGroup(
  withPublishableHooks(ImpactStoriesBase),
  WEBSITE,
  {
    labels: { singular: "Impact story", plural: "Impact stories" },
    hidden: hideWebsiteFromSpecialists,
  },
);
export const Insights = withAdminGroup(
  withPublishableHooks(InsightsBase),
  WEBSITE,
  { labels: { singular: "Insight", plural: "Insights" }, hidden: hideWebsiteFromSpecialists },
);

export const Faqs = withAdminGroup(withPublishableHooks(FaqsBase), PEOPLE, {
  labels: { singular: "FAQ", plural: "FAQs" },
  hidden: hideWebsiteFromSpecialists,
});
export const TeamMembers = withAdminGroup(
  withPublishableHooks(TeamMembersBase),
  PEOPLE,
  {
    labels: { singular: "Team member", plural: "Team" },
    hidden: hideWebsiteFromSpecialists,
  },
);
export const Careers = withAdminGroup(
  withPublishableHooks(CareersBase),
  PEOPLE,
  {
    labels: { singular: "Role", plural: "Careers" },
    hidden: hideWebsiteFromSpecialists,
  },
);
export const Partners = withAdminGroup(
  withPublishableHooks(PartnersBase),
  PEOPLE,
  {
    labels: { singular: "Partner", plural: "Partners" },
    hidden: hideWebsiteFromSpecialists,
  },
);
export const Testimonials = withAdminGroup(
  withPublishableHooks(TestimonialsBase),
  PEOPLE,
  {
    labels: { singular: "Testimonial", plural: "Testimonials" },
    hidden: hideWebsiteFromSpecialists,
  },
);

export const Campaigns = withAdminGroup(CampaignsBase, MARKETING, {
  labels: { singular: "Campaign", plural: "Campaigns" },
  hidden: hideUnlessSuperAdmin,
});
export const ContentCalendar = withAdminGroup(ContentCalendarBase, MARKETING, {
  labels: { singular: "Calendar item", plural: "Content calendar" },
  hidden: hideUnlessSuperAdmin,
});
export const Redirects = withAdminGroup(RedirectsBase, MARKETING, {
  labels: { singular: "Redirect", plural: "Redirects" },
  hidden: hideUnlessSuperAdmin,
});
