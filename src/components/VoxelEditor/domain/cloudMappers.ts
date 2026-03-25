import type { AssetRecord, AssetMetaRecord } from "./assetTypes";
import type { WorldRecord } from "./worldTypes";
import type { DraftAssetDocument, MarketplaceAssetDocument } from "./cloudAssetTypes";
import type { WorldDocument, WorldInstanceDocument } from "./cloudWorldTypes";

function inferDraftKind(meta: AssetMetaRecord): "normal" | "override" {
  return meta.inLibrary === false ? "override" : "normal";
}

export function assetRecordToDraftAssetDocument(
  asset: AssetRecord,
  ownerAccountId: string | null = null
): DraftAssetDocument {
  const meta = asset.meta;

  return {
    assetId: meta.id,
    ownerAccountId,
    name: meta.name,
    voxelGroup: asset.group,
    createdAt: meta.createdAt,
    updatedAt: meta.updatedAt,
    thumbStorageKey: null,
    sourceAssetId: meta.sourceAssetId ?? null,
    linkedMarketplaceAssetId: meta.linkedMarketplaceAssetId ?? null,
    lineageAssetIds: meta.lineageAssetIds ?? [],
    isLibraryItem: meta.inLibrary ?? true,
    draftKind: inferDraftKind(meta),
  };
}

export function assetRecordToMarketplaceAssetDocument(
  asset: AssetRecord,
  creatorAccountId: string | null = null
): MarketplaceAssetDocument {
  const meta = asset.meta;

  return {
    assetId: meta.id,
    creatorAccountId,
    publishedFromDraftAssetId: meta.publishedFromAssetId ?? null,
    name: meta.name,
    voxelGroup: asset.group,
    createdAt: meta.createdAt,
    thumbStorageKey: null,
    sourceAssetId: meta.sourceAssetId ?? null,
    lineageAssetIds: meta.lineageAssetIds ?? [],
    compiledRender: {
      meshStorageKey: null,
      collisionStorageKey: null,
      bounds: null,
      voxelCount: meta.voxelCount,
    },
  };
}

export function worldRecordToWorldDocument(
  world: WorldRecord,
  ownerAccountId: string | null = null
): WorldDocument {
  const instances: WorldInstanceDocument[] = world.data.instances
    .filter((inst) => !!inst.assetId)
    .map((inst) => ({
      instanceId: inst.instanceId,
      assetId: inst.assetId!,
      assetKind: inst.assetVisibility === "marketplace" || inst.assetVisibility === "system"
        ? "marketplace"
        : "draft",
      overrideAssetId: inst.overrideAssetId ?? null,
      position: inst.position,
      rotation: { x: 0, y: 0, z: 0 },
    }));

  return {
    worldId: world.meta.id,
    ownerAccountId,
    name: world.meta.name,
    instances,
    createdAt: world.meta.createdAt,
    updatedAt: world.meta.updatedAt,
    thumbStorageKey: null,
  };
}