"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Point = [number, number];

// Ribbon spine in normalized coordinates: low on the left, sweeping up
// behind the hero content to the top-right, then falling off the right edge.
const SPINE: Point[] = [
  [-0.08, 1.02],
  [0.15, 0.92],
  [0.36, 0.86],
  [0.54, 0.78],
  [0.65, 0.5],
  [0.74, 0.2],
  [0.85, 0.1],
  [0.96, 0.22],
  [1.08, 0.5],
];

function catmullRom(points: Point[], t: number): Point {
  const segments = points.length - 1;
  const scaled = Math.min(Math.max(t, 0), 0.9999) * segments;
  const i = Math.floor(scaled);
  const local = scaled - i;
  const p0 = points[Math.max(i - 1, 0)];
  const p1 = points[i];
  const p2 = points[i + 1];
  const p3 = points[Math.min(i + 2, points.length - 1)];
  const t2 = local * local;
  const t3 = t2 * local;
  const blend = (a: number, b: number, c: number, d: number) =>
    0.5 *
    (2 * b +
      (-a + c) * local +
      (2 * a - 5 * b + 4 * c - d) * t2 +
      (-a + 3 * b - 3 * c + d) * t3);
  return [
    blend(p0[0], p1[0], p2[0], p3[0]),
    blend(p0[1], p1[1], p2[1], p3[1]),
  ];
}

export function LineWave({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const lineCount = isMobile ? 40 : 70;
      const steps = isMobile ? 120 : 220;
      const spread = Math.min(width, height) * (isMobile ? 0.12 : 0.16);

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#d946ef");
      gradient.addColorStop(0.45, "#c026d3");
      gradient.addColorStop(0.75, "#9333ea");
      gradient.addColorStop(1, "#7c3aed");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.85;

      for (let i = 0; i < lineCount; i += 1) {
        const offset = i / (lineCount - 1) - 0.5;
        ctx.beginPath();

        for (let s = 0; s <= steps; s += 1) {
          const u = s / steps;
          const [nx, ny] = catmullRom(SPINE, u);
          const ahead = catmullRom(SPINE, Math.min(u + 0.002, 1));

          const dx = (ahead[0] - nx) * width;
          const dy = (ahead[1] - ny) * height;
          const length = Math.hypot(dx, dy) || 1;
          const normalX = -dy / length;
          const normalY = dx / length;

          const twist =
            Math.sin(u * Math.PI * 3.2 + time * 0.5) * 0.85 +
            Math.sin(u * Math.PI * 1.3 - time * 0.3) * 0.35;
          const distance = offset * spread * twist;

          const x = nx * width + normalX * distance;
          const y = ny * height + normalY * distance;

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (visible) {
        draw();
        time += 0.01;
      }
      animationId = window.requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    resize();
    draw();
    if (!reduceMotion) {
      animationId = window.requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
