import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid work email").max(160),
  /** Honeypot — must parse so bots can be silently accepted */
  website: z.string().optional(),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
