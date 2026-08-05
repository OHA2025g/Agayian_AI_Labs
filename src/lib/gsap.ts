"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins once. GSAP owns scroll-pinned transforms; Motion owns UI. */
export function ensureGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** Static (no pin) mode for coarse pointers or reduced motion — use with useSyncExternalStore. */
export function subscribeStaticScrollMode(onChange: () => void) {
  const coarse = window.matchMedia("(pointer: coarse)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  coarse.addEventListener("change", onChange);
  reduced.addEventListener("change", onChange);
  return () => {
    coarse.removeEventListener("change", onChange);
    reduced.removeEventListener("change", onChange);
  };
}

export function getStaticScrollModeSnapshot() {
  return isCoarsePointer() || prefersReducedMotion();
}
