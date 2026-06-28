"use client";

import { useCallback, useRef, type ReactNode, type MouseEvent } from "react";

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (!card || !sheen) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 16; // -8 to 8 degrees
    const rotateX = (0.5 - y) * 16; // -8 to 8 degrees

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    sheen.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08), transparent 60%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (!card || !sheen) return;

    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    sheen.style.background = "transparent";
  }, []);

  const handleMouseDown = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.scale = "0.98";
  }, []);

  const handleMouseUp = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.scale = "1";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transition-[transform,scale,box-shadow] duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
      <div
        ref={sheenRef}
        className="pointer-events-none absolute inset-0 rounded-lg"
        aria-hidden="true"
      />
    </div>
  );
}
