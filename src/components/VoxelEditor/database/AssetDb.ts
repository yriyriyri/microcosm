import type { GroupState } from "../VoxelWorld";

export type AssetVisibility = "private" | "marketplace";

export type AssetMeta = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  voxelCount: number;
  thumb?: Blob | null;
  thumbStorageKey?: string | null;

  visibility?: AssetVisibility;
  inLibrary?: boolean;

  isPreset?: boolean;

  sourceAssetId?: string | null;
  linkedMarketplaceAssetId?: string | null;
  lineageAssetIds?: string[];
  publishedFromAssetId?: string | null;
  isImmutable?: boolean;
};

type AssetData = {
  id: string;
  group: GroupState;
};

const DB_NAME = "voxel_editor_assets_db";
const DB_VERSION = 4;

const STORE_META = "asset_meta";
const STORE_DATA = "asset_data";
const STORE_KV = "kv";

type KvRow = { key: string; value: any };

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
      if (!db.objectStoreNames.contains(STORE_KV)) {
        db.createObjectStore(STORE_KV, { keyPath: "key" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () =>
      reject(req.error ?? new Error("Failed to open IndexedDB (assets)"));
  });
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () =>
      reject(tx.error ?? new Error("IndexedDB transaction failed"));
    tx.onabort = () =>
      reject(tx.error ?? new Error("IndexedDB transaction aborted"));
  });
}

function normalizeVisibility(
  visibility?: AssetVisibility | "system"
): AssetVisibility {
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

export async function deleteAssetDatabase(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const openReq = indexedDB.open(DB_NAME);

    openReq.onsuccess = () => {
      const db = openReq.result;
      db.close();

      const deleteReq = indexedDB.deleteDatabase(DB_NAME);

      deleteReq.onsuccess = () => resolve();
      deleteReq.onerror = () =>
        reject(deleteReq.error ?? new Error("Failed to delete asset database"));
      deleteReq.onblocked = () =>
        reject(new Error("Asset database deletion blocked by an open connection"));
    };

    openReq.onerror = () =>
      reject(openReq.error ?? new Error("Failed to open asset database for deletion"));

    openReq.onupgradeneeded = () => {
      try {
        openReq.transaction?.abort();
      } catch {}
    };
  });
}

export async function getKv<T = any>(key: string): Promise<T | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_KV], "readonly");
    const req = tx.objectStore(STORE_KV).get(key);
    req.onsuccess = () =>
      resolve(((req.result as KvRow | undefined)?.value as T) ?? null);
    req.onerror = () => reject(req.error ?? new Error("Failed to read kv"));
  });
}

export async function setKv(key: string, value: any): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([STORE_KV], "readwrite");
  tx.objectStore(STORE_KV).put({ key, value } satisfies KvRow);
  await txDone(tx);
}

export async function listAssets(): Promise<AssetMeta[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_META], "readonly");
    const store = tx.objectStore(STORE_META);
    const req = store.getAll();

    req.onsuccess = () => {
      const rows = ((req.result as AssetMeta[]) ?? []).map(normalizeAssetMeta);
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
    req.onsuccess = () => {
      const row = (req.result as AssetMeta) ?? null;
      resolve(row ? normalizeAssetMeta(row) : null);
    };
    req.onerror = () =>
      reject(req.error ?? new Error("Failed to read asset meta"));
  });
}

export async function saveAsset(params: {
  name: string;
  group: GroupState;
  id?: string;
  thumb?: Blob | null;
  thumbStorageKey?: string | null;
  visibility?: AssetVisibility;
  inLibrary?: boolean;
  isPreset?: boolean;

  sourceAssetId?: string | null;
  linkedMarketplaceAssetId?: string | null;
  lineageAssetIds?: string[];
  publishedFromAssetId?: string | null;
  isImmutable?: boolean;

  forceNewId?: boolean;
}): Promise<string> {
  const db = await openDb();

  const now = Date.now();
  const voxelCount = params.group.voxels.length | 0;

  const existingIdByName =
    params.id || params.forceNewId
      ? null
      : await findAssetIdByName(params.name).catch(() => null);

  const id = params.id ?? existingIdByName ?? makeId();

  const existingMeta = await getAssetMeta(id).catch(() => null);

  const nextVisibility =
    normalizeVisibility(params.visibility) ??
    existingMeta?.visibility ??
    "private";

  const nextImmutable =
    params.isImmutable ??
    existingMeta?.isImmutable ??
    (nextVisibility === "marketplace");

  const nextInLibrary =
    params.inLibrary ??
    existingMeta?.inLibrary ??
    (nextVisibility === "private");

  const meta: AssetMeta = normalizeAssetMeta({
    id,
    name: params.name,
    createdAt: existingMeta?.createdAt ?? now,
    updatedAt: now,
    voxelCount,
    thumb: params.thumb ?? existingMeta?.thumb ?? null,
    thumbStorageKey:
      params.thumbStorageKey !== undefined
        ? params.thumbStorageKey
        : existingMeta?.thumbStorageKey ?? null,
    visibility: nextVisibility,
    inLibrary: nextInLibrary,
    isPreset: params.isPreset ?? existingMeta?.isPreset ?? false,
    sourceAssetId: params.sourceAssetId ?? existingMeta?.sourceAssetId ?? null,
    linkedMarketplaceAssetId:
      params.linkedMarketplaceAssetId ??
      existingMeta?.linkedMarketplaceAssetId ??
      null,
    lineageAssetIds:
      params.lineageAssetIds ?? existingMeta?.lineageAssetIds ?? [],
    publishedFromAssetId:
      params.publishedFromAssetId ?? existingMeta?.publishedFromAssetId ?? null,
    isImmutable: nextImmutable,
  });

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
    req.onerror = () =>
      reject(req.error ?? new Error("Failed to read asset data"));
  });

  if (!data) return null;

  return { meta: normalizeAssetMeta(meta), group: data.group };
}

export async function deleteAsset(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([STORE_META, STORE_DATA], "readwrite");
  tx.objectStore(STORE_META).delete(id);
  tx.objectStore(STORE_DATA).delete(id);
  await txDone(tx);
}

export async function deleteAllAssets(): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([STORE_META, STORE_DATA, STORE_KV], "readwrite");
  tx.objectStore(STORE_META).clear();
  tx.objectStore(STORE_DATA).clear();
  tx.objectStore(STORE_KV).clear();
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

export async function updateAssetThumbnail(params: {
  assetId: string;
  thumb: Blob | null;
}): Promise<void> {
  const db = await openDb();
  const meta = await getAssetMeta(params.assetId);
  if (!meta) throw new Error("Asset not found");

  const next = normalizeAssetMeta({
    ...meta,
    thumb: params.thumb,
    updatedAt: Date.now(),
  });

  const tx = db.transaction([STORE_META], "readwrite");
  tx.objectStore(STORE_META).put(next);
  await txDone(tx);
}

export async function overwritePrivateAssetContent(params: {
  assetId: string;
  group: GroupState;
  thumb?: Blob | null;
}): Promise<string> {
  const loaded = await loadAsset(params.assetId);
  if (!loaded) throw new Error("Asset not found");

  const meta = normalizeAssetMeta(loaded.meta);

  if (meta.visibility !== "private" || meta.isImmutable) {
    throw new Error("Only mutable private assets can be overwritten");
  }

  if (meta.linkedMarketplaceAssetId) {
    throw new Error(
      "Marketplace-linked assets cannot be structurally overwritten"
    );
  }

  return await saveAsset({
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

export async function saveNonStructuralAssetProgress(params: {
  assetId: string;
  group: GroupState;
  thumb?: Blob | null;
}): Promise<string> {
  const loaded = await loadAsset(params.assetId);
  if (!loaded) throw new Error("Asset not found");

  const meta = normalizeAssetMeta(loaded.meta);

  if (meta.visibility !== "private" || meta.isImmutable) {
    throw new Error("Only mutable private assets can save local progress");
  }

  return await saveAsset({
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

export async function remixAssetFromSource(params: {
  sourceAssetId: string | null;
  lineageAssetIds?: string[];
  name: string;
  group: GroupState;
  thumb?: Blob | null;
}): Promise<string> {
  return await saveAsset({
    name: params.name,
    group: params.group,
    thumb: params.thumb ?? null,
    thumbStorageKey: null,
    visibility: "private",
    inLibrary: true,
    isPreset: false,
    isImmutable: false,
    sourceAssetId: params.sourceAssetId ?? null,
    linkedMarketplaceAssetId: null,
    lineageAssetIds: params.lineageAssetIds ?? [],
    publishedFromAssetId: null,
    forceNewId: true,
  });
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
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function listLibraryAssets(): Promise<AssetMeta[]> {
  const all = await listAssets();
  return all.filter((a) => {
    const meta = normalizeAssetMeta(a);
    return !!meta.inLibrary;
  });
}

export async function listMarketplaceAssets(): Promise<AssetMeta[]> {
  const all = await listAssets();
  return all.filter((a) => {
    const meta = normalizeAssetMeta(a);
    return meta.visibility === "marketplace";
  });
}

export async function listPrivateAssets(): Promise<AssetMeta[]> {
  const all = await listAssets();
  return all.filter((a) => {
    const meta = normalizeAssetMeta(a);
    return meta.visibility === "private";
  });
}

export async function listPublishedMarketplaceAssets(): Promise<AssetMeta[]> {
  const all = await listAssets();
  return all.filter((a) => {
    const meta = normalizeAssetMeta(a);
    return meta.visibility === "marketplace" && !meta.isPreset;
  });
}

export async function setAssetLibraryMembership(
  id: string,
  inLibrary: boolean
): Promise<void> {
  const db = await openDb();
  const meta = await getAssetMeta(id);
  if (!meta) return;

  const next = normalizeAssetMeta({
    ...meta,
    inLibrary,
    updatedAt: Date.now(),
  });

  const tx = db.transaction([STORE_META], "readwrite");
  tx.objectStore(STORE_META).put(next);
  await txDone(tx);
}

export async function isAssetInLibrary(id: string): Promise<boolean> {
  const meta = await getAssetMeta(id);
  return !!meta?.inLibrary;
}

export async function createPrivateAsset(params: {
  name: string;
  group: GroupState;
  thumb?: Blob | null;
  sourceAssetId?: string | null;
  linkedMarketplaceAssetId?: string | null;
  lineageAssetIds?: string[];
}): Promise<string> {
  return await saveAsset({
    name: params.name,
    group: params.group,
    thumb: params.thumb ?? null,
    thumbStorageKey: null,
    visibility: "private",
    inLibrary: true,
    isImmutable: false,
    sourceAssetId: params.sourceAssetId ?? null,
    linkedMarketplaceAssetId: params.linkedMarketplaceAssetId ?? null,
    lineageAssetIds: params.lineageAssetIds ?? [],
    forceNewId: true,
  });
}

export async function publishAssetToMarketplace(
  assetId: string
): Promise<string> {
  const loaded = await loadAsset(assetId);
  if (!loaded) throw new Error("Asset not found");

  const sourceMeta = normalizeAssetMeta(loaded.meta);

  return await saveAsset({
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

export async function forkAssetToPrivateDraft(
  assetId: string,
  opts?: { name?: string; addToLibrary?: boolean }
): Promise<string> {
  const loaded = await loadAsset(assetId);
  if (!loaded) throw new Error("Asset not found");

  const sourceMeta = normalizeAssetMeta(loaded.meta);

  const lineageAssetIds = [
    ...(sourceMeta.lineageAssetIds ?? []),
    sourceMeta.id,
  ].filter((v, i, arr) => !!v && arr.indexOf(v) === i);

  return await saveAsset({
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

export async function acquireMarketplaceAssetToLibrary(
  assetId: string,
  opts?: { name?: string }
): Promise<string> {
  const loaded = await loadAsset(assetId);
  if (!loaded) throw new Error("Asset not found");

  const sourceMeta = normalizeAssetMeta(loaded.meta);

  if (sourceMeta.visibility !== "marketplace") {
    throw new Error("Only marketplace assets can be acquired");
  }

  const existing = (await listAssets()).find(
    (a) =>
      a.visibility === "private" &&
      a.linkedMarketplaceAssetId === sourceMeta.id
  );

  if (existing) {
    await setAssetLibraryMembership(existing.id, true);
    return existing.id;
  }

  return await saveAsset({
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
      .filter((v, i, arr) => !!v && arr.indexOf(v) === i),
    publishedFromAssetId: null,
    forceNewId: true,
  });
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