import type { VoxelCoord } from "../Types";

export type CloudWorldId = string;
export type AccountId = string;

export type WorldAssetKind = "draft" | "marketplace";

export type WorldInstanceRotation = {
  x: 0 | 1 | 2 | 3;
  y: 0 | 1 | 2 | 3;
  z: 0 | 1 | 2 | 3;
};

export type WorldInstanceDocument = {
  instanceId: string;

  assetId: string;
  assetKind: WorldAssetKind;

  overrideAssetId?: string | null;

  position: VoxelCoord;
  rotation?: WorldInstanceRotation;
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