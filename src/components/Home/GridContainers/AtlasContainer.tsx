"use client";

import React, { useMemo } from "react";

function backgroundImageFromSeed(seed: string): string {
  const backgrounds = [
    "/library/1.png",
    "/library/2.png",
    "/library/3.png",
    "/library/4.png",
  ];

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return backgrounds[hash % backgrounds.length];
}

function floaterVarsFromSeed(seed: string): React.CSSProperties {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  const ax = 6 + (hash % 5);
  const ay = 5 + ((hash >> 3) % 5);
  const dur = 5900 + ((hash >> 6) % 2500);
  const delay = -((hash >> 10) % 1800);

  return {
    ["--floater-ax" as any]: `${ax}px`,
    ["--floater-ay" as any]: `${ay}px`,
    ["--floater-dur" as any]: `${dur}ms`,
    ["--floater-delay" as any]: `${delay}ms`,
  };
}

export default function AtlasContainer(props: {
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

  const seed = `${title}|${subtitle}|${meta}|${footer}`;
  const bgImage = useMemo(() => backgroundImageFromSeed(seed), [seed]);
  const floaterVars = useMemo(() => floaterVarsFromSeed(seed), [seed]);

  const cellClassName = size === "big" ? "pix-icon-large" : "pix-icon";

  const nameBoxHeight = size === "big" ? 42 : 34;
  const expandBoxSize = nameBoxHeight;
  const rowGap = 6;
  const fontSize = size === "big" ? 22 : 14;
  const borderRadius = 4;
  const nameWidth = "83%";
  const expandGap = 30;
  const expandVisualScale = 2.0;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        userSelect: "none",
      }}
    >
      <div
        className={cellClassName}
        onClick={onClick}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          cursor: onClick ? "pointer" : "default",
          overflow: "hidden",
        }}
      >
        <div className="floater" style={floaterVars}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "100%",
          marginTop: rowGap,
          height: nameBoxHeight,
          pointerEvents: "auto",
          overflow: "visible",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: nameWidth,
            height: "100%",
            overflow: "visible",
          }}
        >
          <div
            className="pix-icon"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: "var(--homepage-dark)",
              borderRadius,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px 8px",
              boxSizing: "border-box",
              overflow: "visible",
            }}
          >
            <div
              style={{
                width: "100%",
                color: "var(--homepage-light)",
                fontSize,
                lineHeight: 1.05,
                textAlign: "center",
                padding: "4px 6px",
                boxSizing: "border-box",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </div>
          </div>

          <button
            className="pix-icon-small"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              appearance: "none",
              border: "none",
              background: "transparent",
              position: "absolute",
              left: "100%",
              top: 0,
              marginLeft: expandGap,
              width: expandBoxSize,
              height: expandBoxSize,
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
            aria-label="Delete"
          >
            <img
              src="/atlas/expand.png"
              alt="Delete"
              style={{
                width: `${expandVisualScale * 100}%`,
                height: `${expandVisualScale * 100}%`,
                objectFit: "contain",
                imageRendering: "pixelated",
                display: "block",
                pointerEvents: "none",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}