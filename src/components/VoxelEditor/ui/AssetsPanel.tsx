"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { AssetMetaRecord } from "../domain/assetTypes";
import { assetRepository } from "../repositories";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";

export default function AssetsPanel(props: {
  open: boolean;
  onClose: () => void;
  onRequestPlace: (assetId: string) => void;
}) {
  const { open, onClose, onRequestPlace } = props;
  const { click } = useSound();

  const [assets, setAssets] = useState<AssetMetaRecord[]>([]);
  const [draftNames, setDraftNames] = useState<Record<string, string>>({});
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function refresh() {
    const rows = await assetRepository.listLibraryAssets();
    setAssets(rows);
    setDraftNames((prev) => {
      const next = { ...prev };
      for (const a of rows) {
        if (next[a.id] == null) next[a.id] = a.name;
      }
      return next;
    });
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

  async function commitRename(asset: AssetMetaRecord) {
    const raw = draftNames[asset.id] ?? asset.name;
    const nextName = raw.trim();

    if (!nextName || nextName === asset.name) {
      setDraftNames((prev) => ({ ...prev, [asset.id]: asset.name }));
      setRenamingId((cur) => (cur === asset.id ? null : cur));
      return;
    }

    try {
      setBusyId(asset.id);
      await assetRepository.renameAsset(asset.id, nextName);
      await refresh();
    } catch (err) {
      console.error(err);
      setDraftNames((prev) => ({ ...prev, [asset.id]: asset.name }));
      alert(err instanceof Error ? err.message : "Rename failed");
    } finally {
      setBusyId(null);
      setRenamingId((cur) => (cur === asset.id ? null : cur));
    }
  }

  async function handleDelete(asset: AssetMetaRecord) {
    try {
      setBusyId(asset.id);
      await assetRepository.deleteAsset(asset.id);
      await refresh();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  async function handlePublish(asset: AssetMetaRecord) {
    try {
      setBusyId(asset.id);
      await assetRepository.publishAssetToMarketplace(asset.id);
      await refresh();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setBusyId(null);
    }
  }

  if (!open) return null;

  return (
    <div
      style={{
        width: "min(460px, 92vw)",
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
          const isBusy = busyId === a.id;
          const canPublish = a.visibility === "private" && !a.isImmutable;

          return (
            <div
              key={a.id}
              className="pix-icon"
              style={{
                width: "100%",
                minHeight: 96,
                borderRadius: 6,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 10,
              }}
            >
              <div
                onClick={() => {
                  if (isBusy) return;
                  click();
                  onRequestPlace(a.id);
                }}
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
                  cursor: isBusy ? "default" : "pointer",
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

              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  value={draftNames[a.id] ?? a.name}
                  disabled={isBusy}
                  onChange={(e) =>
                    setDraftNames((prev) => ({
                      ...prev,
                      [a.id]: e.target.value,
                    }))
                  }
                  onFocus={() => setRenamingId(a.id)}
                  onBlur={() => {
                    void commitRename(a);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                    if (e.key === "Escape") {
                      setDraftNames((prev) => ({ ...prev, [a.id]: a.name }));
                      setRenamingId(null);
                      e.currentTarget.blur();
                    }
                    e.stopPropagation();
                  }}
                  spellCheck={false}
                  style={{
                    width: "100%",
                    color: "white",
                    fontSize: 16,
                    lineHeight: 1.1,
                    marginBottom: 4,
                    background:
                      renamingId === a.id ? "rgba(255,255,255,0.08)" : "transparent",
                    border:
                      renamingId === a.id
                        ? "1px solid rgba(255,255,255,0.25)"
                        : "1px solid transparent",
                    borderRadius: 4,
                    outline: "none",
                    padding: "4px 6px",
                    pointerEvents: "auto",
                  }}
                />

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
                  {a.linkedMarketplaceAssetId
                    ? "Linked marketplace copy"
                    : a.lineageAssetIds?.length
                    ? `Lineage depth ${a.lineageAssetIds.length}`
                    : "Private asset"}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginTop: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      click();
                      await handleDelete(a);
                    }}
                    disabled={isBusy}
                    style={{
                      appearance: "none",
                      border: "none",
                      cursor: isBusy ? "default" : "pointer",
                      padding: "8px 10px",
                      borderRadius: 4,
                      opacity: isBusy ? 0.5 : 1,
                    }}
                  >
                    Delete
                  </button>

                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      click();
                      await handlePublish(a);
                    }}
                    disabled={isBusy || !canPublish}
                    style={{
                      appearance: "none",
                      border: "none",
                      cursor: isBusy || !canPublish ? "default" : "pointer",
                      padding: "8px 10px",
                      borderRadius: 4,
                      opacity: isBusy || !canPublish ? 0.5 : 1,
                    }}
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {!assets.length && (
          <div style={{ color: "white", opacity: 0.7, fontSize: 14 }}>
            Your asset library is empty. Add assets from the marketplace.
          </div>
        )}
      </div>
    </div>
  );
}