"use client";

import { useTransition } from "react";
import { saveCollectionAction } from "@/lib/admin/content-actions";
import { useToast } from "@/components/admin/ToastProvider";

export function NewsletterActions({
  subscribers,
}: {
  subscribers: { id: string; email: string; status: string }[];
}) {
  const { toast } = useToast();
  const [pending, start] = useTransition();
  const active = subscribers.filter((item) => item.status === "active");
  if (!active.length) return null;

  return (
    <div className="admin-card mt-4">
      <h2 className="mb-3 text-sm font-semibold">Unsubscribe</h2>
      <ul className="space-y-2 text-sm">
        {active.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3">
            <span>{item.email}</span>
            <button
              type="button"
              className="admin-btn"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  const result = await saveCollectionAction(
                    "newsletter-subscribers",
                    item.id,
                    { status: "unsubscribed" },
                  );
                  toast(result.ok ? "Unsubscribed" : result.error);
                })
              }
            >
              Unsubscribe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
