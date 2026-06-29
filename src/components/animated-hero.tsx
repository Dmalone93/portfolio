"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedHero({
  headline,
  description,
}: {
  headline: string;
  description: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Animated particle/node network on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -1000, y: -1000 };

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    // Nodes
    const nodeCount = 80;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const w = () => canvas!.offsetWidth;
    const h = () => canvas!.offsetHeight;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w(), h());

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > w()) node.vx *= -1;
        if (node.y < 0 || node.y > h()) node.vy *= -1;

        // Mouse repulsion
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.8;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }
      }

      // Draw connections
      const connectionDist = 150;
      ctx!.strokeStyle = "rgba(0, 0, 0, 0.15)";
      ctx!.lineWidth = 0.8;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.2;
            ctx!.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx!.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    canvas!.addEventListener("mousemove", onMouseMove);
    canvas!.addEventListener("mouseleave", onMouseLeave);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas!.removeEventListener("mousemove", onMouseMove);
      canvas!.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const words = headline.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh overflow-hidden px-6"
    >
      {/* Interactive canvas animation */}
      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute inset-0 h-full w-full transition-opacity duration-[2000ms]"
        style={{
          opacity: mounted ? 1 : 0,
          transitionTimingFunction: "var(--easing)",
          transitionDelay: "600ms",
        }}
      />

      {/* Text content */}
      <div className="relative flex min-h-dvh flex-col justify-center">
        <div className="mx-auto w-full max-w-6xl">
          {/* Headline — left aligned */}
          <h1 className="max-w-3xl">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                <span
                  className="inline-block font-[family-name:var(--font-geist)] text-4xl font-semibold sm:text-6xl lg:text-7xl tracking-normal leading-[1.15] transition-[opacity,transform] duration-[800ms]"
                  style={{
                    transitionTimingFunction: "var(--easing)",
                    transitionDelay: `${800 + i * 100}ms`,
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(100%)",
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            className="mt-6 max-w-xl text-[var(--text-muted)] leading-relaxed transition-[opacity,transform] duration-[800ms]"
            style={{
              transitionTimingFunction: "var(--easing)",
              transitionDelay: `${800 + words.length * 100 + 100}ms`,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {description}
          </p>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000"
        style={{
          opacity: mounted ? 1 : 0,
          transitionDelay: `${800 + words.length * 100 + 400}ms`,
        }}
      >
        <span className="label-mono text-[10px]">Scroll</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" className="animate-bounce text-[var(--text-muted)]">
          <path d="M2 4l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
