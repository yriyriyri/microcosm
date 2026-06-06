import {
  worldDocumentToSaveWorldInput,
  worldRecordToWorldDocument,
} from "../domain/cloudMappers";
import type {
  SaveWorldDocumentInput,
  WorldDocument,
} from "../domain/cloudWorldTypes";
import type {
  SaveWorldInput,
  WorldData,
  WorldId,
  WorldMetaRecord,
  WorldRecord,
} from "../domain/worldTypes";
import type { WorldRepository } from "./WorldRepository";
import { getStoredAuthentication } from "@/components/Auth/state";
import {
  createOwnedWorld,
  deleteOwnedWorld as deleteOwnedWorldRemote,
  getOwnedWorld,
  listOwnedWorldManifest,
  updateOwnedWorld,
} from "@/services/versionedWorlds";
import type {
  CreateOwnedWorldInput,
  OwnedWorldHeadDocument,
  OwnedWorldInstance,
  UpdateOwnedWorldInput,
} from "@microcosm/voxel-core";
import { OwnedWorldCache, deleteOwnedWorldCache } from "./ownedWorldCache";
import { blobToDataUrl, dataUrlToBlob } from "./repositoryMedia";

const OWNER_NAMESPACE_KEY = "voxl:last-owned-world-owner";
const MANIFEST_SYNC_TTL_MS = 5_000;

function currentOwnerId(): string | null {
  return getStoredAuthentication().me?.user_id ?? null;
}

function requireOwnerId(): string {
  const ownerId = currentOwnerId();
  if (!ownerId) {
    throw new Error("You must be logged in to access owned worlds.");
  }

  return ownerId;
}

async function thumbToStorageKey(thumb: Blob | null | undefined): Promise<string | null | undefined> {
  if (thumb === undefined) return undefined;
  if (thumb === null) return null;
  return await blobToDataUrl(thumb);
}

function worldDataToOwnedInstances(data: WorldData): OwnedWorldInstance[] {
  return data.instances
    .filter((instance) => !!instance.assetId)
    .map((instance) => ({
      instanceId: instance.instanceId,
      assetHeadId: instance.assetId!,
      overrideAssetHeadId: instance.overrideAssetId ?? null,
      logicTag: instance.logicTag ?? null,
      position: instance.position,
      rotation: instance.rotation ?? { x: 0, y: 0, z: 0 },
    }));
}

function ownedWorldToLegacyRecord(doc: OwnedWorldHeadDocument): WorldRecord {
  return {
    meta: {
      id: doc.worldId,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      instanceCount: doc.instances.length,
      thumb: dataUrlToBlob(doc.thumbStorageKey),
      thumbStorageKey: doc.thumbStorageKey ?? null,
    },
    data: {
      instances: doc.instances.map((instance) => ({
        instanceId: instance.instanceId,
        assetId: instance.assetHeadId,
        assetKind: "draft",
        overrideAssetId: instance.overrideAssetHeadId ?? null,
        logicTag: instance.logicTag ?? null,
        position: instance.position,
        rotation: instance.rotation ?? { x: 0, y: 0, z: 0 },
      })),
    },
  };
}

export class RemoteWorldRepository implements WorldRepository {
  private readonly caches = new Map<string, OwnedWorldCache>();
  private readonly ownerSyncPromises = new Map<string, Promise<void>>();
  private readonly ownerSyncedAt = new Map<string, number>();

  private cacheFor(ownerId: string) {
    let cache = this.caches.get(ownerId);
    if (!cache) {
      cache = new OwnedWorldCache(ownerId);
      this.caches.set(ownerId, cache);
    }

    return cache;
  }

  private async cleanupOwnerNamespace(ownerId: string): Promise<void> {
    if (typeof window === "undefined") return;

    const previousOwner = window.localStorage.getItem(OWNER_NAMESPACE_KEY);
    if (previousOwner && previousOwner !== ownerId) {
      try {
        await deleteOwnedWorldCache(previousOwner);
      } catch (error) {
        console.warn("Failed to delete previous owned world cache", error);
      }
    }

    window.localStorage.setItem(OWNER_NAMESPACE_KEY, ownerId);
  }

  private async syncOwnedWorlds(force = false): Promise<void> {
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
      const manifest = await listOwnedWorldManifest();
      const manifestById = new Map(manifest.map((item) => [item.worldId, item]));
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
            await cache.delete(item.worldId);
            return;
          }

          const cachedMeta = await cache.getMeta(item.worldId);
          if (cachedMeta && cachedMeta.updatedAt === item.updatedAt) {
            return;
          }

          const doc = await getOwnedWorld(item.worldId);
          if (!doc) return;
          await cache.save(ownedWorldToLegacyRecord(doc));
        })
      );

      this.ownerSyncedAt.set(ownerId, Date.now());
    })().finally(() => {
      this.ownerSyncPromises.delete(ownerId);
    });

    this.ownerSyncPromises.set(ownerId, promise);
    await promise;
  }

  private async updateOwnedRecord(
    current: OwnedWorldHeadDocument,
    input: SaveWorldInput,
    attempt = 0
  ): Promise<OwnedWorldHeadDocument> {
    const payload: UpdateOwnedWorldInput = {
      expectedDraftRevision: current.draftRevision,
      name: input.name,
      instances: worldDataToOwnedInstances(input.data),
      thumbStorageKey:
        (await thumbToStorageKey(input.thumb)) ??
        current.thumbStorageKey ??
        null,
    };

    const result = await updateOwnedWorld(current.worldId, payload);
    if (result.ok) {
      await this.cacheFor(current.ownerAccountId).save(
        ownedWorldToLegacyRecord(result.value)
      );
      this.ownerSyncedAt.set(current.ownerAccountId, Date.now());
      return result.value;
    }

    await this.cacheFor(current.ownerAccountId).save(
      ownedWorldToLegacyRecord(result.current)
    );

    if (attempt >= 1) {
      throw new Error("World changed remotely during save.");
    }

    return await this.updateOwnedRecord(result.current, input, attempt + 1);
  }

  async listWorlds(): Promise<WorldMetaRecord[]> {
    await this.syncOwnedWorlds();

    const ownerId = currentOwnerId();
    if (!ownerId) return [];

    return await this.cacheFor(ownerId).listMeta();
  }

  async findWorldIdByName(name: string): Promise<WorldId | null> {
    await this.syncOwnedWorlds();

    const ownerId = currentOwnerId();
    if (!ownerId) return null;

    return await this.cacheFor(ownerId).findIdByName(name);
  }

  async getWorldMeta(id: WorldId): Promise<WorldMetaRecord | null> {
    await this.syncOwnedWorlds();

    const ownerId = currentOwnerId();
    if (!ownerId) return null;

    return await this.cacheFor(ownerId).getMeta(id);
  }

  async loadWorld(id: WorldId): Promise<WorldRecord | null> {
    await this.syncOwnedWorlds();

    const ownerId = currentOwnerId();
    if (!ownerId) return null;

    const cached = await this.cacheFor(ownerId).load(id);
    if (cached) return cached;

    const remote = await getOwnedWorld(id);
    if (!remote) return null;

    const record = ownedWorldToLegacyRecord(remote);
    await this.cacheFor(ownerId).save(record);
    return record;
  }

  async saveWorld(input: SaveWorldInput): Promise<WorldId> {
    const ownerId = requireOwnerId();

    if (!input.id) {
      const payload: CreateOwnedWorldInput = {
        name: input.name,
        instances: worldDataToOwnedInstances(input.data),
        thumbStorageKey: await thumbToStorageKey(input.thumb ?? null),
      };

      const created = await createOwnedWorld(payload);
      await this.cacheFor(ownerId).save(ownedWorldToLegacyRecord(created));
      this.ownerSyncedAt.set(ownerId, Date.now());
      return created.worldId;
    }

    const current = await getOwnedWorld(input.id);
    if (!current) {
      const created = await createOwnedWorld({
        name: input.name,
        instances: worldDataToOwnedInstances(input.data),
        thumbStorageKey: await thumbToStorageKey(input.thumb ?? null),
      });
      await this.cacheFor(ownerId).save(ownedWorldToLegacyRecord(created));
      this.ownerSyncedAt.set(ownerId, Date.now());
      return created.worldId;
    }

    const updated = await this.updateOwnedRecord(current, input);
    return updated.worldId;
  }

  async renameWorld(id: WorldId, name: string): Promise<void> {
    const current = await getOwnedWorld(id);
    if (!current) return;

    await this.updateOwnedRecord(current, {
      id: current.worldId,
      name,
      data: ownedWorldToLegacyRecord(current).data,
      thumb: dataUrlToBlob(current.thumbStorageKey),
      thumbStorageKey: current.thumbStorageKey ?? null,
    });
  }

  async deleteWorld(id: WorldId): Promise<void> {
    const ownerId = currentOwnerId();
    if (!ownerId) return;

    await deleteOwnedWorldRemote(id);
    await this.cacheFor(ownerId).delete(id);
    this.ownerSyncedAt.set(ownerId, Date.now());
  }

  async loadWorldDocument(
    id: WorldId,
    ownerAccountId: string | null = null
  ): Promise<WorldDocument | null> {
    const record = await this.loadWorld(id);
    if (!record) return null;
    return worldRecordToWorldDocument(record, ownerAccountId);
  }

  async saveWorldDocument(input: SaveWorldDocumentInput): Promise<WorldId> {
    return await this.saveWorld(worldDocumentToSaveWorldInput(input));
  }
}
