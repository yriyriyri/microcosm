"use client";

import React from "react";

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

  const textHeight = size === "big" ? 28 : 22;

  return (
    <div
      className={size === "big" ? "pix-icon-large" : "pix-icon"}
      onClick={disabled ? undefined : onClick}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 0,
        cursor: disabled ? "default" : onClick ? "pointer" : "default",
        position: "relative",
        userSelect: "none",
        overflow: "hidden",
        opacity: disabled ? 0.7 : 1,
        background: "#DBFAFF",
        boxShadow: `
        inset 0 0 0 3px rgba(255, 255, 255, 0.15),
        inset 0 0 0 16px rgba(0, 50, 76, 0.05),
        inset -16px -16px 0 0 rgba(0, 50, 76, 0.05)
      `,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `calc(50% - ${textHeight / 2}px)`,
          transform: "translate(-50%, -50%)",
          width: "40%",
          height: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <img
          src="/library/create.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "pixelated",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: size === "big" ? 60 : 40,
          transform: "translateX(-50%)",
          fontSize: size === "big" ? 30 : 20,
          lineHeight: 1.1,
          textAlign: "center",
          color: "#00324c",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}