"use client";

import { useRef, useState } from "react";

export function CaseStudyVideo({
  src,
  label,
}: {
  src: string;
  label?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-[#ebebeb]">
      {label && (
        <p className="label-mono absolute top-4 left-4 z-10">{label}</p>
      )}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onClick={togglePlay}
        className="w-full cursor-pointer"
      />
      {!playing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--text)]/80">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--bg)">
              <path d="M6 4l10 6-10 6V4z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
