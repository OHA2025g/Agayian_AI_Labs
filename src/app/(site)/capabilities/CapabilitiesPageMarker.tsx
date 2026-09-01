"use client";

import { useEffect } from "react";

export function CapabilitiesPageMarker() {
  useEffect(() => {
    document.documentElement.classList.add("capabilities-page");
    return () => {
      document.documentElement.classList.remove("capabilities-page");
    };
  }, []);

  return null;
}
