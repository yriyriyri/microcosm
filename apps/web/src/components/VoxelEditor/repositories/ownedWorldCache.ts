import type { WorldMetaRecord, WorldRecord } from "../domain/worldTypes";

type WorldCacheRow = {
  id: string;
  record: WorldRecord;
};

const DB_VERSION = 1;
const STORE_RECORDS = "records";

function dbName(ownerAccountId: string) {
  return `voxel_editor_worlds_cache:${ownerAccountId}`;
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () =>
      reject(tx.error ?? new Error("IndexedDB world cache transaction failed"));
    tx.onabort = () =>
      reject(tx.error ?? new Error("IndexedDB world cache transaction aborted"));
  });
}

async function openWorldCacheDb(ownerAccountId: string): Promise<IDBDatabase> {
  return await new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName(ownerAccountId), DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains(STORE_RECORDS)) {
        db.createObjectStore(STORE_RECORDS, { keyPath: "id" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () =>
      reject(req.error ?? new Error("Failed to open owned world cache"));
  });
}

export async function deleteOwnedWorldCache(ownerAccountId: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const req = indexedDB.deleteDatabase(dbName(ownerAccountId));
    req.onsuccess = () => resolve();
    req.onerror = () =>
      reject(req.error ?? new Error("Failed to delete owned world cache"));
    req.onblocked = () =>
      reject(new Error("Owned world cache deletion blocked by an open connection"));
  });
}

export class OwnedWorldCache {
  constructor(private readonly ownerAccountId: string) {}

  async listMeta(): Promise<WorldMetaRecord[]> {
    const db = await openWorldCacheDb(this.ownerAccountId);
    return await new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_RECORDS], "readonly");
      const req = tx.objectStore(STORE_RECORDS).getAll();

      req.onsuccess = () => {
        const rows = ((req.result as WorldCacheRow[]) ?? [])
          .map((row) => row.record.meta)
          .sort((a, b) => b.updatedAt - a.updatedAt);
        resolve(rows);
      };

      req.onerror = () =>
        reject(req.error ?? new Error("Failed to list owned world cache"));
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

  async getMeta(id: string): Promise<WorldMetaRecord | null> {
    const record = await this.load(id);
    return record?.meta ?? null;
  }

  async load(id: string): Promise<WorldRecord | null> {
    const db = await openWorldCacheDb(this.ownerAccountId);
    return await new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_RECORDS], "readonly");
      const req = tx.objectStore(STORE_RECORDS).get(id);

      req.onsuccess = () => {
        const row = (req.result as WorldCacheRow | undefined) ?? null;
        resolve(row?.record ?? null);
      };

      req.onerror = () =>
        reject(req.error ?? new Error("Failed to read owned world cache"));
    });
  }

  async save(record: WorldRecord): Promise<void> {
    const db = await openWorldCacheDb(this.ownerAccountId);
    const tx = db.transaction([STORE_RECORDS], "readwrite");
    tx.objectStore(STORE_RECORDS).put({
      id: record.meta.id,
      record,
    } satisfies WorldCacheRow);
    await txDone(tx);
  }

  async delete(id: string): Promise<void> {
    const db = await openWorldCacheDb(this.ownerAccountId);
    const tx = db.transaction([STORE_RECORDS], "readwrite");
    tx.objectStore(STORE_RECORDS).delete(id);
    await txDone(tx);
  }

  async clear(): Promise<void> {
    const db = await openWorldCacheDb(this.ownerAccountId);
    const tx = db.transaction([STORE_RECORDS], "readwrite");
    tx.objectStore(STORE_RECORDS).clear();
    await txDone(tx);
  }
}
