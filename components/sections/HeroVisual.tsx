"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const IMAGE_FALLBACK_SRC = "/media/cgi-developer-clean.png";
const IMAGE_WEBP_SRC = "/media/cgi-developer-clean.webp";

type Particle = {
  angle: number;
  depth: number;
  lane: number;
  seed: number;
  speed: number;
  start: number;
  trail: boolean;
  type: "dust" | "spark" | "code" | "node" | "burst";
};

type Ray = {
  delay: number;
  endX: number;
  endY: number;
  originX: number;
  originY: number;
  speed: number;
  width: number;
};

type ImageRect = {
  height: number;
  left: number;
  top: number;
  width: number;
};

const codeBits = ["fn", "api", "{ }", "</>", "db", "map", "ui", "auth"];
const rayPaths: Ray[] = [
  { originX: 0.735, originY: 0.535, endX: 1.08, endY: 0.3, speed: 0.58, delay: 0.02, width: 0.0026 },
  { originX: 0.735, originY: 0.535, endX: 1.06, endY: 0.44, speed: 0.48, delay: 0.34, width: 0.002 },
  { originX: 0.735, originY: 0.535, endX: 1.08, endY: 0.66, speed: 0.42, delay: 0.18, width: 0.0022 },
  { originX: 0.75, originY: 0.7, endX: 0.2, endY: 0.92, speed: 0.5, delay: 0.47, width: 0.0018 },
  { originX: 0.48, originY: 0.62, endX: 0.08, endY: 0.78, speed: 0.38, delay: 0.72, width: 0.0016 },
  { originX: 0.62, originY: 0.55, endX: 0.98, endY: 0.83, speed: 0.44, delay: 0.6, width: 0.0019 },
  { originX: 0.72, originY: 0.53, endX: 0.92, endY: 0.18, speed: 0.54, delay: 0.82, width: 0.0015 },
  { originX: 0.57, originY: 0.5, endX: 0.33, endY: 0.31, speed: 0.32, delay: 0.14, width: 0.0013 },
  { originX: 0.43, originY: 0.65, endX: 0.3, endY: 0.86, speed: 0.46, delay: 0.26, width: 0.0018 },
  { originX: 0.7, originY: 0.58, endX: 0.96, endY: 0.56, speed: 0.4, delay: 0.5, width: 0.0014 },
  { originX: 0.73, originY: 0.54, endX: 0.88, endY: 0.38, speed: 0.52, delay: 0.68, width: 0.0015 },
  { originX: 0.76, originY: 0.72, endX: 0.48, endY: 0.95, speed: 0.34, delay: 0.88, width: 0.0017 },
];
const networkPoints = [
  { x: 0.32, y: 0.36, z: 0.2 },
  { x: 0.42, y: 0.48, z: 0.45 },
  { x: 0.55, y: 0.42, z: 0.7 },
  { x: 0.71, y: 0.38, z: 0.55 },
  { x: 0.91, y: 0.34, z: 0.28 },
  { x: 0.87, y: 0.55, z: 0.8 },
  { x: 0.68, y: 0.67, z: 0.5 },
  { x: 0.48, y: 0.7, z: 0.3 },
  { x: 0.28, y: 0.78, z: 0.62 },
  { x: 0.56, y: 0.86, z: 0.44 },
];
const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
const smooth = (value: number) => {
  const next = clamp(value);
  return next * next * (3 - 2 * next);
};

function createParticles(count: number) {
  return Array.from({ length: count }, (_, index): Particle => ({
    angle: (index * 137.5 * Math.PI) / 180,
    depth: 0.18 + ((index * 19) % 100) / 112,
    lane: ((index * 31) % 100) / 100,
    seed: ((index * 47) % 100) / 100,
    speed: 0.09 + ((index * 13) % 100) / 190,
    start: ((index * 29) % 100) / 100,
    trail: index % 9 === 0,
    type: index % 13 === 0 ? "burst" : index % 8 === 0 ? "code" : index % 5 === 0 ? "node" : index % 3 === 0 ? "dust" : "spark",
  }));
}

function getCoverRect(width: number, height: number): ImageRect {
  const size = Math.max(width, height);
  return {
    height: size,
    left: (width - size) / 2,
    top: (height - size) / 2,
    width: size,
  };
}

function drawSuppression(ctx: CanvasRenderingContext2D, rect: ImageRect, width: number, height: number) {
  ctx.save();
  ctx.globalCompositeOperation = "source-over";

  const globe = pointInImage(rect, 0.66, 0.47);
  const arm = pointInImage(rect, 0.48, 0.61);
  const leftCode = pointInImage(rect, 0.27, 0.5);
  const laptop = pointInImage(rect, 0.73, 0.69);
  const actualGlobe = pointInImage(rect, 0.735, 0.535);

  const washes = [
    { x: actualGlobe.x, y: actualGlobe.y, r: rect.width * 0.18, a: 0.72 },
    { x: globe.x, y: globe.y, r: rect.width * 0.2, a: 0.56 },
    { x: arm.x, y: arm.y, r: rect.width * 0.24, a: 0.58 },
    { x: leftCode.x, y: leftCode.y, r: rect.width * 0.17, a: 0.54 },
    { x: laptop.x, y: laptop.y, r: rect.width * 0.17, a: 0.32 },
    { x: width * 0.82, y: height * 0.22, r: width * 0.32, a: 0.58 },
    { x: width * 0.42, y: height * 0.9, r: width * 0.42, a: 0.54 },
  ];

  for (const wash of washes) {
    const gradient = ctx.createRadialGradient(wash.x, wash.y, 0, wash.x, wash.y, wash.r);
    gradient.addColorStop(0, `rgba(5, 5, 6, ${wash.a})`);
    gradient.addColorStop(0.5, `rgba(9, 3, 7, ${wash.a * 0.48})`);
    gradient.addColorStop(1, "rgba(5, 5, 6, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  const edge = ctx.createLinearGradient(0, 0, width, 0);
  edge.addColorStop(0, "rgba(5, 5, 6, 0.92)");
  edge.addColorStop(0.14, "rgba(5, 5, 6, 0.2)");
  edge.addColorStop(0.54, "rgba(5, 5, 6, 0)");
  edge.addColorStop(0.9, "rgba(5, 5, 6, 0.16)");
  edge.addColorStop(1, "rgba(5, 5, 6, 0.9)");
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = "multiply";
  const streak = ctx.createLinearGradient(width * 0.18, height * 0.86, width * 0.92, height * 0.52);
  streak.addColorStop(0, "rgba(5, 5, 6, 0.48)");
  streak.addColorStop(0.45, "rgba(11, 3, 8, 0.28)");
  streak.addColorStop(1, "rgba(5, 5, 6, 0)");
  ctx.fillStyle = streak;
  ctx.beginPath();
  ctx.moveTo(width * 0.04, height * 0.82);
  ctx.bezierCurveTo(width * 0.3, height * 0.68, width * 0.62, height * 0.62, width * 0.98, height * 0.74);
  ctx.lineTo(width, height);
  ctx.lineTo(width * 0.1, height);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function pointInImage(rect: ImageRect, x: number, y: number) {
  return {
    x: rect.left + rect.width * x,
    y: rect.top + rect.height * y,
  };
}

function isFaceProtected(x: number, y: number, rect: ImageRect) {
  const face = pointInImage(rect, 0.535, 0.345);
  const jaw = pointInImage(rect, 0.545, 0.43);
  const faceDx = (x - face.x) / (rect.width * 0.092);
  const faceDy = (y - face.y) / (rect.height * 0.14);
  const jawDx = (x - jaw.x) / (rect.width * 0.072);
  const jawDy = (y - jaw.y) / (rect.height * 0.08);
  return faceDx * faceDx + faceDy * faceDy < 1 || jawDx * jawDx + jawDy * jawDy < 1;
}

function clearFaceProtection(ctx: CanvasRenderingContext2D, rect: ImageRect) {
  const face = pointInImage(rect, 0.535, 0.345);
  const jaw = pointInImage(rect, 0.545, 0.43);

  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(face.x, face.y, rect.width * 0.092, rect.height * 0.14, -0.04, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(jaw.x, jaw.y, rect.width * 0.072, rect.height * 0.08, -0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawGlobe(ctx: CanvasRenderingContext2D, rect: ImageRect, time: number, reduceMotion: boolean) {
  const center = pointInImage(rect, 0.735, 0.535);
  const radius = rect.width * 0.074;
  const spin = reduceMotion ? 0 : time * 0.5;
  const counterSpin = reduceMotion ? 0 : -time * 0.32;
  const pulse = reduceMotion ? 0.45 : 0.5 + Math.sin(time * 1.4) * 0.5;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.82 + pulse * 0.16;
  ctx.lineJoin = "round";
  ctx.shadowBlur = 11 + pulse * 7;
  ctx.shadowColor = "rgba(255, 45, 122, 0.88)";
  ctx.strokeStyle = "rgba(255, 170, 218, 0.68)";
  ctx.lineWidth = Math.max(0.7, rect.width * 0.0012);

  ctx.beginPath();
  ctx.arc(center.x, center.y, radius * 1.03, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(1.2, rect.width * 0.002);
  ctx.strokeStyle = "rgba(255, 209, 234, 0.72)";
  ctx.stroke();

  for (let i = -2; i <= 2; i += 1) {
    const y = center.y + Math.sin(i * 0.52) * radius * 0.46;
    const h = Math.max(3, radius * Math.cos(i * 0.38) * 0.3);
    ctx.beginPath();
    ctx.ellipse(center.x, y, radius * 0.98, h, spin * 0.2, 0, Math.PI * 2);
    ctx.lineWidth = Math.max(0.65, rect.width * 0.001);
    ctx.strokeStyle = "rgba(255, 162, 214, 0.6)";
    ctx.stroke();
  }

  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.ellipse(center.x, center.y, radius * (0.18 + i * 0.12), radius * 0.98, counterSpin + i * 0.39, 0, Math.PI * 2);
    ctx.lineWidth = Math.max(0.65, rect.width * 0.001);
    ctx.strokeStyle = "rgba(255, 138, 204, 0.52)";
    ctx.stroke();
  }

  for (let i = 0; i < 2; i += 1) {
    const ringSpin = i === 1 ? counterSpin * 1.35 : spin * (0.8 + i * 0.22);
    ctx.beginPath();
    ctx.ellipse(center.x, center.y, radius * (1.18 + i * 0.22), radius * (0.24 + i * 0.09), -0.22 + ringSpin, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, ${122 + i * 42}, 202, ${0.42 + pulse * 0.16})`;
    ctx.lineWidth = 1.1 + i * 0.32;
    ctx.stroke();
  }

  const highlight = spin * 1.8;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius * 1.07, highlight, highlight + Math.PI * 0.35);
  ctx.strokeStyle = "rgba(255, 244, 250, 0.9)";
  ctx.lineWidth = Math.max(1.6, rect.width * 0.0028);
  ctx.stroke();

  for (let i = 0; i < 14; i += 1) {
    const orbit = (i % 2 ? counterSpin : spin) * (0.9 + i * 0.035) + i * 0.64;
    const ringTilt = i % 3 === 0 ? 0.66 : 0.38;
    const nodeX = center.x + Math.cos(orbit) * radius * (0.78 + (i % 4) * 0.12);
    const nodeY = center.y + Math.sin(orbit) * radius * ringTilt;
    ctx.globalAlpha = 0.42 + pulse * 0.34;
    ctx.fillStyle = i % 2 ? "#ff8fc7" : "#ffe1f0";
    ctx.beginPath();
    ctx.arc(nodeX, nodeY, 1 + (i % 3) * 0.32, 0, Math.PI * 2);
    ctx.fill();
  }

  const glow = ctx.createRadialGradient(center.x, center.y, radius * 0.08, center.x, center.y, radius * 2.5);
  glow.addColorStop(0, `rgba(255, 214, 238, ${0.18 + pulse * 0.12})`);
  glow.addColorStop(0.36, `rgba(255, 45, 122, ${0.13 + pulse * 0.08})`);
  glow.addColorStop(1, "rgba(255, 45, 122, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius * 2.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRays(ctx: CanvasRenderingContext2D, rect: ImageRect, time: number, reduceMotion: boolean) {
  if (reduceMotion) return;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < rayPaths.length; i += 1) {
    const ray = rayPaths[i];
    const origin = pointInImage(rect, ray.originX, ray.originY);
    const end = pointInImage(rect, ray.endX, ray.endY);
    const phase = (time * ray.speed + ray.delay) % 1;
    const ease = smooth(phase);
    const headX = mix(origin.x, end.x, ease);
    const headY = mix(origin.y, end.y, ease);
    const tailProgress = Math.max(0, ease - 0.28);
    const tailX = mix(origin.x, end.x, tailProgress);
    const tailY = mix(origin.y, end.y, tailProgress);
    const pulse = 0.52 + Math.sin(time * 1.7 + i * 1.4) * 0.22;
    const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
    const baseGradient = ctx.createLinearGradient(origin.x, origin.y, end.x, end.y);

    baseGradient.addColorStop(0, "rgba(255, 45, 122, 0.26)");
    baseGradient.addColorStop(0.58, "rgba(255, 96, 178, 0.16)");
    baseGradient.addColorStop(1, "rgba(255, 45, 122, 0)");
    gradient.addColorStop(0, "rgba(255, 45, 122, 0)");
    gradient.addColorStop(0.42, `rgba(255, 64, 152, ${0.2 + pulse * 0.16})`);
    gradient.addColorStop(0.82, `rgba(255, 192, 226, ${0.5 + pulse * 0.22})`);
    gradient.addColorStop(1, "rgba(255, 244, 250, 0)");

    ctx.globalAlpha = 0.34;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(255, 45, 122, 0.78)";
    ctx.strokeStyle = baseGradient;
    ctx.lineWidth = Math.max(0.55, rect.width * ray.width * 0.58);
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.globalAlpha = 0.86;
    ctx.strokeStyle = gradient;
    ctx.lineWidth = Math.max(0.7, rect.width * ray.width * (0.8 + pulse * 0.35));
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(headX, headY);
    ctx.stroke();

    for (let n = 0; n < 3; n += 1) {
      const t = (phase + n * 0.28 + i * 0.05) % 1;
      const sparkleX = mix(origin.x, end.x, t);
      const sparkleY = mix(origin.y, end.y, t);
      const sparkleFade = smooth(t / 0.18) * (1 - smooth((t - 0.82) / 0.18));
      ctx.globalAlpha = sparkleFade * 0.55;
      ctx.fillStyle = n % 2 ? "#ff6fac" : "#ffe1f0";
      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, rect.width * (0.0016 + n * 0.0004), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawEnergyTrails(ctx: CanvasRenderingContext2D, rect: ImageRect, time: number, reduceMotion: boolean) {
  if (reduceMotion) return;

  const laptop = pointInImage(rect, 0.75, 0.7);
  const wrist = pointInImage(rect, 0.43, 0.63);
  const hand = pointInImage(rect, 0.56, 0.49);
  const globe = pointInImage(rect, 0.735, 0.535);
  const phase = (time * 0.28) % 1;
  const pulse = 0.5 + Math.sin(time * 1.3) * 0.5;

  const paths = [
    [wrist, pointInImage(rect, 0.48, 0.58), hand, globe],
    [pointInImage(rect, 0.2, 0.84), pointInImage(rect, 0.36, 0.68), hand, globe],
    [laptop, pointInImage(rect, 0.7, 0.58), pointInImage(rect, 0.62, 0.52), globe],
  ];

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < paths.length; i += 1) {
    const path = paths[i];
    ctx.globalAlpha = 0.34 + pulse * 0.16;
    ctx.shadowBlur = 9;
    ctx.shadowColor = "rgba(255, 45, 122, 0.82)";
    ctx.strokeStyle = i === 1 ? "rgba(255, 62, 158, 0.62)" : "rgba(255, 145, 205, 0.68)";
    ctx.lineWidth = rect.width * (0.004 + i * 0.001);
    ctx.setLineDash([rect.width * 0.075, rect.width * 0.18]);
    ctx.lineDashOffset = -phase * rect.width * (0.86 + i * 0.24);
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    ctx.bezierCurveTo(path[1].x, path[1].y, path[2].x, path[2].y, path[3].x, path[3].y);
    ctx.stroke();

    for (let n = 0; n < 5; n += 1) {
      const t = (phase + n * 0.2 + i * 0.07) % 1;
      const x = Math.pow(1 - t, 3) * path[0].x + 3 * Math.pow(1 - t, 2) * t * path[1].x + 3 * (1 - t) * t * t * path[2].x + t * t * t * path[3].x;
      const y = Math.pow(1 - t, 3) * path[0].y + 3 * Math.pow(1 - t, 2) * t * path[1].y + 3 * (1 - t) * t * t * path[2].y + t * t * t * path[3].y;
      ctx.setLineDash([]);
      ctx.globalAlpha = (1 - Math.abs(t - 0.5)) * 0.5;
      ctx.fillStyle = "#ffd7eb";
      ctx.beginPath();
      ctx.arc(x, y, rect.width * 0.004, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.setLineDash([]);
  ctx.restore();
}

function drawLightWaves(ctx: CanvasRenderingContext2D, rect: ImageRect, time: number, reduceMotion: boolean) {
  if (reduceMotion) return;

  const globe = pointInImage(rect, 0.735, 0.535);
  const hand = pointInImage(rect, 0.57, 0.5);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(255, 45, 122, 0.7)";

  for (let i = 0; i < 5; i += 1) {
    const phase = (time * (0.22 + i * 0.035) + i * 0.18) % 1;
    const radiusX = rect.width * (0.08 + phase * (0.34 + i * 0.02));
    const radiusY = rect.width * (0.028 + phase * (0.12 + i * 0.015));
    const alpha = (1 - phase) * (0.18 + i * 0.02);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = i % 2 ? "rgba(255, 86, 170, 0.7)" : "rgba(255, 205, 232, 0.62)";
    ctx.lineWidth = Math.max(0.7, rect.width * (0.0011 + i * 0.0002));
    ctx.beginPath();
    ctx.ellipse(globe.x, globe.y, radiusX, radiusY, -0.18 + time * 0.08 + i * 0.33, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (let i = 0; i < 3; i += 1) {
    const phase = (time * (0.18 + i * 0.04) + i * 0.28) % 1;
    ctx.globalAlpha = (1 - phase) * 0.16;
    ctx.strokeStyle = "rgba(255, 92, 176, 0.65)";
    ctx.lineWidth = Math.max(0.55, rect.width * 0.001);
    ctx.beginPath();
    ctx.arc(hand.x, hand.y, rect.width * (0.04 + phase * 0.22), -0.6, Math.PI * 1.35);
    ctx.stroke();
  }

  ctx.restore();
}

function drawNetwork(ctx: CanvasRenderingContext2D, rect: ImageRect, time: number, reduceMotion: boolean) {
  if (reduceMotion) return;

  const points = networkPoints.map((point, index) => {
    const driftX = Math.sin(time * (0.22 + point.z * 0.08) + index) * rect.width * 0.01;
    const driftY = Math.cos(time * (0.2 + point.z * 0.07) + index * 1.7) * rect.height * 0.012;
    const base = pointInImage(rect, point.x, point.y);
    return { ...point, x: base.x + driftX, y: base.y + driftY };
  });

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  ctx.shadowBlur = 5;
  ctx.shadowColor = "rgba(255, 45, 122, 0.55)";

  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[(i + 1 + (i % 3 === 0 ? 2 : 0)) % points.length];
    const phase = (time * (0.16 + a.z * 0.12) + i * 0.13) % 1;
    const x = mix(a.x, b.x, phase);
    const y = mix(a.y, b.y, phase);
    const baseAlpha = 0.08 + a.z * 0.08;

    ctx.globalAlpha = baseAlpha;
    ctx.strokeStyle = "rgba(255, 102, 182, 0.58)";
    ctx.lineWidth = Math.max(0.45, rect.width * 0.0007);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    ctx.globalAlpha = 0.34 + a.z * 0.18;
    ctx.fillStyle = i % 2 ? "#ff7fbc" : "#ffe4f2";
    ctx.beginPath();
    ctx.arc(x, y, rect.width * (0.0015 + a.z * 0.0012), 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    const pulse = 0.5 + Math.sin(time * 1.1 + i * 0.7) * 0.5;
    ctx.globalAlpha = 0.18 + pulse * 0.24;
    ctx.fillStyle = "#ff7fbc";
    ctx.beginPath();
    ctx.arc(point.x, point.y, rect.width * (0.0015 + point.z * 0.0015), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[], rect: ImageRect, width: number, height: number, time: number, reduceMotion: boolean) {
  const globe = pointInImage(rect, 0.735, 0.535);
  const laptop = pointInImage(rect, 0.74, 0.7);
  const hand = pointInImage(rect, 0.57, 0.5);
  const driftAmount = reduceMotion ? 0.15 : 1;

  ctx.save();
  ctx.globalCompositeOperation = "screen";

  for (const particle of particles) {
    const life = (time * particle.speed * driftAmount + particle.start) % 1;
    const fade = smooth(life / 0.16) * (1 - smooth((life - 0.78) / 0.22));
    const orbit = particle.angle + life * Math.PI * 2 + time * particle.speed * 0.8;
    const origin = particle.type === "code" ? hand : particle.trail || particle.type === "burst" ? laptop : particle.type === "dust" ? pointInImage(rect, 0.55, 0.36) : globe;
    const spreadX = mix(rect.width * 0.08, width * 0.48, particle.lane);
    const spreadY = mix(rect.height * 0.06, height * 0.34, particle.lane);
    const stream = particle.type === "burst" ? life * width * 0.34 : 0;
    const pushX = particle.type === "dust" ? mix(-width * 0.08, width * 0.16, particle.seed) : 0;
    const x = origin.x + Math.cos(orbit) * spreadX * particle.depth - stream * 0.35 + pushX;
    const y = origin.y + Math.sin(orbit * 0.72) * spreadY * particle.depth - life * height * 0.2;
    if (isFaceProtected(x, y, rect)) continue;
    const edgeFade = clamp(1 - Math.max(0, Math.abs(x - width / 2) - width * 0.5) / (width * 0.12));
    const twinkle = 0.55 + Math.sin(time * 2.4 + particle.seed * 16) * 0.28;
    const alpha = clamp((0.1 + particle.depth * 0.46) * twinkle * edgeFade * fade);
    const size = mix(0.45, particle.type === "dust" ? 1.1 : 1.85, particle.depth);

    if (particle.type === "code") {
      ctx.globalAlpha = alpha * 0.42;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(255, 45, 122, 0.7)";
      ctx.font = `${Math.round(7 + particle.depth * 4)}px ui-monospace, SFMono-Regular, Consolas, monospace`;
      ctx.fillStyle = "rgba(255, 196, 225, 0.72)";
      ctx.fillText(codeBits[Math.floor(particle.seed * codeBits.length) % codeBits.length], x, y);
      continue;
    }

    ctx.globalAlpha = alpha;
    ctx.shadowBlur = 5 + particle.depth * 5;
    ctx.shadowColor = "rgba(255, 45, 122, 0.82)";
    ctx.fillStyle = particle.type === "node" ? "#ff9dcd" : "#ff4f9a";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    if (particle.trail) {
      ctx.globalAlpha = alpha * 0.34;
      ctx.strokeStyle = "rgba(255, 86, 170, 0.8)";
      ctx.lineWidth = Math.max(0.55, size * 0.34);
      ctx.beginPath();
      ctx.moveTo(mix(laptop.x, x, 0.18), mix(laptop.y, y, 0.18));
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawFabricSheen(ctx: CanvasRenderingContext2D, rect: ImageRect, time: number, reduceMotion: boolean) {
  if (reduceMotion) return;

  const shoulder = pointInImage(rect, 0.46, 0.63);
  const wrist = pointInImage(rect, 0.53, 0.73);
  const torso = pointInImage(rect, 0.49, 0.74);
  const phase = 0.5 + Math.sin(time * 0.74) * 0.5;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  ctx.shadowBlur = 5;
  ctx.shadowColor = "rgba(255, 45, 122, 0.45)";
  ctx.strokeStyle = `rgba(255, 110, 186, ${0.1 + phase * 0.08})`;
  ctx.lineWidth = Math.max(0.5, rect.width * 0.0009);

  for (let i = 0; i < 5; i += 1) {
    const offset = Math.sin(time * (0.42 + i * 0.03) + i) * rect.width * 0.004;
    ctx.beginPath();
    ctx.moveTo(shoulder.x + rect.width * i * 0.012 + offset, shoulder.y + rect.height * i * 0.018);
    ctx.bezierCurveTo(
      torso.x + rect.width * 0.03 + offset,
      torso.y + rect.height * 0.02,
      wrist.x - rect.width * 0.05 + offset,
      wrist.y - rect.height * 0.04,
      wrist.x + rect.width * 0.02 + offset,
      wrist.y + rect.height * 0.02,
    );
    ctx.stroke();
  }

  ctx.restore();
}

function drawCodeFields(ctx: CanvasRenderingContext2D, rect: ImageRect, time: number, reduceMotion: boolean) {
  if (reduceMotion) return;

  const fields = [
    { x: 0.3, y: 0.49, w: 0.12, rows: 6, speed: 0.08 },
    { x: 0.5, y: 0.52, w: 0.18, rows: 7, speed: 0.1 },
    { x: 0.82, y: 0.46, w: 0.14, rows: 5, speed: 0.07 },
  ];

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.font = `${Math.max(7, Math.round(rect.width * 0.012))}px ui-monospace, SFMono-Regular, Consolas, monospace`;
  ctx.shadowBlur = 5;
  ctx.shadowColor = "rgba(255, 45, 122, 0.62)";

  for (let f = 0; f < fields.length; f += 1) {
    const field = fields[f];
    const start = pointInImage(rect, field.x, field.y);
    const drift = ((time * field.speed + f * 0.31) % 1) * rect.height * 0.05;
    const pulse = 0.55 + Math.sin(time * 1.2 + f) * 0.22;

    for (let row = 0; row < field.rows; row += 1) {
      const local = (row / field.rows + time * field.speed + f * 0.17) % 1;
      const alpha = smooth(local / 0.2) * (1 - smooth((local - 0.72) / 0.28)) * (0.22 + pulse * 0.18);
      const x = start.x + Math.sin(time * 0.42 + row + f) * rect.width * 0.018;
      const y = start.y + row * rect.height * 0.018 - drift;
      if (isFaceProtected(x, y, rect)) continue;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = row % 2 ? "rgba(255, 170, 214, 0.76)" : "rgba(255, 232, 244, 0.7)";
      ctx.fillText(codeBits[(row + f * 2) % codeBits.length], x, y);
      ctx.globalAlpha = alpha * 0.64;
      ctx.fillRect(x + rect.width * 0.038, y - 3, rect.width * field.w * (0.25 + (row % 4) * 0.11), 1);
    }
  }

  ctx.restore();
}

function drawHairWisps(ctx: CanvasRenderingContext2D, rect: ImageRect, time: number, reduceMotion: boolean) {
  if (reduceMotion) return;

  const anchors = [
    { x: 0.47, y: 0.18, l: 0.12, d: 0 },
    { x: 0.55, y: 0.2, l: 0.14, d: 0.7 },
    { x: 0.43, y: 0.28, l: 0.11, d: 1.2 },
    { x: 0.5, y: 0.38, l: 0.09, d: 1.8 },
    { x: 0.38, y: 0.22, l: 0.08, d: 2.4 },
  ];

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.24;
  ctx.strokeStyle = "rgba(255, 124, 190, 0.42)";
  ctx.lineWidth = Math.max(0.6, rect.width * 0.0011);
  ctx.shadowBlur = 3;
  ctx.shadowColor = "rgba(255, 45, 122, 0.55)";

  for (let i = 0; i < anchors.length; i += 1) {
    const anchor = anchors[i];
    const base = pointInImage(rect, anchor.x, anchor.y);
    const bend = Math.sin(time * (0.55 + i * 0.04) + anchor.d) * rect.width * 0.006;
    ctx.beginPath();
    ctx.moveTo(base.x, base.y);
    ctx.bezierCurveTo(
      base.x + rect.width * 0.018 + bend,
      base.y + rect.height * anchor.l * 0.28,
      base.x + rect.width * 0.034 + bend * 1.5,
      base.y + rect.height * anchor.l * 0.68,
      base.x + rect.width * 0.02 + bend * 0.9,
      base.y + rect.height * anchor.l,
    );
    ctx.stroke();
  }

  ctx.restore();
}

export function HeroVisual() {
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [hasImageError, setHasImageError] = useState(false);
  const particleCount = useMemo(() => {
    if (typeof window === "undefined") return 130;
    return window.innerWidth < 780 ? 44 : window.innerWidth < 1100 ? 86 : 150;
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!shell || !canvas || !ctx) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let isVisible = !document.hidden;
    let isInView = true;
    let isReducedMotion = reduceMotionQuery.matches;
    let cssWidth = 1;
    let cssHeight = 1;
    let lastTime = 0;
    let elapsed = 0;
    let isRunning = false;
    let isPageScrolling = false;
    let scrollResumeTimer = 0;
    particlesRef.current = createParticles(particleCount);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = shell.getBoundingClientRect();
      cssWidth = Math.max(1, rect.width);
      cssHeight = Math.max(1, rect.height);
      const width = Math.max(1, Math.round(cssWidth * dpr));
      const height = Math.max(1, Math.round(cssHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    const draw = (now: number) => {
      if (!isVisible || !isInView || isPageScrolling) {
        isRunning = false;
        lastTime = 0;
        return;
      }

      const current = now / 1000;
      const delta = lastTime ? Math.min(current - lastTime, 0.05) : 1 / 60;
      lastTime = current;

      elapsed += delta * (isReducedMotion ? 0.18 : 1);
      const width = cssWidth;
      const height = cssHeight;
      const imageRect = getCoverRect(width, height);

      ctx.clearRect(0, 0, width, height);

      const pulse = isReducedMotion ? 0.4 : 0.5 + Math.sin(elapsed * 0.9) * 0.5;
      const aura = ctx.createRadialGradient(width * 0.64, height * 0.5, 0, width * 0.64, height * 0.5, Math.max(width, height) * 0.54);
      aura.addColorStop(0, `rgba(255, 45, 122, ${0.065 + pulse * 0.055})`);
      aura.addColorStop(0.42, `rgba(91, 10, 39, ${0.075 + pulse * 0.035})`);
      aura.addColorStop(1, "rgba(9, 9, 9, 0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      drawSuppression(ctx, imageRect, width, height);
      clearFaceProtection(ctx, imageRect);
      drawNetwork(ctx, imageRect, elapsed, isReducedMotion);
      drawRays(ctx, imageRect, elapsed, isReducedMotion);
      drawEnergyTrails(ctx, imageRect, elapsed, isReducedMotion);
      drawLightWaves(ctx, imageRect, elapsed, isReducedMotion);
      drawParticles(ctx, particlesRef.current, imageRect, width, height, elapsed, isReducedMotion);
      drawCodeFields(ctx, imageRect, elapsed, isReducedMotion);
      drawGlobe(ctx, imageRect, elapsed, isReducedMotion);
      drawFabricSheen(ctx, imageRect, elapsed, isReducedMotion);
      drawHairWisps(ctx, imageRect, elapsed, isReducedMotion);
      clearFaceProtection(ctx, imageRect);

      animationFrame = requestAnimationFrame(draw);
    };

    const startAnimation = () => {
      if (isRunning || !isVisible || !isInView || isPageScrolling) return;
      isRunning = true;
      lastTime = 0;
      animationFrame = requestAnimationFrame(draw);
    };

    const stopAnimation = () => {
      if (!isRunning) return;
      cancelAnimationFrame(animationFrame);
      isRunning = false;
      lastTime = 0;
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) startAnimation();
      else stopAnimation();
    };

    const handleMotionPreference = () => {
      isReducedMotion = reduceMotionQuery.matches;
    };

    const handleResize = () => {
      particlesRef.current = createParticles(window.innerWidth < 780 ? 44 : window.innerWidth < 1100 ? 86 : 150);
      resizeCanvas();
    };

    const handlePageScroll = () => {
      isPageScrolling = true;
      stopAnimation();
      window.clearTimeout(scrollResumeTimer);
      scrollResumeTimer = window.setTimeout(() => {
        isPageScrolling = false;
        startAnimation();
      }, 140);
    };

    const resizeObserver = new ResizeObserver(handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = Boolean(entry?.isIntersecting);
        if (isInView) startAnimation();
        else stopAnimation();
      },
      { threshold: 0.08 },
    );

    observer.observe(shell);
    resizeObserver.observe(shell);
    resizeCanvas();
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("scroll", handlePageScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    reduceMotionQuery.addEventListener("change", handleMotionPreference);

    return () => {
      window.clearTimeout(scrollResumeTimer);
      stopAnimation();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handlePageScroll);
      window.removeEventListener("resize", handleResize);
      reduceMotionQuery.removeEventListener("change", handleMotionPreference);
    };
  }, [particleCount]);

  return (
    <div className="hero-video-anchor" data-video-state={hasImageError ? "error" : "ready"}>
      {!hasImageError ? (
        <div className="hero-video-shell cgi-hero-shell" ref={shellRef}>
          <div aria-hidden="true" className="cgi-artwork-backdrop" />
          <picture className="cgi-artwork-picture">
            <source srcSet={IMAGE_WEBP_SRC} type="image/webp" />
            <img
              alt="CGI female developer working at a laptop with a hot-pink holographic sphere"
              className="cgi-developer-artwork"
              decoding="async"
              fetchPriority="high"
              height={1536}
              onError={() => setHasImageError(true)}
              src={IMAGE_FALLBACK_SRC}
              width={1536}
            />
          </picture>
          <span aria-hidden="true" className="cgi-static-suppression" />
          <canvas aria-hidden="true" className="cgi-effects-canvas" ref={canvasRef} />
          <span aria-hidden="true" className="cgi-light-layer" />
          <span aria-hidden="true" className="hero-video-vignette" />
        </div>
      ) : (
        <span className="hero-video-fallback">CGI developer preview unavailable</span>
      )}
    </div>
  );
}
