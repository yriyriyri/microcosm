import type { AssetRepository } from "./AssetRepository";
import type { GroupState } from "../VoxelWorld";
import type {
  AssetId,
  AssetMetaRecord,
  AssetRecord,
  SaveAssetInput,
} from "../domain/assetTypes";
import {
  assetRecordToDraftAssetDocument,
  assetRecordToMarketplaceAssetDocument,
} from "../domain/cloudMappers";
import type {
  DraftAssetDocument,
  MarketplaceAssetDocument,
} from "../domain/cloudAssetTypes";

import type { AssetMeta } from "../database/AssetDb";

import {
  acquireMarketplaceAssetToLibrary,
  createPrivateAsset,
  deleteAllAssets,
  deleteAsset,
  exportAssetToFiles,
  findAssetIdByName,
  forkAssetToPrivateDraft,
  getAssetMeta,
  getKv,
  isAssetInLibrary,
  listAssets,
  listLibraryAssets,
  listMarketplaceAssets,
  listPrivateAssets,
  listPublishedMarketplaceAssets,
  loadAsset,
  overwritePrivateAssetContent,
  saveNonStructuralAssetProgress,
  publishAssetToMarketplace,
  remixAssetFromSource,
  renameAsset,
  saveAsset,
  setAssetLibraryMembership,
  setKv,
} from "../database/AssetDb";

function toAssetMetaRecord(meta: AssetMeta): AssetMetaRecord {
  return {
    ...meta,
    visibility: meta.visibility ?? "private",
    inLibrary: meta.inLibrary ?? true,
    isPreset: meta.isPreset ?? false,
    sourceAssetId: meta.sourceAssetId ?? null,
    linkedMarketplaceAssetId: meta.linkedMarketplaceAssetId ?? null,
    lineageAssetIds: meta.lineageAssetIds ?? [],
    publishedFromAssetId: meta.publishedFromAssetId ?? null,
    isImmutable: meta.isImmutable ?? false,
  };
}

function toAssetRecord(
  loaded: Awaited<ReturnType<typeof loadAsset>>
): AssetRecord | null {
  if (!loaded) return null;
  return {
    meta: toAssetMetaRecord(loaded.meta),
    group: loaded.group,
  };
}

export class IndexedDbAssetRepository implements AssetRepository {
  async listAssets(): Promise<AssetMetaRecord[]> {
    return (await listAssets()).map(toAssetMetaRecord);
  }

  async listLibraryAssets(): Promise<AssetMetaRecord[]> {
    return (await listLibraryAssets()).map(toAssetMetaRecord);
  }

  async listMarketplaceAssets(): Promise<AssetMetaRecord[]> {
    return (await listMarketplaceAssets()).map(toAssetMetaRecord);
  }

  async listPublishedMarketplaceAssets(): Promise<AssetMetaRecord[]> {
    return (await listPublishedMarketplaceAssets()).map(toAssetMetaRecord);
  }

  async listPrivateAssets(): Promise<AssetMetaRecord[]> {
    return (await listPrivateAssets()).map(toAssetMetaRecord);
  }

  async findAssetIdByName(name: string): Promise<AssetId | null> {
    return await findAssetIdByName(name);
  }

  async getAssetMeta(id: AssetId): Promise<AssetMetaRecord | null> {
    const meta = await getAssetMeta(id);
    return meta ? toAssetMetaRecord(meta) : null;
  }

  async loadAsset(id: AssetId): Promise<AssetRecord | null> {
    return toAssetRecord(await loadAsset(id));
  }

  async saveAsset(input: SaveAssetInput): Promise<AssetId> {
    return await saveAsset(input);
  }

  async createPrivateAsset(input: SaveAssetInput): Promise<AssetId> {
    return await createPrivateAsset({
      name: input.name,
      group: input.group,
      thumb: input.thumb ?? null,
      sourceAssetId: input.sourceAssetId ?? null,
      linkedMarketplaceAssetId: input.linkedMarketplaceAssetId ?? null,
      lineageAssetIds: input.lineageAssetIds ?? [],
    });
  }

  async publishAssetToMarketplace(id: AssetId): Promise<AssetId> {
    return await publishAssetToMarketplace(id);
  }

  async forkAssetToPrivateDraft(
    id: AssetId,
    opts?: { name?: string; addToLibrary?: boolean }
  ): Promise<AssetId> {
    return await forkAssetToPrivateDraft(id, opts);
  }

  async overwritePrivateAssetContent(params: {
    assetId: AssetId;
    group: GroupState;
    thumb?: Blob | null;
  }): Promise<AssetId> {
    return await overwritePrivateAssetContent(params);
  }

  async saveNonStructuralAssetProgress(params: {
    assetId: AssetId;
    group: GroupState;
    thumb?: Blob | null;
  }): Promise<AssetId> {
    return await saveNonStructuralAssetProgress(params);
  }

  async remixAssetFromSource(params: {
    sourceAssetId: AssetId | null;
    lineageAssetIds?: AssetId[];
    name: string;
    group: GroupState;
    thumb?: Blob | null;
  }): Promise<AssetId> {
    return await remixAssetFromSource(params);
  }

  async acquireMarketplaceAssetToLibrary(
    id: AssetId,
    opts?: { name?: string }
  ): Promise<AssetId> {
    return await acquireMarketplaceAssetToLibrary(id, opts);
  }

  async loadDraftAssetDocument(
    id: AssetId,
    ownerAccountId: string | null = null
  ): Promise<DraftAssetDocument | null> {
    const record = await this.loadAsset(id);
    if (!record) return null;
    return assetRecordToDraftAssetDocument(record, ownerAccountId);
  }

  async loadMarketplaceAssetDocument(
    id: AssetId,
    creatorAccountId: string | null = null
  ): Promise<MarketplaceAssetDocument | null> {
    const record = await this.loadAsset(id);
    if (!record) return null;
    return assetRecordToMarketplaceAssetDocument(record, creatorAccountId);
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

  async addAssetToLibrary(id: AssetId): Promise<void> {
    await setAssetLibraryMembership(id, true);
  }

  async removeAssetFromLibrary(id: AssetId): Promise<void> {
    await setAssetLibraryMembership(id, false);
  }

  async isAssetInLibrary(id: AssetId): Promise<boolean> {
    return await isAssetInLibrary(id);
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