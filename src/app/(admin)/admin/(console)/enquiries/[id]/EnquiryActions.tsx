"use client";

import { useState, useTransition } from "react";
import {
  addEnquiryNoteAction,
  saveCollectionAction,
} from "@/lib/admin/content-actions";
import { useToast } from "@/components/admin/ToastProvider";

const STATUSES = [
  "new",
  "in_progress",
  "waiting",
  "replied",
  "closed",
  "spam",
];

export function EnquiryActions({
  id,
  status,
  archived,
  assignee,
  users,
}: {
  id: string;
  status: string;
  archived: boolean;
  assignee: string;
  users: { id: string; email: string }[];
}) {
  const { toast } = useToast();
  const [pending, start] = useTransition();
  const [nextStatus, setNextStatus] = useState(status);
  const [nextAssignee, setNextAssignee] = useState(assignee);
  const [note, setNote] = useState("");

  return (
    <div>
      <label className="admin-field">
        <span>Status</span>
        <select
          value={nextStatus}
          onChange={(event) => setNextStatus(event.target.value)}
        >
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {item.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>
      <label className="admin-field">
        <span>Assignee</span>
        <select
          value={nextAssignee}
          onChange={(event) => setNextAssignee(event.target.value)}
        >
          <option value="">Unassigned</option>
          {users.map((item) => (
            <option key={item.id} value={item.id}>
              {item.email}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="admin-btn admin-btn-primary"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const result = await saveCollectionAction("enquiries", id, {
              status: nextStatus,
              assignee: nextAssignee || null,
            });
            toast(result.ok ? "Enquiry updated" : result.error);
          })
        }
      >
        Save
      </button>
      <button
        type="button"
        className="admin-btn ml-2"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const result = await saveCollectionAction("enquiries", id, {
              archived: !archived,
            });
            toast(result.ok ? (archived ? "Restored" : "Archived") : result.error);
          })
        }
      >
        {archived ? "Unarchive" : "Archive"}
      </button>
      <label className="admin-field mt-4">
        <span>Add note</span>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} />
      </label>
      <button
        type="button"
        className="admin-btn"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const result = await addEnquiryNoteAction(id, note);
            toast(result.ok ? "Note added" : result.error);
            if (result.ok) setNote("");
          })
        }
      >
        Add note
      </button>
    </div>
  );
}
