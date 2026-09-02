"use client";

import { useEffect, useState } from "react";

// Floating light/dark switch. The theme lives as data-theme on <html>
// (see globals.css) and is persisted to localStorage; a small inline script in
// the document applies the saved choice before paint to avoid a flash. Default
// is dark, while a saved light preference is respected on future visits.
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const root = document.documentElement;
    root.setAttribute("data-theme", next ? "dark" : "light");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const label = `Switch to ${dark ? "light" : "dark"} mode`;

  return (
    <button
      type="button"
      className="themeToggle"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={mounted ? dark : undefined}
    >
      {dark ? (
        // Sun (currently dark → click for light)
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      ) : (
        // Moon (currently light → click for dark)
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
