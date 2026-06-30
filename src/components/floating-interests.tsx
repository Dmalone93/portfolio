"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const interests = [
  { label: "Climbing", image: "/hobbies/climbing.png", top: "8%", left: "82%", size: 140, rotate: 6, delay: 0 },
  { label: "Anime", image: "/hobbies/anime.png", top: "22%", left: "2%", size: 120, rotate: -4, delay: 200 },
  { label: "Netsuke", image: "/hobbies/netsuke.png", top: "42%", left: "85%", size: 130, rotate: 3, delay: 400 },
  { label: "One Piece TCG", image: "/hobbies/onepiece-tcg.png", top: "58%", left: "5%", size: 110, rotate: -6, delay: 600 },
  { label: "Camping", image: "/hobbies/camping.png", top: "75%", left: "78%", size: 160, rotate: 2, delay: 800 },
];

export function FloatingInterests() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 hidden lg:block" aria-hidden="true">
      {interests.map((item) => (
        <FloatingItem key={item.label} {...item} />
      ))}
    </div>
  );
}

function FloatingItem({
  label,
  image,
  top,
  left,
  size,
  rotate,
  delay,
}: {
  label: string;
  image: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parallax on scroll — items drift at different rates
    const speed = 0.03 + Math.random() * 0.04;
    function onScroll() {
      const scrollY = window.scrollY;
      el!.style.transform = `translateY(${scrollY * speed}px) rotate(${rotate}deg)`;
    }

    // Fade in with delay
    setTimeout(() => {
      el!.style.opacity = "1";
      el!.style.transform = `translateY(0px) rotate(${rotate}deg)`;
    }, 1500 + delay);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [rotate, delay]);

  return (
    <div
      ref={ref}
      className="absolute transition-all duration-1000 will-change-transform"
      style={{
        top,
        left,
        width: size,
        height: size,
        opacity: 0,
        transform: `translateY(40px) rotate(${rotate}deg)`,
        transitionTimingFunction: "var(--easing)",
      }}
    >
      <div className="relative h-full w-full drop-shadow-lg">
        <Image
          src={image}
          alt={label}
          fill
          className="object-contain"
          sizes={`${size}px`}
        />
      </div>
    </div>
  );
}
