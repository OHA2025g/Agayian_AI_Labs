"use client";

import { useEffect } from "react";

export function IndustriesPageMarker() {
  useEffect(() => {
    document.documentElement.classList.add("industries-page");
    return () => {
      document.documentElement.classList.remove("industries-page");
    };
  }, []);

  return null;
}
