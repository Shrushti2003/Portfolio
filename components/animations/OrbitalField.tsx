"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const layers = [
  { position: [-1.08, 0.52, -0.28] as const, scale: [1.58, 0.035, 0.82] as const, rotation: [0.06, -0.42, 0.02] as const },
  { position: [0.16, 0.16, 0.02] as const, scale: [1.9, 0.035, 1.02] as const, rotation: [0.04, -0.2, -0.02] as const },
  { position: [1.0, -0.2, 0.3] as const, scale: [1.5, 0.035, 0.76] as const, rotation: [-0.02, 0.26, 0.02] as const },
  { position: [-0.34, -0.62, 0.14] as const, scale: [1.26, 0.035, 0.66] as const, rotation: [-0.05, 0.5, -0.04] as const },
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

function DataPath({ points, delay = 0 }: { points: THREE.Vector3[]; delay?: number }) {
  const marker = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame((state) => {
    if (!marker.current) return;
    const progress = (Math.sin(state.clock.elapsedTime * 0.42 + delay) + 1) / 2;
    marker.current.position.copy(curve.getPoint(progress));
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group>
      <line>
        <primitive attach="geometry" object={geometry} />
        <lineBasicMaterial color="#ff2d7a" transparent opacity={0.34} />
      </line>
      <mesh ref={marker}>
        <sphereGeometry args={[0.035, 14, 14]} />
        <meshStandardMaterial color="#ff2d7a" emissive="#ff2d7a" emissiveIntensity={1.8} />
      </mesh>
    </group>
  );
}

function ArchitecturalSculpture() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const visible = useVisibleCanvas();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 720;

  const paths = useMemo(
    () => [
      [new THREE.Vector3(-1.22, 0.5, -0.1), new THREE.Vector3(-0.34, 0.12, 0.28), new THREE.Vector3(0.76, -0.18, 0.5)],
      [new THREE.Vector3(-0.64, -0.58, 0.28), new THREE.Vector3(0.02, -0.05, -0.16), new THREE.Vector3(1.22, 0.18, 0.22)],
      [new THREE.Vector3(-1.08, 0.02, -0.38), new THREE.Vector3(-0.12, 0.54, 0.04), new THREE.Vector3(0.92, 0.02, 0.38)],
    ],
    [],
  );

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 0.55,
        y: (event.clientY / window.innerHeight - 0.5) * 0.38,
      };
    };
    const updateScroll = () => {
      scroll.current = Math.min(window.scrollY / Math.max(window.innerHeight * 1.4, 1), 1);
    };

    updateScroll();
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useFrame((state) => {
    if (!visible || !group.current) return;
    const t = state.clock.elapsedTime;
    const assembly = scroll.current;
    group.current.rotation.y += (pointer.current.x - 0.38 + assembly * 0.46 - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-pointer.current.y + 0.08 + Math.sin(t * 0.26) * 0.035 - group.current.rotation.x) * 0.04;
    group.current.position.y = Math.sin(t * 0.46) * 0.035 - assembly * 0.08;
    group.current.scale.setScalar(isMobile ? 0.86 : 1);
  });

  return (
    <group ref={group} rotation={[0.08, -0.38, 0]}>
      <mesh position={[0, 0, 0]} visible={false}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial />
      </mesh>

      {layers.map((layer, index) => (
        <group key={index} position={layer.position} rotation={layer.rotation}>
          <mesh scale={layer.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial
              color={index % 2 ? "#f2efea" : "#1a1718"}
              metalness={index % 2 ? 0.12 : 0.62}
              opacity={index % 2 ? 0.28 : 0.72}
              roughness={0.18}
              transparent
              transmission={index % 2 ? 0.18 : 0}
            />
          </mesh>
          <mesh position={[0, 0.036, 0]} scale={[layer.scale[0] * 1.01, 0.008, 0.012]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={index === 1 ? "#ff2d7a" : "#5b0a27"} emissive={index === 1 ? "#ff2d7a" : "#5b0a27"} emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {!isMobile ? (
        <>
          <mesh position={[-0.78, -0.06, 0.55]} rotation={[0.08, -0.18, 0.03]} scale={[0.06, 1.42, 0.62]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#c8c5bf" metalness={0.8} roughness={0.22} />
          </mesh>
          <mesh position={[0.72, 0.1, -0.36]} rotation={[-0.04, 0.22, -0.04]} scale={[0.05, 1.2, 0.5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#5b0a27" metalness={0.56} roughness={0.2} />
          </mesh>
        </>
      ) : null}

      {paths.map((points, index) => (
        <DataPath delay={index * 1.6} key={index} points={points} />
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
      <div className="architecture-fallback" aria-hidden="true">
        <span />
        <span />
        <span />
        <strong>SS</strong>
      </div>
    );
  }

  return (
    <div className="architecture-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.15], fov: 39 }}
        dpr={[1, 1.55]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight color="#f2efea" intensity={2.2} position={[2, 3, 4]} />
        <pointLight color="#5b0a27" intensity={5.6} position={[-2.4, 1.8, 2.8]} />
        <pointLight color="#ff2d7a" intensity={3.6} position={[2.2, -1.4, 2.6]} />
        <ArchitecturalSculpture />
      </Canvas>
    </div>
  );
}
