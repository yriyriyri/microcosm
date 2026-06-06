import type { GroupState } from "../VoxelWorld";
import type { AssetCompiledRender } from "./compiledAssetTypes";

export type CloudAssetId = string;
export type AccountId = string;

export type DraftAssetKind = "normal" | "override";

export type CompiledRenderPayload = AssetCompiledRender;

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
  compiledRender?: CompiledRenderPayload | null;
};

export type MarketplaceAssetDocument = {
  assetId: CloudAssetId;

  creatorAccountId: AccountId | null;
  publishedFromDraftAssetId: string | null;

  name: string;
  voxelGroup: GroupState;

  createdAt: number;

  thumbStorageKey?: string | null;

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
  compiledRender?: CompiledRenderPayload | null;
};

export type SaveMarketplaceAssetDocumentInput = {
  assetId?: CloudAssetId;

  creatorAccountId: AccountId | null;
  publishedFromDraftAssetId?: string | null;

  name: string;
  voxelGroup: GroupState;

  createdAt?: number;

  thumbStorageKey?: string | null;

  lineageAssetIds?: string[];

  compiledRender?: CompiledRenderPayload | null;
};
