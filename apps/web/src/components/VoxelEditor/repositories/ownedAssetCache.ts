import type { AssetMetaRecord, AssetRecord } from "../domain/assetTypes";

type AssetCacheRow = {
  id: string;
  record: AssetRecord;
};

type KvRow = {
  key: string;
  value: unknown;
};

const DB_VERSION = 1;
const STORE_RECORDS = "records";
const STORE_KV = "kv";

function dbName(ownerAccountId: string) {
  return `voxel_editor_assets_cache:${ownerAccountId}`;
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () =>
      reject(tx.error ?? new Error("IndexedDB asset cache transaction failed"));
    tx.onabort = () =>
      reject(tx.error ?? new Error("IndexedDB asset cache transaction aborted"));
  });
}

async function openAssetCacheDb(ownerAccountId: string): Promise<IDBDatabase> {
  return await new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName(ownerAccountId), DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains(STORE_RECORDS)) {
        db.createObjectStore(STORE_RECORDS, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORE_KV)) {
        db.createObjectStore(STORE_KV, { keyPath: "key" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () =>
      reject(req.error ?? new Error("Failed to open owned asset cache"));
  });
}

export async function deleteOwnedAssetCache(ownerAccountId: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const req = indexedDB.deleteDatabase(dbName(ownerAccountId));
    req.onsuccess = () => resolve();
    req.onerror = () =>
      reject(req.error ?? new Error("Failed to delete owned asset cache"));
    req.onblocked = () =>
      reject(new Error("Owned asset cache deletion blocked by an open connection"));
  });
}

export class OwnedAssetCache {
  constructor(private readonly ownerAccountId: string) {}

  async listMeta(): Promise<AssetMetaRecord[]> {
    const db = await openAssetCacheDb(this.ownerAccountId);
    return await new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_RECORDS], "readonly");
      const req = tx.objectStore(STORE_RECORDS).getAll();

      req.onsuccess = () => {
        const rows = ((req.result as AssetCacheRow[]) ?? [])
          .map((row) => row.record.meta)
          .sort((a, b) => b.updatedAt - a.updatedAt);
        resolve(rows);
      };

      req.onerror = () =>
        reject(req.error ?? new Error("Failed to list owned asset cache"));
    });
  }

  async findIdByName(name: string): Promise<string | null> {
    const normalized = name.trim().toLowerCase();
    if (!normalized) return null;

    const metas = await this.listMeta();
    return (
      metas.find((meta) => meta.name.trim().toLowerCase() === normalized)?.id ??
      null
    );
  }

  async getMeta(id: string): Promise<AssetMetaRecord | null> {
    const record = await this.load(id);
    return record?.meta ?? null;
  }

  async load(id: string): Promise<AssetRecord | null> {
    const db = await openAssetCacheDb(this.ownerAccountId);
    return await new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_RECORDS], "readonly");
      const req = tx.objectStore(STORE_RECORDS).get(id);

      req.onsuccess = () => {
        const row = (req.result as AssetCacheRow | undefined) ?? null;
        resolve(row?.record ?? null);
      };

      req.onerror = () =>
        reject(req.error ?? new Error("Failed to read owned asset cache"));
    });
  }

  async save(record: AssetRecord): Promise<void> {
    const db = await openAssetCacheDb(this.ownerAccountId);
    const tx = db.transaction([STORE_RECORDS], "readwrite");
    tx.objectStore(STORE_RECORDS).put({
      id: record.meta.id,
      record,
    } satisfies AssetCacheRow);
    await txDone(tx);
  }

  async delete(id: string): Promise<void> {
    const db = await openAssetCacheDb(this.ownerAccountId);
    const tx = db.transaction([STORE_RECORDS], "readwrite");
    tx.objectStore(STORE_RECORDS).delete(id);
    await txDone(tx);
  }

  async clear(): Promise<void> {
    const db = await openAssetCacheDb(this.ownerAccountId);
    const tx = db.transaction([STORE_RECORDS, STORE_KV], "readwrite");
    tx.objectStore(STORE_RECORDS).clear();
    tx.objectStore(STORE_KV).clear();
    await txDone(tx);
  }

  async rename(id: string, name: string): Promise<void> {
    const record = await this.load(id);
    if (!record) return;

    await this.save({
      ...record,
      meta: {
        ...record.meta,
        name,
        updatedAt: Date.now(),
      },
    });
  }

  async updateThumbnail(id: string, thumb: Blob | null): Promise<void> {
    const record = await this.load(id);
    if (!record) return;

    await this.save({
      ...record,
      meta: {
        ...record.meta,
        thumb,
        updatedAt: Date.now(),
      },
    });
  }

  async setLibraryMembership(id: string, inLibrary: boolean): Promise<void> {
    const record = await this.load(id);
    if (!record) return;

    await this.save({
      ...record,
      meta: {
        ...record.meta,
        inLibrary,
        updatedAt: Date.now(),
      },
    });
  }

  async isInLibrary(id: string): Promise<boolean> {
    return !!(await this.getMeta(id))?.inLibrary;
  }

  async getKv<T = unknown>(key: string): Promise<T | null> {
    const db = await openAssetCacheDb(this.ownerAccountId);
    return await new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_KV], "readonly");
      const req = tx.objectStore(STORE_KV).get(key);

      req.onsuccess = () =>
        resolve(((req.result as KvRow | undefined)?.value as T) ?? null);
      req.onerror = () =>
        reject(req.error ?? new Error("Failed to read asset cache kv"));
    });
  }

  async setKv(key: string, value: unknown): Promise<void> {
    const db = await openAssetCacheDb(this.ownerAccountId);
    const tx = db.transaction([STORE_KV], "readwrite");
    tx.objectStore(STORE_KV).put({ key, value } satisfies KvRow);
    await txDone(tx);
  }
}
