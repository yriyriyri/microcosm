import type { AssetRecord, AssetMetaRecord } from "./assetTypes";
import type { WorldRecord } from "./worldTypes";
import type { DraftAssetDocument, MarketplaceAssetDocument } from "./cloudAssetTypes";
import type { WorldDocument, WorldInstanceDocument } from "./cloudWorldTypes";
import type { SaveAssetInput } from "./assetTypes";
import type { SaveWorldInput, WorldData, WorldInstanceRecord } from "./worldTypes";
import type {
  SaveDraftAssetDocumentInput,
  SaveMarketplaceAssetDocumentInput,
} from "./cloudAssetTypes";
import type { SaveWorldDocumentInput } from "./cloudWorldTypes";

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
    .filter((inst) => !!inst.assetId && !!inst.assetKind)
    .map((inst) => ({
      instanceId: inst.instanceId,
      assetId: inst.assetId!,
      assetKind: inst.assetKind!,
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

export function worldDocumentToSaveWorldInput(
  doc: SaveWorldDocumentInput
): SaveWorldInput {
  const instances: WorldInstanceRecord[] = doc.instances.map((inst) => ({
    instanceId: inst.instanceId,
    assetId: inst.assetId,
    assetKind: inst.assetKind,
    overrideAssetId: inst.overrideAssetId ?? null,
    position: inst.position,
  }));

  const data: WorldData = { instances };

  return {
    id: doc.worldId,
    name: doc.name,
    data,
    thumb: null,
  };
}

export function draftAssetDocumentToSaveAssetInput(
  doc: SaveDraftAssetDocumentInput
): SaveAssetInput {
  return {
    id: doc.assetId,
    name: doc.name,
    group: doc.voxelGroup,
    thumb: null,

    visibility: "private",
    inLibrary: doc.isLibraryItem ?? (doc.draftKind !== "override"),
    isPreset: false,

    sourceAssetId: doc.sourceAssetId ?? null,
    linkedMarketplaceAssetId: doc.linkedMarketplaceAssetId ?? null,
    lineageAssetIds: doc.lineageAssetIds ?? [],
    publishedFromAssetId: null,
    isImmutable: false,

    forceNewId: !doc.assetId,
  };
}

export function marketplaceAssetDocumentToSaveAssetInput(
  doc: SaveMarketplaceAssetDocumentInput
): SaveAssetInput {
  return {
    id: doc.assetId,
    name: doc.name,
    group: doc.voxelGroup,
    thumb: null,

    visibility: "marketplace",
    inLibrary: false,
    isPreset: false,

    sourceAssetId: doc.sourceAssetId ?? null,
    linkedMarketplaceAssetId: null,
    lineageAssetIds: doc.lineageAssetIds ?? [],
    publishedFromAssetId: doc.publishedFromDraftAssetId ?? null,
    isImmutable: true,

    forceNewId: !doc.assetId,
  };
}