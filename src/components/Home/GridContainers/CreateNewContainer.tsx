"use client";

import React, { useMemo } from "react";

export default function CreateNewContainer(props: {
  label?: string;
  onClick?: () => void;
  size?: "small" | "big";
  disabled?: boolean;
}) {
  const {
    label = "Create New",
    onClick,
    size = "small",
    disabled = false,
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
      onClick={disabled ? undefined : onClick}
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        borderRadius: 8,
        cursor: disabled ? "default" : onClick ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.95)",
        fontSize: 22,
        userSelect: "none",
        overflow: "visible",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {label}
    </div>
  );
}