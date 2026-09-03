import { getPayloadClient } from "@/lib/payload";

type EnquiryPersistInput = {
  type: "contact" | "demo" | "consultation" | "career";
  reference: string;
  fullName: string;
  workEmail: string;
  phone?: string;
  organisation?: string;
  designation?: string;
  country?: string;
  areaOfInterest?: string;
  projectSummary?: string;
  preferredContactMethod?: string;
  product?: string;
  capability?: string;
  careerRole?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPath?: string;
};

export async function persistEnquiry(input: EnquiryPersistInput) {
  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "enquiries",
      data: {
        ...input,
        status: "new",
      },
      overrideAccess: true,
    });
    return true;
  } catch (error) {
    console.error("[cms] Failed to persist enquiry:", error);
    return false;
  }
}

export async function persistNewsletterSubscriber(email: string) {
  try {
    const payload = await getPayloadClient();
    const existing = await payload.find({
      collection: "newsletter-subscribers",
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    });
    if (existing.docs[0]) {
      return true;
    }
    await payload.create({
      collection: "newsletter-subscribers",
      data: { email, status: "active" },
      overrideAccess: true,
    });
    return true;
  } catch (error) {
    console.error("[cms] Failed to persist newsletter subscriber:", error);
    return false;
  }
}

export function mapInterestToEnquiryType(
  areaOfInterest: string,
): EnquiryPersistInput["type"] {
  if (areaOfInterest === "Product demonstration") return "demo";
  if (
    areaOfInterest === "AI consultation" ||
    areaOfInterest === "AI CoE" ||
    areaOfInterest === "AI governance" ||
    areaOfInterest === "Generative AI" ||
    areaOfInterest === "Agentic AI" ||
    areaOfInterest === "Data & Analytics"
  ) {
    return "consultation";
  }
  return "contact";
}
