"use client";

import { useEffect, useMemo, useState } from "react";
import PackedGrid, { type PackedGridItem } from "@/components/Home/PackedGrid/PackedGrid";
import MarketplaceContainer from "@/components/Home/GridContainers/MarketplaceContainer";
import { assetRepository } from "@/components/VoxelEditor/repositories";
import type { AssetMetaRecord } from "@/components/VoxelEditor/domain/assetTypes";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";

type OwnedInfo = {
  count: number;
  privateAssetIds: string[];
};

export default function Marketplace() {
  const { click } = useSound();

  const [loading, setLoading] = useState(true);
  const [marketplaceAssets, setMarketplaceAssets] = useState<AssetMetaRecord[]>([]);
  const [ownedByMarketplaceId, setOwnedByMarketplaceId] = useState<Map<string, OwnedInfo>>(new Map());
  const [busyAssetId, setBusyAssetId] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);

    try {
      const [marketRows, privateRows] = await Promise.all([
        assetRepository.listMarketplaceAssets(),
        assetRepository.listPrivateAssets(),
      ]);

      const nextOwned = new Map<string, OwnedInfo>();

      for (const asset of privateRows) {
        const linkedMarketplaceAssetId = asset.linkedMarketplaceAssetId ?? null;
        if (!linkedMarketplaceAssetId) continue;

        const existing = nextOwned.get(linkedMarketplaceAssetId);
        if (existing) {
          existing.count += 1;
          existing.privateAssetIds.push(asset.id);
        } else {
          nextOwned.set(linkedMarketplaceAssetId, {
            count: 1,
            privateAssetIds: [asset.id],
          });
        }
      }

      setMarketplaceAssets(marketRows);
      setOwnedByMarketplaceId(nextOwned);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function onBuy(marketplaceAssetId: string) {
    if (busyAssetId) return;
    if (ownedByMarketplaceId.has(marketplaceAssetId)) return;

    try {
      setBusyAssetId(marketplaceAssetId);
      click();

      const newPrivateAssetId =
        await assetRepository.acquireMarketplaceAssetToLibrary(marketplaceAssetId);

      setOwnedByMarketplaceId((prev) => {
        const next = new Map(prev);
        next.set(marketplaceAssetId, {
          count: 1,
          privateAssetIds: [newPrivateAssetId],
        });
        return next;
      });
    } catch (err) {
      console.error("Failed to acquire marketplace asset", err);
    } finally {
      setBusyAssetId(null);
    }
  }

  const items: PackedGridItem[] = useMemo(() => {
    return marketplaceAssets.map((asset) => {
      const owned = ownedByMarketplaceId.get(asset.id);
      const alreadyOwned = !!owned;
      const size: "small" | "big" = asset.voxelCount > 1000 ? "big" : "small";

      return {
        id: asset.id,
        size,
        content: (
          <MarketplaceContainer
            assetId={asset.id}
            size={size}
            title={asset.name}
            subtitle="by bkvoxel"
            meta={`${asset.voxelCount.toLocaleString()} voxels`}
            footer={alreadyOwned ? "Owned" : "Available to buy"}
            isBusy={busyAssetId === asset.id}
            alreadyOwned={alreadyOwned}
            onBuy={() => void onBuy(asset.id)}
          />
        ),
      };
    });
  }, [marketplaceAssets, ownedByMarketplaceId, busyAssetId]);

  return (
    <div
      style={{
        position: "absolute",
        top: 52,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        pointerEvents: "auto",
        padding: 16,
        paddingTop: 20,
      }}
    >
      {loading ? (
        <div
          className="pix-logo"
          style={{
            fontSize: 24,
            color: "#DBFAFF",
            opacity: 0.9,
          }}
        >
          Loading marketplace...
        </div>
      ) : items.length > 0 ? (
        <PackedGrid items={items} />
      ) : (
        <div
          className="pix-logo"
          style={{
            fontSize: 24,
            color: "#DBFAFF",
            opacity: 0.9,
          }}
        >
          No marketplace assets
        </div>
      )}
    </div>
  );
}