"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { AssetMeta } from "../database/AssetDb";
import { deleteAsset, deleteAllAssets, listAssets, loadAsset, renameAsset, exportAssetToFiles } from "../database/AssetDb";
import JSZip from "jszip";

export default function AdminAssetsPanel(props: {
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

  function slugify(s: string) {
    return s
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  
  async function exportAllAsPresetZip() {
    const metas = await listAssets();
    if (!metas.length) {
      alert("No assets to export.");
      return;
    }
  
    const zip = new JSZip();
  
    const manifest: {
      version: number;
      presets: { id: string; name: string; json: string; thumb?: string }[];
    } = { version: 1, presets: [] };
  
    const assetsFolder = zip.folder("presets/assets")!;
    const thumbsFolder = zip.folder("presets/thumbs")!;
  
    const usedSlug = new Map<string, number>();
    const uniqueSlug = (name: string) => {
      const base0 = slugify(name) || "asset";
      const n = usedSlug.get(base0) ?? 0;
      usedSlug.set(base0, n + 1);
      return n === 0 ? base0 : `${base0}-${n + 1}`;
    };
  
    for (const m of metas) {
      const loaded = await loadAsset(m.id);
      if (!loaded) continue;
  
      const slug = uniqueSlug(loaded.meta.name);
      const id = `preset_${slug}`;
  
      const jsonName = `${slug}.json`;
      const pngName = `${slug}.png`;
  
      assetsFolder.file(jsonName, JSON.stringify(loaded.group, null, 2));
  
      if (loaded.meta.thumb) {
        const buf = await loaded.meta.thumb.arrayBuffer();
        thumbsFolder.file(pngName, buf);
      }
  
      manifest.presets.push({
        id,
        name: loaded.meta.name,
        json: `/presets/assets/${jsonName}`,
        ...(loaded.meta.thumb ? { thumb: `/presets/thumbs/${pngName}` } : {}),
      });
    }
  
    zip.file("presets/manifest.json", JSON.stringify(manifest, null, 2));
  
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "voxel-presets.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

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
            <label style={{ cursor: "pointer" }} onClick={() => exportAllAsPresetZip().catch(console.error)}>
              Export all
            </label>
            <label style={{ cursor: "pointer", color: "#b00020" }} onClick={async () => {await deleteAllAssets();}}>
              Delete all
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

                      <button
                        onClick={async () => {
                          try {
                            await exportAssetToFiles(a.id);
                          } catch (e) {
                            console.error(e);
                            alert(e instanceof Error ? e.message : "Export failed");
                          }
                        }}
                        style={{ padding: "6px 10px", cursor: "pointer" }}
                      >
                        Export (json + png)
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