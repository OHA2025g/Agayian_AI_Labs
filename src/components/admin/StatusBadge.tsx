const TONES: Record<string, string> = {
  published: "admin-badge admin-badge-success",
  approved: "admin-badge admin-badge-success",
  draft: "admin-badge admin-badge-warn",
  in_review: "admin-badge admin-badge-info",
  scheduled: "admin-badge admin-badge-info",
  archived: "admin-badge",
  replied: "admin-badge admin-badge-info",
  new: "admin-badge admin-badge-coral",
  active: "admin-badge admin-badge-success",
  unsubscribed: "admin-badge",
  disabled: "admin-badge admin-badge-warn",
};

export function StatusBadge({ value }: { value: string }) {
  const key = value.trim().toLowerCase().replace(/\s+/g, "_");
  return (
    <span className={TONES[key] ?? "admin-badge"}>
      {value.replace(/_/g, " ") || "—"}
    </span>
  );
}
