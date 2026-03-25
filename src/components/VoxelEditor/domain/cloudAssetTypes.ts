import type { GroupState } from "../VoxelWorld";
import type { VoxelCoord } from "../Types";

export type CloudAssetId = string;
export type AccountId = string;

export type DraftAssetKind = "normal" | "override";

export type CompiledRenderPayload = {
  meshStorageKey?: string | null;
  collisionStorageKey?: string | null;
  bounds?: {
    min: VoxelCoord;
    max: VoxelCoord;
  } | null;
  voxelCount: number;
};

export type DraftAssetDocument = {
  assetId: CloudAssetId;
  ownerAccountId: AccountId | null;

  name: string;
  voxelGroup: GroupState;

  createdAt: number;
  updatedAt: number;

  thumbStorageKey?: string | null;

  sourceAssetId?: string | null;
  linkedMarketplaceAssetId?: string | null;
  lineageAssetIds: string[];

  isLibraryItem: boolean;
  draftKind: DraftAssetKind;
};

export type MarketplaceAssetDocument = {
  assetId: CloudAssetId;

  creatorAccountId: AccountId | null;
  publishedFromDraftAssetId: string | null;

  name: string;
  voxelGroup: GroupState;

  createdAt: number;

  thumbStorageKey?: string | null;

  sourceAssetId?: string | null;
  lineageAssetIds: string[];

  compiledRender?: CompiledRenderPayload | null;
};

export type SaveDraftAssetDocumentInput = {
  assetId?: CloudAssetId;
  ownerAccountId: AccountId | null;

  name: string;
  voxelGroup: GroupState;

  createdAt?: number;
  updatedAt?: number;

  thumbStorageKey?: string | null;

  sourceAssetId?: string | null;
  linkedMarketplaceAssetId?: string | null;
  lineageAssetIds?: string[];

  isLibraryItem?: boolean;
  draftKind?: DraftAssetKind;
};

export type SaveMarketplaceAssetDocumentInput = {
  assetId?: CloudAssetId;

  creatorAccountId: AccountId | null;
  publishedFromDraftAssetId?: string | null;

  name: string;
  voxelGroup: GroupState;

  createdAt?: number;

  thumbStorageKey?: string | null;

  sourceAssetId?: string | null;
  lineageAssetIds?: string[];

  compiledRender?: CompiledRenderPayload | null;
};