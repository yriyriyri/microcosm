import type { GroupRotation, VoxelCoord } from "../Types";

export type PublishedWorldSurfacePayload = {
  color: string;
  isBlueprint: boolean;
  positions: number[];
  normals: number[];
  indices: number[];
  vertexCount: number;
  triangleCount: number;
};

export type PublishedWorldGroupPayload = {
  groupId: string;
  latestMarketplaceAssetId: string | null;
  assetKind: "draft" | "marketplace" | null;
  position: VoxelCoord;
  rotation: GroupRotation;
  bounds: {
    min: VoxelCoord;
    max: VoxelCoord;
  } | null;
  voxelCount: number;
  surfaces: PublishedWorldSurfacePayload[];
};

export type CreatePublishedWorldInput = {
  publisherUserId: string;
  worldName: string;
  voxelCount: number;
  latestMarketplaceAssetIds: string[];
  groups: PublishedWorldGroupPayload[];
};

export type PublishedWorldDocument = {
  publishedWorldId: string;
  publisherUserId: string;
  worldName: string;
  voxelCount: number;
  latestMarketplaceAssetIds: string[];
  groups: PublishedWorldGroupPayload[];
  createdAt: number;
  updatedAt: number;
};