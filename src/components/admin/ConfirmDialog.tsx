"use client";

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "Confirm",
  danger,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  danger?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="admin-drawer-backdrop" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        className="admin-card"
        style={{
          position: "fixed",
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -30%)",
          width: "min(420px, calc(100vw - 2rem))",
          zIndex: 60,
        }}
      >
        <h2 id="admin-confirm-title" className="text-lg font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[var(--admin-muted)]">{body}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className="admin-btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={danger ? "admin-btn admin-btn-danger" : "admin-btn admin-btn-primary"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
