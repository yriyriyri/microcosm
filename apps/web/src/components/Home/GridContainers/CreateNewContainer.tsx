"use client";

import React from "react";

export default function CreateNewContainer(props: {
  label?: string;
  onClick?: () => void;
  size?: "small" | "big";
  disabled?: boolean;
}) {
  const {
    onClick,
    size = "small",
    disabled = false,
  } = props;

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
      }}
    >
      <div
        className="floater"
        style={{
          position: "absolute",
          inset: 0,
          ["--floater-ax" as any]: "8px",
          ["--floater-ay" as any]: "6px",
          ["--floater-dur" as any]: "6800ms",
          ["--floater-delay" as any]: "-700ms",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/library/createnew.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: size === "big" ? "24%" : "28%",
              height: size === "big" ? "24%" : "28%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
        </div>
      </div>
    </div>
  );
}