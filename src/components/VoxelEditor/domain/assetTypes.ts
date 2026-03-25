import type { GroupState } from "../VoxelWorld";

export type AssetId = string;
export type AssetVisibility = "private" | "marketplace";

export type AssetMetaRecord = {
  id: AssetId;
  name: string;
  createdAt: number;
  updatedAt: number;
  voxelCount: number;
  thumb?: Blob | null;

  visibility: AssetVisibility;
  inLibrary?: boolean;
  isPreset?: boolean;

  sourceAssetId?: string | null;
  linkedMarketplaceAssetId?: string | null;
  lineageAssetIds?: string[];
  publishedFromAssetId?: string | null;
  isImmutable?: boolean;
};

export type SaveAssetInput = {
  id?: string;
  name: string;
  group: GroupState;
  thumb?: Blob | null;

  visibility?: AssetVisibility;
  inLibrary?: boolean;
  isPreset?: boolean;

  sourceAssetId?: string | null;
  linkedMarketplaceAssetId?: string | null;
  lineageAssetIds?: string[];
  publishedFromAssetId?: string | null;
  isImmutable?: boolean;

  forceNewId?: boolean;
};

export type AssetRecord = {
  meta: AssetMetaRecord;
  group: GroupState;
};

export type AssetExportPayload = {
  id: AssetId;
  name: string;
  group: GroupState;
  thumb?: Blob | null;
};