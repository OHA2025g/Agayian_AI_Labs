import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/newsletter-schema";
import {
  deliveryNotConfiguredResponse,
  getContactToEmail,
  getMailFromAddress,
  getResendClient,
} from "@/lib/mail";
import { limitNewsletterRequest } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { siteConfig } from "@/config/site";
import { persistNewsletterSubscriber } from "@/lib/cms/persist-enquiry";

export async function POST(request: Request) {
  const rate = await limitNewsletterRequest(request);
  if (!rate.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many subscription attempts. Please try again later.",
      },
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
      {
        success: false,
        message: turnstile.message ?? "Security check failed.",
      },
      { status: 400 },
    );
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Enter a valid work email.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing.",
    });
  }

  const saved = await persistNewsletterSubscriber(parsed.data.email);
  const resend = getResendClient();
  const to = getContactToEmail();

  if (!resend || !to) {
    if (saved) {
      return NextResponse.json({
        success: true,
        message:
          "Thank you for subscribing. Your email was saved for follow-up.",
      });
    }
    return NextResponse.json(deliveryNotConfiguredResponse(), { status: 503 });
  }

  try {
    const result = await resend.emails.send({
      from: getMailFromAddress(),
      to: [to],
      subject: `[${siteConfig.shortName}] Newsletter subscription`,
      text: `New newsletter subscription request:\n\nEmail: ${parsed.data.email}`,
    });

    if (result.error) {
      console.error("Resend newsletter error:", result.error);
      if (saved) {
        return NextResponse.json({
          success: true,
          message:
            "Thank you for subscribing. Your email was saved even though notification email failed.",
        });
      }
      return NextResponse.json(
        {
          success: false,
          message:
            "We could not complete your subscription right now. Please try again later.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing. We will keep you informed.",
    });
  } catch (error) {
    console.error("Newsletter delivery failed:", error);
    if (saved) {
      return NextResponse.json({
        success: true,
        message:
          "Thank you for subscribing. Your email was saved even though notification email failed.",
      });
    }
    return NextResponse.json(
      {
        success: false,
        message:
          "We could not complete your subscription right now. Please try again later.",
      },
      { status: 502 },
    );
  }
}
