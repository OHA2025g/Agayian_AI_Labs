"use client";

import { useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  AI_ORB_DEFAULTS,
  AI_ORB_WORLD_SCALE,
  sampleAiOrbParticle,
  type AiOrbControls,
} from "@/lib/ai-orb-formation";
import { sampleAiLogoParticle } from "@/lib/ai-logo-formation";

type Mode = "hero" | "card" | "page";

/** Live pose for the page-level orb — read each frame without React re-renders */
export type AiOrbOffset = {
  x: number;
  y: number;
  scale?: number;
  intensity?: number;
  volume?: number;
};

const COUNTS: Record<Mode, { coarse: number; fine: number }> = {
  hero: { coarse: 5500, fine: 12000 },
  card: { coarse: 4500, fine: 10000 },
  // Volumetric logo-orb — fill space like the original AI orb
  page: { coarse: 5200, fine: 9800 },
};

function AiOrbSwarm({
  pointer,
  count,
  controls,
  worldScale,
  active,
  offset,
  offsetRef,
  particleSize,
  formation,
}: {
  pointer: { x: number; y: number };
  count: number;
  controls: AiOrbControls;
  worldScale: number;
  active: boolean;
  offset: AiOrbOffset;
  offsetRef?: MutableRefObject<AiOrbOffset>;
  particleSize: number;
  formation: "orb" | "logo";
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const scratchPos = useMemo(() => new THREE.Vector3(), []);
  const scratchColor = useMemo(() => new THREE.Color(), []);
  const fallbackOffsetRef = useRef(offset);
  fallbackOffsetRef.current = offset;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [count]);

  useFrame((state) => {
    if (!active) return;
    const points = pointsRef.current;
    const group = groupRef.current;
    if (!points || !group) return;

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = geometry.getAttribute("color") as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;
    const pos = posAttr.array as Float32Array;
    const col = colAttr.array as Float32Array;
    const sample =
      formation === "logo" ? sampleAiLogoParticle : sampleAiOrbParticle;

    for (let i = 0; i < count; i++) {
      sample(i, count, time, controls, scratchPos, scratchColor);
      const o = i * 3;
      pos[o] = scratchPos.x * worldScale;
      pos[o + 1] = scratchPos.y * worldScale;
      pos[o + 2] = scratchPos.z * worldScale;
      col[o] = scratchColor.r;
      col[o + 1] = scratchColor.g;
      col[o + 2] = scratchColor.b;
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    const target = (offsetRef ?? fallbackOffsetRef).current;
    const scale = target.scale ?? 1;
    const intensity = target.intensity ?? 0.85;
    const volume = target.volume ?? 1;

    group.position.x = THREE.MathUtils.lerp(group.position.x, target.x, 0.08);
    group.position.y = THREE.MathUtils.lerp(group.position.y, target.y, 0.08);
    group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, scale, 0.07));

    const mat = materialRef.current;
    if (mat) {
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, intensity, 0.1);
      mat.size = THREE.MathUtils.lerp(mat.size, particleSize * volume, 0.1);
    }

    const tilt = formation === "logo" ? 0.14 : 0.28;
    const nod = formation === "logo" ? 0.08 : 0.16;
    const spin = formation === "logo" ? 0.014 : 0.04;
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      pointer.x * tilt + time * spin,
      0.04,
    );
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      pointer.y * nod,
      0.04,
    );
    if (formation === "logo") {
      group.rotation.z = THREE.MathUtils.lerp(
        group.rotation.z,
        Math.sin(time * 0.18) * 0.04,
        0.04,
      );
    }
  });

  return (
    <group ref={groupRef} position={[offset.x, offset.y, 0]}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          ref={materialRef}
          size={particleSize * (offset.volume ?? 1)}
          sizeAttenuation
          vertexColors
          transparent
          opacity={offset.intensity ?? 0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export function AiOrbCanvas({
  pointer,
  mode = "card",
  active = true,
  offset,
  offsetRef,
}: {
  pointer: { x: number; y: number };
  mode?: Mode;
  active?: boolean;
  offset?: AiOrbOffset;
  offsetRef?: MutableRefObject<AiOrbOffset>;
}) {
  const formation: "orb" | "logo" = mode === "page" ? "logo" : "orb";

  const [count] = useState(() => {
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    return coarse ? COUNTS[mode].coarse : COUNTS[mode].fine;
  });

  const defaultOffset = useMemo<AiOrbOffset>(() => {
    if (mode === "page") {
      return { x: 1.05, y: 0.0, scale: 1.08, intensity: 0.95, volume: 1.05 };
    }
    if (mode === "hero") {
      return { x: 0.85, y: 0.05, scale: 1, intensity: 0.85, volume: 1 };
    }
    return { x: 0, y: 0, scale: 1, intensity: 0.85, volume: 1 };
  }, [mode]);

  const resolvedOffset = offset ?? defaultOffset;

  const controls = useMemo<AiOrbControls>(
    () => ({
      ...AI_ORB_DEFAULTS,
      radius: mode === "page" ? 78 : mode === "hero" ? 72 : AI_ORB_DEFAULTS.radius,
      flow: mode === "page" ? 0.4 : mode === "hero" ? 0.55 : AI_ORB_DEFAULTS.flow,
      turb: mode === "page" ? 0.28 : mode === "hero" ? 0.38 : AI_ORB_DEFAULTS.turb,
      shell: mode === "page" ? 0.18 : AI_ORB_DEFAULTS.shell,
      hueShift: mode === "page" ? 0.36 : AI_ORB_DEFAULTS.hueShift,
    }),
    [mode],
  );

  const worldScale =
    mode === "page" ? 0.048 : mode === "hero" ? 0.048 : AI_ORB_WORLD_SCALE;
  const particleSize = mode === "page" ? 0.058 : 0.055;
  const camZ = mode === "hero" || mode === "page" ? 6.4 : 5.2;
  const fov = mode === "hero" || mode === "page" ? 48 : 42;

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      camera={{
        position: [0, 0, camZ],
        fov,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop={active ? "always" : "never"}
    >
      {mode === "card" ? (
        <color attach="background" args={["#050b18"]} />
      ) : null}
      <ambientLight intensity={0.2} />
      <AiOrbSwarm
        pointer={pointer}
        count={count}
        controls={controls}
        worldScale={worldScale}
        active={active}
        offset={resolvedOffset}
        offsetRef={offsetRef}
        particleSize={particleSize}
        formation={formation}
      />
    </Canvas>
  );
}
