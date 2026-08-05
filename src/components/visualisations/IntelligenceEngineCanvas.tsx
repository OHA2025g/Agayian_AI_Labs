"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function Core() {
  const mesh = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.35;
    mesh.current.rotation.x += delta * 0.12;
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshStandardMaterial
        color="#e63946"
        emissive="#e63946"
        emissiveIntensity={0.55}
        metalness={0.4}
        roughness={0.25}
      />
    </mesh>
  );
}

function Rings() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.08;
    group.current.rotation.y -= delta * 0.05;
  });
  const rings = useMemo(
    () => [
      { radius: 1.1, color: "#19c3d3" },
      { radius: 1.55, color: "#3b82f6" },
      { radius: 2.05, color: "#e63946" },
    ],
    [],
  );
  return (
    <group ref={group}>
      {rings.map((ring) => (
        <mesh key={ring.radius} rotation={[Math.PI / 2.6, 0.2, 0]}>
          <torusGeometry args={[ring.radius, 0.012, 12, 96]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Nodes() {
  const positions = useMemo(
    () =>
      [
        [0, 2.2, 0],
        [2, 1, 0.4],
        [1.6, -1.6, -0.3],
        [-1.8, -1.4, 0.5],
        [-2.1, 0.9, -0.4],
      ] as const,
    [],
  );
  return (
    <group>
      {positions.map((pos, i) => (
        <Float
          key={i}
          speed={1.2 + i * 0.15}
          rotationIntensity={0.2}
          floatIntensity={0.4}
        >
          <mesh position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#19c3d3"
              emissive="#19c3d3"
              emissiveIntensity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene({ pointer }: { pointer: { x: number; y: number } }) {
  const root = useRef<Group>(null);
  useFrame(() => {
    if (!root.current) return;
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      pointer.x * 0.25,
      0.06,
    );
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      pointer.y * 0.15,
      0.06,
    );
  });
  return (
    <group ref={root}>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 2, 4]} intensity={1.2} color="#19c3d3" />
      <pointLight position={[-3, -1, 2]} intensity={0.6} color="#e63946" />
      <Core />
      <Rings />
      <Nodes />
    </group>
  );
}

export function IntelligenceEngineCanvas({
  pointer,
}: {
  pointer: { x: number; y: number };
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="h-full w-full"
    >
      <Scene pointer={pointer} />
    </Canvas>
  );
}
