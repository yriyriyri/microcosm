"use client";

import React, { useEffect, useMemo, useState } from "react";

function gradientFromId(id: string): string {
  const palette: [string, string][] = [
    ["#1f5fff", "#5ea2ff"],
    ["#0f9f6e", "#41d89c"],
    ["#c24a1a", "#ff8a4d"],
    ["#7a2cff", "#b26cff"],
    ["#cc1f5a", "#ff5f93"],
  ];

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }

  const [bottom, top] = palette[hash % palette.length];
  return `linear-gradient(to top, ${bottom} 0%, ${top} 100%)`;
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
        borderRadius: 8,
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
              filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.35))",
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
            textShadow: "0 1px 2px rgba(0,0,0,0.35)",
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
              textShadow: "0 1px 2px rgba(0,0,0,0.35)",
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
              textShadow: "0 1px 2px rgba(0,0,0,0.35)",
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
            textShadow: "0 1px 2px rgba(0,0,0,0.35)",
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
              backdropFilter: "blur(3px)",
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