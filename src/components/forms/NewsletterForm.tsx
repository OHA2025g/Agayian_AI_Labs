"use client";

import { useCallback, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { getTurnstileSiteKey } from "@/lib/turnstile";

export function NewsletterForm() {
  const inputId = useId();
  const honeypotId = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRequired = Boolean(getTurnstileSiteKey());
  const onTurnstileToken = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        if (turnstileRequired && !turnstileToken) {
          setStatus("error");
          setMessage("Please complete the security check and try again.");
          return;
        }
        setStatus("loading");
        setMessage("");
        try {
          const response = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, website, turnstileToken }),
          });
          const data = (await response.json()) as {
            success?: boolean;
            message?: string;
          };
          if (!response.ok || !data.success) {
            throw new Error(data.message ?? "Subscription failed");
          }
          setStatus("success");
          setMessage(data.message ?? "Thank you for subscribing.");
          setEmail("");
          setWebsite("");
          setTurnstileToken(null);
        } catch (error) {
          setStatus("error");
          setMessage(
            error instanceof Error
              ? error.message
              : "We could not complete your subscription.",
          );
        }
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Work email
        </label>
        <Input
          id={inputId}
          type="email"
          required
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10"
          disabled={status === "loading"}
        />
        <div className="hidden" aria-hidden="true">
          <label htmlFor={honeypotId}>Website</label>
          <input
            id={honeypotId}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="h-10 shrink-0 px-4"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Subscribe"}
        </Button>
      </div>
      <TurnstileField onToken={onTurnstileToken} />
      {message && (
        <p
          className={
            status === "error" ? "text-xs text-critical" : "text-xs text-cyan"
          }
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
