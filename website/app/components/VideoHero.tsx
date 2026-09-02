"use client";

import { useEffect, useRef } from "react";

// Decorative autoplaying hero video: muted + looping + no controls, and
// playsInline so iOS plays it in place rather than fullscreen. Honors
// prefers-reduced-motion by pausing on the poster frame for those users.
export function VideoHero() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduce.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    apply();
    reduce.addEventListener?.("change", apply);
    return () => reduce.removeEventListener?.("change", apply);
  }, []);

  return (
    <div className="heroVideo">
      <video
        ref={ref}
        className="heroVideoEl"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/media/hero.webm" type="video/webm" />
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
