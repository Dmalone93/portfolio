"use client";

const CONTENT =
  "FIGMA — REACT — TYPESCRIPT — NEXT.JS — SHOPIFY PLUS — TAILWIND CSS — AG GRID — DESIGN SYSTEMS — CRO — USER RESEARCH — PROTOTYPING — CLARITY — A/B TESTING — ";

export function Marquee() {
  return (
    <div
      className="w-full overflow-hidden border-t border-b border-[var(--border)] py-3"
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        <span className="label-mono text-[var(--text-dim)] pr-4">{CONTENT}</span>
        <span className="label-mono text-[var(--text-dim)] pr-4">{CONTENT}</span>
      </div>
    </div>
  );
}
