import type { GroupState, WorldPacked } from "../VoxelWorld";
import type {
  AssetMetaRecord,
  AssetRecord,
} from "./assetTypes";
import type {
  WorldMetaRecord,
  WorldRecord,
} from "./worldTypes";
import type {
  ForkPublishedAssetToDraftInput,
  MarketplaceAsset,
  UserAssetDraft,
} from "./voxlAssetDocuments";
import type {
  PublishedWorldDocument,
  WorldDocument,
  WorldInstance,
} from "./voxlWorldDocuments";

function makeId(prefix: string): string {
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return `${prefix}_${c.randomUUID()}`;
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function assetRecordToUserAssetDraft(
  asset: AssetRecord,
  ownerAccountId: string | null = null
): UserAssetDraft {
  return {
    assetId: asset.meta.id,
    ownerAccountId,
    name: asset.meta.name,
    voxelGroup: asset.group,
    createdAt: asset.meta.createdAt,
    updatedAt: asset.meta.updatedAt,
    thumb: asset.meta.thumb ?? null,
  };
}

export function assetRecordToMarketplaceAsset(
  asset: AssetRecord,
  creatorAccountId: string | null = null
): MarketplaceAsset {
  return {
    assetId: asset.meta.id,
    sourceDraftAssetId: null,
    creatorAccountId,
    name: asset.meta.name,
    voxelGroup: asset.group,
    createdAt: asset.meta.createdAt,
    thumb: asset.meta.thumb ?? null,
    stats: {
      voxelCount: asset.meta.voxelCount,
    },
    compiledMeshRef: null,
    collisionRef: null,
  };
}

export function publishDraftToMarketplaceAsset(
  draft: UserAssetDraft
): MarketplaceAsset {
  return {
    assetId: makeId("market_asset"),
    sourceDraftAssetId: draft.assetId,
    creatorAccountId: draft.ownerAccountId,
    name: draft.name,
    voxelGroup: draft.voxelGroup,
    createdAt: Date.now(),
    thumb: draft.thumb ?? null,
    stats: {
      voxelCount: draft.voxelGroup.voxels.length,
    },
    compiledMeshRef: null,
    collisionRef: null,
  };
}

export function forkPublishedAssetToDraft(
  input: ForkPublishedAssetToDraftInput
): UserAssetDraft {
  const { published, ownerAccountId, name } = input;

  return {
    assetId: makeId("draft_asset"),
    ownerAccountId,
    name: name ?? published.name,
    voxelGroup: published.voxelGroup,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    thumb: published.thumb ?? null,
  };
}

export function emptyWorldDocument(params?: {
  worldId?: string;
  ownerAccountId?: string | null;
  name?: string;
}): WorldDocument {
  const now = Date.now();
  return {
    worldId: params?.worldId ?? makeId("world"),
    ownerAccountId: params?.ownerAccountId ?? null,
    name: params?.name ?? "Untitled World",
    instances: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function worldRecordToPlaceholderWorldDocument(
  world: WorldRecord,
  ownerAccountId: string | null = null
): WorldDocument {
  return {
    worldId: world.meta.id,
    ownerAccountId,
    name: world.meta.name,
    instances: [],
    createdAt: world.meta.createdAt,
    updatedAt: world.meta.updatedAt,
  };
}

export function worldDocumentToPublishedWorldDocument(
  world: WorldDocument
): PublishedWorldDocument {
  return {
    publishedWorldId: makeId("published_world"),
    sourceWorldId: world.worldId,
    ownerAccountId: world.ownerAccountId,
    name: world.name,
    instances: world.instances
      .filter((i) => i.assetKind === "marketplace")
      .map((i) => ({
        instanceId: i.instanceId,
        marketplaceAssetId: i.assetId,
        position: i.position,
        rotation: i.rotation,
      })),
    createdAt: Date.now(),
  };
}