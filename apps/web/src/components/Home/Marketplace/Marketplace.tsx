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
    return marketplaceAssets.map((asset, index) => {
      const owned = ownedByMarketplaceId.get(asset.id);
      const alreadyOwned = !!owned;
      const size: "small" | "big" = asset.voxelCount > 1000 ? "big" : "small";

      return {
        id: asset.id,
        size,
        content: (
          <MarketplaceContainer
            assetId={asset.id}
            forceTheme={index === 0 ? "sky" : undefined}
            thumbBlob={asset.thumb ?? null}
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
        top: 30,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        pointerEvents: "auto",
        paddingTop: 30,
        paddingLeft: 4,
        paddingRight: 4,
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
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <PackedGrid items={items} columns={7} />

          {/* <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 50,
              pointerEvents: "none",
              zIndex: 30,
              background:
                "linear-gradient(to top, rgba(234,243,254,0) 0%, rgba(234,243,254,0.03) 35%, rgba(234,243,254,0.12) 60%, rgba(234,243,254,0.3) 82%, rgba(234,243,254,0.4) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 70,
              pointerEvents: "none",
              zIndex: 30,
              background:
                "linear-gradient(to bottom, rgba(234,243,254,0) 0%, rgba(234,243,254,0.03) 35%, rgba(234,243,254,0.12) 60%, rgba(234,243,254,0.45) 82%, rgba(234,243,254,0.8) 100%)",
            }}
          /> */}
        </div>
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