import type { WorldPacked } from "../VoxelWorld";

export type WorldId = string;

export type WorldMetaRecord = {
  id: WorldId;
  name: string;
  createdAt: number;
  updatedAt: number;
  voxelCount: number;
  thumb?: Blob | null;
};

export type WorldRecord = {
  meta: WorldMetaRecord;
  packed: WorldPacked;
};

export type SaveWorldInput = {
  id?: string;
  name: string;
  packed: WorldPacked;
  thumb?: Blob | null;
};