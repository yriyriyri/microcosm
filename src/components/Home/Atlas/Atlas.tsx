"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PackedGrid, { type PackedGridItem } from "@/components/Home/PackedGrid/PackedGrid";
import { listPublishedWorlds } from "@/services/publishedWorlds";
import { GetUserProfile } from "@/services/user";
import { assetRepository } from "@/components/VoxelEditor/repositories";
import AtlasContainer from "@/components/Home/GridContainers/AtlasContainer";

type PublishedWorldGroupRow = {
  groupId: string;
  latestMarketplaceAssetId: string | null;
  assetKind: "draft" | "marketplace" | null;
};

type PublishedWorldRow = {
  publishedWorldId: string;
  publisherUserId: string;
  worldName: string;
  voxelCount: number;
  latestMarketplaceAssetIds: string[];
  groups?: PublishedWorldGroupRow[];
  createdAt: number;
  updatedAt: number;
};

type GameCardData = {
  publishedWorldId: string;
  worldName: string;
  publisherUsername: string;
  assetNames: string[];
  voxelCount: number;
};

export default function Atlas() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<GameCardData[]>([]);
  const [expandedWorldId, setExpandedWorldId] = useState<string | null>(null);

  const atlasGridGap = 70;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      try {
        const res = await listPublishedWorlds();
        const rows: PublishedWorldRow[] = Array.isArray(res?.worlds) ? res.worlds : [];

        const uniqueUserIds = Array.from(
          new Set(rows.map((r) => r.publisherUserId).filter(Boolean))
        );

        const uniqueAssetIds = Array.from(
          new Set(
            rows.flatMap((r) =>
              Array.isArray(r.groups)
                ? r.groups
                    .map((g) => g.latestMarketplaceAssetId)
                    .filter((v): v is string => typeof v === "string" && !!v)
                : []
            )
          )
        );

        const [userEntries, assetEntries] = await Promise.all([
          Promise.all(
            uniqueUserIds.map(async (userId) => {
              try {
                const profile = await GetUserProfile(userId);
                return [userId, profile.username] as const;
              } catch (err) {
                console.error("Failed to resolve username for user", userId, err);
                return [userId, "unknown user"] as const;
              }
            })
          ),
          Promise.all(
            uniqueAssetIds.map(async (assetId) => {
              try {
                const meta = await assetRepository.getAssetMeta(assetId);
                return [assetId, meta?.name ?? assetId] as const;
              } catch (err) {
                console.error("Failed to resolve asset name for asset", assetId, err);
                return [assetId, assetId] as const;
              }
            })
          ),
        ]);

        if (cancelled) return;

        const usernameByUserId = new Map<string, string>(userEntries);
        const assetNameById = new Map<string, string>(assetEntries);

        const next: GameCardData[] = rows.map((row) => {
          const countByAssetId = new Map<string, number>();

          for (const group of row.groups ?? []) {
            const assetId = group.latestMarketplaceAssetId;
            if (!assetId) continue;
            countByAssetId.set(assetId, (countByAssetId.get(assetId) ?? 0) + 1);
          }

          const assetNames = Array.from(countByAssetId.entries()).map(
            ([assetId, count]) => {
              const name = assetNameById.get(assetId) ?? assetId;
              return count > 1 ? `${name} x ${count}` : name;
            }
          );

          return {
            publishedWorldId: row.publishedWorldId,
            worldName: row.worldName || "Untitled World",
            publisherUsername:
              usernameByUserId.get(row.publisherUserId) ?? "unknown user",
            assetNames,
            voxelCount: row.voxelCount ?? 0,
          };
        });

        setGames(next);
      } catch (err) {
        console.error("Failed to load published worlds", err);
        if (!cancelled) setGames([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!expandedWorldId) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setExpandedWorldId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedWorldId]);

  const items: PackedGridItem[] = useMemo(() => {
    return games.map((game) => ({
      id: game.publishedWorldId,
      size: "small",
      content: (
        <AtlasContainer
          size="small"
          gridGap={atlasGridGap}
          expanded={expandedWorldId === game.publishedWorldId}
          onToggleExpand={() => {
            setExpandedWorldId((prev) =>
              prev === game.publishedWorldId ? null : game.publishedWorldId
            );
          }}
          title={game.worldName}
          subtitle={`by ${game.publisherUsername}`}
          meta={
            game.assetNames.length
              ? game.assetNames.join(", ")
              : "No marketplace assets"
          }
          footer={`${game.voxelCount.toLocaleString()} voxels`}
          onClick={() => {
            router.push(`/games/${game.publishedWorldId}`);
          }}
        />
      ),
    }));
  }, [games, router, expandedWorldId]);

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
            color: "var(--homepage-dark)",
            opacity: 0.9,
          }}
        >
          Loading worlds...
        </div>
      ) : items.length > 0 ? (
        <PackedGrid items={items} gap={atlasGridGap} columns={5} />
      ) : (
        <div
          className="pix-logo"
          style={{
            fontSize: 24,
            color: "var(--homepage-dark)",
            opacity: 0.9,
          }}
        >
          No published worlds yet
        </div>
      )}
    </div>
  );
}