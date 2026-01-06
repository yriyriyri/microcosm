"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { AssetMeta } from "../database/AssetDb";
import { deleteAsset, listAssets, renameAsset } from "../database/AssetDb";

export default function AssetsPanel(props: {
  open: boolean;
  onClose: () => void;
  onRequestPlace: (assetId: string) => void;
  onRequestSaveSelected: (name: string) => void;
  selectedGroupId: string | null;
  placingLabel: string | null;
}) {
  const { open, onClose, onRequestPlace, onRequestSaveSelected, selectedGroupId, placingLabel } = props;

  const [assets, setAssets] = useState<AssetMeta[]>([]);
  const [name, setName] = useState("New Asset");

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
        position: "absolute",
        inset: 0,
        zIndex: 5000,
        pointerEvents: "auto",
      }}
      onMouseDown={onClose}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: "min(520px, 95vw)",
          maxHeight: "min(720px, 90vh)",
          overflow: "auto",
          background: "rgba(255,255,255,1)",
          border: "1px solid rgba(0,0,0,1)",
          padding: 14,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 20 }}>Assets</div>
          <div style={{ display: "flex", gap: 10 }}>
            <label style={{ cursor: "pointer" }} onClick={() => refresh().catch(console.error)}>
              Refresh
            </label>
            <label style={{ cursor: "pointer" }} onClick={onClose}>
              Close
            </label>
          </div>
        </div>

        <div style={{ border: "1px solid rgba(0,0,0,1)", padding: 10, marginBottom: 12 }}>
          <div style={{ fontSize: 14, marginBottom: 6, opacity: 0.8 }}>
            Save selected group as asset: <b>{selectedGroupId ?? "(none)"}</b>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              spellCheck={false}
              style={{ flex: 1, padding: "8px 10px", border: "1px solid rgba(0,0,0,1)" }}
            />
            <button
              disabled={!selectedGroupId}
              onClick={() => onRequestSaveSelected(name.trim() || "Asset")}
              style={{ padding: "8px 10px", cursor: selectedGroupId ? "pointer" : "not-allowed" }}
            >
              Save
            </button>
          </div>
          {placingLabel && (
            <div style={{ marginTop: 8, fontSize: 13 }}>
              Placing: <b>{placingLabel}</b> (click in scene to place, Esc to cancel)
            </div>
          )}
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {assets.map((a) => {
            const url = thumbUrls.get(a.id);
            return (
              <div key={a.id} style={{ border: "1px solid rgba(0,0,0,1)", padding: 10 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <div
                    style={{
                      width: 84,
                      height: 84,
                      border: "1px solid rgba(0,0,0,1)",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      flex: "0 0 auto",
                    }}
                  >
                    {url ? <img src={url} style={{ width: "100%", height: "100%", imageRendering: "pixelated" }} /> : <div style={{ fontSize: 12 }}>no thumb</div>}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, marginBottom: 4 }}>
                      <b>{a.name}</b>
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 10 }}>
                      {a.voxelCount.toLocaleString()} voxels
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button onClick={() => onRequestPlace(a.id)} style={{ padding: "6px 10px", cursor: "pointer" }}>
                        Place (click-to-place)
                      </button>

                      <button
                        onClick={async () => {
                          const next = prompt("Rename asset:", a.name);
                          if (!next) return;
                          await renameAsset(a.id, next);
                          await refresh();
                        }}
                        style={{ padding: "6px 10px", cursor: "pointer" }}
                      >
                        Rename
                      </button>

                      <button
                        onClick={async () => {
                          if (!confirm(`Delete "${a.name}"?`)) return;
                          await deleteAsset(a.id);
                          await refresh();
                        }}
                        style={{ padding: "6px 10px", cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {!assets.length && <div style={{ opacity: 0.7 }}>No assets yet.</div>}
        </div>
      </div>
    </div>
  );
}