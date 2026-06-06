import type { VoxelCoord } from "./voxelTypes";

export const ASSET_COMPILED_RENDER_VERSION = 1;

export type AssetCompiledSurface = {
  color: string;
  isBlueprint: boolean;
  positions: number[];
  normals: number[];
  indices: number[];
  vertexCount: number;
  triangleCount: number;
};

export type AssetCompiledBounds = {
  min: VoxelCoord;
  max: VoxelCoord;
};

export type AssetCompiledRender = {
  version: number;
  bounds: AssetCompiledBounds | null;
  voxelCount: number;
  surfaces: AssetCompiledSurface[];
};
