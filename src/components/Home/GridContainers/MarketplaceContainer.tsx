"use client";

import React, { useEffect, useMemo, useState } from "react";

function gradientFromId(id: string): string {
  const palette = [
    { colors: ["#D74040", "#CD3D3D"] as [string, string], weight: 2 }, // paris
    { colors: ["#FE9501", "#CC5B0D"] as [string, string], weight: 2 }, // dune
    { colors: ["#3790E0", "#1C57BD"] as [string, string], weight: 4 }, // sky
    { colors: ["#A60D55", "#962535"] as [string, string], weight: 1 }, // maya
    { colors: ["#EF87B7", "#D36397"] as [string, string], weight: 1 }, // pink
    { colors: ["#04C48C", "#00A071"] as [string, string], weight: 1 }, // green
    { colors: ["#BA90E3", "#8F68B5"] as [string, string], weight: 1 }, // purple
    // { colors: ["#00DBE2", "#05AEB4"] as [string, string], weight: 1 }, // cyan
    { colors: ["#3495C3", "#04547A"] as [string, string], weight: 1 }, // new blue 2
  ];

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
  return `linear-gradient(to bottom, ${top} 0%, ${bottom} 100%)`;
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
  } = props;

  const bg = useMemo(() => gradientFromId(assetId), [assetId]);
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

  return (
    <div
      className={size === "big" ? "pix-icon-large" : "pix-icon"}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: bg,
        borderRadius: 0,
        color: "rgba(255,255,255,0.96)",
        userSelect: "none",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: size === "big" ? 14 : 10,
      }}
    >
      {thumbUrl && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
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
          inset: 0,
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
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 10,
          marginTop: 10,
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