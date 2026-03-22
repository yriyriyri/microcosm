import type { GroupState } from "../VoxelWorld";

export type AssetId = string;

export type AssetMetaRecord = {
  id: AssetId;
  name: string;
  createdAt: number;
  updatedAt: number;
  voxelCount: number;
  thumb?: Blob | null;
};

export type AssetRecord = {
  meta: AssetMetaRecord;
  group: GroupState;
};

export type SaveAssetInput = {
  id?: string;
  name: string;
  group: GroupState;
  thumb?: Blob | null;
};

export type AssetExportPayload = {
  id: AssetId;
  name: string;
  group: GroupState;
  thumb?: Blob | null;
};