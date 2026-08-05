"use client";

import { cloneElement, isValidElement, useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  interestOptions,
  resolveInterestFromQuery,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { getTurnstileSiteKey } from "@/lib/turnstile";

function buildDefaultSummary(
  product?: string | null,
  capability?: string | null,
) {
  const parts: string[] = [];
  if (product) {
    parts.push(`I would like to discuss ${product.replace(/-/g, " ")}.`);
  }
  if (capability) {
    parts.push(
      `Capability of interest: ${capability.replace(/-/g, " ")}.`,
    );
  }
  return parts.join(" ");
}

export function ContactForm({
  defaultInterest,
  defaultProduct,
  defaultCapability,
}: {
  defaultInterest?: string | null;
  defaultProduct?: string | null;
  defaultCapability?: string | null;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRequired = Boolean(getTurnstileSiteKey());
  const onTurnstileToken = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  const resolvedInterest =
    resolveInterestFromQuery(defaultInterest) ?? "AI consultation";
  const defaultSummary = buildDefaultSummary(
    defaultProduct,
    defaultCapability,
  );

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      phone: "",
      organisation: "",
      designation: "",
      country: "",
      areaOfInterest: resolvedInterest,
      projectSummary: defaultSummary,
      preferredContactMethod: "Email",
      consent: false,
      website: "",
      product: defaultProduct ?? "",
    },
  });

  const consentValue = useWatch({ control: form.control, name: "consent" });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("loading");
    setErrorMessage("");
    if (turnstileRequired && !turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the security check and try again.");
      return;
    }
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Request failed");
      }

      setStatus("success");
      form.reset({
        fullName: "",
        workEmail: "",
        phone: "",
        organisation: "",
        designation: "",
        country: "",
        areaOfInterest: resolvedInterest,
        projectSummary: defaultSummary,
        preferredContactMethod: "Email",
        consent: false,
        website: "",
        product: defaultProduct ?? "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not submit your request. Please try again or email hello@agrayian.ai.",
      );
    }
  });

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-cyan/30 bg-cyan/10 p-6"
        role="status"
      >
        <h3 className="font-heading text-xl font-semibold text-text-on-dark">
          Thank you — request received
        </h3>
        <p className="mt-2 text-sm text-muted-dark">
          Our team will review your requirement and follow up using your
          preferred contact method.
        </p>
        <PrimaryButton
          type="button"
          className="mt-6"
          showArrow={false}
          onClick={() => setStatus("idle")}
        >
          Submit another enquiry
        </PrimaryButton>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          id="fullName"
          label="Full name"
          error={form.formState.errors.fullName?.message}
        >
          <Input
            id="fullName"
            autoComplete="name"
            aria-invalid={Boolean(form.formState.errors.fullName)}
            {...form.register("fullName")}
          />
        </Field>
        <Field
          id="workEmail"
          label="Work email"
          error={form.formState.errors.workEmail?.message}
        >
          <Input
            id="workEmail"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(form.formState.errors.workEmail)}
            {...form.register("workEmail")}
          />
        </Field>
        <Field
          id="phone"
          label="Phone"
          error={form.formState.errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(form.formState.errors.phone)}
            {...form.register("phone")}
          />
        </Field>
        <Field
          id="organisation"
          label="Organisation"
          error={form.formState.errors.organisation?.message}
        >
          <Input
            id="organisation"
            autoComplete="organization"
            aria-invalid={Boolean(form.formState.errors.organisation)}
            {...form.register("organisation")}
          />
        </Field>
        <Field
          id="designation"
          label="Designation"
          error={form.formState.errors.designation?.message}
        >
          <Input
            id="designation"
            autoComplete="organization-title"
            aria-invalid={Boolean(form.formState.errors.designation)}
            {...form.register("designation")}
          />
        </Field>
        <Field
          id="country"
          label="Country"
          error={form.formState.errors.country?.message}
        >
          <Input
            id="country"
            autoComplete="country-name"
            aria-invalid={Boolean(form.formState.errors.country)}
            {...form.register("country")}
          />
        </Field>
      </div>

      <Field
        id="areaOfInterest"
        label="Area of interest"
        error={form.formState.errors.areaOfInterest?.message}
      >
        <Select
          defaultValue={form.getValues("areaOfInterest")}
          onValueChange={(value) =>
            form.setValue(
              "areaOfInterest",
              value as ContactFormValues["areaOfInterest"],
              { shouldValidate: true },
            )
          }
        >
          <SelectTrigger id="areaOfInterest" aria-label="Area of interest">
            <SelectValue placeholder="Select interest" />
          </SelectTrigger>
          <SelectContent>
            {interestOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field
        id="projectSummary"
        label="Project summary"
        error={form.formState.errors.projectSummary?.message}
      >
        <Textarea
          id="projectSummary"
          aria-invalid={Boolean(form.formState.errors.projectSummary)}
          placeholder="Describe the decision context, current state, constraints and the outcome you want to improve."
          {...form.register("projectSummary")}
        />
      </Field>

      <Field
        id="preferredContactMethod"
        label="Preferred contact method"
        error={form.formState.errors.preferredContactMethod?.message}
      >
        <Select
          defaultValue={form.getValues("preferredContactMethod")}
          onValueChange={(value) =>
            form.setValue(
              "preferredContactMethod",
              value as ContactFormValues["preferredContactMethod"],
              { shouldValidate: true },
            )
          }
        >
          <SelectTrigger
            id="preferredContactMethod"
            aria-label="Preferred contact method"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["Email", "Phone", "Either"].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={consentValue === true}
            onCheckedChange={(checked) =>
              form.setValue("consent", checked === true, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            className="mt-0.5"
          />
          <Label
            htmlFor="consent"
            className="text-sm leading-relaxed text-muted-dark"
          >
            I consent to Agrayian AI Labs contacting me about this enquiry and
            processing my details as described in the Privacy Policy.
          </Label>
        </div>
        {form.formState.errors.consent && (
          <p className="text-xs text-red-300" role="alert">
            {form.formState.errors.consent.message}
          </p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...form.register("website")}
        />
      </div>

      <input type="hidden" {...form.register("product")} />

      <TurnstileField onToken={onTurnstileToken} />

      {status === "error" && (
        <p className="text-sm text-red-300" role="alert">
          {errorMessage}
        </p>
      )}

      <PrimaryButton
        type="submit"
        disabled={status === "loading"}
        showArrow={false}
      >
        {status === "loading" ? "Submitting…" : "Submit enquiry"}
      </PrimaryButton>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const control = isValidElement(children)
    ? cloneElement(
        children as React.ReactElement<{
          "aria-invalid"?: boolean;
          "aria-describedby"?: string;
        }>,
        {
          "aria-invalid": Boolean(error),
          "aria-describedby": error ? errorId : undefined,
        },
      )
    : children;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {control}
      {error && (
        <p id={errorId} className="text-xs text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
