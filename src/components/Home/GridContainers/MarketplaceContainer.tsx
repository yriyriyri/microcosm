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
    for (let i = 0; i < entry.weight; i++) weightedPalette.push(entry.colors);
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

function getCreatorFromId(id: string): { username: string; pfp: string } {
  const creators = [
    { username: "bkvoxel", pfp: "/pfp/1.png", weight: 4 },
    { username: "voxoking", pfp: "/pfp/2.png", weight: 2 },
    { username: "maxatrillion", pfp: "/pfp/3.png", weight: 2 },
    { username: "skyBoxer", pfp: "/pfp/4.png", weight: 3 },
    { username: "T4ZM1N", pfp: "/pfp/5.png", weight: 1 },
    { username: "3EAU", pfp: "/pfp/6.png", weight: 1 },
    { username: "_money_", pfp: "/pfp/7.png", weight: 1 },
    { username: "yriyriyri", pfp: "/pfp/8.png", weight: 1 },
  ];

  const weightedCreators: { username: string; pfp: string }[] = [];
  for (const creator of creators) {
    for (let i = 0; i < creator.weight; i++) {
      weightedCreators.push({
        username: creator.username,
        pfp: creator.pfp,
      });
    }
  }

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }

  return weightedCreators[hash % weightedCreators.length];
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

function parseVoxelCount(meta: string): number {
  const digits = meta.replace(/,/g, "").match(/\d+/);
  return digits ? parseInt(digits[0], 10) : 0;
}

function buildTimeFromVoxelCount(voxelCount: number): string {
  if (voxelCount <= 250) return "15 minute build time";
  if (voxelCount <= 700) return "30 minute build time";
  if (voxelCount <= 1400) return "45 minute build time";
  return "60 minute build time";
}

function priceFromVoxelCount(voxelCount: number): number {
  if (voxelCount <= 250) return 100;
  if (voxelCount <= 700) return 250;
  if (voxelCount <= 1400) return 500;
  return 1000;
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
    meta = "",
    alreadyOwned = false,
    isBusy = false,
    onBuy,
    forceTheme,
  } = props;

  const theme = useMemo(
    () => getThemeFromId(assetId, { forceTheme }),
    [assetId, forceTheme]
  );
  const creator = useMemo(() => getCreatorFromId(assetId), [assetId]);
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

  const voxelCount = useMemo(() => parseVoxelCount(meta), [meta]);
  const buildTime = useMemo(() => buildTimeFromVoxelCount(voxelCount), [voxelCount]);
  const price = useMemo(() => priceFromVoxelCount(voxelCount), [voxelCount]);

  const titleSize = size === "big" ? 23 : 15;
  const metaSize = size === "big" ? 11 : 9;
  const bottomBandHeight = size === "big" ? "20%" : "25%";
  const sidePadding = size === "big" ? 14 : 10;
  const statIconSize = size === "big" ? 14 : 12;
  const userIconSize = size === "big" ? 13 : 11;
  const creatorBlockHeight = "90%";
  const pfpStroke = 2;
  const pfpOuterSize = size === "big" ? 56 : 36;
  const buttonHeight = size === "big" ? "50%" : "60%";
  const buttonStroke = 2;
  const priceOpacity = alreadyOwned ? 0.42 : 1;
  const ownedMarkOpacity = alreadyOwned ? 0.6 : 1;
  const priceFontSize = size === "big" ? 18 : 14;
  const byteSize = size === "big" ? 22 : 16;

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
              transform: size === "small" ? "scale(0.7)" : "scale(1)",
              transformOrigin: "center center",
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
          background: hexToRgba(theme.top, 0.3),
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
            marginBottom: 6,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: metaSize,
              opacity: 0.86,
              lineHeight: 1.2,
              minWidth: 0,
            }}
          >
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {meta}
            </span>
            <img
              src="/marketplace/voxel.png"
              alt=""
              style={{
                width: statIconSize,
                height: statIconSize,
                objectFit: "contain",
                imageRendering: "pixelated",
                flexShrink: 0,
                opacity: 0.86,
              }}
            />
          </div>

          {size === "big" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: metaSize,
                opacity: 0.86,
                lineHeight: 1.2,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {buildTime}
              </span>
              <img
                src="/marketplace/hourglass.png"
                alt=""
                style={{
                  width: statIconSize,
                  height: statIconSize,
                  objectFit: "contain",
                  imageRendering: "pixelated",
                  flexShrink: 0,
                  opacity: 0.86,
                }}
              />
            </div>
          )}
        </div>
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
            height: creatorBlockHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              minWidth: 0,
              height: "100%",
            }}
          >
            <div
              style={{
                height: pfpOuterSize,
                aspectRatio: "1 / 1",
                background: "#ffffff",
                padding: pfpStroke,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <img
                src={creator.pfp}
                alt={creator.username}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  imageRendering: "pixelated",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minWidth: 0,
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  minWidth: 0,
                }}
              >
                <img
                  src="/marketplace/user.png"
                  alt=""
                  style={{
                    width: userIconSize,
                    height: userIconSize,
                    objectFit: "contain",
                    imageRendering: "pixelated",
                    flexShrink: 0,
                    opacity: 1,
                  }}
                />
                <span
                  style={{
                    fontSize: metaSize,
                    color: "#ffffff",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {creator.username}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexShrink: 0,
            height: "100%",
            alignItems: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="pix-input"
            disabled={isBusy || alreadyOwned}
            onClick={alreadyOwned ? undefined : onBuy}
            style={{
              appearance: "none",
              border: `${buttonStroke}px solid rgba(255,255,255,${ownedMarkOpacity})`,
              background: "rgba(255,255,255,0.08)",
              color: "white",
              borderRadius: 0,
              height: buttonHeight,
              padding: size === "big" ? "0 10px" : "0 8px",
              cursor: isBusy || alreadyOwned ? "default" : "pointer",
              opacity: isBusy ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: priceOpacity,
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  fontSize: priceFontSize,
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                }}
              >
                {price}
              </span>

              <img
                src="/marketplace/byte.png"
                alt=""
                style={{
                  width: byteSize,
                  height: byteSize,
                  objectFit: "contain",
                  imageRendering: "pixelated",
                  flexShrink: 0,
                  display: "block",
                }}
              />

              {alreadyOwned && (
                <div
                  style={{
                    position: "absolute",
                    left: -2,
                    right: -2,
                    top: "50%",
                    height: 4,
                    background: `rgba(255,255,255)`,
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}