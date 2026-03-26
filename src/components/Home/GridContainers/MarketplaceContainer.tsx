"use client";

import React, { useMemo } from "react";

function colorFromId(id: string): string {
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

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }

  return palette[hash % palette.length];
}

export default function MarketplaceContainer(props: {
  assetId: string;
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
    size = "small",
    title = "voxbox",
    subtitle = "",
    meta = "",
    footer = "",
    alreadyOwned = false,
    isBusy = false,
    onBuy,
  } = props;

  const bg = useMemo(() => colorFromId(assetId), [assetId]);

  return (
    <div
      className={size === "big" ? "pix-icon-large" : "pix-icon"}
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        borderRadius: 8,
        color: "rgba(255,255,255,0.95)",
        userSelect: "none",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: size === "big" ? 16 : 12,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: size === "big" ? 24 : 18,
            lineHeight: 1.05,
            marginBottom: 6,
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
              fontSize: size === "big" ? 14 : 12,
              opacity: 0.82,
              marginBottom: 6,
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
              fontSize: size === "big" ? 13 : 11,
              opacity: 0.78,
              lineHeight: 1.25,
            }}
          >
            {meta}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 12,
        }}
      >
        <div
          style={{
            fontSize: size === "big" ? 13 : 11,
            opacity: 0.82,
            lineHeight: 1.2,
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
              background: "rgba(255,255,255,0.18)",
              color: "white",
              borderRadius: 4,
              padding: "8px 10px",
              cursor: isBusy || alreadyOwned ? "default" : "pointer",
              opacity: isBusy || alreadyOwned ? 0.7 : 1,
            }}
          >
            {isBusy ? "Buying..." : alreadyOwned ? "Owned" : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}