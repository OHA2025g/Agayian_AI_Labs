"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/ToastProvider";
import { deleteCollectionAction } from "@/lib/admin/content-actions";

export function MediaDelete({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  return (
    <div className="mt-4">
      <button
        type="button"
        className="admin-btn admin-btn-danger"
        disabled={pending}
        onClick={() => setOpen(true)}
      >
        Delete
      </button>
      <ConfirmDialog
        open={open}
        danger
        title="Delete this asset?"
        body="If it is still used on the site, deletion is blocked."
        confirmLabel="Delete"
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          start(async () => {
            const result = await deleteCollectionAction("media", id);
            toast(result.ok ? "Deleted" : result.error);
            if (result.ok) router.push("/admin/media");
          });
        }}
      />
    </div>
  );
}
