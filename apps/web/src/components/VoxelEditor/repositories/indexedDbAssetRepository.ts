import type { AssetCache, AssetSource } from "./assetStore";
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
  draftAssetDocumentToSaveAssetInput,
  marketplaceAssetDocumentToSaveAssetInput,
} from "../domain/cloudMappers";
import type {
  DraftAssetDocument,
  MarketplaceAssetDocument,
  SaveDraftAssetDocumentInput,
  SaveMarketplaceAssetDocumentInput,
} from "../domain/cloudAssetTypes";
import {
  ASSET_COMPILED_RENDER_VERSION,
  type AssetCompiledRender,
} from "../domain/compiledAssetTypes";
import { buildAssetCompiledRender } from "../domain/buildAssetCompiledRender";
import type { AssetMeta, AssetStoredRecord } from "../database/AssetDb";
import type { AssetRepository } from "./AssetRepository";

function makeId(): string {
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function normalizeVisibility(
  visibility?: AssetMeta["visibility"] | "system"
): "private" | "marketplace" {
  if (visibility === "system") return "marketplace";
  return visibility ?? "private";
}

function normalizeAssetMeta(meta: AssetMeta): AssetMeta {
  const visibility = normalizeVisibility(meta.visibility);
  const isImmutable = meta.isImmutable ?? visibility === "marketplace";
  const inLibrary = meta.inLibrary ?? visibility === "private";

  return {
    ...meta,
    visibility,
    inLibrary,
    isPreset: meta.isPreset ?? false,
    thumbStorageKey: meta.thumbStorageKey ?? null,
    sourceAssetId: meta.sourceAssetId ?? null,
    linkedMarketplaceAssetId: meta.linkedMarketplaceAssetId ?? null,
    lineageAssetIds: Array.isArray(meta.lineageAssetIds)
      ? meta.lineageAssetIds
      : [],
    publishedFromAssetId: meta.publishedFromAssetId ?? null,
    isImmutable,
  };
}

function toAssetMetaRecord(meta: AssetMeta): AssetMetaRecord {
  const normalized = normalizeAssetMeta(meta);
  return {
    ...normalized,
    visibility: normalized.visibility ?? "private",
    inLibrary: normalized.inLibrary ?? true,
    isPreset: normalized.isPreset ?? false,
    thumbStorageKey: normalized.thumbStorageKey ?? null,
    sourceAssetId: normalized.sourceAssetId ?? null,
    linkedMarketplaceAssetId: normalized.linkedMarketplaceAssetId ?? null,
    lineageAssetIds: normalized.lineageAssetIds ?? [],
    publishedFromAssetId: normalized.publishedFromAssetId ?? null,
    isImmutable: normalized.isImmutable ?? false,
  };
}

function toAssetRecord(record: AssetStoredRecord): AssetRecord {
  return {
    meta: toAssetMetaRecord(record.meta),
    group: record.group,
    compiledRender:
      record.compiledRender ?? buildAssetCompiledRender(record.group),
  };
}

export class IndexedDbAssetRepository implements AssetRepository {
  constructor(
    private readonly source: AssetSource,
    private readonly cache: AssetCache
  ) {}

  private async writeThrough(record: AssetStoredRecord): Promise<void> {
    await this.source.saveAssetRecord(record);
    if (this.cache !== this.source) {
      await this.cache.saveAssetRecord(record);
    }
  }

  private async deleteThrough(id: string): Promise<void> {
    await this.source.deleteAsset(id);
    if (this.cache !== this.source) {
      await this.cache.deleteAsset(id);
    }
  }

  private async buildStoredRecord(input: SaveAssetInput): Promise<AssetStoredRecord> {
    const now = Date.now();
    const existingIdByName =
      input.id || input.forceNewId
        ? null
        : await this.source.findAssetIdByName(input.name).catch(() => null);

    const id = input.id ?? existingIdByName ?? makeId();
    const existing = await this.source.loadAsset(id).catch(() => null);
    const existingMeta = existing?.meta ?? null;

    const nextVisibility =
      normalizeVisibility(input.visibility) ??
      existingMeta?.visibility ??
      "private";

    const nextImmutable =
      input.isImmutable ??
      existingMeta?.isImmutable ??
      (nextVisibility === "marketplace");

    const nextInLibrary =
      input.inLibrary ??
      existingMeta?.inLibrary ??
      (nextVisibility === "private");

    const meta = normalizeAssetMeta({
      id,
      name: input.name,
      createdAt: existingMeta?.createdAt ?? now,
      updatedAt: now,
      voxelCount: input.group.voxels.length | 0,
      thumb: input.thumb ?? existingMeta?.thumb ?? null,
      thumbStorageKey:
        input.thumbStorageKey !== undefined
          ? input.thumbStorageKey
          : existingMeta?.thumbStorageKey ?? null,
      visibility: nextVisibility,
      inLibrary: nextInLibrary,
      isPreset: input.isPreset ?? existingMeta?.isPreset ?? false,
      sourceAssetId: input.sourceAssetId ?? existingMeta?.sourceAssetId ?? null,
      linkedMarketplaceAssetId:
        input.linkedMarketplaceAssetId ??
        existingMeta?.linkedMarketplaceAssetId ??
        null,
      lineageAssetIds:
        input.lineageAssetIds ?? existingMeta?.lineageAssetIds ?? [],
      publishedFromAssetId:
        input.publishedFromAssetId ?? existingMeta?.publishedFromAssetId ?? null,
      isImmutable: nextImmutable,
    });

    return {
      meta,
      group: input.group,
      compiledRender: buildAssetCompiledRender(input.group),
    };
  }

  private async healCompiledRender(
    record: AssetStoredRecord,
    opts?: { persist?: boolean }
  ): Promise<AssetStoredRecord> {
    const shouldRebuild =
      !record.compiledRender ||
      record.compiledRender.version !== ASSET_COMPILED_RENDER_VERSION;

    if (!shouldRebuild) return record;

    const healed: AssetStoredRecord = {
      ...record,
      compiledRender: buildAssetCompiledRender(record.group),
    };

    if (opts?.persist !== false) {
      await this.writeThrough(healed);
    }

    return healed;
  }

  async listAssets(): Promise<AssetMetaRecord[]> {
    return (await this.cache.listAssets()).map(toAssetMetaRecord);
  }

  async listLibraryAssets(): Promise<AssetMetaRecord[]> {
    return (await this.listAssets()).filter((asset) => !!asset.inLibrary);
  }

  async listMarketplaceAssets(): Promise<AssetMetaRecord[]> {
    return (await this.listAssets()).filter(
      (asset) => asset.visibility === "marketplace"
    );
  }

  async listPublishedMarketplaceAssets(): Promise<AssetMetaRecord[]> {
    return (await this.listAssets()).filter(
      (asset) => asset.visibility === "marketplace" && !asset.isPreset
    );
  }

  async listPrivateAssets(): Promise<AssetMetaRecord[]> {
    return (await this.listAssets()).filter(
      (asset) => asset.visibility === "private"
    );
  }

  async findAssetIdByName(name: string): Promise<AssetId | null> {
    return await this.cache.findAssetIdByName(name);
  }

  async getAssetMeta(id: AssetId): Promise<AssetMetaRecord | null> {
    const cached = await this.cache.getAssetMeta(id);
    if (cached) return toAssetMetaRecord(cached);

    const sourceRecord = await this.source.loadAsset(id);
    if (!sourceRecord) return null;

    const healed = await this.healCompiledRender(sourceRecord);
    if (this.cache !== this.source) {
      await this.cache.saveAssetRecord(healed);
    }

    return toAssetMetaRecord(healed.meta);
  }

  async loadAsset(id: AssetId): Promise<AssetRecord | null> {
    const cached = await this.cache.loadAsset(id);
    if (cached) {
      const healed = await this.healCompiledRender(cached);
      return toAssetRecord(healed);
    }

    const sourceRecord = await this.source.loadAsset(id);
    if (!sourceRecord) return null;

    const healed = await this.healCompiledRender(sourceRecord);
    if (this.cache !== this.source) {
      await this.cache.saveAssetRecord(healed);
    }

    return toAssetRecord(healed);
  }

  async saveAsset(input: SaveAssetInput): Promise<AssetId> {
    const record = await this.buildStoredRecord(input);
    await this.writeThrough(record);
    return record.meta.id;
  }

  async createPrivateAsset(input: SaveAssetInput): Promise<AssetId> {
    return await this.saveAsset({
      name: input.name,
      group: input.group,
      thumb: input.thumb ?? null,
      thumbStorageKey: null,
      visibility: "private",
      inLibrary: true,
      isImmutable: false,
      sourceAssetId: input.sourceAssetId ?? null,
      linkedMarketplaceAssetId: input.linkedMarketplaceAssetId ?? null,
      lineageAssetIds: input.lineageAssetIds ?? [],
      publishedFromAssetId: null,
      forceNewId: true,
    });
  }

  async publishAssetToMarketplace(id: AssetId): Promise<AssetId> {
    const loaded = await this.loadAsset(id);
    if (!loaded) throw new Error("Asset not found");

    const sourceMeta = loaded.meta;

    return await this.saveAsset({
      name: loaded.meta.name,
      group: loaded.group,
      thumb: loaded.meta.thumb ?? null,
      thumbStorageKey: null,
      visibility: "marketplace",
      inLibrary: false,
      isImmutable: true,
      isPreset: false,
      linkedMarketplaceAssetId: null,
      lineageAssetIds: sourceMeta.lineageAssetIds ?? [],
      publishedFromAssetId: sourceMeta.id,
      forceNewId: true,
    });
  }

  async forkAssetToPrivateDraft(
    id: AssetId,
    opts?: { name?: string; addToLibrary?: boolean }
  ): Promise<AssetId> {
    const loaded = await this.loadAsset(id);
    if (!loaded) throw new Error("Asset not found");

    const sourceMeta = loaded.meta;
    const lineageAssetIds = [
      ...(sourceMeta.lineageAssetIds ?? []),
      sourceMeta.id,
    ].filter((value, index, arr) => !!value && arr.indexOf(value) === index);

    return await this.saveAsset({
      name: opts?.name ?? loaded.meta.name,
      group: loaded.group,
      thumb: loaded.meta.thumb ?? null,
      thumbStorageKey: null,
      visibility: "private",
      inLibrary: opts?.addToLibrary ?? true,
      isImmutable: false,
      sourceAssetId: sourceMeta.id,
      linkedMarketplaceAssetId: null,
      lineageAssetIds,
      forceNewId: true,
    });
  }

  async overwritePrivateAssetContent(params: {
    assetId: AssetId;
    group: GroupState;
    thumb?: Blob | null;
  }): Promise<AssetId> {
    const loaded = await this.loadAsset(params.assetId);
    if (!loaded) throw new Error("Asset not found");

    const meta = loaded.meta;

    if (meta.visibility !== "private" || meta.isImmutable) {
      throw new Error("Only mutable private assets can be overwritten");
    }

    if (meta.linkedMarketplaceAssetId) {
      throw new Error(
        "Marketplace-linked assets cannot be structurally overwritten"
      );
    }

    return await this.saveAsset({
      id: meta.id,
      name: meta.name,
      group: params.group,
      thumb: params.thumb ?? meta.thumb ?? null,
      thumbStorageKey: meta.thumbStorageKey ?? null,
      visibility: meta.visibility,
      inLibrary: meta.inLibrary ?? true,
      isPreset: meta.isPreset ?? false,
      sourceAssetId: meta.sourceAssetId ?? null,
      linkedMarketplaceAssetId: meta.linkedMarketplaceAssetId ?? null,
      lineageAssetIds: meta.lineageAssetIds ?? [],
      publishedFromAssetId: meta.publishedFromAssetId ?? null,
      isImmutable: false,
      forceNewId: false,
    });
  }

  async saveNonStructuralAssetProgress(params: {
    assetId: AssetId;
    group: GroupState;
    thumb?: Blob | null;
  }): Promise<AssetId> {
    const loaded = await this.loadAsset(params.assetId);
    if (!loaded) throw new Error("Asset not found");

    const meta = loaded.meta;

    if (meta.visibility !== "private" || meta.isImmutable) {
      throw new Error("Only mutable private assets can save local progress");
    }

    return await this.saveAsset({
      id: meta.id,
      name: meta.name,
      group: params.group,
      thumb: params.thumb ?? meta.thumb ?? null,
      thumbStorageKey: meta.thumbStorageKey ?? null,
      visibility: meta.visibility,
      inLibrary: meta.inLibrary ?? true,
      isPreset: meta.isPreset ?? false,
      sourceAssetId: meta.sourceAssetId ?? null,
      linkedMarketplaceAssetId: meta.linkedMarketplaceAssetId ?? null,
      lineageAssetIds: meta.lineageAssetIds ?? [],
      publishedFromAssetId: meta.publishedFromAssetId ?? null,
      isImmutable: false,
      forceNewId: false,
    });
  }

  async remixAssetFromSource(params: {
    sourceAssetId: AssetId | null;
    lineageAssetIds?: AssetId[];
    name: string;
    group: GroupState;
    thumb?: Blob | null;
  }): Promise<AssetId> {
    return await this.saveAsset({
      name: params.name,
      group: params.group,
      thumb: params.thumb ?? null,
      thumbStorageKey: null,
      visibility: "private",
      inLibrary: true,
      isImmutable: false,
      isPreset: false,
      sourceAssetId: params.sourceAssetId ?? null,
      linkedMarketplaceAssetId: null,
      lineageAssetIds: params.lineageAssetIds ?? [],
      publishedFromAssetId: null,
      forceNewId: true,
    });
  }

  async updateAssetThumbnail(params: {
    assetId: AssetId;
    thumb: Blob | null;
  }): Promise<void> {
    await this.source.updateAssetThumbnail(params);
    if (this.cache !== this.source) {
      await this.cache.updateAssetThumbnail(params);
    }
  }

  async acquireMarketplaceAssetToLibrary(
    id: AssetId,
    opts?: { name?: string }
  ): Promise<AssetId> {
    const loaded = await this.loadAsset(id);
    if (!loaded) throw new Error("Asset not found");

    const sourceMeta = loaded.meta;

    if (sourceMeta.visibility !== "marketplace") {
      throw new Error("Only marketplace assets can be acquired");
    }

    const existing = (await this.listAssets()).find(
      (asset) =>
        asset.visibility === "private" &&
        asset.linkedMarketplaceAssetId === sourceMeta.id
    );

    if (existing) {
      await this.addAssetToLibrary(existing.id);
      return existing.id;
    }

    return await this.saveAsset({
      name: opts?.name ?? loaded.meta.name,
      group: loaded.group,
      thumb: loaded.meta.thumb ?? null,
      thumbStorageKey: null,
      visibility: "private",
      inLibrary: true,
      isImmutable: false,
      sourceAssetId: sourceMeta.id,
      linkedMarketplaceAssetId: sourceMeta.id,
      lineageAssetIds: [...(sourceMeta.lineageAssetIds ?? []), sourceMeta.id]
        .filter((value, index, arr) => !!value && arr.indexOf(value) === index),
      publishedFromAssetId: null,
      forceNewId: true,
    });
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

  async saveDraftAssetDocument(
    input: SaveDraftAssetDocumentInput
  ): Promise<AssetId> {
    return await this.saveAsset(draftAssetDocumentToSaveAssetInput(input));
  }

  async saveMarketplaceAssetDocument(
    input: SaveMarketplaceAssetDocumentInput
  ): Promise<AssetId> {
    return await this.saveAsset(marketplaceAssetDocumentToSaveAssetInput(input));
  }

  async renameAsset(id: AssetId, name: string): Promise<void> {
    await this.source.renameAsset(id, name);
    if (this.cache !== this.source) {
      await this.cache.renameAsset(id, name);
    }
  }

  async deleteAsset(id: AssetId): Promise<void> {
    await this.deleteThrough(id);
  }

  async deleteAllAssets(): Promise<void> {
    await this.source.deleteAllAssets();
    if (this.cache !== this.source) {
      await this.cache.deleteAllAssets();
    }
  }

  async addAssetToLibrary(id: AssetId): Promise<void> {
    await this.source.setAssetLibraryMembership(id, true);
    if (this.cache !== this.source) {
      await this.cache.setAssetLibraryMembership(id, true);
    }
  }

  async removeAssetFromLibrary(id: AssetId): Promise<void> {
    await this.source.setAssetLibraryMembership(id, false);
    if (this.cache !== this.source) {
      await this.cache.setAssetLibraryMembership(id, false);
    }
  }

  async isAssetInLibrary(id: AssetId): Promise<boolean> {
    return await this.cache.isAssetInLibrary(id);
  }

  async exportAssetToFiles(id: AssetId): Promise<void> {
    await this.source.exportAssetToFiles(id);
  }

  async getKv<T = unknown>(key: string): Promise<T | null> {
    return await this.cache.getKv<T>(key);
  }

  async setKv(key: string, value: unknown): Promise<void> {
    await this.source.setKv(key, value);
    if (this.cache !== this.source) {
      await this.cache.setKv(key, value);
    }
  }
}
