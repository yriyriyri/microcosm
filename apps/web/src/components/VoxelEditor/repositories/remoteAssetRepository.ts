import {
  assetRecordToDraftAssetDocument,
  assetRecordToMarketplaceAssetDocument,
  draftAssetDocumentToSaveAssetInput,
} from "../domain/cloudMappers";
import type {
  DraftAssetDocument,
  MarketplaceAssetDocument,
  SaveDraftAssetDocumentInput,
  SaveMarketplaceAssetDocumentInput,
} from "../domain/cloudAssetTypes";
import type {
  AssetId,
  AssetMetaRecord,
  AssetRecord,
  SaveAssetInput,
} from "../domain/assetTypes";
import type { GroupState } from "../VoxelWorld";
import type { AssetRepository, AssetKvValue } from "./AssetRepository";
import { getStoredAuthentication } from "@/components/Auth/state";
import {
  createOwnedAsset,
  deleteOwnedAsset as deleteOwnedAssetRemote,
  getOwnedAsset,
  getPublishedAsset,
  listOwnedAssetManifest,
  listPublishedAssets,
  publishOwnedAsset as publishOwnedAssetRemote,
  updateOwnedAsset,
} from "@/services/versionedAssets";
import type {
  CreateOwnedAssetInput,
  DraftAssetKind,
  OwnedAssetHeadDocument,
  PublishedAssetDetailDocument,
  UpdateOwnedAssetInput,
} from "@microcosm/voxel-core";
import { OwnedAssetCache, deleteOwnedAssetCache } from "./ownedAssetCache";
import { blobToDataUrl, dataUrlToBlob } from "./repositoryMedia";

const OWNER_NAMESPACE_KEY = "voxl:last-owned-asset-owner";
const MANIFEST_SYNC_TTL_MS = 5_000;
const PUBLISHED_LIST_TTL_MS = 10_000;

function isPresetListingId(value: string | null | undefined): boolean {
  return typeof value === "string" && value.startsWith("preset_");
}

function safeSlug(name: string): string {
  return (
    (name || "asset")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80) || "asset"
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function currentOwnerId(): string | null {
  return getStoredAuthentication().me?.user_id ?? null;
}

function requireOwnerId(): string {
  const ownerId = currentOwnerId();
  if (!ownerId) {
    throw new Error("You must be logged in to access owned assets.");
  }

  return ownerId;
}

function draftKindFromLegacy(input: {
  inLibrary?: boolean;
  linkedMarketplaceAssetId?: string | null;
}): DraftAssetKind {
  if (input.inLibrary === false && !input.linkedMarketplaceAssetId) {
    return "override";
  }

  return "normal";
}

async function thumbToStorageKey(thumb: Blob | null | undefined): Promise<string | null | undefined> {
  if (thumb === undefined) return undefined;
  if (thumb === null) return null;
  return await blobToDataUrl(thumb);
}

function ownedDocToAssetRecord(doc: OwnedAssetHeadDocument): AssetRecord {
  const linkedMarketplaceAssetId = doc.linkedListingId ?? null;
  const lineageAssetIds = doc.lineageAssetHeadIds ?? [];

  return {
    meta: {
      id: doc.assetHeadId,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      voxelCount: doc.compiledRender.voxelCount,
      thumb: dataUrlToBlob(doc.thumbStorageKey),
      thumbStorageKey: doc.thumbStorageKey ?? null,
      visibility: "private",
      inLibrary: doc.isLibraryItem,
      isPreset:
        isPresetListingId(linkedMarketplaceAssetId) ||
        lineageAssetIds.some((value) => isPresetListingId(value)),
      sourceAssetId: doc.sourceAssetHeadId ?? null,
      linkedMarketplaceAssetId,
      lineageAssetIds,
      publishedFromAssetId: null,
      isImmutable: false,
    },
    group: doc.voxelGroup,
    compiledRender: doc.compiledRender,
  };
}

function publishedDetailToAssetRecord(detail: PublishedAssetDetailDocument): AssetRecord {
  const { listing, currentVersion } = detail;
  const lineageAssetIds = [listing.listingId, currentVersion.assetHeadId].filter(
    (value, index, arr) => !!value && arr.indexOf(value) === index
  );

  return {
    meta: {
      id: listing.listingId,
      name: listing.name,
      createdAt: listing.createdAt,
      updatedAt: listing.updatedAt,
      voxelCount: currentVersion.compiledRender.voxelCount,
      thumb: dataUrlToBlob(
        currentVersion.thumbStorageKey ?? listing.thumbStorageKey ?? null
      ),
      thumbStorageKey:
        currentVersion.thumbStorageKey ?? listing.thumbStorageKey ?? null,
      visibility: "marketplace",
      inLibrary: false,
      isPreset: isPresetListingId(listing.listingId),
      sourceAssetId: currentVersion.assetHeadId,
      linkedMarketplaceAssetId: listing.listingId,
      lineageAssetIds,
      publishedFromAssetId: currentVersion.assetHeadId,
      isImmutable: true,
    },
    group: currentVersion.voxelGroup,
    compiledRender: currentVersion.compiledRender,
  };
}

export class RemoteAssetRepository implements AssetRepository {
  private readonly caches = new Map<string, OwnedAssetCache>();
  private readonly ownerSyncPromises = new Map<string, Promise<void>>();
  private readonly ownerSyncedAt = new Map<string, number>();
  private readonly publishedByListingId = new Map<string, PublishedAssetDetailDocument>();
  private publishedSyncedAt = 0;

  private cacheFor(ownerId: string) {
    let cache = this.caches.get(ownerId);
    if (!cache) {
      cache = new OwnedAssetCache(ownerId);
      this.caches.set(ownerId, cache);
    }

    return cache;
  }

  private async cleanupOwnerNamespace(ownerId: string): Promise<void> {
    if (typeof window === "undefined") return;

    const previousOwner = window.localStorage.getItem(OWNER_NAMESPACE_KEY);
    if (previousOwner && previousOwner !== ownerId) {
      try {
        await deleteOwnedAssetCache(previousOwner);
      } catch (error) {
        console.warn("Failed to delete previous owned asset cache", error);
      }
    }

    window.localStorage.setItem(OWNER_NAMESPACE_KEY, ownerId);
  }

  private async syncOwnedAssets(force = false): Promise<void> {
    const ownerId = currentOwnerId();
    if (!ownerId) return;

    const lastSyncedAt = this.ownerSyncedAt.get(ownerId) ?? 0;
    if (!force && Date.now() - lastSyncedAt < MANIFEST_SYNC_TTL_MS) {
      return;
    }

    const existing = this.ownerSyncPromises.get(ownerId);
    if (existing) {
      await existing;
      return;
    }

    const promise = (async () => {
      await this.cleanupOwnerNamespace(ownerId);

      const cache = this.cacheFor(ownerId);
      const manifest = await listOwnedAssetManifest();
      const manifestById = new Map(manifest.map((item) => [item.assetHeadId, item]));
      const cachedMetas = await cache.listMeta();

      await Promise.all(
        cachedMetas.map(async (meta) => {
          const row = manifestById.get(meta.id);
          if (!row || row.deletedAt) {
            await cache.delete(meta.id);
          }
        })
      );

      await Promise.all(
        manifest.map(async (item) => {
          if (item.deletedAt) {
            await cache.delete(item.assetHeadId);
            return;
          }

          const cachedMeta = await cache.getMeta(item.assetHeadId);
          if (
            cachedMeta &&
            cachedMeta.updatedAt === item.updatedAt
          ) {
            return;
          }

          const doc = await getOwnedAsset(item.assetHeadId);
          if (!doc) return;
          await cache.save(ownedDocToAssetRecord(doc));
        })
      );

      this.ownerSyncedAt.set(ownerId, Date.now());
    })().finally(() => {
      this.ownerSyncPromises.delete(ownerId);
    });

    this.ownerSyncPromises.set(ownerId, promise);
    await promise;
  }

  private async syncPublishedAssets(force = false): Promise<void> {
    if (!force && Date.now() - this.publishedSyncedAt < PUBLISHED_LIST_TTL_MS) {
      return;
    }

    const rows = await listPublishedAssets();
    this.publishedByListingId.clear();
    for (const row of rows) {
      this.publishedByListingId.set(row.listing.listingId, row);
    }
    this.publishedSyncedAt = Date.now();
  }

  private async getOwnedRecord(id: string): Promise<AssetRecord | null> {
    await this.syncOwnedAssets();

    const ownerId = currentOwnerId();
    if (!ownerId) return null;

    const cache = this.cacheFor(ownerId);
    return await cache.load(id);
  }

  private async getPublishedDetail(
    listingId: string
  ): Promise<PublishedAssetDetailDocument | null> {
    await this.syncPublishedAssets();

    const cached = this.publishedByListingId.get(listingId);
    if (cached) return cached;

    try {
      const detail = await getPublishedAsset(listingId);
      if (!detail) return null;
      this.publishedByListingId.set(listingId, detail);
      return detail;
    } catch {
      return null;
    }
  }

  private async buildCreateInput(input: SaveAssetInput): Promise<CreateOwnedAssetInput> {
    return {
      name: input.name,
      voxelGroup: input.group,
      thumbStorageKey: await thumbToStorageKey(input.thumb ?? null),
      sourceAssetHeadId: input.sourceAssetId ?? null,
      linkedListingId: input.linkedMarketplaceAssetId ?? null,
      lineageAssetHeadIds: input.lineageAssetIds ?? [],
      draftKind: draftKindFromLegacy(input),
      isLibraryItem: input.inLibrary ?? true,
    };
  }

  private async updateOwnedRecord(
    current: OwnedAssetHeadDocument,
    input: SaveAssetInput,
    attempt = 0
  ): Promise<OwnedAssetHeadDocument> {
    const payload: UpdateOwnedAssetInput = {
      expectedDraftRevision: current.draftRevision,
      name: input.name,
      voxelGroup: input.group,
      thumbStorageKey:
        (await thumbToStorageKey(input.thumb)) ??
        current.thumbStorageKey ??
        null,
      sourceAssetHeadId:
        input.sourceAssetId ?? current.sourceAssetHeadId ?? null,
      linkedListingId:
        input.linkedMarketplaceAssetId ?? current.linkedListingId ?? null,
      lineageAssetHeadIds:
        input.lineageAssetIds ?? current.lineageAssetHeadIds ?? [],
      draftKind: draftKindFromLegacy({
        inLibrary: input.inLibrary ?? current.isLibraryItem,
        linkedMarketplaceAssetId:
          input.linkedMarketplaceAssetId ?? current.linkedListingId ?? null,
      }),
      isLibraryItem: input.inLibrary ?? current.isLibraryItem,
    };

    const result = await updateOwnedAsset(current.assetHeadId, payload);
    if (result.ok) {
      await this.cacheFor(current.ownerAccountId).save(
        ownedDocToAssetRecord(result.value)
      );
      this.ownerSyncedAt.set(current.ownerAccountId, Date.now());
      return result.value;
    }

    await this.cacheFor(current.ownerAccountId).save(
      ownedDocToAssetRecord(result.current)
    );

    if (attempt >= 1) {
      throw new Error("Asset changed remotely during save.");
    }

    return await this.updateOwnedRecord(result.current, input, attempt + 1);
  }

  async listAssets(): Promise<AssetMetaRecord[]> {
    const [owned, published] = await Promise.all([
      this.listPrivateAssets(),
      this.listMarketplaceAssets(),
    ]);

    return [...owned, ...published].sort((a, b) => b.updatedAt - a.updatedAt);
  }

  async listLibraryAssets(): Promise<AssetMetaRecord[]> {
    await this.syncOwnedAssets();

    const ownerId = currentOwnerId();
    if (!ownerId) return [];

    return (await this.cacheFor(ownerId).listMeta()).filter((meta) => !!meta.inLibrary);
  }

  async listMarketplaceAssets(): Promise<AssetMetaRecord[]> {
    await this.syncPublishedAssets();

    return Array.from(this.publishedByListingId.values())
      .map((detail) => publishedDetailToAssetRecord(detail).meta)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }

  async listPublishedMarketplaceAssets(): Promise<AssetMetaRecord[]> {
    return (await this.listMarketplaceAssets()).filter((asset) => !asset.isPreset);
  }

  async listPrivateAssets(): Promise<AssetMetaRecord[]> {
    await this.syncOwnedAssets();

    const ownerId = currentOwnerId();
    if (!ownerId) return [];

    return await this.cacheFor(ownerId).listMeta();
  }

  async findAssetIdByName(name: string): Promise<AssetId | null> {
    await this.syncOwnedAssets();

    const ownerId = currentOwnerId();
    if (!ownerId) return null;

    return await this.cacheFor(ownerId).findIdByName(name);
  }

  async getAssetMeta(id: AssetId): Promise<AssetMetaRecord | null> {
    const owned = await this.getOwnedRecord(id);
    if (owned) return owned.meta;

    const published = await this.getPublishedDetail(id);
    return published ? publishedDetailToAssetRecord(published).meta : null;
  }

  async loadAsset(id: AssetId): Promise<AssetRecord | null> {
    const owned = await this.getOwnedRecord(id);
    if (owned) return owned;

    const published = await this.getPublishedDetail(id);
    return published ? publishedDetailToAssetRecord(published) : null;
  }

  async saveAsset(input: SaveAssetInput): Promise<AssetId> {
    if (input.visibility === "marketplace") {
      throw new Error("Direct marketplace asset saves are not supported.");
    }

    const ownerId = requireOwnerId();

    if (!input.id || input.forceNewId) {
      const created = await createOwnedAsset(await this.buildCreateInput(input));
      await this.cacheFor(ownerId).save(ownedDocToAssetRecord(created));
      this.ownerSyncedAt.set(ownerId, Date.now());
      return created.assetHeadId;
    }

    const current = await getOwnedAsset(input.id);

    if (!current) {
      const created = await createOwnedAsset(await this.buildCreateInput(input));
      await this.cacheFor(ownerId).save(ownedDocToAssetRecord(created));
      this.ownerSyncedAt.set(ownerId, Date.now());
      return created.assetHeadId;
    }

    const updated = await this.updateOwnedRecord(current, input);
    return updated.assetHeadId;
  }

  async createPrivateAsset(input: SaveAssetInput): Promise<AssetId> {
    return await this.saveAsset({
      name: input.name,
      group: input.group,
      thumb: input.thumb ?? null,
      thumbStorageKey: input.thumbStorageKey ?? null,
      visibility: "private",
      inLibrary: input.inLibrary ?? true,
      isImmutable: false,
      sourceAssetId: input.sourceAssetId ?? null,
      linkedMarketplaceAssetId: input.linkedMarketplaceAssetId ?? null,
      lineageAssetIds: input.lineageAssetIds ?? [],
      forceNewId: true,
    });
  }

  async publishAssetToMarketplace(id: AssetId): Promise<AssetId> {
    const detail = await publishOwnedAssetRemote(id);
    this.publishedByListingId.set(detail.listing.listingId, detail);
    this.publishedSyncedAt = Date.now();
    return detail.listing.listingId;
  }

  async forkAssetToPrivateDraft(
    id: AssetId,
    opts?: { name?: string; addToLibrary?: boolean }
  ): Promise<AssetId> {
    const loaded = await this.loadAsset(id);
    if (!loaded) throw new Error("Asset not found");

    const sourceAssetId =
      loaded.meta.sourceAssetId ?? loaded.meta.publishedFromAssetId ?? loaded.meta.id;
    const lineageAssetIds = [
      ...(loaded.meta.lineageAssetIds ?? []),
      sourceAssetId,
    ].filter((value, index, arr) => !!value && arr.indexOf(value) === index);

    return await this.createPrivateAsset({
      name: opts?.name ?? loaded.meta.name,
      group: loaded.group,
      thumb: loaded.meta.thumb ?? null,
      sourceAssetId,
      linkedMarketplaceAssetId: null,
      lineageAssetIds,
      inLibrary: opts?.addToLibrary ?? true,
      forceNewId: true,
    });
  }

  async acquireMarketplaceAssetToLibrary(
    id: AssetId,
    opts?: { name?: string }
  ): Promise<AssetId> {
    const detail = await this.getPublishedDetail(id);
    if (!detail) throw new Error("Marketplace asset not found");

    const owned = await this.listPrivateAssets();
    const existing = owned.find(
      (asset) => asset.linkedMarketplaceAssetId === detail.listing.listingId
    );

    if (existing) {
      await this.addAssetToLibrary(existing.id);
      return existing.id;
    }

    return await this.createPrivateAsset({
      name: opts?.name ?? detail.listing.name,
      group: detail.currentVersion.voxelGroup,
      thumb: dataUrlToBlob(
        detail.currentVersion.thumbStorageKey ??
          detail.listing.thumbStorageKey ??
          null
      ),
      sourceAssetId: detail.currentVersion.assetHeadId,
      linkedMarketplaceAssetId: detail.listing.listingId,
      lineageAssetIds: [
        detail.listing.listingId,
        detail.currentVersion.assetHeadId,
      ],
      inLibrary: true,
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

    if (loaded.meta.visibility !== "private" || loaded.meta.isImmutable) {
      throw new Error("Only mutable private assets can be overwritten");
    }

    if (loaded.meta.linkedMarketplaceAssetId) {
      throw new Error("Marketplace-linked assets cannot be structurally overwritten");
    }

    return await this.saveAsset({
      id: loaded.meta.id,
      name: loaded.meta.name,
      group: params.group,
      thumb: params.thumb ?? loaded.meta.thumb ?? null,
      thumbStorageKey: loaded.meta.thumbStorageKey ?? null,
      visibility: "private",
      inLibrary: loaded.meta.inLibrary ?? true,
      isPreset: loaded.meta.isPreset ?? false,
      sourceAssetId: loaded.meta.sourceAssetId ?? null,
      linkedMarketplaceAssetId: loaded.meta.linkedMarketplaceAssetId ?? null,
      lineageAssetIds: loaded.meta.lineageAssetIds ?? [],
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

    if (loaded.meta.visibility !== "private" || loaded.meta.isImmutable) {
      throw new Error("Only mutable private assets can save local progress");
    }

    return await this.saveAsset({
      id: loaded.meta.id,
      name: loaded.meta.name,
      group: params.group,
      thumb: params.thumb ?? loaded.meta.thumb ?? null,
      thumbStorageKey: loaded.meta.thumbStorageKey ?? null,
      visibility: "private",
      inLibrary: loaded.meta.inLibrary ?? true,
      isPreset: loaded.meta.isPreset ?? false,
      sourceAssetId: loaded.meta.sourceAssetId ?? null,
      linkedMarketplaceAssetId: loaded.meta.linkedMarketplaceAssetId ?? null,
      lineageAssetIds: loaded.meta.lineageAssetIds ?? [],
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
    return await this.createPrivateAsset({
      name: params.name,
      group: params.group,
      thumb: params.thumb ?? null,
      sourceAssetId: params.sourceAssetId ?? null,
      linkedMarketplaceAssetId: null,
      lineageAssetIds: params.lineageAssetIds ?? [],
      inLibrary: true,
      forceNewId: true,
    });
  }

  async updateAssetThumbnail(params: {
    assetId: AssetId;
    thumb: Blob | null;
  }): Promise<void> {
    const current = await getOwnedAsset(params.assetId);
    if (!current) return;

    await this.updateOwnedRecord(current, {
      id: current.assetHeadId,
      name: current.name,
      group: current.voxelGroup,
      thumb: params.thumb,
      visibility: "private",
      inLibrary: current.isLibraryItem,
      sourceAssetId: current.sourceAssetHeadId ?? null,
      linkedMarketplaceAssetId: current.linkedListingId ?? null,
      lineageAssetIds: current.lineageAssetHeadIds ?? [],
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
    const created = await createOwnedAsset({
      name: input.name,
      voxelGroup: input.voxelGroup,
      thumbStorageKey: input.thumbStorageKey ?? null,
      sourceAssetHeadId: null,
      linkedListingId: null,
      lineageAssetHeadIds: input.lineageAssetIds ?? [],
      draftKind: "normal",
      isLibraryItem: false,
    });

    const detail = await publishOwnedAssetRemote(created.assetHeadId);
    this.publishedByListingId.set(detail.listing.listingId, detail);
    this.publishedSyncedAt = Date.now();
    return detail.listing.listingId;
  }

  async renameAsset(id: AssetId, name: string): Promise<void> {
    const current = await getOwnedAsset(id);
    if (!current) return;

    await this.updateOwnedRecord(current, {
      id: current.assetHeadId,
      name,
      group: current.voxelGroup,
      visibility: "private",
      inLibrary: current.isLibraryItem,
      sourceAssetId: current.sourceAssetHeadId ?? null,
      linkedMarketplaceAssetId: current.linkedListingId ?? null,
      lineageAssetIds: current.lineageAssetHeadIds ?? [],
    });
  }

  async deleteAsset(id: AssetId): Promise<void> {
    const ownerId = currentOwnerId();
    if (!ownerId) return;

    await deleteOwnedAssetRemote(id);
    await this.cacheFor(ownerId).delete(id);
    this.ownerSyncedAt.set(ownerId, Date.now());
  }

  async deleteAllAssets(): Promise<void> {
    const owned = await this.listPrivateAssets();
    for (const asset of owned) {
      await this.deleteAsset(asset.id);
    }
  }

  async addAssetToLibrary(id: AssetId): Promise<void> {
    const current = await getOwnedAsset(id);
    if (!current) return;

    await this.updateOwnedRecord(current, {
      id: current.assetHeadId,
      name: current.name,
      group: current.voxelGroup,
      visibility: "private",
      inLibrary: true,
      sourceAssetId: current.sourceAssetHeadId ?? null,
      linkedMarketplaceAssetId: current.linkedListingId ?? null,
      lineageAssetIds: current.lineageAssetHeadIds ?? [],
    });
  }

  async removeAssetFromLibrary(id: AssetId): Promise<void> {
    const current = await getOwnedAsset(id);
    if (!current) return;

    await this.updateOwnedRecord(current, {
      id: current.assetHeadId,
      name: current.name,
      group: current.voxelGroup,
      visibility: "private",
      inLibrary: false,
      sourceAssetId: current.sourceAssetHeadId ?? null,
      linkedMarketplaceAssetId: current.linkedListingId ?? null,
      lineageAssetIds: current.lineageAssetHeadIds ?? [],
    });
  }

  async isAssetInLibrary(id: AssetId): Promise<boolean> {
    const ownerId = currentOwnerId();
    if (!ownerId) return false;

    await this.syncOwnedAssets();
    return await this.cacheFor(ownerId).isInLibrary(id);
  }

  async exportAssetToFiles(id: AssetId): Promise<void> {
    const loaded = await this.loadAsset(id);
    if (!loaded) throw new Error("Asset not found");

    const base = safeSlug(loaded.meta.name);
    downloadBlob(
      new Blob([JSON.stringify(loaded.group, null, 2)], {
        type: "application/json",
      }),
      `${base}.json`
    );

    if (loaded.meta.thumb) {
      downloadBlob(
        loaded.meta.thumb.type === "image/png"
          ? loaded.meta.thumb
          : new Blob([loaded.meta.thumb], { type: "image/png" }),
        `${base}.png`
      );
    }
  }

  async getKv<T = AssetKvValue>(key: string): Promise<T | null> {
    const ownerId = currentOwnerId();
    if (!ownerId) {
      if (typeof window === "undefined") return null;

      try {
        const raw = window.localStorage.getItem(`voxl:assetkv:${key}`);
        return raw ? (JSON.parse(raw) as T) : null;
      } catch {
        return null;
      }
    }

    return await this.cacheFor(ownerId).getKv<T>(key);
  }

  async setKv(key: string, value: AssetKvValue): Promise<void> {
    const ownerId = currentOwnerId();
    if (!ownerId) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(`voxl:assetkv:${key}`, JSON.stringify(value));
      }
      return;
    }

    await this.cacheFor(ownerId).setKv(key, value);
  }
}
