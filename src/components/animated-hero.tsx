"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const principles = [
  "innovative",
  "useful",
  "aesthetic",
  "understandable",
  "unobtrusive",
  "honest",
  "long-lasting",
  "thorough",
  "sustainable",
  "minimal",
];

export function AnimatedHero({
  headline,
  description,
}: {
  headline: string;
  description: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [principleIndex, setPrincipleIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through principles
  useEffect(() => {
    if (paused || !mounted) return;

    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setPrincipleIndex((prev) => (prev + 1) % principles.length);
        setTransitioning(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [paused, mounted]);

  const togglePause = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const mouse = { x: -1000, y: -1000 };

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const nodeCount = 25;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const w = () => canvas!.offsetWidth;
    const h = () => canvas!.offsetHeight;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 1,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w(), h());

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w()) node.vx *= -1;
        if (node.y < 0 || node.y > h()) node.vy *= -1;

        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.8;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }
      }

      const connectionDist = 180;
      ctx!.lineWidth = 0.5;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.08;
            ctx!.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx!.fillStyle = "rgba(0, 0, 0, 0.1)";
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
      {/* Interactive canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute inset-0 h-full w-full transition-opacity duration-[2000ms]"
        style={{
          opacity: mounted ? 1 : 0,
          transitionTimingFunction: "var(--easing)",
          transitionDelay: "600ms",
        }}
      />

      {/* Content */}
      <div className="relative flex min-h-dvh flex-col justify-center">
        <div className="mx-auto w-full max-w-6xl flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-16">

          {/* Text side */}
          <div className="flex-1">
          {/* Cycling Rams principle — the interactive centrepiece */}
          <div
            className="transition-[opacity,transform] duration-[800ms]"
            style={{
              transitionTimingFunction: "var(--easing)",
              transitionDelay: "1000ms",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <button
              type="button"
              onClick={togglePause}
              className="mt-3 text-left cursor-pointer"
            >
              <span className="block font-[family-name:var(--font-geist)] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-muted)]">
                Good design is
              </span>
              <span
                className="block font-[family-name:var(--font-geist)] text-5xl sm:text-7xl lg:text-[6rem] font-bold tracking-tight text-[var(--text)] transition-all duration-300 mt-1"
                style={{
                  transitionTimingFunction: "var(--easing)",
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? "translateY(10px)" : "translateY(0)",
                }}
              >
                {principles[principleIndex]}.
              </span>
            </button>

          </div>

          {/* Original headline */}
          <div className="mt-16">
            <h1 className="max-w-3xl">
              {words.map((word, i) => (
                <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                  <span
                    className="inline-block font-[family-name:var(--font-geist)] text-2xl sm:text-3xl lg:text-4xl font-medium tracking-normal leading-[1.2] transition-[opacity,transform] duration-[800ms]"
                    style={{
                      transitionTimingFunction: "var(--easing)",
                      transitionDelay: `${1400 + i * 80}ms`,
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(100%)",
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Description */}
          <p
            className="mt-4 max-w-xl text-sm text-[var(--text-muted)] leading-relaxed transition-[opacity,transform] duration-[800ms]"
            style={{
              transitionTimingFunction: "var(--easing)",
              transitionDelay: `${1400 + words.length * 80 + 100}ms`,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {description}
          </p>
          </div>

          {/* Portrait with glitch effect on hover */}
          <div
            className="hidden lg:block lg:shrink-0 transition-[opacity,transform] duration-1000"
            style={{
              transitionTimingFunction: "var(--easing)",
              transitionDelay: "1200ms",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <PortraitGlitch />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000"
        style={{
          opacity: mounted ? 1 : 0,
          transitionDelay: `${1400 + words.length * 80 + 400}ms`,
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

const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01{}[]<>/=;:";

function PortraitGlitch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!hovered) {
      cancelAnimationFrame(animRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 340 * dpr;
    canvas.height = 450 * dpr;
    ctx.scale(dpr, dpr);

    const columns = Math.floor(340 / 14);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -30);

    function draw() {
      ctx!.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx!.fillRect(0, 0, 340, 450);

      ctx!.fillStyle = "rgba(0, 200, 80, 0.6)";
      ctx!.font = "12px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * 14;
        const y = drops[i] * 14;

        if (y > 0) {
          ctx!.fillText(char, x, y);
        }

        if (y > 450 && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.4 + Math.random() * 0.3;
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered]);

  return (
    <div
      className="relative h-[450px] w-[340px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src="/declan.png"
        alt="Declan Malone"
        fill
        className={`object-contain object-top transition-all duration-300 ${hovered ? "brightness-50 contrast-125" : ""}`}
        sizes="340px"
        priority
      />
      {/* Matrix rain overlay */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
        style={{ width: 340, height: 450 }}
      />
    </div>
  );
}
