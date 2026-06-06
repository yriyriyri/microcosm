import type { AssetMeta, AssetStoredRecord } from "../database/AssetDb";

export interface AssetStore {
  listAssets(): Promise<AssetMeta[]>;
  findAssetIdByName(name: string): Promise<string | null>;
  getAssetMeta(id: string): Promise<AssetMeta | null>;
  loadAsset(id: string): Promise<AssetStoredRecord | null>;
  saveAssetRecord(record: AssetStoredRecord): Promise<string>;
  deleteAsset(id: string): Promise<void>;
  deleteAllAssets(): Promise<void>;
  renameAsset(id: string, name: string): Promise<void>;
  updateAssetThumbnail(params: {
    assetId: string;
    thumb: Blob | null;
  }): Promise<void>;
  setAssetLibraryMembership(id: string, inLibrary: boolean): Promise<void>;
  isAssetInLibrary(id: string): Promise<boolean>;
  exportAssetToFiles(id: string): Promise<void>;
  getKv<T = unknown>(key: string): Promise<T | null>;
  setKv(key: string, value: unknown): Promise<void>;
}

export interface AssetSource extends AssetStore {}

export interface AssetCache extends AssetStore {}
