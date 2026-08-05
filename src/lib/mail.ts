import { Resend } from "resend";
import { siteConfig } from "@/config/site";

const ONBOARDING_FROM = "Agrayian AI Labs <onboarding@resend.dev>";

function isProductionRuntime() {
  return (
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  );
}

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getContactToEmail() {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    siteConfig.contactEmail ||
    null
  );
}

export function getMailFromAddress() {
  const configured = process.env.CONTACT_FROM_EMAIL?.trim();
  if (configured) return configured;

  if (isProductionRuntime()) {
    console.warn(
      "[mail] CONTACT_FROM_EMAIL is unset in production. Falling back to Resend onboarding sender — verify a domain and set CONTACT_FROM_EMAIL for reliable delivery.",
    );
  }

  return ONBOARDING_FROM;
}

export function deliveryNotConfiguredResponse() {
  return {
    success: false as const,
    message:
      "Enquiry delivery is not configured yet. Please email hello@agrayian.ai directly, or try again once mail delivery is enabled.",
  };
}
