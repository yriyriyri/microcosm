"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { AssetMeta } from "../database/AssetDb";
import { listAssets } from "../database/AssetDb";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";


export default function AssetsPanel(props: {
  open: boolean;
  onClose: () => void;
  onRequestPlace: (assetId: string) => void;
}) {
  const { open, onClose, onRequestPlace } = props;
  const { click } = useSound();

  const [assets, setAssets] = useState<AssetMeta[]>([]);

  const SHOW_THUMBS = false;

  async function refresh() {
    const rows = await listAssets();
    setAssets(rows);
  }

  useEffect(() => {
    if (!open) return;
    refresh().catch(console.error);
  }, [open]);

  const thumbUrls = useMemo(() => {
    const urls = new Map<string, string>();
    for (const a of assets) {
      if (a.thumb) urls.set(a.id, URL.createObjectURL(a.thumb));
    }
    return urls;
  }, [assets]);

  useEffect(() => {
    return () => {
      for (const u of thumbUrls.values()) URL.revokeObjectURL(u);
    };
  }, [thumbUrls]);

  if (!open) return null;

  return (
    <div
      style={{
        width: "min(420px, 92vw)",
        maxHeight: "min(640px, 88vh)",
        overflow: "auto",
  
        background: "rgba(0, 68, 128, 0.30)",
  
        borderRadius: 10,
        padding: 10,
  
        pointerEvents: "auto",
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {assets.map((a) => {
          const url = SHOW_THUMBS ? thumbUrls.get(a.id) : undefined;
  
          return (
            <button
              key={a.id}
              onClick={() => {
                click();
                onRequestPlace(a.id);
              }}
              title={a.name}
              style={{
                appearance: "none",
                border: "none",
                background: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <div
                className="pix-icon"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: 6,
                }}
              >
                {url ? (
                  <img
                    src={url}
                    alt={a.name}
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
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: 10,
                      color: "white",
                      fontSize: 20,
                      lineHeight: 1.1,
                      userSelect: "none",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    {a.name}
                  </div>
                )}
              </div>
            </button>
          );
        })}
  
        {!assets.length && (
          <div style={{ color: "white", opacity: 0.7, fontSize: 14 }}>
            No assets.
          </div>
        )}
      </div>
    </div>
  );
}