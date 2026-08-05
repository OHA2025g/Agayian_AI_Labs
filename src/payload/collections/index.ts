import { withAdminGroup } from "../admin/withAdminGroup";
import { withPublishableHooks } from "../hooks/publishable";
import { AuditLogs as AuditLogsBase } from "./AuditLogs";
import { Capabilities as CapabilitiesBase } from "./Capabilities";
import { Careers as CareersBase } from "./Careers";
import { Enquiries as EnquiriesBase } from "./Enquiries";
import { Faqs as FaqsBase } from "./Faqs";
import { ImpactStories as ImpactStoriesBase } from "./ImpactStories";
import { Industries as IndustriesBase } from "./Industries";
import { Insights as InsightsBase } from "./Insights";
import { Media as MediaBase } from "./Media";
import { NewsletterSubscribers as NewsletterSubscribersBase } from "./NewsletterSubscribers";
import { Partners as PartnersBase } from "./Partners";
import { Products as ProductsBase } from "./Products";
import { Resources as ResourcesBase } from "./Resources";
import { TeamMembers as TeamMembersBase } from "./TeamMembers";
import { Testimonials as TestimonialsBase } from "./Testimonials";
import { Users as UsersBase } from "./Users";

const CONTENT = "Content Lab";
const COMPANY = "Company";
const INBOX = "Inbox";
const ASSETS = "Assets";
const SYSTEM = "Access & Audit";

export const Users = withAdminGroup(UsersBase, SYSTEM);
export const Media = withAdminGroup(MediaBase, ASSETS);
export const Enquiries = withAdminGroup(EnquiriesBase, INBOX);
export const NewsletterSubscribers = withAdminGroup(
  NewsletterSubscribersBase,
  INBOX,
);
export const AuditLogs = withAdminGroup(AuditLogsBase, SYSTEM);

export const Products = withAdminGroup(
  withPublishableHooks(ProductsBase),
  CONTENT,
);
export const Capabilities = withAdminGroup(
  withPublishableHooks(CapabilitiesBase),
  CONTENT,
);
export const Industries = withAdminGroup(
  withPublishableHooks(IndustriesBase),
  CONTENT,
);
export const ImpactStories = withAdminGroup(
  withPublishableHooks(ImpactStoriesBase),
  CONTENT,
);
export const Insights = withAdminGroup(
  withPublishableHooks(InsightsBase),
  CONTENT,
);
export const Faqs = withAdminGroup(withPublishableHooks(FaqsBase), COMPANY);
export const TeamMembers = withAdminGroup(
  withPublishableHooks(TeamMembersBase),
  COMPANY,
);
export const Careers = withAdminGroup(
  withPublishableHooks(CareersBase),
  COMPANY,
);
export const Partners = withAdminGroup(
  withPublishableHooks(PartnersBase),
  COMPANY,
);
export const Testimonials = withAdminGroup(
  withPublishableHooks(TestimonialsBase),
  COMPANY,
);
export const Resources = withAdminGroup(
  withPublishableHooks(ResourcesBase),
  CONTENT,
);
