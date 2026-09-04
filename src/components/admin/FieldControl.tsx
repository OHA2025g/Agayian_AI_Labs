"use client";

import { useEffect, useRef, useState } from "react";
import type { AdminField } from "@/lib/admin/fields";
import { ConfirmDialog } from "./ConfirmDialog";
import { asString, asStringList, getPath, setPath } from "./form-utils";

function itemTitle(item: Record<string, unknown>, fields: AdminField[], index: number) {
  const preferred = fields.find(
    (field) =>
      field.kind === "text" ||
      field.kind === "textarea" ||
      field.kind === "email",
  );
  const raw = preferred ? item[preferred.name] : undefined;
  const label = typeof raw === "string" && raw.trim() ? raw.trim() : "";
  return label || `Item ${index + 1}`;
}

export function FieldControl({
  field,
  values,
  onChange,
  disabled,
}: {
  field: AdminField;
  values: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  disabled?: boolean;
}) {
  const value = getPath(values, field.name);
  const set = (next: unknown) => onChange(setPath(values, field.name, next));

  if (field.kind === "checkbox") {
    return (
      <label className="admin-field flex-row items-center gap-2">
        <input
          type="checkbox"
          checked={Boolean(value)}
          disabled={disabled}
          onChange={(event) => set(event.target.checked)}
        />
        <span>{field.label}</span>
      </label>
    );
  }

  if (field.kind === "select") {
    if (field.multiple) {
      return (
        <MultiSelectField
          field={field}
          selected={asStringList(value)}
          disabled={disabled}
          onChange={set}
        />
      );
    }
    return (
      <label className="admin-field">
        <span>{field.label}</span>
        <select
          value={asString(value)}
          disabled={disabled}
          onChange={(event) => set(event.target.value)}
        >
          <option value="">Select…</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.kind === "stringList") {
    const items = asStringList(value);
    return (
      <div className="admin-repeatable">
        <div className="admin-repeatable-head">
          <strong>{field.label}</strong>
          <button
            type="button"
            className="admin-btn admin-btn-quiet"
            disabled={disabled}
            onClick={() => set([...items, ""])}
          >
            Add
          </button>
        </div>
        {items.length === 0 ? (
          <p className="admin-empty">No items yet. Add one to edit or delete it.</p>
        ) : null}
        <ul className="admin-item-list">
          {items.map((item, index) => (
            <li key={`${field.name}-${index}`}>
              <input
                disabled={disabled}
                value={item}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = event.target.value;
                  set(next);
                }}
              />
              <button
                type="button"
                className="admin-btn admin-btn-ghost-danger"
                disabled={disabled}
                onClick={() => set(items.filter((_, i) => i !== index))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (field.kind === "seo") {
    const seo = (value as Record<string, unknown> | undefined) ?? {};
    return (
      <div className="admin-card mb-4">
        <h3 className="mb-3 text-sm font-semibold">SEO</h3>
        <label className="admin-field">
          <span>Title</span>
          <input
            disabled={disabled}
            value={asString(seo.title)}
            onChange={(event) => set({ ...seo, title: event.target.value })}
          />
        </label>
        <label className="admin-field">
          <span>Description</span>
          <textarea
            disabled={disabled}
            value={asString(seo.description)}
            onChange={(event) =>
              set({ ...seo, description: event.target.value })
            }
          />
        </label>
      </div>
    );
  }

  if (field.kind === "repeatable") {
    return (
      <RepeatableField
        field={field}
        items={Array.isArray(value) ? (value as Record<string, unknown>[]) : []}
        disabled={disabled}
        onChange={set}
      />
    );
  }

  const inputType =
    field.kind === "email" ? "email" : field.kind === "date" ? "datetime-local" : field.kind === "password" ? "password" : "text";

  if (field.kind === "textarea") {
    return (
      <label className="admin-field">
        <span>{field.label}</span>
        <textarea
          disabled={disabled}
          required={field.required}
          value={asString(value)}
          onChange={(event) => set(event.target.value)}
        />
        {field.hint ? <small>{field.hint}</small> : null}
      </label>
    );
  }

  return (
    <label className="admin-field">
      <span>{field.label}</span>
      <input
        type={inputType}
        disabled={disabled}
        required={field.required}
        value={asString(value)}
        onChange={(event) => set(event.target.value)}
      />
      {"hint" in field && field.hint ? <small>{field.hint}</small> : null}
    </label>
  );
}

function MultiSelectField({
  field,
  selected,
  disabled,
  onChange,
}: {
  field: Extract<AdminField, { kind: "select" }>;
  selected: string[];
  disabled?: boolean;
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labels = selected.map(
    (value) => field.options.find((option) => option.value === value)?.label ?? value,
  );

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="admin-field admin-multiselect" ref={rootRef}>
      <span>{field.label}</span>
      {field.required ? (
        <input
          tabIndex={-1}
          required
          value={selected[0] ?? ""}
          onChange={() => undefined}
          className="sr-only"
          aria-hidden
        />
      ) : null}
      <button
        type="button"
        className="admin-multiselect-trigger"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
      >
        <span
          className={
            selected.length ? undefined : "admin-multiselect-placeholder"
          }
        >
          {labels.length ? labels.join(", ") : "Select…"}
        </span>
      </button>
      {open ? (
        <ul
          className="admin-multiselect-menu"
          role="listbox"
          aria-multiselectable
        >
          {field.options.map((option) => {
            const checked = selected.includes(option.value);
            return (
              <li key={option.value} role="option" aria-selected={checked}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...selected, option.value]
                        : selected.filter((item) => item !== option.value);
                      onChange(next);
                    }}
                  />
                  {option.label}
                </label>
              </li>
            );
          })}
        </ul>
      ) : null}
      {field.hint ? <small>{field.hint}</small> : null}
    </div>
  );
}

function RepeatableField({
  field,
  items,
  disabled,
  onChange,
}: {
  field: Extract<AdminField, { kind: "repeatable" }>;
  items: Record<string, unknown>[];
  disabled?: boolean;
  onChange: (next: Record<string, unknown>[]) => void;
}) {
  const [removeAt, setRemoveAt] = useState<number | null>(null);

  return (
    <div className="admin-repeatable">
      <div className="admin-repeatable-head">
        <div>
          <strong>{field.label}</strong>
          <p className="admin-lede">
            {items.length} {items.length === 1 ? "item" : "items"} · edit in place or delete
          </p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-quiet"
          disabled={disabled}
          onClick={() => onChange([...items, {}])}
        >
          Add
        </button>
      </div>
      {items.length === 0 ? (
        <p className="admin-empty">No items yet. Add one to edit or delete it.</p>
      ) : null}
      {items.map((item, index) => (
        <article key={`${field.name}-${index}`} className="admin-item-card">
          <header className="admin-item-card-head">
            <span className="admin-index">{index + 1}</span>
            <strong>{itemTitle(item, field.fields, index)}</strong>
            <div className="admin-row-actions">
              <button
                type="button"
                className="admin-btn admin-btn-quiet"
                disabled={disabled || index === 0}
                onClick={() => {
                  const next = [...items];
                  [next[index - 1], next[index]] = [next[index], next[index - 1]];
                  onChange(next);
                }}
              >
                Up
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-quiet"
                disabled={disabled || index === items.length - 1}
                onClick={() => {
                  const next = [...items];
                  [next[index + 1], next[index]] = [next[index], next[index + 1]];
                  onChange(next);
                }}
              >
                Down
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-ghost-danger"
                disabled={disabled}
                onClick={() => setRemoveAt(index)}
              >
                Delete
              </button>
            </div>
          </header>
          {field.fields.map((child) => (
            <FieldControl
              key={child.name}
              field={child}
              values={item}
              disabled={disabled}
              onChange={(nextItem) => {
                const next = [...items];
                next[index] = nextItem;
                onChange(next);
              }}
            />
          ))}
        </article>
      ))}
      <ConfirmDialog
        open={removeAt !== null}
        title="Delete this item?"
        body="It will be removed from this list. Publish or save to update the live page."
        confirmLabel="Delete"
        danger
        onCancel={() => setRemoveAt(null)}
        onConfirm={() => {
          if (removeAt === null) return;
          onChange(items.filter((_, i) => i !== removeAt));
          setRemoveAt(null);
        }}
      />
    </div>
  );
}
