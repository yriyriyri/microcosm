"use client";

import React, { useEffect, useMemo, useState } from "react";
import { assetRepository } from "@/components/VoxelEditor/repositories";

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

function pfpFromUserId(userId: string): string {
  const pfps = [
    "/pfp/1.png",
    "/pfp/2.png",
    "/pfp/3.png",
    "/pfp/4.png",
    "/pfp/5.png",
    "/pfp/6.png",
    "/pfp/7.png",
    "/pfp/8.png",
  ];

  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash * 31 + userId.charCodeAt(i)) >>> 0;
  }

  return pfps[hash % pfps.length];
}

function parseVoxelCountFromFooter(footer: string): string {
  const match = footer.match(/[\d,]+/);
  return match ? match[0] : "0";
}

function formatCreatedAt(createdAt: number): string {
  if (!createdAt) return "unknown";

  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return "unknown";

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function AtlasContainer(props: {
  title?: string;
  subtitle?: string;
  meta?: string;
  footer?: string;
  publisherUserId?: string;
  publisherUsername?: string;
  createdAt?: number;
  assetNames?: string[];
  assetIds?: string[];
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
    publisherUserId = "",
    publisherUsername = "unknown user",
    createdAt = 0,
    assetNames = [],
    assetIds = [],
    onClick,
    size = "small",
    gridGap = 0,
    expanded = false,
    overlayZ = 0,
    onToggleExpand,
  } = props;

  const [overlayMounted, setOverlayMounted] = useState(expanded);
  const [overlayVisible, setOverlayVisible] = useState(expanded);
  const [thumbUrlsByAssetId, setThumbUrlsByAssetId] = useState<Record<string, string>>({});

  const seed = `${title}|${subtitle}|${meta}|${footer}`;
  const bgImage = useMemo(() => backgroundImageFromSeed(seed), [seed]);
  const floaterVars = useMemo(() => floaterVarsFromSeed(seed), [seed]);
  const publisherPfp = useMemo(
    () => pfpFromUserId(publisherUserId || publisherUsername),
    [publisherUserId, publisherUsername]
  );
  const createdAtLabel = useMemo(() => formatCreatedAt(createdAt), [createdAt]);
  const voxelCountLabel = useMemo(
    () => `${parseVoxelCountFromFooter(footer)} voxels`,
    [footer]
  );

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
          if (el) void el.getBoundingClientRect();
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

  useEffect(() => {
    let cancelled = false;
    const urlsToRevoke: string[] = [];

    async function loadThumbs() {
      if (!assetIds.length) {
        setThumbUrlsByAssetId({});
        return;
      }

      const uniqueAssetIds = Array.from(new Set(assetIds.filter(Boolean)));
      const entries = await Promise.all(
        uniqueAssetIds.map(async (assetId) => {
          try {
            const meta = await assetRepository.getAssetMeta(assetId);
            if (meta?.thumb) {
              const url = URL.createObjectURL(meta.thumb);
              urlsToRevoke.push(url);
              return [assetId, url] as const;
            }
          } catch (err) {
            console.error("Failed to load asset thumbnail", assetId, err);
          }
          return [assetId, ""] as const;
        })
      );

      if (cancelled) {
        for (const url of urlsToRevoke) URL.revokeObjectURL(url);
        return;
      }

      const next: Record<string, string> = {};
      for (const [assetId, url] of entries) {
        if (url) next[assetId] = url;
      }
      setThumbUrlsByAssetId(next);
    }

    loadThumbs();

    return () => {
      cancelled = true;
      for (const url of urlsToRevoke) URL.revokeObjectURL(url);
    };
  }, [assetIds]);

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
  const profileWidth = "70%";
  const usernameFontSize = size === "big" ? 20 : 18;
  const metaFontSize = size === "big" ? 12 : 10;
  const closeIconScale = expandVisualScale;

  const assetTiles = useMemo(() => {
    if (!assetNames.length) {
      return [{ name: "No assets", assetId: "" }];
    }
    return assetNames.map((name, i) => ({
      name,
      assetId: assetIds[i] ?? "",
    }));
  }, [assetNames, assetIds]);

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
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `calc((100% - ${gridGap * 2}px) / 2)`,
              top: 0,
              width: `calc(50% + ${gridGap}px)`,
              height: "100%",
              paddingTop: 16,
              paddingBottom: 16,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                gap: 0,
              }}
            >
              <div
                style={{
                  width: "70%",
                  height: "100%",
                  background: "#E3F2F8",
                  borderRadius: 6,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "13%",
                    minHeight: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--homepage-dark)",
                    fontSize: 25,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  assets
                </div>

                <div
                  style={{
                    height: "87%",
                    minHeight: 0,
                    flexShrink: 0,
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      minHeight: "100%",
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gridAutoRows: "50%",
                      gap: 0,
                    }}
                  >
                    {assetTiles.map((asset, i) => {
                      const thumbUrl = asset.assetId ? thumbUrlsByAssetId[asset.assetId] : "";
                      const countMatch = asset.name.match(/\s*x\s*(\d+)$/i);
                      const assetCount = countMatch ? countMatch[1] : "1";
                      const displayName = asset.name.replace(/\s*x\s*\d+$/i, "");

                      return (
                        <div
                          key={`${asset.assetId || asset.name}-${i}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            boxSizing: "border-box",
                            overflow: "hidden",
                            position: "relative",
                            marginRight: "-20px",
                            marginTop: "-20px",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: 8,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "var(--homepage-dark)",
                              fontSize: 15,
                              lineHeight: 1,
                              whiteSpace: "nowrap",
                              pointerEvents: "none",
                              zIndex: 2,
                            }}
                          >
                            x{assetCount}
                          </div>

                          {thumbUrl ? (
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                height: "100%",
                                aspectRatio: "1 / 1",
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={thumbUrl}
                                alt={asset.name}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  height: "100%",
                                  width: "auto",
                                  objectFit: "contain",
                                  imageRendering: "pixelated",
                                  display: "block",
                                }}
                              />

                              <div
                                style={{
                                  position: "relative",
                                  marginBottom: 0,
                                  maxWidth: "90%",
                                  color: "var(--homepage-dark)",
                                  fontSize: 12,
                                  lineHeight: 1,
                                  textAlign: "center",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  pointerEvents: "none",
                                }}
                              >
                                {displayName}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "30%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingTop: 0,
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: profileWidth,
                    marginTop: 2,
                    aspectRatio: "1 / 1",
                    border: "2px solid var(--homepage-dark)",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={publisherPfp}
                    alt={publisherUsername}
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
                    width: profileWidth,
                    marginTop: 8,
                    color: "var(--homepage-dark)",
                    textAlign: "center",
                    lineHeight: 1.05,
                    fontSize: usernameFontSize,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {publisherUsername}
                </div>

                <div
                  style={{
                    width: "100%",
                    marginTop: 8,
                    color: "rgba(32, 41, 61, 0.8)",
                    textAlign: "center",
                    lineHeight: 1.15,
                    fontSize: metaFontSize,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  created: {createdAtLabel}
                </div>

                <div
                  style={{
                    width: "100%",
                    marginTop: 4,
                    color: "rgba(32, 41, 61, 0.8)",
                    textAlign: "center",
                    lineHeight: 1.15,
                    fontSize: metaFontSize,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {voxelCountLabel}
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
                    marginTop: "auto",
                    marginBottom: 15,
                    width: expandBoxSize,
                    height: expandBoxSize,
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible",
                    flexShrink: 0,
                  }}
                  aria-label="Close"
                >
                  <img
                    src="/library/delete.png"
                    alt="Close"
                    style={{
                      width: `${closeIconScale * 100}%`,
                      height: `${closeIconScale * 100}%`,
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
        </div>
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
                opacity: overlayVisible ? 1 : 0,
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