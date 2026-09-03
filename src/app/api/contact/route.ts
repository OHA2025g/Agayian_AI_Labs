import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import {
  deliveryNotConfiguredResponse,
  getContactToEmail,
  getMailFromAddress,
  getResendClient,
} from "@/lib/mail";
import { limitContactRequest } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { siteConfig } from "@/config/site";
import {
  mapInterestToEnquiryType,
  persistEnquiry,
} from "@/lib/cms/persist-enquiry";

export async function POST(request: Request) {
  const rate = await limitContactRequest(request);
  if (!rate.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body. Please submit valid JSON.",
      },
      { status: 400 },
    );
  }

  const record =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const turnstileToken =
    typeof record.turnstileToken === "string" ? record.turnstileToken : undefined;

  const turnstile = await verifyTurnstileToken(turnstileToken, request);
  if (!turnstile.ok) {
    return NextResponse.json(
      {
        success: false,
        message: turnstile.message ?? "Security check failed.",
      },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed. Please review the highlighted fields.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({
      success: true,
      message: "Thank you. Your enquiry has been received.",
    });
  }

  const data = parsed.data;
  const reference = `AGY-${Date.now().toString(36).toUpperCase()}`;
  const capability =
    typeof record.capability === "string" ? record.capability : undefined;

  const saved = await persistEnquiry({
    type: mapInterestToEnquiryType(data.areaOfInterest),
    reference,
    fullName: data.fullName,
    workEmail: data.workEmail,
    phone: data.phone,
    organisation: data.organisation,
    designation: data.designation,
    country: data.country,
    areaOfInterest: data.areaOfInterest,
    projectSummary: data.industry
      ? `Industry: ${data.industry}\n\n${data.projectSummary}`
      : data.projectSummary,
    preferredContactMethod: data.preferredContactMethod,
    product: data.product,
    capability,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmContent: data.utmContent,
    utmTerm: data.utmTerm,
    landingPath: data.landingPath,
  });

  const resend = getResendClient();
  const to = getContactToEmail();

  if (!resend || !to) {
    if (saved) {
      return NextResponse.json({
        success: true,
        message:
          "Thank you. Your enquiry has been recorded. Email delivery is not configured yet — our team can still review it in the admin inbox.",
        reference,
      });
    }
    return NextResponse.json(deliveryNotConfiguredResponse(), { status: 503 });
  }

  const text = [
    `New website enquiry (${reference})`,
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.workEmail}`,
    `Phone: ${data.phone}`,
    `Organisation: ${data.organisation}`,
    `Designation: ${data.designation}`,
    `Country: ${data.country}`,
    `Area of interest: ${data.areaOfInterest}`,
    `Industry: ${data.industry || "—"}`,
    `Preferred contact: ${data.preferredContactMethod}`,
    `Product: ${data.product || "—"}`,
    `Capability: ${capability || "—"}`,
    `UTM: ${[data.utmSource, data.utmMedium, data.utmCampaign].filter(Boolean).join(" / ") || "—"}`,
    "",
    "Project summary:",
    data.projectSummary,
  ].join("\n");

  try {
    const result = await resend.emails.send({
      from: getMailFromAddress(),
      to: [to],
      replyTo: data.workEmail,
      subject: `[${siteConfig.shortName}] ${data.areaOfInterest} — ${data.organisation}`,
      text,
    });

    if (result.error) {
      console.error("Resend contact error:", result.error);
      if (saved) {
        return NextResponse.json({
          success: true,
          message:
            "Thank you. Your enquiry was saved, but email notification failed. Our team can still review it in the admin inbox.",
          reference,
        });
      }
      return NextResponse.json(
        {
          success: false,
          message:
            "We could not deliver your enquiry right now. Please email hello@agrayian.ai or try again shortly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you. Your enquiry has been received and our team will follow up.",
      reference,
    });
  } catch (error) {
    console.error("Contact delivery failed:", error);
    if (saved) {
      return NextResponse.json({
        success: true,
        message:
          "Thank you. Your enquiry was saved, but email notification failed. Our team can still review it in the admin inbox.",
        reference,
      });
    }
    return NextResponse.json(
      {
        success: false,
        message:
          "We could not deliver your enquiry right now. Please email hello@agrayian.ai or try again shortly.",
      },
      { status: 502 },
    );
  }
}
