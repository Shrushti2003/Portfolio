"use client";

import { useEffect, useState } from "react";

export function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", updatePosition);

    return () => window.removeEventListener("pointermove", updatePosition);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden transition-opacity duration-500 md:block"
      style={{
        background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, rgba(45, 212, 255, 0.12), rgba(139, 92, 246, 0.08) 32%, transparent 64%)`,
      }}
    />
  );
}
