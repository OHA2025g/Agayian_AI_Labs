"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  deleteCollectionAction,
  type EditableCollection,
} from "@/lib/admin/content-actions";
import { ConfirmDialog } from "./ConfirmDialog";
import { useToast } from "./ToastProvider";

export function RecordActions({
  href,
  collection,
  id,
  name,
  canDelete,
  viewLabel = "Edit",
}: {
  href?: string;
  collection?: EditableCollection;
  id?: string;
  name?: string;
  canDelete?: boolean;
  viewLabel?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, start] = useTransition();
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <div className="admin-row-actions">
        {href ? (
          <Link href={href} className="admin-btn admin-btn-quiet">
            {viewLabel}
          </Link>
        ) : null}
        {canDelete && collection && id ? (
          <button
            type="button"
            className="admin-btn admin-btn-ghost-danger"
            disabled={pending}
            onClick={() => setConfirm(true)}
          >
            Delete
          </button>
        ) : null}
      </div>
      <ConfirmDialog
        open={confirm}
        title={`Delete ${name || "this record"}?`}
        body="This removes the record from the admin and the live site. You can restore a revision only if one still exists."
        confirmLabel="Delete"
        danger
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          if (!collection || !id) return;
          setConfirm(false);
          start(async () => {
            const result = await deleteCollectionAction(collection, id);
            toast(result.ok ? "Deleted" : result.error);
            if (result.ok) router.refresh();
          });
        }}
      />
    </>
  );
}
