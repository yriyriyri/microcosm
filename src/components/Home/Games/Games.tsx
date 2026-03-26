"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PackedGrid, { type PackedGridItem } from "@/components/Home/PackedGrid/PackedGrid";
import GamesContainer from "@/components/Home/GridContainers/GamesContainer";
import { listPublishedWorlds } from "@/services/publishedWorlds";
import { GetUserProfile } from "@/services/user";
import { assetRepository } from "@/components/VoxelEditor/repositories";

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

export default function Games() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<GameCardData[]>([]);

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

  const items: PackedGridItem[] = useMemo(() => {
    return games.map((game) => ({
      id: game.publishedWorldId,
      size: "big",
      content: (
        <GamesContainer
          size="big"
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
  }, [games, router]);

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
          Loading games...
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
          No published worlds yet
        </div>
      )}
    </div>
  );
}