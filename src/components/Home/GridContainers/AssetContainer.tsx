"use client";

import React, { useMemo } from "react";

export default function AssetContainer(props: {
  name: string;
  voxelCount: number;
  thumbUrl?: string;
  size?: "small" | "big";
  onClick?: () => void;
}) {
  const { name, voxelCount, thumbUrl, size = "small", onClick } = props;

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
        padding: 10,
        gap: 8,
      }}
    >
      <div
        style={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          borderRadius: 6,
          overflow: "hidden",
          background: "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt={name}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              imageRendering: "pixelated",
            }}
          />
        ) : (
          <div
            style={{
              color: "white",
              fontSize: 11,
              textAlign: "center",
              padding: 6,
              opacity: 0.8,
            }}
          >
            no thumb
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            fontSize: size === "big" ? 18 : 14,
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </div>

        <div
          style={{
            fontSize: size === "big" ? 13 : 11,
            opacity: 0.78,
            lineHeight: 1.1,
          }}
        >
          {voxelCount.toLocaleString()} voxels
        </div>
      </div>
    </div>
  );
}