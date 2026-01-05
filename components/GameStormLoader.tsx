"use client";

import "./loader.css";

export default function GameStormLoader({
  label = "Loading…",
  variant = "circle", // circle | triangle | rect
}: {
  label?: string;
  variant?: "circle" | "triangle" | "rect";
}) {
  return (
    <div className="flex items-center px-4 py-3 rounded-xl bg-black/60 border border-white/10 shadow-lg">

      {variant === "triangle" && (
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72" />
          </svg>
        </div>
      )}

      {variant === "rect" && (
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64" />
          </svg>
        </div>
      )}

      {variant === "circle" && (
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" />
          </svg>
        </div>
      )}

      <span className="text-emerald-300 ml-2 tracking-wide">
        {label}
      </span>
    </div>
  );
}
