"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CursorSystem() {
  const [point, setPoint] = useState({ x: -80, y: -80 });
  const [velocity, setVelocity] = useState(0);
  const [active, setActive] = useState(false);
  const lastPoint = useRef({ x: -80, y: -80, time: 0 });

  useEffect(() => {
    const update = (event: PointerEvent) => {
      const now = performance.now();
      const dx = event.clientX - lastPoint.current.x;
      const dy = event.clientY - lastPoint.current.y;
      const dt = Math.max(now - lastPoint.current.time, 16);

      setVelocity(Math.min(Math.hypot(dx, dy) / dt, 1.8));
      lastPoint.current = { x: event.clientX, y: event.clientY, time: now };
      setPoint({ x: event.clientX, y: event.clientY });
    };

    const updateHover = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setActive(Boolean(target?.closest("a,button,input,textarea,[data-cursor='project']")));
    };

    window.addEventListener("pointermove", update);
    window.addEventListener("pointerover", updateHover);

    return () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerover", updateHover);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      animate={{
        x: point.x - (active ? 18 : 10),
        y: point.y - (active ? 18 : 10),
        scaleX: active ? 1.35 + velocity * 0.35 : 1 + velocity * 0.55,
        scaleY: active ? 1.05 : Math.max(0.72, 1 - velocity * 0.22),
      }}
      className={`pointer-events-none fixed left-0 top-0 z-[70] hidden rounded-full border mix-blend-screen md:block ${
        active
          ? "h-9 w-9 border-cyan-200/80 bg-cyan-200/12"
          : "h-5 w-5 border-cyan-200/70 bg-cyan-200/10"
      }`}
      transition={{ type: "spring", stiffness: 360, damping: 32 }}
    />
  );
}
