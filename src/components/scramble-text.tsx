"use client";

import { useRef, useState, useCallback } from "react";

const CHARS = "!@#$%&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef(0);

  const scramble = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current);
    frameRef.current = 0;
    const totalFrames = Math.ceil(400 / 30);

    function tick() {
      const progress = frameRef.current / totalFrames;
      const resolved = Math.floor(progress * text.length);
      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolved) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(scrambled);
      frameRef.current += 1;
      if (frameRef.current <= totalFrames) {
        rafRef.current = setTimeout(tick, 30);
      } else {
        setDisplay(text);
      }
    }

    tick();
  }, [text]);

  const reset = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current);
    setDisplay(text);
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {display}
    </span>
  );
}
