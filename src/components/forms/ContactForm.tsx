"use client";

import { cloneElement, isValidElement, useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bot,
  Building2,
  Compass,
  Database,
  LayoutDashboard,
  Lock,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  contactSchema,
  interestCardOptions,
  interestOptions,
  resolveInterestFromQuery,
  type ContactFormValues,
  type ContactInterest,
} from "@/lib/contact-schema";
import { industries } from "@/data/industries";
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
import { cn } from "@/lib/utils";

const fieldControlClass =
  "border-[var(--border-light)] bg-white text-navy shadow-sm placeholder:text-muted-light focus-visible:ring-tech-blue";

const interestIcons: Record<string, LucideIcon> = {
  "AI consultation": Compass,
  "AI CoE": Building2,
  "AI governance": Shield,
  "Product demonstration": LayoutDashboard,
  "Generative AI": Sparkles,
  "Agentic AI": Bot,
  "Data & Analytics": Database,
};

const cardValues = new Set(
  interestCardOptions.map((card) => card.value as string),
);

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

function FormStep({
  step,
  title,
  children,
  hint,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tech-blue text-sm font-semibold text-white shadow-[0_8px_20px_rgba(59,130,246,0.35)]"
          >
            {step}
          </span>
          <h3 className="font-heading text-lg font-semibold text-navy">
            {title}
          </h3>
        </div>
        {hint ? (
          <p className="hidden text-xs text-muted-light sm:block">{hint}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function ContactForm({
  defaultInterest,
  defaultProduct,
  defaultCapability,
  utm,
}: {
  defaultInterest?: string | null;
  defaultProduct?: string | null;
  defaultCapability?: string | null;
  utm?: {
    source?: string | null;
    medium?: string | null;
    campaign?: string | null;
    content?: string | null;
    term?: string | null;
    landingPath?: string | null;
  };
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
      industry: "",
      utmSource: utm?.source ?? "",
      utmMedium: utm?.medium ?? "",
      utmCampaign: utm?.campaign ?? "",
      utmContent: utm?.content ?? "",
      utmTerm: utm?.term ?? "",
      landingPath: utm?.landingPath ?? "/contact",
    },
  });

  const consentValue = useWatch({ control: form.control, name: "consent" });
  const interestValue = useWatch({
    control: form.control,
    name: "areaOfInterest",
  });
  const industryValue = useWatch({ control: form.control, name: "industry" });
  const showOtherInterest = !cardValues.has(interestValue);

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
        industry: "",
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
        className="rounded-2xl border border-cyan/30 bg-cyan/10 p-6 md:p-8"
        role="status"
      >
        <h3 className="font-heading text-xl font-semibold text-navy">
          Thank you — request received
        </h3>
        <p className="mt-2 text-sm text-muted-light">
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
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <FormStep step={1} title="Your details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="fullName"
            label="Full name"
            error={form.formState.errors.fullName?.message}
          >
            <Input
              id="fullName"
              autoComplete="name"
              className={fieldControlClass}
              aria-invalid={Boolean(form.formState.errors.fullName)}
              {...form.register("fullName")}
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
              className={fieldControlClass}
              aria-invalid={Boolean(form.formState.errors.organisation)}
              {...form.register("organisation")}
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
              className={fieldControlClass}
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
              className={fieldControlClass}
              aria-invalid={Boolean(form.formState.errors.phone)}
              {...form.register("phone")}
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
              className={fieldControlClass}
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
              className={fieldControlClass}
              aria-invalid={Boolean(form.formState.errors.country)}
              {...form.register("country")}
            />
          </Field>
        </div>
      </FormStep>

      <FormStep step={2} title="Your interests">
        <div>
          <p className="mb-3 text-sm text-muted-light">
            What are you interested in?
          </p>
          <div
            className="grid gap-3 sm:grid-cols-2"
            role="radiogroup"
            aria-label="Area of interest"
          >
            {interestCardOptions.map((card) => {
              const Icon = interestIcons[card.value] ?? Compass;
              const selected = interestValue === card.value;
              return (
                <button
                  key={card.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() =>
                    form.setValue(
                      "areaOfInterest",
                      card.value as ContactInterest,
                      { shouldValidate: true, shouldDirty: true },
                    )
                  }
                  className={cn(
                    "flex items-start gap-3 rounded-xl border bg-white/80 p-3.5 text-left shadow-sm transition",
                    selected
                      ? "border-tech-blue ring-2 ring-tech-blue/25"
                      : "border-[var(--border-light)] hover:border-tech-blue/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                      selected
                        ? "border-tech-blue/40 bg-tech-blue/10 text-tech-blue"
                        : "border-[var(--border-light)] text-tech-blue",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-navy">
                      {card.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-light">
                      {card.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          {form.formState.errors.areaOfInterest ? (
            <p className="mt-2 text-xs text-critical" role="alert">
              {form.formState.errors.areaOfInterest.message}
            </p>
          ) : null}
        </div>

        {showOtherInterest ? (
          <Field
            id="areaOfInterestOther"
            label="Selected interest"
            error={form.formState.errors.areaOfInterest?.message}
          >
            <Select
              value={interestValue}
              onValueChange={(value) =>
                form.setValue(
                  "areaOfInterest",
                  value as ContactFormValues["areaOfInterest"],
                  { shouldValidate: true },
                )
              }
            >
              <SelectTrigger
                id="areaOfInterestOther"
                aria-label="Area of interest"
                className={fieldControlClass}
              >
                <SelectValue placeholder="Select interest" />
              </SelectTrigger>
              <SelectContent className="border-[var(--border-light)] bg-white text-navy">
                {interestOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="focus:bg-tech-blue/10"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        ) : null}

        <Field id="industry" label="Industry">
          <Select
            value={industryValue || "__none"}
            onValueChange={(value) =>
              form.setValue("industry", value === "__none" ? "" : value, {
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger
              id="industry"
              aria-label="Industry"
              className={fieldControlClass}
            >
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent className="border-[var(--border-light)] bg-white text-navy">
              <SelectItem value="__none" className="focus:bg-tech-blue/10">
                Prefer not to say
              </SelectItem>
              {industries.map((industry) => (
                <SelectItem
                  key={industry.slug}
                  value={industry.name}
                  className="focus:bg-tech-blue/10"
                >
                  {industry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field
          id="projectSummary"
          label="What outcome do you want to improve?"
          error={form.formState.errors.projectSummary?.message}
        >
          <Textarea
            id="projectSummary"
            className={fieldControlClass}
            aria-invalid={Boolean(form.formState.errors.projectSummary)}
            placeholder="Describe your goals, current challenges and the outcome you want to improve."
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
              className={fieldControlClass}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[var(--border-light)] bg-white text-navy">
              {["Email", "Phone", "Either"].map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="focus:bg-tech-blue/10"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </FormStep>

      <FormStep step={3} title="Submit enquiry">
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
              className="mt-0.5 border-[var(--border-light)] data-[state=checked]:border-tech-blue data-[state=checked]:bg-tech-blue"
            />
            <Label
              htmlFor="consent"
              className="text-sm leading-relaxed text-muted-light"
            >
              I consent to Agrayian AI Labs contacting me about this enquiry and
              processing my details as described in the Privacy Policy.
            </Label>
          </div>
          {form.formState.errors.consent && (
            <p className="text-xs text-critical" role="alert">
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

        <TurnstileField onToken={onTurnstileToken} theme="light" />

        {status === "error" && (
          <p className="text-sm text-critical" role="alert">
            {errorMessage}
          </p>
        )}

        <PrimaryButton
          type="submit"
          disabled={status === "loading"}
          className="w-full"
        >
          {status === "loading" ? "Submitting…" : "Submit enquiry"}
        </PrimaryButton>

        <p className="flex items-start gap-2 text-xs text-muted-light">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tech-blue" />
          Your information is secure and will only be used to respond to your
          enquiry.
        </p>
      </FormStep>
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
      <Label htmlFor={id} className="text-navy">
        {label}
      </Label>
      {control}
      {error && (
        <p id={errorId} className="text-xs text-critical" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
