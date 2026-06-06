"use client";

import React from "react";

export default function AssetContainer(props: {
  thumbUrl?: string;
  size?: "small" | "big";
  onClick?: () => void;
}) {
  const { thumbUrl, size = "small", onClick } = props;

  return (
    <div
      className={"pix-icon"}
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        overflow: "visible",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt=""
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              imageRendering: "pixelated",
              background: "transparent",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}