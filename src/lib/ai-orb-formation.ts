import * as THREE from "three";

/**
 * AI ORB particle formation (Casberry community formation "AI ORB").
 * Ported for in-app use: fixed control values, no HUD helpers.
 *
 * Original: https://particles.casberry.in/?sim=AI%20ORB
 */
export type AiOrbControls = {
  radius: number;
  flow: number;
  turb: number;
  shell: number;
  hueShift: number;
};

export const AI_ORB_DEFAULTS: AiOrbControls = {
  radius: 60,
  flow: 0.8,
  turb: 0.45,
  shell: 0.25,
  hueShift: 0.35,
};

/** World-unit scale so the formation fits a ~2.2 radius hero canvas. */
export const AI_ORB_WORLD_SCALE = 0.036;

const target = new THREE.Vector3();
const color = new THREE.Color();

/**
 * Compute position + color for particle index `i` at simulation time `time`.
 * Writes into reusable Vector3/Color to avoid GC in the hot loop.
 */
export function sampleAiOrbParticle(
  i: number,
  count: number,
  time: number,
  controls: AiOrbControls = AI_ORB_DEFAULTS,
  outPosition: THREE.Vector3 = target,
  outColor: THREE.Color = color,
): void {
  const { radius, flow, turb, shell, hueShift } = controls;
  const t = time * flow;

  const golden = 2.399963229728653;
  const frac = (i + 0.5) / count;
  const y0 = 1.0 - 2.0 * frac;
  const r0 = Math.sqrt(Math.max(0.0, 1.0 - y0 * y0));
  const th = golden * i;

  const x = r0 * Math.cos(th);
  const y = y0;
  const z = r0 * Math.sin(th);

  const w1 =
    Math.sin(3.0 * x + t * 1.7 + Math.cos(2.0 * z - t)) *
    Math.cos(2.0 * y - t * 1.3);
  const w2 =
    Math.sin(4.0 * z - t * 1.1 + Math.cos(3.0 * x + t * 0.7)) *
    Math.cos(3.0 * y + t);
  const w3 =
    Math.sin(2.0 * y + t * 2.1 + Math.cos(4.0 * x - t * 0.5)) *
    Math.cos(2.0 * z + t * 0.9);

  const breath =
    1.0 + 0.06 * Math.sin(t * 1.2) + 0.03 * Math.sin(t * 2.7 + 1.3);

  const band = 0.5 + 0.5 * Math.sin(frac * 6.28318 * 3.0 + t * 0.6);
  const shellMix = band * shell;

  const rMod =
    breath * (1.0 - shellMix * (0.55 + 0.35 * Math.sin(th * 0.5 + t)));
  const dist = turb * 0.22;

  const rotA = t * 0.25;
  const cA = Math.cos(rotA);
  const sA = Math.sin(rotA);
  const xr = x * cA - z * sA;
  const zr = x * sA + z * cA;

  const px = (xr + w1 * dist) * radius * rMod;
  const py = (y + w2 * dist * 1.15) * radius * rMod;
  const pz = (zr + w3 * dist) * radius * rMod;

  outPosition.set(px, py, pz);

  const swirl =
    0.5 + 0.5 * Math.sin(y * 2.0 + xr * 1.5 + t * 1.4 + w1 * 2.0);
  let hue =
    0.52 +
    hueShift * 0.28 * swirl +
    0.05 * Math.sin(t * 0.5 + frac * 6.28318);
  hue = ((hue % 1) + 1) % 1;
  const edge = Math.abs(y0);
  const light = 0.55 + 0.25 * w2 * turb + 0.12 * edge;
  const sat = 0.75 + 0.2 * swirl;

  outColor.setHSL(
    hue,
    Math.min(1.0, Math.max(0.0, sat)),
    Math.min(0.92, Math.max(0.15, light)),
  );
}
