"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { importSiteContentAction } from "@/lib/admin/content-actions";
import { ConfirmDialog } from "./ConfirmDialog";
import { useToast } from "./ToastProvider";

export function ImportSiteContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  return (
    <>
      <button
        type="button"
        className="admin-btn admin-btn-primary"
        disabled={pending}
        onClick={() => setOpen(true)}
      >
        {pending ? "Importing…" : "Import original site content"}
      </button>
      <ConfirmDialog
        open={open}
        title="Import the original catalog?"
        body="This copies the existing website products, capabilities, industries, insights, and page copy into this database. It does not delete users or invent new records."
        confirmLabel="Import"
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          start(async () => {
            const result = await importSiteContentAction();
            toast(result.ok ? "Original site content imported" : result.error);
            if (result.ok) router.refresh();
          });
        }}
      />
    </>
  );
}
