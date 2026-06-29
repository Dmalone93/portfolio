"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    function onMouseMove(e: globalThis.MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!visible.current) {
        visible.current = true;
        dot!.style.opacity = "1";
        circle!.style.opacity = "1";
      }

      dot!.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    }

    function onMouseLeave() {
      visible.current = false;
      dot!.style.opacity = "0";
      circle!.style.opacity = "0";
    }

    function onMouseOverInteractive(e: globalThis.MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      if (interactive) {
        dot!.style.opacity = "0";
        circle!.style.opacity = "0";
        document.body.style.cursor = "auto";
      } else {
        if (visible.current) {
          dot!.style.opacity = "1";
          circle!.style.opacity = "1";
        }
        document.body.style.cursor = "none";
      }
    }

    let rafId: number;
    function animateCircle() {
      const lerp = 0.15;
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * lerp;
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * lerp;
      circle!.style.transform = `translate(${circlePos.current.x - 16}px, ${circlePos.current.y - 16}px)`;
      rafId = requestAnimationFrame(animateCircle);
    }

    document.body.style.cursor = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOverInteractive);
    rafId = requestAnimationFrame(animateCircle);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOverInteractive);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-white opacity-0 transition-opacity duration-150"
        aria-hidden="true"
      />
      <div
        ref={circleRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border border-white opacity-0 transition-opacity duration-150"
        aria-hidden="true"
      />
    </>
  );
}
