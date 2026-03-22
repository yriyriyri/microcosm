"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { AssetMetaRecord } from "../domain/assetTypes";
import { assetRepository } from "../repositories";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";

export default function MarketplacePanel(props: {
  open: boolean;
  onClose: () => void;
}) {
  const { open, onClose } = props;
  const { click } = useSound();

  const [assets, setAssets] = useState<AssetMetaRecord[]>([]);

  async function refresh() {
    const rows = await assetRepository.listMarketplaceAssets();
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
          gap: 10,
        }}
      >
        {assets.map((a) => {
          const url = thumbUrls.get(a.id);
          const alreadyInLibrary = !!a.inLibrary;

          return (
            <div
              key={a.id}
              className="pix-icon"
              style={{
                width: "100%",
                minHeight: 84,
                borderRadius: 6,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 10,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  flex: "0 0 auto",
                  overflow: "hidden",
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                      color: "white",
                      fontSize: 11,
                      textAlign: "center",
                      padding: 6,
                    }}
                  >
                    no thumb
                  </div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: "white",
                    fontSize: 16,
                    lineHeight: 1.1,
                    marginBottom: 4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.name}
                </div>

                <div
                  style={{
                    color: "white",
                    opacity: 0.7,
                    fontSize: 12,
                    lineHeight: 1.2,
                  }}
                >
                  {a.visibility} • {a.voxelCount.toLocaleString()} voxels
                </div>

                <div
                  style={{
                    color: "white",
                    opacity: 0.8,
                    fontSize: 11,
                    marginTop: 6,
                  }}
                >
                  {alreadyInLibrary ? "Already in your library" : "Available to add"}
                </div>
              </div>

              <button
                disabled={alreadyInLibrary}
                onClick={async () => {
                  click();
                  await assetRepository.addAssetToLibrary(a.id);
                  await refresh();
                }}
                style={{
                  appearance: "none",
                  border: "none",
                  cursor: alreadyInLibrary ? "default" : "pointer",
                  padding: "8px 10px",
                  borderRadius: 4,
                  opacity: alreadyInLibrary ? 0.5 : 1,
                }}
              >
                {alreadyInLibrary ? "Added" : "Add"}
              </button>
            </div>
          );
        })}

        {!assets.length && (
          <div style={{ color: "white", opacity: 0.7, fontSize: 14 }}>
            No marketplace assets.
          </div>
        )}
      </div>
    </div>
  );
}