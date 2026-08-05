import { NextResponse } from "next/server";
import { z } from "zod";
import {
  deliveryNotConfiguredResponse,
  getContactToEmail,
  getMailFromAddress,
  getResendClient,
} from "@/lib/mail";
import { limitContactRequest } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { persistEnquiry } from "@/lib/cms/persist-enquiry";
import { siteConfig } from "@/config/site";

const careerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  workEmail: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(40).optional(),
  careerRole: z.string().trim().min(2).max(160),
  projectSummary: z.string().trim().min(20).max(4000),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: Request) {
  const rate = await limitContactRequest(request);
  if (!rate.success) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
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
      { success: false, message: turnstile.message ?? "Security check failed." },
      { status: 400 },
    );
  }

  const parsed = careerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Validation failed.", errors: parsed.error.flatten() },
      { status: 400 },
    );
  }
  if (parsed.data.website) {
    return NextResponse.json({ success: true, message: "Thank you." });
  }

  const reference = `AGY-JOB-${Date.now().toString(36).toUpperCase()}`;
  const saved = await persistEnquiry({
    type: "career",
    reference,
    fullName: parsed.data.fullName,
    workEmail: parsed.data.workEmail,
    phone: parsed.data.phone,
    projectSummary: parsed.data.projectSummary,
    careerRole: parsed.data.careerRole,
    areaOfInterest: "Career application",
  });

  const resend = getResendClient();
  const to = getContactToEmail();
  if (!resend || !to) {
    if (saved) {
      return NextResponse.json({
        success: true,
        message: "Application recorded. Our team will review it in the admin inbox.",
        reference,
      });
    }
    return NextResponse.json(deliveryNotConfiguredResponse(), { status: 503 });
  }

  await resend.emails.send({
    from: getMailFromAddress(),
    to: [to],
    replyTo: parsed.data.workEmail,
    subject: `[${siteConfig.shortName}] Career application — ${parsed.data.careerRole}`,
    text: `Career application (${reference})\n\nName: ${parsed.data.fullName}\nEmail: ${parsed.data.workEmail}\nRole: ${parsed.data.careerRole}\n\n${parsed.data.projectSummary}`,
  });

  return NextResponse.json({
    success: true,
    message: "Thank you. Your application has been received.",
    reference,
  });
}
