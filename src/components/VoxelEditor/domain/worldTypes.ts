import type { VoxelCoord } from "../Types";
import type { GroupRotation } from "../Types";

export type WorldId = string;
export type WorldAssetKind = "draft" | "marketplace";

export type WorldInstanceRecord = {
  instanceId: string;
  assetId: string | null;
  assetKind: WorldAssetKind | null;
  overrideAssetId?: string | null;
  position: VoxelCoord;
  rotation?: GroupRotation;
};

export type WorldData = {
  instances: WorldInstanceRecord[];
};

export type WorldMetaRecord = {
  id: WorldId;
  name: string;
  createdAt: number;
  updatedAt: number;
  instanceCount: number;
  thumb?: Blob | null;
  thumbStorageKey?: string | null;
};

export type WorldRecord = {
  meta: WorldMetaRecord;
  data: WorldData;
};

export type SaveWorldInput = {
  id?: string;
  name: string;
  data: WorldData;
  thumb?: Blob | null;
  thumbStorageKey?: string | null;
};