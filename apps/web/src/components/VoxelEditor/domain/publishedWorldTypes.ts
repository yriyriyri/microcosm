import type { GroupRotation, VoxelCoord } from "../Types";
import type { AssetCompiledSurface } from "./compiledAssetTypes";

export type PublishedWorldSurfacePayload = AssetCompiledSurface;

export type PublishedWorldGroupPayload = {
  groupId: string;
  renderAssetId?: string | null;
  assetVersionId?: string | null;
  sourceAssetHeadId?: string | null;
  listingId?: string | null;
  latestMarketplaceAssetId: string | null;
  assetKind: "draft" | "marketplace" | null;
  logicTag?: string | null;
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
