"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const modules = [
  { label: "Frontend", color: "#a78bfa", angle: 0 },
  { label: "Backend", color: "#67e8f9", angle: 1.05 },
  { label: "Database", color: "#b7f56a", angle: 2.1 },
  { label: "Cloud", color: "#fb7185", angle: 3.15 },
  { label: "AI", color: "#f0abfc", angle: 4.2 },
  { label: "DSA", color: "#fde68a", angle: 5.25 },
];

function useCanvasVisible() {
  const { gl } = useThree();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(gl.domElement);
    return () => observer.disconnect();
  }, [gl.domElement]);

  return visible;
}

function CoreSystem() {
  const group = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Group>(null);
  const visible = useCanvasVisible();
  const pointer = useRef({ x: 0, y: 0 });

  const curveGeometries = useMemo(
    () =>
      modules.map((module) => {
        const end = new THREE.Vector3(Math.cos(module.angle) * 2.3, Math.sin(module.angle) * 1.32, Math.sin(module.angle) * 0.7);
        const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), end.clone().multiplyScalar(0.55).add(new THREE.Vector3(0, 0.18, 0.45)), end);
        return new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      }),
    [],
  );

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 0.5,
        y: (event.clientY / window.innerHeight - 0.5) * 0.35,
      };
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  useFrame((state) => {
    if (!visible || !group.current) return;

    const t = state.clock.elapsedTime;
    group.current.rotation.y += (pointer.current.x + t * 0.06 - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-pointer.current.y + Math.sin(t * 0.34) * 0.05 - group.current.rotation.x) * 0.04;

    if (pulse.current) {
      pulse.current.rotation.z = -t * 0.16;
      pulse.current.children.forEach((child, index) => {
        child.scale.setScalar(0.86 + Math.sin(t * 1.6 + index) * 0.08);
      });
    }
  });

  return (
    <group ref={group} position={[-0.38, 0, 0]} scale={0.84}>
      <mesh>
        <icosahedronGeometry args={[0.92, 3]} />
        <meshStandardMaterial color="#111827" emissive="#4c1d95" emissiveIntensity={0.28} metalness={0.62} roughness={0.18} />
      </mesh>
      <mesh rotation={[0.45, 0.2, 0]}>
        <torusGeometry args={[1.08, 0.012, 12, 96]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[1.1, 0.8, 0.5]}>
        <torusGeometry args={[1.24, 0.01, 12, 96]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.42} />
      </mesh>
      {curveGeometries.map((geometry, index) => (
        <group key={modules[index].label}>
          <line>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial color={modules[index].color} transparent opacity={0.35} />
          </line>
          <mesh position={[Math.cos(modules[index].angle) * 2.3, Math.sin(modules[index].angle) * 1.32, Math.sin(modules[index].angle) * 0.7]}>
            <sphereGeometry args={[0.13, 18, 18]} />
            <meshStandardMaterial color={modules[index].color} emissive={modules[index].color} emissiveIntensity={0.46} roughness={0.24} />
          </mesh>
        </group>
      ))}
      <group ref={pulse}>
        {modules.map((module) => (
          <mesh key={module.label} position={[Math.cos(module.angle) * 1.55, Math.sin(module.angle) * 0.88, Math.sin(module.angle) * 0.42]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color={module.color} transparent opacity={0.82} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function OrbitalField() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (reduced) {
    return (
      <div className="core-fallback" aria-hidden="true">
        <div className="core-shell">
          <span className="core-mark">SS</span>
        </div>
      </div>
    );
  }

  return (
    <div className="core-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.9], fov: 42 }} dpr={[1, 1.55]} frameloop="always" gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.8} />
        <pointLight color="#67e8f9" intensity={5} position={[3.4, 2.5, 4]} />
        <pointLight color="#a78bfa" intensity={4} position={[-3, -1.4, 3]} />
        <CoreSystem />
      </Canvas>
      <div className="core-labels">
        {modules.map((module) => (
          <span key={module.label}>{module.label}</span>
        ))}
      </div>
    </div>
  );
}
