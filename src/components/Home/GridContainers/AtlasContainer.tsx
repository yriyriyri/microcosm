"use client";

import React, { useEffect, useMemo, useState } from "react";

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
  gridGap?: number;
  expanded?: boolean;
  overlayZ?: number;
  onToggleExpand?: () => void;
}) {
  const {
    title = "Untitled World",
    subtitle = "",
    meta = "",
    footer = "",
    onClick,
    size = "small",
    gridGap = 0,
    expanded = false,
    overlayZ = 0,
    onToggleExpand,
  } = props;

  const [overlayMounted, setOverlayMounted] = useState(expanded);
  const [overlayVisible, setOverlayVisible] = useState(expanded);
  const seed = `${title}|${subtitle}|${meta}|${footer}`;
  const bgImage = useMemo(() => backgroundImageFromSeed(seed), [seed]);
  const floaterVars = useMemo(() => floaterVarsFromSeed(seed), [seed]);
  
  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    let timeoutId = 0;
  
    if (expanded) {
      setOverlayMounted(true);
      setOverlayVisible(false);
  
      raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(() => {
          const el = document.getElementById(`atlas-overlay-${seed}`);
          if (el) {
            void el.getBoundingClientRect();
          }
          setOverlayVisible(true);
        });
      });
    } else {
      setOverlayVisible(false);
      timeoutId = window.setTimeout(() => {
        setOverlayMounted(false);
      }, 220);
    }
  
    return () => {
      if (raf1) window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [expanded, seed]);

  const cellClassName = size === "big" ? "pix-icon-large" : "pix-icon";

  const nameBoxHeight = size === "big" ? 42 : 34;
  const expandBoxSize = nameBoxHeight;
  const rowGap = 6;
  const fontSize = size === "big" ? 22 : 14;
  const borderRadius = 4;
  const nameWidth = "83%";
  const expandGap = 30;
  const expandVisualScale = 2.0;

  const collapsedWidth = "100%";
  const expandedWidth = `calc(200% + ${gridGap * 2}px)`;
  const overlayHeight = `calc(100% + ${gridGap}px)`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        userSelect: "none",
        zIndex: overlayZ > 0 ? 1000 + overlayZ : 0,
      }}
    >
      {overlayMounted && (
        <div
          id={`atlas-overlay-${seed}`}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: overlayVisible ? expandedWidth : collapsedWidth,
            height: overlayHeight,
            background: "#F4FCFF",
            borderRadius: 6,
            zIndex: 1,
            pointerEvents: overlayVisible ? "auto" : "none",
            opacity: overlayVisible ? 1 : 0,
            transition:
              "width 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 120ms ease-out",
            willChange: "width, opacity",
          }}
        />
      )}

      <div
        className={cellClassName}
        onClick={onClick}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          cursor: onClick ? "pointer" : "default",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <div className="floater" style={floaterVars}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              imageRendering: "pixelated",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: overlayVisible ? "brightness(0.3)" : "brightness(1)",
                transition: "filter 180ms ease-out",
                willChange: "filter",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                opacity: overlayVisible ? 1.0 : 0,
                transition: "opacity 180ms ease-out",
                willChange: "opacity",
                transform: "translateX(2%)",
              }}
            >
              <img
                src="/atlas/play.png"
                alt="Play"
                style={{
                  width: size === "big" ? "50%" : "45%",
                  height: size === "big" ? "50%" : "43%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>
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
              zIndex: 3,
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
              onToggleExpand?.();
            }}
            style={{
              appearance: "none",
              border: "none",
              background: "transparent",
              outline: "none",
              boxShadow: "none",
              WebkitTapHighlightColor: "transparent",
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
              zIndex: 0,
            }}
            aria-label="Expand"
          >
            <img
              src="/atlas/expand.png"
              alt="Expand"
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