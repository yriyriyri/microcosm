"use client";

import React, { useEffect, useState } from "react";
import type { IslandMeta } from "../database/LibraryDb";
import { deleteIsland, listIslands, renameIsland } from "../database/LibraryDb";

export default function LibraryPanel(props: {
  open: boolean;
  onClose: () => void;
  onOpenIsland: (id: string) => void;
}) {
  const { open, onClose, onOpenIsland } = props;

  const [items, setItems] = useState<IslandMeta[]>([]);
  const [loading, setLoading] = useState(false);

  const [thumbUrls, setThumbUrls] = useState<Record<string, string>>({});

  async function refresh() {
    setLoading(true);
    try {
      setItems(await listIslands());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) refresh();
  }, [open]);

  useEffect(() => {
    for (const url of Object.values(thumbUrls)) URL.revokeObjectURL(url);

    const next: Record<string, string> = {};
    for (const it of items) {
      const anyThumb = (it as any).thumb;
      if (anyThumb instanceof Blob) {
        next[it.id] = URL.createObjectURL(anyThumb);
      }
    }
    setThumbUrls(next);

    return () => {
      for (const url of Object.values(next)) URL.revokeObjectURL(url);
    };
  }, [items]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#ffffff",
        color: "black",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "15px 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <div style={{ fontSize: 20 }}>Worlds</div>
          <div style={{ fontSize: 12, opacity: 0.75 }}>
            {loading ? "Loading…" : `${items.length} item${items.length === 1 ? "" : "s"}`}
          </div>
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          <label
            onClick={refresh}
            style={{
              color: "black",
              cursor: "pointer",
              fontFamily: "inherit", 
              fontSize: 20,
            }}
          >
            Refresh
          </label>

          <label
            onClick={onClose}
            style={{
              color: "black",
              cursor: "pointer",
              fontFamily: "inherit", 
              fontSize: 20,
            }}
          >
            Back
          </label>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 16,
        }}
      >
        {loading && <div style={{ opacity: 0.8, padding: 12 }}>Loading…</div>}

        {!loading && items.length === 0 && (
          <div
            style={{
              padding: 16,
              maxWidth: 520,
            }}
          >
            <div style={{ marginBottom: 6 }}>No saved worlds yet</div>
            <div style={{ fontSize: 13, lineHeight: 1.5 }}>
              Go back to the editor, build something, then hit <b>Save</b>.
            </div>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 12,
            }}
          >
            {items.map((it) => (
              <div
                key={it.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  padding: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    border: "1px solid rgba(0,0,0,1.0)",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {thumbUrls[it.id] ? (
                    <img
                      src={thumbUrls[it.id]}
                      alt={it.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: 12, opacity: 0.85 }}>(no thumbnail)</div>
                  )}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {it.name}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
                    {it.voxelCount.toLocaleString()} voxels • {new Date(it.updatedAt).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <label
                    onClick={() => onOpenIsland(it.id)}
                    style={{
                      color: "black",
                      cursor: "pointer",
                      fontSize: 16,

                    }}
                  >
                    Open
                  </label>

                  <label
                    onClick={async () => {
                      const name = prompt("Rename island:", it.name);
                      if (!name) return;
                      await renameIsland(it.id, name);
                      await refresh();
                    }}
                    style={{
                      color: "black",
                      cursor: "pointer",
                      fontSize: 16,
                    }}
                  >
                    Rename
                  </label>

                  <label
                    onClick={async () => {
                      if (!confirm(`Delete "${it.name}"?`)) return;
                      await deleteIsland(it.id);
                      await refresh();
                    }}
                    style={{
                      color: "black",
                      cursor: "pointer",
                      fontSize: 16,
                    }}
                  >
                    Delete
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "15px 15px",
          fontSize: 12,
          opacity: 0.8,
        }}
      >
        Tip: press <b>Esc</b> to go back to the editor.
      </div>
    </div>
  );
}