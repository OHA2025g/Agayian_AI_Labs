"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/admin/ToastProvider";

export function MediaUpload() {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, start] = useTransition();
  const [alt, setAlt] = useState("");

  return (
    <form
      className="admin-card max-w-xl"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        start(async () => {
          const response = await fetch("/api/admin/media", {
            method: "POST",
            body: data,
          });
          const result = (await response.json()) as { ok?: boolean; error?: string };
          toast(result.ok ? "Uploaded" : result.error || "Upload failed");
          if (result.ok) {
            form.reset();
            setAlt("");
            router.refresh();
          }
        });
      }}
    >
      <label className="admin-field">
        <span>File</span>
        <input type="file" name="file" required />
      </label>
      <label className="admin-field">
        <span>Alt text</span>
        <input
          name="alt"
          required
          value={alt}
          onChange={(event) => setAlt(event.target.value)}
        />
      </label>
      <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
        Upload
      </button>
    </form>
  );
}
