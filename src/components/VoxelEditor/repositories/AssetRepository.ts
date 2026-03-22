import type {
  AssetId,
  AssetMetaRecord,
  AssetRecord,
  SaveAssetInput,
} from "../domain/assetTypes";

export type AssetKvValue = unknown;

export interface AssetRepository {
  listAssets(): Promise<AssetMetaRecord[]>;

  listLibraryAssets(): Promise<AssetMetaRecord[]>;
  listMarketplaceAssets(): Promise<AssetMetaRecord[]>;
  listPublishedMarketplaceAssets(): Promise<AssetMetaRecord[]>;
  listPrivateAssets(): Promise<AssetMetaRecord[]>;

  findAssetIdByName(name: string): Promise<AssetId | null>;
  getAssetMeta(id: AssetId): Promise<AssetMetaRecord | null>;
  loadAsset(id: AssetId): Promise<AssetRecord | null>;

  saveAsset(input: SaveAssetInput): Promise<AssetId>;
  createPrivateAsset(input: SaveAssetInput): Promise<AssetId>;
  publishAssetToMarketplace(id: AssetId): Promise<AssetId>;
  forkAssetToPrivateDraft(
    id: AssetId,
    opts?: { name?: string; addToLibrary?: boolean }
  ): Promise<AssetId>;

  renameAsset(id: AssetId, name: string): Promise<void>;
  deleteAsset(id: AssetId): Promise<void>;
  deleteAllAssets(): Promise<void>;

  addAssetToLibrary(id: AssetId): Promise<void>;
  removeAssetFromLibrary(id: AssetId): Promise<void>;
  isAssetInLibrary(id: AssetId): Promise<boolean>;

  exportAssetToFiles(id: AssetId): Promise<void>;
  getKv<T = AssetKvValue>(key: string): Promise<T | null>;
  setKv(key: string, value: AssetKvValue): Promise<void>;
}