import type { GroupRotation, VoxelCoord } from "../Types";

export type CloudWorldId = string;
export type AccountId = string;

export type WorldAssetKind = "draft" | "marketplace";

export type WorldInstanceDocument = {
  instanceId: string;

  assetId: string;
  assetKind: WorldAssetKind;

  overrideAssetId?: string | null;

  position: VoxelCoord;
  rotation?: GroupRotation;
};

export type WorldDocument = {
  worldId: CloudWorldId;
  ownerAccountId: AccountId | null;

  name: string;
  instances: WorldInstanceDocument[];

  createdAt: number;
  updatedAt: number;

  thumbStorageKey?: string | null;
};

export type SaveWorldDocumentInput = {
  worldId?: CloudWorldId;
  ownerAccountId: AccountId | null;

  name: string;
  instances: WorldInstanceDocument[];

  createdAt?: number;
  updatedAt?: number;

  thumbStorageKey?: string | null;
};