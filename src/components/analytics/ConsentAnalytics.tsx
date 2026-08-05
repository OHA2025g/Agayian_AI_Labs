"use client";

import { useSyncExternalStore } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    return localStorage.getItem(KEY) === "accepted";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export function ConsentAnalytics() {
  const accepted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!accepted) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
