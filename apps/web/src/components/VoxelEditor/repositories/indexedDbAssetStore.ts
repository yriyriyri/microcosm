import type { AssetCache, AssetSource } from "./assetStore";
import {
  deleteAllAssets,
  deleteAsset,
  exportAssetToFiles,
  findAssetIdByName,
  getAssetMeta,
  getKv,
  isAssetInLibrary,
  listAssets,
  loadAssetRecord,
  renameAsset,
  saveAssetRecord,
  setAssetLibraryMembership,
  setKv,
  updateAssetThumbnail,
} from "../database/AssetDb";

export class IndexedDbAssetStore implements AssetSource, AssetCache {
  async listAssets() {
    return await listAssets();
  }

  async findAssetIdByName(name: string) {
    return await findAssetIdByName(name);
  }

  async getAssetMeta(id: string) {
    return await getAssetMeta(id);
  }

  async loadAsset(id: string) {
    return await loadAssetRecord(id);
  }

  async saveAssetRecord(record: Parameters<typeof saveAssetRecord>[0]) {
    return await saveAssetRecord(record);
  }

  async deleteAsset(id: string) {
    await deleteAsset(id);
  }

  async deleteAllAssets() {
    await deleteAllAssets();
  }

  async renameAsset(id: string, name: string) {
    await renameAsset(id, name);
  }

  async updateAssetThumbnail(params: { assetId: string; thumb: Blob | null }) {
    await updateAssetThumbnail(params);
  }

  async setAssetLibraryMembership(id: string, inLibrary: boolean) {
    await setAssetLibraryMembership(id, inLibrary);
  }

  async isAssetInLibrary(id: string) {
    return await isAssetInLibrary(id);
  }

  async exportAssetToFiles(id: string) {
    await exportAssetToFiles(id);
  }

  async getKv<T = unknown>(key: string) {
    return await getKv<T>(key);
  }

  async setKv(key: string, value: unknown) {
    await setKv(key, value);
  }
}
