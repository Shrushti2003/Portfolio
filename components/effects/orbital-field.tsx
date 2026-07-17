"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";
import * as THREE from "three";

function seededValue(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function Particles() {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(720 * 3);

    for (let i = 0; i < 720; i += 1) {
      const radius = 2.1 + seededValue(i + 1) * 3.4;
      const theta = seededValue(i + 2) * Math.PI * 2;
      const y = (seededValue(i + 3) - 0.5) * 2.7;

      values[i * 3] = Math.cos(theta) * radius;
      values[i * 3 + 1] = y;
      values[i * 3 + 2] = Math.sin(theta) * radius;
    }

    return values;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.045;
    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.24) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        blending={THREE.AdditiveBlending}
        color="#5ee7ff"
        depthWrite={false}
        opacity={0.72}
        size={0.018}
        transparent
      />
    </points>
  );
}

export function OrbitalField() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 z-0 hidden w-[58%] opacity-80 lg:block"
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <Particles />
      </Canvas>
    </div>
  );
}
