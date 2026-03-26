export type PublishedWorldGroupVoxel = {
  local: { x: number; y: number; z: number };
  color: string;
  isBlueprint: boolean;
};

export type PublishedWorldGroupBounds = {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
};

export type PublishedWorldGroupDocument = {
  groupId: string;
  sourceAssetId: string | null;
  assetKind: "draft" | "marketplace" | null;
  position: { x: number; y: number; z: number };
  rotation: { x: 0 | 1 | 2 | 3; y: 0 | 1 | 2 | 3; z: 0 | 1 | 2 | 3 };
  bounds: PublishedWorldGroupBounds | null;
  voxelCount: number;
  voxels: PublishedWorldGroupVoxel[];
};

export type CreatePublishedWorldInput = {
  publisherUserId: string;
  worldName: string;
  voxelCount: number;
  sourceAssetIds: string[];
  groups: PublishedWorldGroupDocument[];
};

export type PublishedWorldDocument = {
  publishedWorldId: string;
  publisherUserId: string;
  worldName: string;
  voxelCount: number;
  sourceAssetIds: string[];
  groups: PublishedWorldGroupDocument[];
  createdAt: number;
  updatedAt: number;
};