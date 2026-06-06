import {
  getPublishedWorldSnapshot,
  listPublishedWorldSnapshots,
  publishOwnedWorld,
} from "./versionedWorlds";
import type {
  PublishedWorldDocument,
  PublishedWorldGroupPayload,
  PublishedWorldSurfacePayload,
} from "@/components/VoxelEditor/domain/publishedWorldTypes";
import type { PublishedWorldSnapshotDocument } from "@microcosm/voxel-core";

export type {
  PublishedWorldSurfacePayload,
  PublishedWorldGroupPayload,
  PublishedWorldDocument,
};

export type PublishedWorldAssetReference = {
  key: string;
  kind: "listing" | "version";
  id: string;
};

export function getPublishedWorldGroupAssetReference(
  group: PublishedWorldGroupPayload
): PublishedWorldAssetReference | null {
  const listingId = group.listingId ?? group.latestMarketplaceAssetId ?? null;
  if (typeof listingId === "string" && listingId.trim()) {
    return {
      key: `listing:${listingId}`,
      kind: "listing",
      id: listingId,
    };
  }

  const assetVersionId = group.assetVersionId ?? group.renderAssetId ?? null;
  if (typeof assetVersionId === "string" && assetVersionId.trim()) {
    return {
      key: `version:${assetVersionId}`,
      kind: "version",
      id: assetVersionId,
    };
  }

  return null;
}

function snapshotToLegacyDocument(
  snapshot: PublishedWorldSnapshotDocument
): PublishedWorldDocument {
  const latestMarketplaceAssetIds = Array.from(
    new Set(
      snapshot.groups
        .map((group) => group.listingId ?? null)
        .filter((value): value is string => typeof value === "string" && !!value)
    )
  );

  return {
    publishedWorldId: snapshot.publishedWorldId,
    publisherUserId: snapshot.ownerAccountId,
    worldName: snapshot.worldName,
    voxelCount: snapshot.voxelCount,
    latestMarketplaceAssetIds,
    groups: snapshot.groups.map((group) => ({
      groupId: group.groupId,
      renderAssetId: group.assetVersionId,
      assetVersionId: group.assetVersionId,
      sourceAssetHeadId: group.sourceAssetHeadId,
      listingId: group.listingId ?? null,
      latestMarketplaceAssetId: group.listingId ?? null,
      assetKind: group.listingId ? "marketplace" : "draft",
      logicTag: group.logicTag ?? null,
      position: group.position,
      rotation: group.rotation,
      bounds: group.bounds,
      voxelCount: group.voxelCount,
      surfaces: group.surfaces,
    })),
    createdAt: snapshot.createdAt,
    updatedAt: snapshot.createdAt,
  };
}

export async function publishWorld(worldId: string): Promise<PublishedWorldDocument> {
  const snapshot = await publishOwnedWorld(worldId);
  return snapshotToLegacyDocument(snapshot);
}

export async function listPublishedWorlds(): Promise<{
  ok: boolean;
  worlds: PublishedWorldDocument[];
}> {
  const snapshots = await listPublishedWorldSnapshots();
  return {
    ok: true,
    worlds: snapshots.map(snapshotToLegacyDocument),
  };
}

export async function getPublishedWorld(
  publishedWorldId: string
): Promise<PublishedWorldDocument | null> {
  const snapshot = await getPublishedWorldSnapshot(publishedWorldId);
  return snapshot ? snapshotToLegacyDocument(snapshot) : null;
}
