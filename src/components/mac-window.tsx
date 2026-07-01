"use client";

import { type ReactNode } from "react";

export function MacWindow({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Window */}
      <div
        className="relative w-full max-w-2xl max-h-[80vh] rounded-xl bg-white shadow-2xl overflow-hidden animate-[scaleIn_300ms_var(--easing)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[#f6f6f6] px-4 py-3">
          {/* Traffic lights */}
          <button
            type="button"
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all"
            aria-label="Close"
          />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-[var(--text-muted)] font-[family-name:var(--font-mono)] uppercase tracking-wider">
            {title}
          </span>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 max-h-[calc(80vh-48px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
