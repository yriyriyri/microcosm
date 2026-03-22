import type { GroupState } from "../VoxelWorld";

export type UserAssetDraftId = string;
export type MarketplaceAssetId = string;
export type AccountId = string;

export type UserAssetDraft = {
  assetId: UserAssetDraftId;
  ownerAccountId: AccountId | null;
  name: string;
  voxelGroup: GroupState;
  createdAt: number;
  updatedAt: number;
  thumb?: Blob | null;
};

export type MarketplaceAsset = {
  assetId: MarketplaceAssetId;
  sourceDraftAssetId: UserAssetDraftId | null;
  creatorAccountId: AccountId | null;
  name: string;
  voxelGroup: GroupState;
  createdAt: number;
  thumb?: Blob | null;

  compiledMeshRef?: string | null;
  collisionRef?: string | null;
  stats?: {
    voxelCount: number;
  };
};

export type PublishDraftToMarketplaceInput = {
  draft: UserAssetDraft;
};

export type ForkPublishedAssetToDraftInput = {
  published: MarketplaceAsset;
  ownerAccountId: AccountId | null;
  name?: string;
};