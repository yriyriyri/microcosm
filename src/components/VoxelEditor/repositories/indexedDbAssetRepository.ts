import type { AssetRepository } from "./AssetRepository";
import type {
  AssetId,
  AssetMetaRecord,
  AssetRecord,
  SaveAssetInput,
} from "../domain/assetTypes";

import {
  deleteAllAssets,
  deleteAsset,
  exportAssetToFiles,
  findAssetIdByName,
  getAssetMeta,
  getKv,
  listAssets,
  loadAsset,
  renameAsset,
  saveAsset,
  setKv,
} from "../database/AssetDb";

export class IndexedDbAssetRepository implements AssetRepository {
  async listAssets(): Promise<AssetMetaRecord[]> {
    return await listAssets();
  }

  async findAssetIdByName(name: string): Promise<AssetId | null> {
    return await findAssetIdByName(name);
  }

  async getAssetMeta(id: AssetId): Promise<AssetMetaRecord | null> {
    return await getAssetMeta(id);
  }

  async loadAsset(id: AssetId): Promise<AssetRecord | null> {
    return await loadAsset(id);
  }

  async saveAsset(input: SaveAssetInput): Promise<AssetId> {
    return await saveAsset(input);
  }

  async renameAsset(id: AssetId, name: string): Promise<void> {
    await renameAsset(id, name);
  }

  async deleteAsset(id: AssetId): Promise<void> {
    await deleteAsset(id);
  }

  async deleteAllAssets(): Promise<void> {
    await deleteAllAssets();
  }

  async exportAssetToFiles(id: AssetId): Promise<void> {
    await exportAssetToFiles(id);
  }

  async getKv<T = unknown>(key: string): Promise<T | null> {
    return await getKv<T>(key);
  }

  async setKv(key: string, value: unknown): Promise<void> {
    await setKv(key, value);
  }
}