import type { WorldData } from "../domain/worldTypes";

export type IslandMeta = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  instanceCount: number;
  thumb?: Blob | null;
};

type IslandData = {
  id: string;
  data: WorldData;
};

const DB_NAME = "voxel_editor_db";
const DB_VERSION = 4;

const STORE_META = "island_meta";
const STORE_DATA = "island_data";

function makeId(): string {
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_DATA)) {
        db.createObjectStore(STORE_DATA, { keyPath: "id" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("Failed to open IndexedDB"));
  });
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed"));
    tx.onabort = () => reject(tx.error ?? new Error("IndexedDB transaction aborted"));
  });
}

export async function deleteWorldDatabase(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const openReq = indexedDB.open(DB_NAME);

    openReq.onsuccess = () => {
      const db = openReq.result;
      db.close();

      const deleteReq = indexedDB.deleteDatabase(DB_NAME);

      deleteReq.onsuccess = () => resolve();
      deleteReq.onerror = () =>
        reject(deleteReq.error ?? new Error("Failed to delete world database"));
      deleteReq.onblocked = () =>
        reject(new Error("World database deletion blocked by an open connection"));
    };

    openReq.onerror = () =>
      reject(openReq.error ?? new Error("Failed to open world database for deletion"));

    openReq.onupgradeneeded = () => {
      try {
        openReq.transaction?.abort();
      } catch {}
    };
  });
}

export async function deleteAllIslands(): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([STORE_META, STORE_DATA], "readwrite");
  tx.objectStore(STORE_META).clear();
  tx.objectStore(STORE_DATA).clear();
  await txDone(tx);
}

export async function findIslandIdByName(name: string): Promise<string | null> {
  const target = normalizeName(name);
  if (!target) return null;

  const metas = await listIslands();
  const hit = metas.find((m) => normalizeName(m.name) === target);
  return hit?.id ?? null;
}

export async function listIslands(): Promise<IslandMeta[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_META], "readonly");
    const store = tx.objectStore(STORE_META);
    const req = store.getAll();

    req.onsuccess = () => {
      const rows = (req.result as IslandMeta[]) ?? [];
      rows.sort((a, b) => b.updatedAt - a.updatedAt);
      resolve(rows);
    };
    req.onerror = () => reject(req.error ?? new Error("Failed to list islands"));
  });
}

export async function saveIsland(params: {
  name: string;
  data: WorldData;
  id?: string;
  thumb?: Blob | null;
}): Promise<string> {
  const db = await openDb();

  const now = Date.now();

  const existingIdByName = params.id ? null : await findIslandIdByName(params.name).catch(() => null);
  const id = params.id ?? existingIdByName ?? makeId();

  const existingMeta = await getIslandMeta(id).catch(() => null);

  const meta: IslandMeta = {
    id,
    name: params.name,
    createdAt: existingMeta?.createdAt ?? now,
    updatedAt: now,
    instanceCount: params.data.instances.length,
    thumb: params.thumb ?? existingMeta?.thumb ?? null,
  };

  const data: IslandData = {
    id,
    data: params.data,
  };

  const tx = db.transaction([STORE_META, STORE_DATA], "readwrite");
  tx.objectStore(STORE_META).put(meta);
  tx.objectStore(STORE_DATA).put(data);
  await txDone(tx);

  return id;
}

export async function getIslandMeta(id: string): Promise<IslandMeta | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_META], "readonly");
    const req = tx.objectStore(STORE_META).get(id);
    req.onsuccess = () => resolve((req.result as IslandMeta) ?? null);
    req.onerror = () => reject(req.error ?? new Error("Failed to read island meta"));
  });
}

export async function loadIsland(
  id: string
): Promise<{ meta: IslandMeta; data: WorldData } | null> {
  const db = await openDb();

  const meta = await getIslandMeta(id);
  if (!meta) return null;

  const dataRow = await new Promise<IslandData | null>((resolve, reject) => {
    const tx = db.transaction([STORE_DATA], "readonly");
    const req = tx.objectStore(STORE_DATA).get(id);
    req.onsuccess = () => resolve((req.result as IslandData) ?? null);
    req.onerror = () => reject(req.error ?? new Error("Failed to read island data"));
  });

  if (!dataRow) return null;

  return {
    meta,
    data: dataRow.data,
  };
}

export async function deleteIsland(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([STORE_META, STORE_DATA], "readwrite");
  tx.objectStore(STORE_META).delete(id);
  tx.objectStore(STORE_DATA).delete(id);
  await txDone(tx);
}

export async function renameIsland(id: string, name: string): Promise<void> {
  const db = await openDb();
  const meta = await getIslandMeta(id);
  if (!meta) return;

  meta.name = name;
  meta.updatedAt = Date.now();

  const tx = db.transaction([STORE_META], "readwrite");
  tx.objectStore(STORE_META).put(meta);
  await txDone(tx);
}