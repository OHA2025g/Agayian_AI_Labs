import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: Transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
};

export const fadeUp: Variants = {
  /* Transform-only: opacity:0 initials have stranded content invisible when
     Framer enter animations fail to commit (Chromium/Next). */
  hidden: { opacity: 1, y: 24 },
  visible: { opacity: 1, y: 0, transition: easeOutExpo },
};

export const fadeIn: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 1, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: easeOutExpo },
};

export const slideInRight: Variants = {
  hidden: { opacity: 1, x: 32 },
  visible: { opacity: 1, x: 0, transition: easeOutExpo },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 1, x: -32 },
  visible: { opacity: 1, x: 0, transition: easeOutExpo },
};

/** Maps CMS animationPreset values to Motion variants (no custom timelines). */
export function presetVariants(preset?: string | null): Variants {
  switch (preset) {
    case "none":
      return { hidden: {}, visible: {} };
    case "fade":
      return fadeIn;
    case "slide_left":
      return slideInLeft;
    case "slide_right":
      return slideInRight;
    case "stagger":
      return staggerContainer;
    case "mask_reveal":
    case "subtle_parallax":
    case "fade_up":
    default:
      return fadeUp;
  }
}
