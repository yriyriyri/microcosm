import type { GroupState } from "../VoxelWorld";

export type AssetMeta = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  voxelCount: number;
  thumb?: Blob | null;
};

type AssetData = {
  id: string;
  group: GroupState;
};

const DB_NAME = "voxel_editor_assets_db";
const DB_VERSION = 1;

const STORE_META = "asset_meta";
const STORE_DATA = "asset_data";

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
    req.onerror = () => reject(req.error ?? new Error("Failed to open IndexedDB (assets)"));
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

export async function listAssets(): Promise<AssetMeta[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_META], "readonly");
    const store = tx.objectStore(STORE_META);
    const req = store.getAll();

    req.onsuccess = () => {
      const rows = (req.result as AssetMeta[]) ?? [];
      rows.sort((a, b) => b.updatedAt - a.updatedAt);
      resolve(rows);
    };
    req.onerror = () => reject(req.error ?? new Error("Failed to list assets"));
  });
}

export async function findAssetIdByName(name: string): Promise<string | null> {
  const target = normalizeName(name);
  if (!target) return null;

  const metas = await listAssets();
  const hit = metas.find((m) => normalizeName(m.name) === target);
  return hit?.id ?? null;
}

export async function getAssetMeta(id: string): Promise<AssetMeta | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_META], "readonly");
    const req = tx.objectStore(STORE_META).get(id);
    req.onsuccess = () => resolve((req.result as AssetMeta) ?? null);
    req.onerror = () => reject(req.error ?? new Error("Failed to read asset meta"));
  });
}

export async function saveAsset(params: {
  name: string;
  group: GroupState;
  id?: string;
  thumb?: Blob | null;
}): Promise<string> {
  const db = await openDb();

  const now = Date.now();
  const voxelCount = params.group.voxels.length | 0;

  const existingIdByName = params.id ? null : await findAssetIdByName(params.name).catch(() => null);
  const id = params.id ?? existingIdByName ?? makeId();

  const existingMeta = await getAssetMeta(id).catch(() => null);

  const meta: AssetMeta = {
    id,
    name: params.name,
    createdAt: existingMeta?.createdAt ?? now,
    updatedAt: now,
    voxelCount,
    thumb: params.thumb ?? null,
  };

  const data: AssetData = {
    id,
    group: params.group,
  };

  const tx = db.transaction([STORE_META, STORE_DATA], "readwrite");
  tx.objectStore(STORE_META).put(meta);
  tx.objectStore(STORE_DATA).put(data);
  await txDone(tx);

  return id;
}

export async function loadAsset(
  id: string
): Promise<{ meta: AssetMeta; group: GroupState } | null> {
  const db = await openDb();

  const meta = await getAssetMeta(id);
  if (!meta) return null;

  const data = await new Promise<AssetData | null>((resolve, reject) => {
    const tx = db.transaction([STORE_DATA], "readonly");
    const req = tx.objectStore(STORE_DATA).get(id);
    req.onsuccess = () => resolve((req.result as AssetData) ?? null);
    req.onerror = () => reject(req.error ?? new Error("Failed to read asset data"));
  });

  if (!data) return null;

  return { meta, group: data.group };
}

export async function deleteAsset(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([STORE_META, STORE_DATA], "readwrite");
  tx.objectStore(STORE_META).delete(id);
  tx.objectStore(STORE_DATA).delete(id);
  await txDone(tx);
}

export async function renameAsset(id: string, name: string): Promise<void> {
  const db = await openDb();
  const meta = await getAssetMeta(id);
  if (!meta) return;

  meta.name = name;
  meta.updatedAt = Date.now();

  const tx = db.transaction([STORE_META], "readwrite");
  tx.objectStore(STORE_META).put(meta);
  await txDone(tx);
}

function safeSlug(name: string): string {
  return (name || "asset")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80) || "asset";
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
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportAssetToFiles(id: string): Promise<void> {
  const loaded = await loadAsset(id);
  if (!loaded) throw new Error("Asset not found");

  const { meta, group } = loaded;
  const base = safeSlug(meta.name);

  const jsonText = JSON.stringify(group, null, 2);
  const jsonBlob = new Blob([jsonText], { type: "application/json" });
  downloadBlob(jsonBlob, `${base}.json`);

  if (meta.thumb) {
    const pngBlob =
      meta.thumb.type === "image/png"
        ? meta.thumb
        : new Blob([meta.thumb], { type: "image/png" });

    downloadBlob(pngBlob, `${base}.png`);
  }
}