import type { Field } from "payload";
import { ANIMATION_PRESETS, SECTION_THEMES } from "../../lib/cms-presets";

export const sectionThemeField: Field = {
  name: "sectionTheme",
  type: "select",
  defaultValue: "dark",
  options: SECTION_THEMES.map((value) => ({
    label: value
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    value,
  })),
  admin: {
    description: "Approved section theme only — brand system stays in code.",
  },
};

export const animationPresetField: Field = {
  name: "animationPreset",
  type: "select",
  defaultValue: "fade_up",
  options: ANIMATION_PRESETS.map((value) => ({
    label: value
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    value,
  })),
  admin: {
    description: "Maps to Motion presets. No custom timelines.",
  },
};

export const presentationFields: Field[] = [
  sectionThemeField,
  animationPresetField,
];
