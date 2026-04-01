"use client";

import React, { useEffect, useMemo, useState } from "react";

function getThemeFromId(
  id: string,
  opts?: { forceTheme?: "sky" }
): { gradient: string; top: string; bottom: string } {
  const palette = [
    { key: "paris", colors: ["#F75050", "#B72828"] as [string, string], weight: 2 },
    { key: "dune", colors: ["#FE9501", "#CC5B0D"] as [string, string], weight: 2 },
    { key: "sky", colors: ["#3790E0", "#1C57BD"] as [string, string], weight: 4 },
    { key: "maya", colors: ["#BE1062", "#962535"] as [string, string], weight: 1 },
    { key: "pink", colors: ["#EF87B7", "#D36397"] as [string, string], weight: 1 },
    { key: "green", colors: ["#04C48C", "#00A071"] as [string, string], weight: 1 },
    { key: "purple", colors: ["#BA90E3", "#8F68B5"] as [string, string], weight: 1 },
  ];

  if (opts?.forceTheme) {
    const forced = palette.find((p) => p.key === opts.forceTheme);
    if (forced) {
      const [top, bottom] = forced.colors;
      return {
        top,
        bottom,
        gradient: `linear-gradient(to bottom, ${top} 0%, ${bottom} 100%)`,
      };
    }
  }

  const weightedPalette: [string, string][] = [];
  for (const entry of palette) {
    for (let i = 0; i < entry.weight; i++) {
      weightedPalette.push(entry.colors);
    }
  }

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }

  const [top, bottom] = weightedPalette[hash % weightedPalette.length];
  return {
    top,
    bottom,
    gradient: `linear-gradient(to bottom, ${top} 0%, ${bottom} 100%)`,
  };
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const value =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean;

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function MarketplaceContainer(props: {
  assetId: string;
  thumbBlob?: Blob | null;
  size?: "small" | "big";
  title?: string;
  subtitle?: string;
  meta?: string;
  footer?: string;
  alreadyOwned?: boolean;
  isBusy?: boolean;
  onBuy?: () => void;
  forceTheme?: "sky";
}) {
  const {
    assetId,
    thumbBlob = null,
    size = "small",
    title = "voxbox",
    subtitle = "",
    meta = "",
    footer = "",
    alreadyOwned = false,
    isBusy = false,
    onBuy,
    forceTheme,
  } = props;

  const theme = useMemo(
    () => getThemeFromId(assetId, { forceTheme }),
    [assetId, forceTheme]
  );
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!thumbBlob) {
      setThumbUrl(null);
      return;
    }

    const url = URL.createObjectURL(thumbBlob);
    setThumbUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [thumbBlob]);

  const titleSize = size === "big" ? 20 : 15;
  const subtitleSize = size === "big" ? 12 : 10;
  const metaSize = size === "big" ? 11 : 10;
  const footerSize = size === "big" ? 11 : 10;
  const bottomBandHeight = size === "big" ? "15%" : "20%";
  const sidePadding = size === "big" ? 14 : 10;

  return (
    <div
      className={size === "big" ? "pix-icon-large" : "pix-icon"}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: theme.gradient,
        borderRadius: 0,
        color: "rgba(255,255,255,0.96)",
        userSelect: "none",
        overflow: "hidden",
        padding: size === "big" ? 14 : 10,
        boxSizing: "border-box",
      }}
    >
      {thumbUrl && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: size === "big" ? 18 : 14,
          }}
        >
          <img
            src={thumbUrl}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              opacity: 0.95,
              filter: "drop-shadow(0 8px 14px rgba(255,0,0,0.1))",
            }}
          />
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: bottomBandHeight,
          background: hexToRgba(theme.top, 0.5),
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontSize: titleSize,
            lineHeight: 1.02,
            marginBottom: 4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>

        {!!subtitle && (
          <div
            style={{
              fontSize: subtitleSize,
              opacity: 0.84,
              marginBottom: 4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {subtitle}
          </div>
        )}

        {!!meta && (
          <div
            style={{
              fontSize: metaSize,
              opacity: 0.8,
              lineHeight: 1.2,
            }}
          >
            {meta}
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          left: sidePadding,
          right: sidePadding,
          bottom: 0,
          height: bottomBandHeight,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div
          style={{
            fontSize: footerSize,
            opacity: 0.84,
            lineHeight: 1.15,
            minWidth: 0,
          }}
        >
          {footer}
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexShrink: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="pix-input"
            disabled={isBusy || alreadyOwned}
            onClick={alreadyOwned ? undefined : onBuy}
            style={{
              appearance: "none",
              border: "none",
              background: "rgba(255,255,255,0.16)",
              color: "white",
              borderRadius: 4,
              padding: size === "big" ? "7px 10px" : "6px 9px",
              cursor: isBusy || alreadyOwned ? "default" : "pointer",
              opacity: isBusy || alreadyOwned ? 0.7 : 1,
              fontSize: size === "big" ? 12 : 11,
            }}
          >
            {isBusy ? "Buying..." : alreadyOwned ? "Owned" : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}