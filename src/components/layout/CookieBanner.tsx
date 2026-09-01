"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const KEY = "agrayian-cookie-preference";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("agrayian-cookie-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("agrayian-cookie-change", onStoreChange);
  };
}

function getSnapshot() {
  try {
    return !localStorage.getItem(KEY);
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return false;
}

function clearPreference() {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("agrayian-cookie-change"));
  } catch {
    /* ignore */
  }
}

export function CookieBanner() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dialogRef = useRef<HTMLDivElement>(null);

  const save = useCallback((value: string) => {
    try {
      localStorage.setItem(KEY, value);
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("agrayian-cookie-change"));
      if (window.location.hash === "#cookie-preferences") {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const reopenIfNeeded = () => {
      if (window.location.hash === "#cookie-preferences") {
        clearPreference();
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.('a[href="#cookie-preferences"]');
      if (!link) return;
      event.preventDefault();
      clearPreference();
      history.replaceState(null, "", "#cookie-preferences");
    };

    reopenIfNeeded();
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", reopenIfNeeded);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", reopenIfNeeded);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        save("essential");
        return;
      }
      if (event.key !== "Tab" || !dialog || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [visible, save]);

  if (!visible) return null;

  return (
    <div
      ref={dialogRef}
      id="cookie-preferences"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-[var(--border-light)] bg-white p-4 shadow-[0_20px_60px_rgba(11,31,58,0.15)] md:p-5"
    >
      <h2
        id="cookie-banner-title"
        className="font-heading text-base font-semibold text-navy"
      >
        Cookie preferences
      </h2>
      <p id="cookie-banner-desc" className="mt-2 text-sm text-muted-light">
        Essential cookies keep the site working. If you accept all, we also load
        privacy-friendly Vercel Analytics and Speed Insights for aggregate usage
        and performance. See our{" "}
        <Link href="/privacy-policy" className="text-cyan hover:underline">
          Privacy Policy
        </Link>
        . Press Escape to continue with essential cookies only.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => save("accepted")}>
          Accept all
        </Button>
        <Button size="sm" variant="secondary" onClick={() => save("essential")}>
          Essential only
        </Button>
      </div>
    </div>
  );
}
