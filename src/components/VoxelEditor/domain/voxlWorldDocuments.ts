import type { VoxelCoord } from "../Types";

export type WorldDocumentId = string;
export type AccountId = string;

export type WorldAssetKind = "draft" | "marketplace";

export type WorldInstanceRotation = {
  x: 0 | 1 | 2 | 3;
  y: 0 | 1 | 2 | 3;
  z: 0 | 1 | 2 | 3;
};

export type WorldInstance = {
  instanceId: string;
  assetId: string;
  assetKind: WorldAssetKind;
  position: VoxelCoord;
  rotation: WorldInstanceRotation;
};

export type WorldDocument = {
  worldId: WorldDocumentId;
  ownerAccountId: AccountId | null;
  name: string;
  instances: WorldInstance[];
  createdAt: number;
  updatedAt: number;
};

export type PublishedWorldDocument = {
  publishedWorldId: string;
  sourceWorldId: string;
  ownerAccountId: AccountId | null;
  name: string;
  instances: Array<{
    instanceId: string;
    marketplaceAssetId: string;
    position: VoxelCoord;
    rotation: WorldInstanceRotation;
  }>;
  createdAt: number;
};