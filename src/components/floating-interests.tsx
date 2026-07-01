"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MacWindow } from "@/components/mac-window";

const interests = [
  { label: "Anime", image: "/hobbies/anime.png", note: "Berserk taught me more about persistence and craft than any design book. Miura drew for 30 years and never compromised.", top: "3%", left: "2%", size: 220, mobileSize: 100, rotate: -8, delay: 0 },
  { label: "One Piece TCG", image: "/hobbies/onepiece-tcg.png", note: "Collector and player. Built MyTCG because no tool existed for tracking a collection properly. Scratch your own itch.", top: "48%", left: "0%", size: 160, mobileSize: 70, rotate: 5, delay: 200 },
  { label: "Climbing", image: "/hobbies/climbing.png", note: "Problem-solving with your body. Every route is a design challenge — read it, plan it, execute it.", top: "0%", left: "30%", size: 160, mobileSize: 70, rotate: 10, delay: 100 },
  { label: "Netsuke", image: "/hobbies/netsuke.png", note: "Tiny carved objects from Edo-era Japan. Incredible detail at miniature scale — proof that constraints breed the best work.", top: "72%", left: "22%", size: 120, mobileSize: 55, rotate: -3, delay: 400 },
  { label: "Tent life", image: "/hobbies/tent.png", note: "Setting up camp, disconnecting from screens, reconnecting with the basics. The best ideas come when you stop trying.", top: "2%", left: "62%", size: 280, mobileSize: 110, rotate: 3, delay: 300 },
  { label: "Coffee", image: "/hobbies/coffee.png", note: "Aeropress ritual. The process matters as much as the result — measure, pour, press. Design thinking in a cup.", top: "55%", left: "68%", size: 140, mobileSize: 60, rotate: -5, delay: 500 },
  { label: "Trees", image: "/hobbies/trees.png", note: "There's something about old trees. Standing in one place for hundreds of years, adapting to everything. Quiet resilience.", top: "65%", left: "45%", size: 180, mobileSize: 75, rotate: 2, delay: 600 },
  { label: "Mushroom foraging", image: "/hobbies/mushrooms.png", note: "Chanterelles in the Scottish Highlands. You have to slow down and really look — same skill as user research.", top: "60%", left: "80%", size: 170, mobileSize: 70, rotate: -6, delay: 700 },
];

export function FloatingInterests() {
  const [openWindow, setOpenWindow] = useState<string | null>(null);
  const activeInterest = interests.find((i) => i.label === openWindow);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
        {interests.map((item) => (
          <FloatingItem key={item.label} {...item} onOpen={() => setOpenWindow(item.label)} />
        ))}
      </div>

      {activeInterest && (
        <MacWindow title={activeInterest.label} onClose={() => setOpenWindow(null)}>
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-48 w-48">
              <Image
                src={activeInterest.image}
                alt={activeInterest.label}
                fill
                className="object-contain"
                sizes="192px"
              />
            </div>
            <div className="text-center max-w-md">
              <h3 className="text-lg font-semibold text-[var(--text)]">{activeInterest.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{activeInterest.note}</p>
            </div>
          </div>
        </MacWindow>
      )}
    </>
  );
}

function FloatingItem({
  label,
  image,
  top,
  left,
  size,
  mobileSize,
  rotate,
  delay,
  onOpen,
}: {
  label: string;
  image: string;
  note: string;
  top: string;
  left: string;
  size: number;
  mobileSize: number;
  rotate: number;
  delay: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const timer = setTimeout(() => setVisible(true), 1500 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const displaySize = isMobile ? mobileSize : size;

  return (
    <div
      ref={ref}
      className="absolute pointer-events-auto cursor-pointer transition-opacity duration-1000"
      style={{
        top,
        left,
        width: displaySize,
        height: displaySize,
        opacity: visible ? 1 : 0,
        ["--rotate" as string]: `${rotate}deg`,
        transform: `rotate(${rotate}deg)`,
      }}
      onClick={onOpen}
    >
      <div
        className="relative h-full w-full drop-shadow-lg hover:animate-[wiggle_400ms_var(--easing)]"
      >
        <Image
          src={image}
          alt={label}
          fill
          className="object-contain"
          sizes={`${displaySize}px`}
        />
      </div>
    </div>
  );
}
