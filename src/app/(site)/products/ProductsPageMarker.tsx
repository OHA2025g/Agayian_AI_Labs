"use client";

import { useEffect } from "react";

export function ProductsPageMarker() {
  useEffect(() => {
    document.documentElement.classList.add("products-page");
    return () => {
      document.documentElement.classList.remove("products-page");
    };
  }, []);

  return null;
}
