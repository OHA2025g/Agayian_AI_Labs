import * as THREE from "three";
import {
  AI_ORB_DEFAULTS,
  type AiOrbControls,
} from "@/lib/ai-orb-formation";

const target = new THREE.Vector3();
const color = new THREE.Color();

function hash01(i: number, salt = 0): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Volumetric Agrayian mark — thick linked loops (small hollows) with
 * orb-style revolving motion and a soft outer shell so it fills space
 * like the original AI orb, with a modern logo silhouette.
 */
export function sampleAiLogoParticle(
  i: number,
  count: number,
  time: number,
  controls: AiOrbControls = AI_ORB_DEFAULTS,
  outPosition: THREE.Vector3 = target,
  outColor: THREE.Color = color,
): void {
  const { radius, flow, turb, shell, hueShift } = controls;
  const t = time * flow;
  const h0 = hash01(i, 1);
  const h1 = hash01(i, 2);
  const h2 = hash01(i, 3);
  const h3 = hash01(i, 4);
  const h4 = hash01(i, 5);
  const frac = (i + 0.5) / count;

  // Brand proportions: two clear linked rings with visible hollows
  const loopR = radius * 0.38;
  // Wider center gap so loops read as the logo, not one blob
  const leftCx = -radius * 0.48;
  const rightCx = radius * 0.48;
  // Stroke weight like logo.png — hollow stays open
  const tubeR = loopR * 0.34;

  // Left loop opens at 12 o'clock for the play
  const gapCenter = Math.PI * 0.5;
  const gapHalf = 0.38;

  const playShare = 0.04;
  const shellShare = 0.12;
  // Minimal inner dust — do not fill the hollows
  const fillShare = 0.06;

  let bx = 0;
  let by = 0;
  let bz = 0;
  let isPlay = false;

  if (frac > 1 - playShare) {
    isPlay = true;
    // Right-pointing play seated in the top gap of the left loop
    const openY = loopR;
    const mx = leftCx;
    const my = openY * 0.02;
    const size = tubeR * 0.95;
    const u = hash01(i, 6);
    const v = hash01(i, 7);
    const s = Math.sqrt(u);
    const w0 = 1 - s;
    const w1 = s * (1 - v);
    const w2 = s * v;
    const ax = mx - size * 0.2;
    const ay0 = my + openY - size * 0.55;
    const ay1 = my + openY + size * 0.55;
    const cx = mx + size * 0.75;
    const cy = my + openY;
    bx = ax * w0 + ax * w1 + cx * w2;
    by = ay0 * w0 + ay1 * w1 + cy * w2;
    bz = (h0 - 0.5) * tubeR * 0.35;
  } else if (frac > 1 - playShare - shellShare) {
    // Soft outer aura — fills hero space like the original orb
    const theta = h0 * Math.PI * 2;
    const phi = Math.acos(2 * h1 - 1);
    const envelope = radius * (0.72 + 0.28 * h2);
    bx = Math.sin(phi) * Math.cos(theta) * envelope * 1.05;
    by = Math.cos(phi) * envelope * 0.72;
    bz = Math.sin(phi) * Math.sin(theta) * envelope * 0.85;
  } else if (frac > 1 - playShare - shellShare - fillShare) {
    // Light dust near the inner rim only — keeps hollows readable
    const left = h0 < 0.5;
    const cx = left ? leftCx : rightCx;
    const ang = h1 * Math.PI * 2;
    let useAng = ang;
    if (left) {
      const d = Math.abs(
        ((ang - gapCenter + Math.PI * 3) % (Math.PI * 2)) - Math.PI,
      );
      if (d < gapHalf) useAng = gapCenter + gapHalf * (h2 < 0.5 ? 1 : -1);
    }
    const r = loopR * (0.55 + 0.28 * Math.sqrt(h3));
    bx = cx + Math.cos(useAng) * r;
    by = Math.sin(useAng) * r;
    bz = (h4 - 0.5) * tubeR * 0.7;
  } else {
    // Volumetric tube along both loops (logo stroke)
    const bodyFrac = frac / (1 - playShare - shellShare - fillShare);
    const leftShare = 0.48;
    const left = bodyFrac < leftShare;
    const cx = left ? leftCx : rightCx;
    let local = left
      ? bodyFrac / leftShare
      : (bodyFrac - leftShare) / (1 - leftShare);

    let ang: number;
    if (left) {
      const start = gapCenter + gapHalf;
      const sweep = Math.PI * 2 - gapHalf * 2;
      ang = start + local * sweep;
    } else {
      ang = local * Math.PI * 2;
    }

    const ring = Math.sqrt(h1);
    const tubeAng = h2 * Math.PI * 2;
    const rr = loopR + Math.cos(tubeAng) * tubeR * ring;
    bx = cx + Math.cos(ang) * rr;
    by = Math.sin(ang) * rr;
    bz = Math.sin(tubeAng) * tubeR * ring;
  }

  // --- Original AI-orb revolving language ---
  const x = bx / radius;
  const y = by / radius;
  const z = bz / radius;

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
    breath * (1.0 - shellMix * (0.5 + 0.32 * Math.sin(h0 * 5 + t)));
  const dist = turb * 0.16;

  // Gentle revolve — enough life, silhouette still reads as two loops
  const rotA = t * 0.14;
  const cA = Math.cos(rotA);
  const sA = Math.sin(rotA);
  const xr = x * cA - z * sA;
  const zr = x * sA + z * cA;

  const px = (xr + w1 * dist) * radius * rMod;
  const py = (y + w2 * dist * 1.15) * radius * rMod;
  const pz = (zr + w3 * dist) * radius * rMod;

  outPosition.set(px, py, pz);

  if (isPlay) {
    outColor.setHSL(0.985, 0.92, 0.58 + 0.22 * Math.sin(t * 2.0 + h0 * 5));
  } else {
    const swirl =
      0.5 + 0.5 * Math.sin(y * 2.0 + xr * 1.5 + t * 1.4 + w1 * 2.0);
    let hue =
      0.52 +
      hueShift * 0.28 * swirl +
      0.05 * Math.sin(t * 0.5 + frac * 6.28318);
    hue = ((hue % 1) + 1) % 1;
    const light = 0.62 + 0.28 * swirl + 0.1 * Math.abs(w2);
    const sat = 0.7 + 0.22 * swirl;
    outColor.setHSL(
      hue,
      Math.min(1, Math.max(0, sat)),
      Math.min(0.95, Math.max(0.35, light)),
    );
  }
}
