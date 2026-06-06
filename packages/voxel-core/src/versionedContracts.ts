import type {
  AssetCompiledRender,
  AssetCompiledSurface,
} from "./compiledAssetTypes";
import type { GroupState } from "./groupTypes";
import type { GroupRotation, VoxelCoord } from "./voxelTypes";

export type AccountId = string;
export type AssetHeadId = string;
export type AssetVersionId = string;
export type AssetListingId = string;
export type WorldId = string;
export type PublishedWorldId = string;

export type DraftAssetKind = "normal" | "override";
export type AssetSnapshotVisibility = "listed" | "unlisted";

export type OwnedAssetHeadDocument = {
  assetHeadId: AssetHeadId;
  ownerAccountId: AccountId;
  name: string;
  voxelGroup: GroupState;
  compiledRender: AssetCompiledRender;
  draftRevision: number;
  thumbStorageKey?: string | null;
  sourceAssetHeadId?: string | null;
  linkedListingId?: AssetListingId | null;
  lineageAssetHeadIds: string[];
  draftKind: DraftAssetKind;
  isLibraryItem: boolean;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number | null;
};

export type OwnedAssetManifestItem = {
  assetHeadId: AssetHeadId;
  updatedAt: number;
  draftRevision: number;
  deletedAt?: number | null;
};

export type CreateOwnedAssetInput = {
  name: string;
  voxelGroup: GroupState;
  thumbStorageKey?: string | null;
  sourceAssetHeadId?: string | null;
  linkedListingId?: AssetListingId | null;
  lineageAssetHeadIds?: string[];
  draftKind?: DraftAssetKind;
  isLibraryItem?: boolean;
};

export type UpdateOwnedAssetInput = {
  expectedDraftRevision: number;
  name: string;
  voxelGroup: GroupState;
  thumbStorageKey?: string | null;
  sourceAssetHeadId?: string | null;
  linkedListingId?: AssetListingId | null;
  lineageAssetHeadIds?: string[];
  draftKind?: DraftAssetKind;
  isLibraryItem?: boolean;
};

export type AssetVersionSnapshotDocument = {
  assetVersionId: AssetVersionId;
  assetHeadId: AssetHeadId;
  ownerAccountId: AccountId;
  sourceDraftRevision: number;
  name: string;
  voxelGroup: GroupState;
  compiledRender: AssetCompiledRender;
  thumbStorageKey?: string | null;
  visibility: AssetSnapshotVisibility;
  createdAt: number;
};

export type AssetListingDocument = {
  listingId: AssetListingId;
  ownerAccountId: AccountId;
  assetHeadId: AssetHeadId;
  currentAssetVersionId: AssetVersionId;
  name: string;
  thumbStorageKey?: string | null;
  createdAt: number;
  updatedAt: number;
};

export type PublishedAssetDetailDocument = {
  listing: AssetListingDocument;
  currentVersion: AssetVersionSnapshotDocument;
};

export type OwnedWorldInstance = {
  instanceId: string;
  assetHeadId: AssetHeadId;
  overrideAssetHeadId?: AssetHeadId | null;
  logicTag?: string | null;
  position: VoxelCoord;
  rotation: GroupRotation;
};

export type OwnedWorldHeadDocument = {
  worldId: WorldId;
  ownerAccountId: AccountId;
  name: string;
  draftRevision: number;
  instances: OwnedWorldInstance[];
  thumbStorageKey?: string | null;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number | null;
};

export type OwnedWorldManifestItem = {
  worldId: WorldId;
  updatedAt: number;
  draftRevision: number;
  deletedAt?: number | null;
};

export type CreateOwnedWorldInput = {
  name: string;
  instances: OwnedWorldInstance[];
  thumbStorageKey?: string | null;
};

export type UpdateOwnedWorldInput = {
  expectedDraftRevision: number;
  name: string;
  instances: OwnedWorldInstance[];
  thumbStorageKey?: string | null;
};

export type PublishedWorldGroupSnapshot = {
  groupId: string;
  assetVersionId: AssetVersionId;
  sourceAssetHeadId: AssetHeadId;
  listingId?: AssetListingId | null;
  logicTag?: string | null;
  position: VoxelCoord;
  rotation: GroupRotation;
  bounds: {
    min: VoxelCoord;
    max: VoxelCoord;
  } | null;
  voxelCount: number;
  surfaces: AssetCompiledSurface[];
};

export type PublishedWorldSnapshotDocument = {
  publishedWorldId: PublishedWorldId;
  sourceWorldId: WorldId;
  ownerAccountId: AccountId;
  sourceWorldDraftRevision: number;
  worldName: string;
  voxelCount: number;
  groups: PublishedWorldGroupSnapshot[];
  createdAt: number;
};

export type PublishedWorldSummaryDocument = {
  publishedWorldId: PublishedWorldId;
  sourceWorldId: WorldId;
  ownerAccountId: AccountId;
  worldName: string;
  voxelCount: number;
  groupCount: number;
  createdAt: number;
};

export type ConflictResponse<T> = {
  ok: false;
  error: "conflict";
  current: T;
};

export type SuccessResponse<T> = {
  ok: true;
  value: T;
};

export type ErrorResponse = {
  ok: false;
  error: string;
};
