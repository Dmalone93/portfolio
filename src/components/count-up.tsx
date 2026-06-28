"use client";

import { useEffect, useRef, useState } from "react";

function parseStatValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
} | null {
  const match = value.match(/^([^0-9]*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function CountUp({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parsed = parseStatValue(value);
    if (!parsed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(el);

          const duration = 1000;
          const start = performance.now();
          const isInteger = Number.isInteger(parsed.number);

          function animate(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * parsed!.number;

            setDisplayed(
              `${parsed!.prefix}${isInteger ? Math.round(current) : current.toFixed(1)}${parsed!.suffix}`
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayed(value);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{displayed}</span>;
}
