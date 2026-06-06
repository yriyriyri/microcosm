"use client";

import React, { useEffect, useState } from "react";

export default function LoadingOverlay(props: {
  show: boolean;
  progress: number; 
  text?: string;
  fadeMs?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { show, progress, text, fadeMs = 120, className, style } = props;

  const pct = Math.round(Math.max(0, Math.min(1, progress)) * 100);

  const [mounted, setMounted] = useState(show);

  useEffect(() => {
    if (show) {
      setMounted(true);
      return;
    }

    const t = window.setTimeout(() => setMounted(false), fadeMs);
    return () => window.clearTimeout(t);
  }, [show, fadeMs]);

  if (!mounted) return null;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#368fe4",
        backgroundImage: "url(/world/bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",

        pointerEvents: "none",
        opacity: show ? 1 : 0,
        transition: `opacity ${fadeMs}ms linear`,
        ...style,
      }}
    >
      <div
        style={{
          width: 560,
          maxWidth: "85vw",
          color: "#C7ECFF",
        }}
      >
        <div
          style={{
            height: 15,
            width: "100%",
            background: "rgba(199,236,255,0.18)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: "#C7ECFF",
              transition: "width 120ms ease-out",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 16,
            letterSpacing: "0.08em",
            opacity: 0.9,
            whiteSpace: "nowrap",
            textAlign: "left",
          }}
        >
          {(text ?? "loading…") + " - " + pct + "%"}
        </div>
      </div>
    </div>
  );
}