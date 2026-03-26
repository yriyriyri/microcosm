"use client";

import React, { useMemo } from "react";

export default function GamesContainer(props: {
  title?: string;
  subtitle?: string;
  meta?: string;
  footer?: string;
  onClick?: () => void;
  size?: "small" | "big";
}) {
  const {
    title = "Untitled World",
    subtitle = "",
    meta = "",
    footer = "",
    onClick,
    size = "small",
  } = props;

  const bg = useMemo(() => {
    const palette = [
      "#7dd3fc",
      "#86efac",
      "#fca5a5",
      "#fdba74",
      "#c4b5fd",
      "#f9a8d4",
      "#93c5fd",
      "#67e8f9",
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  }, []);

  return (
    <div
      className={size === "big" ? "pix-icon-large" : "pix-icon"}
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        borderRadius: 8,
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "rgba(255,255,255,0.95)",
        userSelect: "none",
        overflow: "visible",
        padding: 14,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: size === "big" ? 24 : 18,
            lineHeight: 1.05,
            marginBottom: 6,
            wordBreak: "break-word",
          }}
        >
          {title}
        </div>

        {!!subtitle && (
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.2,
              opacity: 0.8,
              marginBottom: 8,
              wordBreak: "break-word",
            }}
          >
            {subtitle}
          </div>
        )}

        {!!meta && (
          <div
            style={{
              fontSize: 12,
              lineHeight: 1.3,
              opacity: 0.75,
              wordBreak: "break-word",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: size === "big" ? 5 : 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {meta}
          </div>
        )}
      </div>

      {!!footer && (
        <div
          style={{
            fontSize: 12,
            lineHeight: 1.2,
            opacity: 0.8,
            marginTop: 12,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}