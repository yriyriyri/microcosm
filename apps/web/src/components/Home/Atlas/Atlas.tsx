"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PackedGrid, { type PackedGridItem } from "@/components/Home/PackedGrid/PackedGrid";
import {
  getPublishedWorldGroupAssetReference,
  listPublishedWorlds,
  type PublishedWorldAssetReference,
  type PublishedWorldDocument,
} from "@/services/publishedWorlds";
import { GetUserProfile } from "@/services/user";
import { assetRepository } from "@/components/VoxelEditor/repositories";
import { getAssetVersion } from "@/services/versionedAssets";
import { dataUrlToBlob } from "@/components/VoxelEditor/repositories/repositoryMedia";
import AtlasContainer from "@/components/Home/GridContainers/AtlasContainer";

type ResolvedAssetSummary = {
  key: string;
  assetId: string;
  kind: "listing" | "version";
  name: string;
  count: number;
  thumb: Blob | null;
};

type ResolvedAssetPreview = {
  name: string;
  thumb: Blob | null;
};

type GameCardData = {
  publishedWorldId: string;
  publisherUserId: string;
  worldName: string;
  publisherUsername: string;
  assets: ResolvedAssetSummary[];
  voxelCount: number;
  createdAt: number;
};

const OVERLAY_CLOSE_MS = 220;

export default function Atlas() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<GameCardData[]>([]);
  const [expandedWorldId, setExpandedWorldId] = useState<string | null>(null);
  const [closingWorldIds, setClosingWorldIds] = useState<Set<string>>(new Set());

  const [overlayOrderById, setOverlayOrderById] = useState<Map<string, number>>(new Map());
  const nextOverlayOrderRef = useRef(1);

  const closeTimeoutsRef = useRef<Map<string, number>>(new Map());

  const atlasGridGap = 80;

  function bringOverlayToFront(worldId: string) {
    const nextOrder = nextOverlayOrderRef.current++;
    setOverlayOrderById((prev) => {
      const next = new Map(prev);
      next.set(worldId, nextOrder);
      return next;
    });
  }

  function markClosing(worldId: string | null) {
    if (!worldId) return;
  
    setClosingWorldIds((prev) => {
      const next = new Set(prev);
      next.add(worldId);
      return next;
    });
  
    const prevTimeout = closeTimeoutsRef.current.get(worldId);
    if (prevTimeout) {
      window.clearTimeout(prevTimeout);
    }
  
    const timeoutId = window.setTimeout(() => {
      setClosingWorldIds((prev) => {
        const next = new Set(prev);
        next.delete(worldId);
        return next;
      });
  
      setOverlayOrderById((prev) => {
        const next = new Map(prev);
        next.delete(worldId);
        return next;
      });
  
      closeTimeoutsRef.current.delete(worldId);
    }, OVERLAY_CLOSE_MS);
  
    closeTimeoutsRef.current.set(worldId, timeoutId);
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      try {
        const res = await listPublishedWorlds();
        const rows: PublishedWorldDocument[] = Array.isArray(res?.worlds)
          ? res.worlds
          : [];

        const uniqueUserIds = Array.from(
          new Set(rows.map((r) => r.publisherUserId).filter(Boolean))
        );

        const uniqueAssetRefs = Array.from(
          new Map(
            rows
              .flatMap((row) =>
                Array.isArray(row.groups)
                  ? row.groups
                      .map((group) => getPublishedWorldGroupAssetReference(group))
                      .filter(
                        (value): value is PublishedWorldAssetReference => !!value
                      )
                  : []
              )
              .map((ref) => [ref.key, ref])
          ).values()
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
            uniqueAssetRefs.map(async (ref) => {
              try {
                if (ref.kind === "listing") {
                  const meta = await assetRepository.getAssetMeta(ref.id);
                  return [
                    ref.key,
                    {
                      name: meta?.name ?? ref.id,
                      thumb: meta?.thumb ?? null,
                    } satisfies ResolvedAssetPreview,
                  ] as const;
                }

                const version = await getAssetVersion(ref.id);
                return [
                  ref.key,
                  {
                    name: version?.name ?? ref.id,
                    thumb: dataUrlToBlob(version?.thumbStorageKey ?? null),
                  } satisfies ResolvedAssetPreview,
                ] as const;
              } catch (err) {
                console.error(
                  "Failed to resolve asset preview for published world asset",
                  ref,
                  err
                );
                return [
                  ref.key,
                  {
                    name: ref.id,
                    thumb: null,
                  } satisfies ResolvedAssetPreview,
                ] as const;
              }
            })
          ),
        ]);

        if (cancelled) return;

        const usernameByUserId = new Map<string, string>(userEntries);
        const assetPreviewByKey = new Map<string, ResolvedAssetPreview>(assetEntries);

        const next: GameCardData[] = rows.map((row) => {
          const countByAssetKey = new Map<
            string,
            { ref: PublishedWorldAssetReference; count: number }
          >();

          for (const group of row.groups ?? []) {
            const ref = getPublishedWorldGroupAssetReference(group);
            if (!ref) continue;

            const existing = countByAssetKey.get(ref.key);
            if (existing) {
              existing.count += 1;
            } else {
              countByAssetKey.set(ref.key, {
                ref,
                count: 1,
              });
            }
          }

          const assets: ResolvedAssetSummary[] = Array.from(
            countByAssetKey.values()
          ).map(({ ref, count }) => {
            const preview = assetPreviewByKey.get(ref.key);
            return {
              key: ref.key,
              assetId: ref.id,
              kind: ref.kind,
              name: preview?.name ?? ref.id,
              count,
              thumb: preview?.thumb ?? null,
            };
          });

          return {
            publishedWorldId: row.publishedWorldId,
            publisherUserId: row.publisherUserId,
            worldName: row.worldName || "Untitled World",
            publisherUsername:
              usernameByUserId.get(row.publisherUserId) ?? "unknown user",
            assets,
            voxelCount: row.voxelCount ?? 0,
            createdAt: row.createdAt ?? 0,
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
      for (const timeoutId of closeTimeoutsRef.current.values()) {
        window.clearTimeout(timeoutId);
      }
      closeTimeoutsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (!expandedWorldId) return;

      e.preventDefault();
      markClosing(expandedWorldId);
      setExpandedWorldId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedWorldId]);

  const items: PackedGridItem[] = useMemo(() => {
    return games.map((game) => {
      const isExpanded = expandedWorldId === game.publishedWorldId;

      return {
        id: game.publishedWorldId,
        size: "small",
        content: (
          <AtlasContainer
            size="small"
            gridGap={atlasGridGap}
            expanded={isExpanded}
            overlayZ={overlayOrderById.get(game.publishedWorldId) ?? 0}
            onToggleExpand={() => {
              bringOverlayToFront(game.publishedWorldId);
              setExpandedWorldId((prev) => {
                if (prev === game.publishedWorldId) {
                  markClosing(game.publishedWorldId);
                  return null;
                }

                if (prev) {
                  markClosing(prev);
                }

                return game.publishedWorldId;
              });
            }}
            title={game.worldName}
            subtitle={`by ${game.publisherUsername}`}
            publisherUserId={game.publisherUserId}
            publisherUsername={game.publisherUsername}
            createdAt={game.createdAt}
            assets={game.assets}
            meta={
              game.assets.length
                ? game.assets
                    .map((a) =>
                      a.count > 1 ? `${a.name} x ${a.count}` : a.name
                    )
                    .join(", ")
                : "No assets"
            }
            footer={`${game.voxelCount.toLocaleString()} voxels`}
            onClick={() => {
              router.push(`/games/${game.publishedWorldId}`);
            }}
          />
        ),
      };
    });
  }, [games, router, expandedWorldId, closingWorldIds, overlayOrderById]);

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
