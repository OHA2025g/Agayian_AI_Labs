"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { EditorTab } from "@/lib/admin/fields";
import {
  resetGlobalToSiteCopyAction,
  restoreVersionAction,
  saveCollectionAction,
  saveGlobalAction,
  type EditableCollection,
  type GlobalSlug,
} from "@/lib/admin/content-actions";
import { ConfirmDialog } from "./ConfirmDialog";
import { FieldControl } from "./FieldControl";
import { StatusBadge } from "./StatusBadge";
import { useToast } from "./ToastProvider";

export type EditorTarget =
  | { kind: "global"; slug: GlobalSlug }
  | { kind: "collection"; collection: EditableCollection; id?: string };

export function DocumentEditor({
  title,
  description,
  tabs,
  initial,
  canEdit,
  canPublish,
  previewPath,
  target,
  versions,
  resettable,
}: {
  title: string;
  description?: string;
  tabs: EditorTab[];
  initial: Record<string, unknown>;
  canEdit: boolean;
  canPublish: boolean;
  previewPath?: string;
  target: EditorTarget;
  versions?: { id: string; updatedAt: string; status: string; preview?: string }[];
  resettable?: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [values, setValues] = useState(initial);
  const [tab, setTab] = useState(tabs[0]?.id ?? "content");
  const [pending, start] = useTransition();
  const [confirm, setConfirm] = useState<null | "publish" | "restore" | "reset">(
    null,
  );
  const [restoreId, setRestoreId] = useState<string | null>(null);
  const dirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initial),
    [values, initial],
  );

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  useEffect(() => {
    const onLeave = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  const persist = (
    data: Record<string, unknown>,
    options?: { status?: string; scheduledPublishAt?: string | null },
  ) => {
    switch (target.kind) {
      case "global":
        return saveGlobalAction(target.slug, data, options);
      case "collection":
        return saveCollectionAction(target.collection, target.id, data, options);
      default: {
        const _never: never = target;
        return Promise.reject(new Error(`Unsupported editor target: ${JSON.stringify(_never)}`));
      }
    }
  };

  const restore = (versionId: string) => {
    switch (target.kind) {
      case "global":
        return restoreVersionAction("global", target.slug, versionId);
      case "collection":
        return restoreVersionAction(
          "collection",
          target.collection,
          versionId,
          target.id,
        );
      default: {
        const _never: never = target;
        return Promise.reject(new Error(`Unsupported editor target: ${JSON.stringify(_never)}`));
      }
    }
  };

  const canRestore = target.kind === "global" || Boolean(target.id);
  const status = asStatus(values.status ?? initial.status);

  const applyResult = (
    result: { ok: true; data?: Record<string, unknown> } | { ok: false; error: string },
    success: string,
  ) => {
    if (!result.ok) {
      toast(result.error);
      return;
    }
    if (result.data) setValues((current) => ({ ...current, ...result.data }));
    toast(success);
    router.refresh();
  };

  const run = (
    nextStatus: string,
    scheduledPublishAt?: string | null,
    success = "Saved",
  ) => {
    start(async () => {
      const result = await persist(values, {
        status: nextStatus,
        scheduledPublishAt,
      });
      applyResult(result, success);
    });
  };

  const current = tabs.find((item) => item.id === tab) ?? tabs[0];

  return (
    <section className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <p className="admin-kicker">Edit text</p>
          <div className="admin-title-row">
            <h1 className="admin-title">{title}</h1>
            <StatusBadge value={status} />
            {dirty ? <span className="admin-pill">Unsaved</span> : null}
          </div>
          {description ? <p className="admin-lede">{description}</p> : null}
        </div>
        <div className="admin-toolbar">
          {previewPath ? (
            <a
              href={previewPath}
              target="_blank"
              rel="noreferrer"
              className="admin-btn admin-btn-quiet"
            >
              View page
            </a>
          ) : null}
          <button
            type="button"
            className="admin-btn"
            disabled={!canEdit || pending}
            onClick={() =>
              run(
                status === "published" ? "published" : "draft",
                null,
                status === "published" ? "Saved to the live page" : "Draft saved",
              )
            }
          >
            Save
          </button>
          {!canPublish ? (
            <button
              type="button"
              className="admin-btn"
              disabled={!canEdit || pending}
              onClick={() => run("in_review", null, "Submitted for review")}
            >
              Submit for review
            </button>
          ) : null}
          {canPublish ? (
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              disabled={!canEdit || pending}
              onClick={() => setConfirm("publish")}
            >
              Publish
            </button>
          ) : null}
        </div>
      </div>

      <div className="admin-tabs" role="tablist">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className="admin-tab"
            aria-selected={item.id === tab}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="admin-card">
        {current?.fields.map((field) => (
          <FieldControl
            key={field.name}
            field={field}
            values={values}
            onChange={setValues}
            disabled={!canEdit || pending}
          />
        ))}
      </div>

      {versions?.length || resettable ? (
        <details className="admin-card admin-history">
          <summary>More options</summary>
          {resettable && canPublish ? (
            <button
              type="button"
              className="admin-btn admin-btn-accent mb-4"
              disabled={pending}
              onClick={() => setConfirm("reset")}
            >
              Restore original text
            </button>
          ) : null}
          {versions?.length ? (
            <ul className="admin-history-list">
              {versions.map((version) => (
                <li key={version.id}>
                  <div>
                    <strong>
                      {new Date(version.updatedAt).toLocaleString()}
                    </strong>
                    <p>
                      <StatusBadge value={version.status || "revision"} />
                    </p>
                  </div>
                  {canRestore ? (
                    <button
                      type="button"
                      className="admin-btn"
                      disabled={!canEdit || pending}
                      onClick={() => {
                        setRestoreId(version.id);
                        setConfirm("restore");
                      }}
                    >
                      Restore
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </details>
      ) : null}

      <ConfirmDialog
        open={confirm === "publish"}
        title="Publish now?"
        body="This updates the live site for this record."
        confirmLabel="Publish"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          setConfirm(null);
          run("published", null, "Published");
        }}
      />
      <ConfirmDialog
        open={confirm === "restore"}
        title="Restore this revision?"
        body="The selected revision becomes the current content and is published to the live site."
        confirmLabel="Restore & publish"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          const id = restoreId;
          setConfirm(null);
          if (!id || !canRestore) return;
          start(async () => {
            applyResult(await restore(id), "Revision restored and published");
          });
        }}
      />
      <ConfirmDialog
        open={confirm === "reset"}
        title="Restore original site copy?"
        body="This replaces the current Capabilities page copy with the last known good site text and publishes it."
        confirmLabel="Restore original"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          setConfirm(null);
          if (target.kind !== "global") return;
          start(async () => {
            applyResult(
              await resetGlobalToSiteCopyAction(target.slug),
              "Original site copy restored",
            );
          });
        }}
      />
    </section>
  );
}

function asStatus(value: unknown) {
  return typeof value === "string" && value.trim() ? value : "draft";
}
