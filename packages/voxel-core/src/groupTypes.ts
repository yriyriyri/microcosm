import type { VoxelCoord } from "./voxelTypes";

export type GroupId = string;

export type GroupVoxel = {
  local: VoxelCoord;
  color: string;
  isBlueprint: boolean;
};

export type GroupState = {
  groupId: GroupId;
  position: VoxelCoord;
  voxels: GroupVoxel[];
};
