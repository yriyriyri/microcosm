"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { AssetMetaRecord } from "../domain/assetTypes";
import { assetRepository } from "../repositories";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";
import PackedGrid, {
  type PackedGridItem,
} from "@/components/Home/PackedGrid/PackedGrid";
import AssetContainer from "@/components/Home/GridContainers/AssetContainer";

export default function AssetsPanel(props: {
  open: boolean;
  onClose: () => void;
  onRequestPlace: (assetId: string) => void;
}) {
  const { open, onClose, onRequestPlace } = props;
  const { click } = useSound();

  const [assets, setAssets] = useState<AssetMetaRecord[]>([]);

  async function refresh() {
    const rows = await assetRepository.listLibraryAssets();
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

  const items: PackedGridItem[] = useMemo(() => {
    return assets.map((a) => {
      const size: "small" | "big" = a.voxelCount > 2000 ? "big" : "small";

      return {
        id: a.id,
        size,
        content: (
          <AssetContainer
            thumbUrl={thumbUrls.get(a.id)}
            size={size}
            onClick={() => {
              click();
              onRequestPlace(a.id);
            }}
          />
        ),
      };
    });
  }, [assets, thumbUrls, click, onRequestPlace]);

  if (!open) return null;

  return (
    <div
      style={{
        width: "min(460px, 92vw)",
        maxHeight: "min(640px, 88vh)",
        overflow: "hidden",
        background: "rgba(0, 68, 128, 0.30)",
        borderRadius: 10,
        padding: 10,
        pointerEvents: "auto",
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.length ? (
        <div style={{ width: "100%", height: "100%" }}>
          <PackedGrid items={items} columns={4} gap={10} />
        </div>
      ) : (
        <div style={{ color: "white", opacity: 0.7, fontSize: 14 }}>
          Your asset library is empty. Add assets from the marketplace.
        </div>
      )}
    </div>
  );
}