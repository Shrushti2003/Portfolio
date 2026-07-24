"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const modules = [
  { label: "UI", color: "#ff8ccf", position: [-1.45, 0.92, 0.08] as [number, number, number] },
  { label: "API", color: "#40d7e8", position: [1.28, 0.62, -0.18] as [number, number, number] },
  { label: "DB", color: "#c9ff4a", position: [-0.96, -1.0, -0.2] as [number, number, number] },
  { label: "AI", color: "#8f46ff", position: [1.05, -0.9, 0.2] as [number, number, number] },
  { label: "UX", color: "#ff6f61", position: [0.12, 1.45, -0.08] as [number, number, number] },
];

function useVisibleCanvas() {
  const { gl } = useThree();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(gl.domElement);
    return () => observer.disconnect();
  }, [gl.domElement]);

  return visible;
}

function RoundedModule({
  color,
  position,
  rotation,
  scale,
}: {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 0.16, 0.72]} />
      <meshStandardMaterial color={color} metalness={0.18} roughness={0.36} />
    </mesh>
  );
}

function Sculpture() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const visible = useVisibleCanvas();

  const lineGeometries = useMemo(
    () =>
      modules.map((module) =>
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(module.position[0], module.position[1], module.position[2]),
        ]),
      ),
    [],
  );

  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 0.72,
        y: (event.clientY / window.innerHeight - 0.5) * 0.46,
      };
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state) => {
    if (!visible || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y += (pointer.current.x + Math.sin(t * 0.28) * 0.16 - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (-pointer.current.y + Math.sin(t * 0.42) * 0.06 - group.current.rotation.x) * 0.05;
    group.current.position.y = Math.sin(t * 0.8) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.2, -0.35, 0.02]}>
      <group>
        <RoundedModule color="#ff8ccf" position={[-0.48, 0.18, 0.05]} rotation={[0.08, -0.36, -0.08]} scale={[1.24, 1, 1.05]} />
        <RoundedModule color="#40d7e8" position={[0.42, -0.08, -0.05]} rotation={[-0.08, 0.34, 0.1]} scale={[1.18, 1, 1]} />
        <RoundedModule color="#c9ff4a" position={[0.02, -0.42, 0.1]} rotation={[0.02, 0.08, -0.18]} scale={[1, 1, 0.92]} />
        <RoundedModule color="#ff6f61" position={[-0.18, 0.56, -0.08]} rotation={[0.14, 0.2, 0.18]} scale={[0.86, 1, 0.84]} />
      </group>

      <mesh position={[-0.34, 0.08, 0.58]} rotation={[0.12, -0.18, 0.06]}>
        <boxGeometry args={[0.55, 1.18, 0.14]} />
        <meshStandardMaterial color="#17131f" metalness={0.34} roughness={0.28} />
      </mesh>
      <mesh position={[0.36, -0.08, 0.62]} rotation={[-0.08, 0.24, -0.08]}>
        <boxGeometry args={[0.55, 1.18, 0.14]} />
        <meshStandardMaterial color="#17131f" metalness={0.34} roughness={0.28} />
      </mesh>

      {lineGeometries.map((geometry, index) => (
        <group key={modules[index].label}>
          <line>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial color={modules[index].color} transparent opacity={0.48} />
          </line>
          <mesh position={modules[index].position}>
            <boxGeometry args={[0.34, 0.34, 0.12]} />
            <meshStandardMaterial color={modules[index].color} emissive={modules[index].color} emissiveIntensity={0.2} roughness={0.28} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function OrbitalField() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (reducedMotion) {
    return (
      <div className="sculpture-fallback" aria-hidden="true">
        <div className="fallback-window one">React</div>
        <div className="fallback-window two">API</div>
        <div className="fallback-window three">MongoDB</div>
        <div className="fallback-monogram">SS</div>
      </div>
    );
  }

  return (
    <div className="core-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.55]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={1.1} />
        <directionalLight color="#fff3dc" intensity={2.4} position={[2, 3, 4]} />
        <pointLight color="#ff8ccf" intensity={4.8} position={[-2.6, 2, 3]} />
        <pointLight color="#40d7e8" intensity={3.5} position={[2.4, -1.5, 3]} />
        <Sculpture />
      </Canvas>
      <div className="core-labels">
        {modules.map((module) => (
          <span key={module.label}>{module.label}</span>
        ))}
      </div>
    </div>
  );
}
