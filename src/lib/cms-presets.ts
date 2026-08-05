export const SECTION_THEMES = [
  "dark",
  "light",
  "brand_gradient",
  "technical_grid",
  "minimal",
] as const;

export type SectionTheme = (typeof SECTION_THEMES)[number];

export const ANIMATION_PRESETS = [
  "none",
  "fade",
  "fade_up",
  "stagger",
  "slide_left",
  "slide_right",
  "mask_reveal",
  "subtle_parallax",
] as const;

export type AnimationPreset = (typeof ANIMATION_PRESETS)[number];

export function themeClass(theme?: string | null): string {
  switch (theme) {
    case "light":
      return "scene-light";
    case "brand_gradient":
      return "scene-brand";
    case "technical_grid":
      return "scene-navy grid-texture";
    case "minimal":
      return "scene-minimal";
    case "dark":
    default:
      return "scene-dark";
  }
}
