import { readFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { DATABASE_PATH, REPO_ROOT } from "./env.js";
import { buildAssetCompiledRender } from "../../../packages/voxel-core/src/buildAssetCompiledRender.js";
import type {
  AssetListingDocument,
  AssetListingId,
  AssetVersionSnapshotDocument,
  AssetVersionId,
  CreateOwnedAssetInput,
  CreateOwnedWorldInput,
  DraftAssetKind,
  OwnedAssetHeadDocument,
  OwnedAssetManifestItem,
  OwnedWorldHeadDocument,
  OwnedWorldInstance,
  OwnedWorldManifestItem,
  PublishedAssetDetailDocument,
  PublishedWorldId,
  PublishedWorldSnapshotDocument,
  UpdateOwnedAssetInput,
  UpdateOwnedWorldInput,
  WorldId,
} from "../../../packages/voxel-core/src/versionedContracts.js";

const db = new DatabaseSync(DATABASE_PATH);
const PRESET_OWNER_ACCOUNT_ID = "system:presets";
const PRESET_PUBLIC_ROOT = path.join(REPO_ROOT, "apps", "web", "public");
const PRESET_MANIFEST_PATH = path.join(
  PRESET_PUBLIC_ROOT,
  "presets",
  "manifest.json"
);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS asset_heads (
    asset_head_id TEXT PRIMARY KEY,
    owner_account_id TEXT NOT NULL,
    name TEXT NOT NULL,
    voxel_group_json TEXT NOT NULL,
    compiled_render_json TEXT NOT NULL,
    draft_revision INTEGER NOT NULL,
    thumb_storage_key TEXT,
    source_asset_head_id TEXT,
    linked_listing_id TEXT,
    lineage_asset_head_ids_json TEXT NOT NULL,
    draft_kind TEXT NOT NULL,
    is_library_item INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    deleted_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS asset_versions (
    asset_version_id TEXT PRIMARY KEY,
    asset_head_id TEXT NOT NULL,
    owner_account_id TEXT NOT NULL,
    source_draft_revision INTEGER NOT NULL,
    name TEXT NOT NULL,
    voxel_group_json TEXT NOT NULL,
    compiled_render_json TEXT NOT NULL,
    thumb_storage_key TEXT,
    visibility TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    UNIQUE(asset_head_id, source_draft_revision, visibility)
  );

  CREATE TABLE IF NOT EXISTS asset_listings (
    listing_id TEXT PRIMARY KEY,
    owner_account_id TEXT NOT NULL,
    asset_head_id TEXT NOT NULL UNIQUE,
    current_asset_version_id TEXT NOT NULL,
    name TEXT NOT NULL,
    thumb_storage_key TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS world_heads (
    world_id TEXT PRIMARY KEY,
    owner_account_id TEXT NOT NULL,
    name TEXT NOT NULL,
    instances_json TEXT NOT NULL,
    draft_revision INTEGER NOT NULL,
    thumb_storage_key TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    deleted_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS published_worlds (
    published_world_id TEXT PRIMARY KEY,
    source_world_id TEXT NOT NULL,
    owner_account_id TEXT NOT NULL,
    source_world_draft_revision INTEGER NOT NULL,
    world_name TEXT NOT NULL,
    voxel_count INTEGER NOT NULL,
    groups_json TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

type PresetManifestEntry = {
  id: string;
  name: string;
  json: string;
  thumb?: string | null;
};

type PresetManifestDocument = {
  version?: number;
  presets?: PresetManifestEntry[];
};

function makeId(prefix: string): string {
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return `${prefix}_${c.randomUUID()}`;
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string" || !value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function boolFromSql(value: unknown): boolean {
  return Number(value ?? 0) !== 0;
}

function publicFilePath(publicPath: string): string {
  return path.join(PRESET_PUBLIC_ROOT, publicPath.replace(/^\/+/, ""));
}

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

function fileDataUrl(filePath: string): string {
  const bytes = readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimeType =
    ext === ".png"
      ? "image/png"
      : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
          ? "image/webp"
          : "application/octet-stream";

  return `data:${mimeType};base64,${bytes.toString("base64")}`;
}

function presetAssetHeadId(listingId: string): string {
  return `preset_head:${listingId}`;
}

function loadPresetManifestEntries(): PresetManifestEntry[] {
  const manifest = readJsonFile<PresetManifestDocument>(PRESET_MANIFEST_PATH);

  if (!Array.isArray(manifest.presets)) return [];

  return manifest.presets.filter(
    (entry): entry is PresetManifestEntry =>
      !!entry &&
      typeof entry.id === "string" &&
      typeof entry.name === "string" &&
      typeof entry.json === "string"
  );
}

function mapOwnedAssetHead(row: any): OwnedAssetHeadDocument {
  return {
    assetHeadId: row.asset_head_id,
    ownerAccountId: row.owner_account_id,
    name: row.name,
    voxelGroup: parseJson(row.voxel_group_json, {
      groupId: row.asset_head_id,
      position: { x: 0, y: 0, z: 0 },
      voxels: [],
    }),
    compiledRender: parseJson(
      row.compiled_render_json,
      buildAssetCompiledRender(
        parseJson(row.voxel_group_json, {
          groupId: row.asset_head_id,
          position: { x: 0, y: 0, z: 0 },
          voxels: [],
        })
      )
    ),
    draftRevision: Number(row.draft_revision ?? 0),
    thumbStorageKey: row.thumb_storage_key ?? null,
    sourceAssetHeadId: row.source_asset_head_id ?? null,
    linkedListingId: row.linked_listing_id ?? null,
    lineageAssetHeadIds: parseJson<string[]>(row.lineage_asset_head_ids_json, []),
    draftKind: (row.draft_kind ?? "normal") as DraftAssetKind,
    isLibraryItem: boolFromSql(row.is_library_item),
    createdAt: Number(row.created_at ?? 0),
    updatedAt: Number(row.updated_at ?? 0),
    deletedAt: row.deleted_at == null ? null : Number(row.deleted_at),
  };
}

function mapAssetVersion(row: any): AssetVersionSnapshotDocument {
  return {
    assetVersionId: row.asset_version_id,
    assetHeadId: row.asset_head_id,
    ownerAccountId: row.owner_account_id,
    sourceDraftRevision: Number(row.source_draft_revision ?? 0),
    name: row.name,
    voxelGroup: parseJson(row.voxel_group_json, {
      groupId: row.asset_head_id,
      position: { x: 0, y: 0, z: 0 },
      voxels: [],
    }),
    compiledRender: parseJson(
      row.compiled_render_json,
      buildAssetCompiledRender(
        parseJson(row.voxel_group_json, {
          groupId: row.asset_head_id,
          position: { x: 0, y: 0, z: 0 },
          voxels: [],
        })
      )
    ),
    thumbStorageKey: row.thumb_storage_key ?? null,
    visibility: row.visibility,
    createdAt: Number(row.created_at ?? 0),
  };
}

function mapListing(row: any): AssetListingDocument {
  return {
    listingId: row.listing_id,
    ownerAccountId: row.owner_account_id,
    assetHeadId: row.asset_head_id,
    currentAssetVersionId: row.current_asset_version_id,
    name: row.name,
    thumbStorageKey: row.thumb_storage_key ?? null,
    createdAt: Number(row.created_at ?? 0),
    updatedAt: Number(row.updated_at ?? 0),
  };
}

function mapOwnedWorld(row: any): OwnedWorldHeadDocument {
  return {
    worldId: row.world_id,
    ownerAccountId: row.owner_account_id,
    name: row.name,
    draftRevision: Number(row.draft_revision ?? 0),
    instances: parseJson<OwnedWorldInstance[]>(row.instances_json, []),
    thumbStorageKey: row.thumb_storage_key ?? null,
    createdAt: Number(row.created_at ?? 0),
    updatedAt: Number(row.updated_at ?? 0),
    deletedAt: row.deleted_at == null ? null : Number(row.deleted_at),
  };
}

function mapPublishedWorld(row: any): PublishedWorldSnapshotDocument {
  return {
    publishedWorldId: row.published_world_id,
    sourceWorldId: row.source_world_id,
    ownerAccountId: row.owner_account_id,
    sourceWorldDraftRevision: Number(row.source_world_draft_revision ?? 0),
    worldName: row.world_name,
    voxelCount: Number(row.voxel_count ?? 0),
    groups: parseJson(row.groups_json, []),
    createdAt: Number(row.created_at ?? 0),
  };
}

function jsonEquals(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function getAnyAssetHead(assetHeadId: string): OwnedAssetHeadDocument | null {
  const row = db
    .prepare(`
      SELECT *
      FROM asset_heads
      WHERE asset_head_id = ?
    `)
    .get(assetHeadId) as any;

  return row ? mapOwnedAssetHead(row) : null;
}

function getAssetListing(listingId: AssetListingId): AssetListingDocument | null {
  const row = db
    .prepare(`
      SELECT *
      FROM asset_listings
      WHERE listing_id = ?
    `)
    .get(listingId) as any;

  return row ? mapListing(row) : null;
}

export function listOwnedAssetManifest(ownerAccountId: string): OwnedAssetManifestItem[] {
  const stmt = db.prepare(`
    SELECT asset_head_id, updated_at, draft_revision, deleted_at
    FROM asset_heads
    WHERE owner_account_id = ?
    ORDER BY updated_at DESC
  `);

  return stmt.all(ownerAccountId).map((row: any) => ({
    assetHeadId: row.asset_head_id,
    updatedAt: Number(row.updated_at ?? 0),
    draftRevision: Number(row.draft_revision ?? 0),
    deletedAt: row.deleted_at == null ? null : Number(row.deleted_at),
  }));
}

export function getOwnedAssetHead(
  ownerAccountId: string,
  assetHeadId: string,
  opts?: { includeDeleted?: boolean }
): OwnedAssetHeadDocument | null {
  const row = db
    .prepare(`
      SELECT *
      FROM asset_heads
      WHERE owner_account_id = ? AND asset_head_id = ?
    `)
    .get(ownerAccountId, assetHeadId) as any;

  if (!row) return null;

  const doc = mapOwnedAssetHead(row);
  if (!opts?.includeDeleted && doc.deletedAt) return null;
  return doc;
}

export function createOwnedAsset(
  ownerAccountId: string,
  input: CreateOwnedAssetInput
): OwnedAssetHeadDocument {
  const now = Date.now();
  const assetHeadId = makeId("asset");
  const compiledRender = buildAssetCompiledRender(input.voxelGroup);

  db.prepare(`
    INSERT INTO asset_heads (
      asset_head_id,
      owner_account_id,
      name,
      voxel_group_json,
      compiled_render_json,
      draft_revision,
      thumb_storage_key,
      source_asset_head_id,
      linked_listing_id,
      lineage_asset_head_ids_json,
      draft_kind,
      is_library_item,
      created_at,
      updated_at,
      deleted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
  `).run(
    assetHeadId,
    ownerAccountId,
    input.name,
    JSON.stringify(input.voxelGroup),
    JSON.stringify(compiledRender),
    1,
    input.thumbStorageKey ?? null,
    input.sourceAssetHeadId ?? null,
    input.linkedListingId ?? null,
    JSON.stringify(input.lineageAssetHeadIds ?? []),
    input.draftKind ?? "normal",
    input.isLibraryItem ? 1 : 0,
    now,
    now
  );

  return getOwnedAssetHead(ownerAccountId, assetHeadId)!;
}

export function updateOwnedAsset(
  ownerAccountId: string,
  assetHeadId: string,
  input: UpdateOwnedAssetInput
): { ok: true; value: OwnedAssetHeadDocument } | { ok: false; current: OwnedAssetHeadDocument } | null {
  const current = getOwnedAssetHead(ownerAccountId, assetHeadId, {
    includeDeleted: true,
  });
  if (!current || current.deletedAt) return null;

  if (current.draftRevision !== input.expectedDraftRevision) {
    return { ok: false, current };
  }

  const voxelGroupChanged = !jsonEquals(current.voxelGroup, input.voxelGroup);
  const nextCompiledRender = voxelGroupChanged
    ? buildAssetCompiledRender(input.voxelGroup)
    : current.compiledRender;
  const now = Date.now();

  db.prepare(`
    UPDATE asset_heads
    SET
      name = ?,
      voxel_group_json = ?,
      compiled_render_json = ?,
      draft_revision = ?,
      thumb_storage_key = ?,
      source_asset_head_id = ?,
      linked_listing_id = ?,
      lineage_asset_head_ids_json = ?,
      draft_kind = ?,
      is_library_item = ?,
      updated_at = ?,
      deleted_at = NULL
    WHERE owner_account_id = ? AND asset_head_id = ?
  `).run(
    input.name,
    JSON.stringify(input.voxelGroup),
    JSON.stringify(nextCompiledRender),
    current.draftRevision + 1,
    input.thumbStorageKey ?? null,
    input.sourceAssetHeadId ?? null,
    input.linkedListingId ?? current.linkedListingId ?? null,
    JSON.stringify(input.lineageAssetHeadIds ?? []),
    input.draftKind ?? current.draftKind,
    input.isLibraryItem ? 1 : 0,
    now,
    ownerAccountId,
    assetHeadId
  );

  return { ok: true, value: getOwnedAssetHead(ownerAccountId, assetHeadId)! };
}

export function deleteOwnedAsset(ownerAccountId: string, assetHeadId: string): boolean {
  const current = getOwnedAssetHead(ownerAccountId, assetHeadId, {
    includeDeleted: true,
  });
  if (!current || current.deletedAt) return false;

  db.prepare(`
    UPDATE asset_heads
    SET deleted_at = ?, updated_at = ?
    WHERE owner_account_id = ? AND asset_head_id = ?
  `).run(Date.now(), Date.now(), ownerAccountId, assetHeadId);

  return true;
}

export function getAssetVersion(assetVersionId: AssetVersionId): AssetVersionSnapshotDocument | null {
  const row = db
    .prepare(`SELECT * FROM asset_versions WHERE asset_version_id = ?`)
    .get(assetVersionId) as any;

  return row ? mapAssetVersion(row) : null;
}

function getAssetVersionByHeadRevision(
  assetHeadId: string,
  sourceDraftRevision: number,
  visibility: "listed" | "unlisted"
): AssetVersionSnapshotDocument | null {
  const row = db
    .prepare(`
      SELECT *
      FROM asset_versions
      WHERE asset_head_id = ? AND source_draft_revision = ? AND visibility = ?
    `)
    .get(assetHeadId, sourceDraftRevision, visibility) as any;

  return row ? mapAssetVersion(row) : null;
}

function createAssetVersionSnapshot(
  asset: OwnedAssetHeadDocument,
  visibility: "listed" | "unlisted"
): AssetVersionSnapshotDocument {
  const existing = getAssetVersionByHeadRevision(
    asset.assetHeadId,
    asset.draftRevision,
    visibility
  );
  if (existing) return existing;

  const assetVersionId = makeId("assetver");

  db.prepare(`
    INSERT INTO asset_versions (
      asset_version_id,
      asset_head_id,
      owner_account_id,
      source_draft_revision,
      name,
      voxel_group_json,
      compiled_render_json,
      thumb_storage_key,
      visibility,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    assetVersionId,
    asset.assetHeadId,
    asset.ownerAccountId,
    asset.draftRevision,
    asset.name,
    JSON.stringify(asset.voxelGroup),
    JSON.stringify(asset.compiledRender),
    asset.thumbStorageKey ?? null,
    visibility,
    Date.now()
  );

  return getAssetVersion(assetVersionId)!;
}

export function getAssetListingByHeadId(assetHeadId: string): AssetListingDocument | null {
  const row = db
    .prepare(`SELECT * FROM asset_listings WHERE asset_head_id = ?`)
    .get(assetHeadId) as any;

  return row ? mapListing(row) : null;
}

function upsertPresetAssetHead(
  preset: PresetManifestEntry
): OwnedAssetHeadDocument {
  const assetHeadId = presetAssetHeadId(preset.id);
  const voxelGroup = readJsonFile<OwnedAssetHeadDocument["voxelGroup"]>(
    publicFilePath(preset.json)
  );
  const compiledRender = buildAssetCompiledRender(voxelGroup);
  const thumbStorageKey = preset.thumb ? fileDataUrl(publicFilePath(preset.thumb)) : null;
  const now = Date.now();
  const current = getAnyAssetHead(assetHeadId);

  if (!current) {
    db.prepare(`
      INSERT INTO asset_heads (
        asset_head_id,
        owner_account_id,
        name,
        voxel_group_json,
        compiled_render_json,
        draft_revision,
        thumb_storage_key,
        source_asset_head_id,
        linked_listing_id,
        lineage_asset_head_ids_json,
        draft_kind,
        is_library_item,
        created_at,
        updated_at,
        deleted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
    `).run(
      assetHeadId,
      PRESET_OWNER_ACCOUNT_ID,
      preset.name,
      JSON.stringify(voxelGroup),
      JSON.stringify(compiledRender),
      1,
      thumbStorageKey,
      null,
      preset.id,
      JSON.stringify([]),
      "normal",
      0,
      now,
      now
    );

    return getAnyAssetHead(assetHeadId)!;
  }

  const needsVersionBump =
    current.ownerAccountId !== PRESET_OWNER_ACCOUNT_ID ||
    current.name !== preset.name ||
    current.thumbStorageKey !== thumbStorageKey ||
    !jsonEquals(current.voxelGroup, voxelGroup) ||
    !jsonEquals(current.compiledRender, compiledRender);

  if (needsVersionBump) {
    db.prepare(`
      UPDATE asset_heads
      SET
        owner_account_id = ?,
        name = ?,
        voxel_group_json = ?,
        compiled_render_json = ?,
        draft_revision = ?,
        thumb_storage_key = ?,
        source_asset_head_id = NULL,
        linked_listing_id = ?,
        lineage_asset_head_ids_json = ?,
        draft_kind = ?,
        is_library_item = ?,
        updated_at = ?,
        deleted_at = NULL
      WHERE asset_head_id = ?
    `).run(
      PRESET_OWNER_ACCOUNT_ID,
      preset.name,
      JSON.stringify(voxelGroup),
      JSON.stringify(compiledRender),
      current.draftRevision + 1,
      thumbStorageKey,
      preset.id,
      JSON.stringify([]),
      "normal",
      0,
      now,
      assetHeadId
    );

    return getAnyAssetHead(assetHeadId)!;
  }

  const needsRepair =
    current.deletedAt != null ||
    current.linkedListingId !== preset.id ||
    current.sourceAssetHeadId != null ||
    current.draftKind !== "normal" ||
    current.isLibraryItem;

  if (needsRepair) {
    db.prepare(`
      UPDATE asset_heads
      SET
        owner_account_id = ?,
        thumb_storage_key = ?,
        source_asset_head_id = NULL,
        linked_listing_id = ?,
        lineage_asset_head_ids_json = ?,
        draft_kind = ?,
        is_library_item = ?,
        updated_at = ?,
        deleted_at = NULL
      WHERE asset_head_id = ?
    `).run(
      PRESET_OWNER_ACCOUNT_ID,
      thumbStorageKey,
      preset.id,
      JSON.stringify([]),
      "normal",
      0,
      now,
      assetHeadId
    );
  }

  return getAnyAssetHead(assetHeadId)!;
}

function upsertPresetListing(
  listingId: AssetListingId,
  asset: OwnedAssetHeadDocument
): void {
  const version = createAssetVersionSnapshot(asset, "listed");
  const existingById = getAssetListing(listingId);
  const existingByHead = getAssetListingByHeadId(asset.assetHeadId);
  const now = Date.now();

  if (
    existingById &&
    existingById.assetHeadId !== asset.assetHeadId &&
    existingByHead &&
    existingByHead.listingId !== listingId
  ) {
    throw new Error(
      `Preset listing conflict for ${listingId}: linked to ${existingById.assetHeadId} and ${existingByHead.assetHeadId}`
    );
  }

  if (existingById) {
    db.prepare(`
      UPDATE asset_listings
      SET
        owner_account_id = ?,
        asset_head_id = ?,
        current_asset_version_id = ?,
        name = ?,
        thumb_storage_key = ?,
        updated_at = ?
      WHERE listing_id = ?
    `).run(
      PRESET_OWNER_ACCOUNT_ID,
      asset.assetHeadId,
      version.assetVersionId,
      asset.name,
      asset.thumbStorageKey ?? null,
      now,
      listingId
    );
    return;
  }

  if (existingByHead) {
    db.prepare(`
      UPDATE asset_listings
      SET
        listing_id = ?,
        owner_account_id = ?,
        current_asset_version_id = ?,
        name = ?,
        thumb_storage_key = ?,
        updated_at = ?
      WHERE asset_head_id = ?
    `).run(
      listingId,
      PRESET_OWNER_ACCOUNT_ID,
      version.assetVersionId,
      asset.name,
      asset.thumbStorageKey ?? null,
      now,
      asset.assetHeadId
    );
    return;
  }

  db.prepare(`
    INSERT INTO asset_listings (
      listing_id,
      owner_account_id,
      asset_head_id,
      current_asset_version_id,
      name,
      thumb_storage_key,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    listingId,
    PRESET_OWNER_ACCOUNT_ID,
    asset.assetHeadId,
    version.assetVersionId,
    asset.name,
    asset.thumbStorageKey ?? null,
    now,
    now
  );
}

export function seedPresetMarketplaceAssets(): { presetCount: number } {
  const presets = loadPresetManifestEntries();

  db.exec("BEGIN");

  try {
    for (const preset of presets) {
      const asset = upsertPresetAssetHead(preset);
      upsertPresetListing(preset.id, asset);
    }

    db.exec("COMMIT");
    return { presetCount: presets.length };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export function getPublishedAssetDetail(
  listingId: AssetListingId
): PublishedAssetDetailDocument | null {
  const row = db
    .prepare(`
      SELECT
        l.listing_id,
        l.owner_account_id,
        l.asset_head_id,
        l.current_asset_version_id,
        l.name AS listing_name,
        l.thumb_storage_key AS listing_thumb_storage_key,
        l.created_at AS listing_created_at,
        l.updated_at AS listing_updated_at,
        v.asset_version_id,
        v.source_draft_revision,
        v.name AS version_name,
        v.voxel_group_json,
        v.compiled_render_json,
        v.thumb_storage_key AS version_thumb_storage_key,
        v.visibility,
        v.created_at AS version_created_at
      FROM asset_listings l
      JOIN asset_versions v
        ON v.asset_version_id = l.current_asset_version_id
      WHERE l.listing_id = ?
    `)
    .get(listingId) as any;

  if (!row) return null;

  return {
    listing: {
      listingId: row.listing_id,
      ownerAccountId: row.owner_account_id,
      assetHeadId: row.asset_head_id,
      currentAssetVersionId: row.current_asset_version_id,
      name: row.listing_name,
      thumbStorageKey: row.listing_thumb_storage_key ?? null,
      createdAt: Number(row.listing_created_at ?? 0),
      updatedAt: Number(row.listing_updated_at ?? 0),
    },
    currentVersion: {
      assetVersionId: row.asset_version_id,
      assetHeadId: row.asset_head_id,
      ownerAccountId: row.owner_account_id,
      sourceDraftRevision: Number(row.source_draft_revision ?? 0),
      name: row.version_name,
      voxelGroup: parseJson(row.voxel_group_json, {
        groupId: row.asset_head_id,
        position: { x: 0, y: 0, z: 0 },
        voxels: [],
      }),
      compiledRender: parseJson(
        row.compiled_render_json,
        buildAssetCompiledRender(
          parseJson(row.voxel_group_json, {
            groupId: row.asset_head_id,
            position: { x: 0, y: 0, z: 0 },
            voxels: [],
          })
        )
      ),
      thumbStorageKey: row.version_thumb_storage_key ?? null,
      visibility: row.visibility,
      createdAt: Number(row.version_created_at ?? 0),
    },
  };
}

export function listPublishedAssetDetails(): PublishedAssetDetailDocument[] {
  const rows = db
    .prepare(`
      SELECT listing_id
      FROM asset_listings
      ORDER BY updated_at DESC
    `)
    .all() as Array<{ listing_id: string }>;

  return rows
    .map((row) => getPublishedAssetDetail(row.listing_id))
    .filter((value): value is PublishedAssetDetailDocument => !!value);
}

export function publishOwnedAsset(
  ownerAccountId: string,
  assetHeadId: string
): PublishedAssetDetailDocument | null {
  const asset = getOwnedAssetHead(ownerAccountId, assetHeadId);
  if (!asset) return null;

  const version = createAssetVersionSnapshot(asset, "listed");
  const existingListing = getAssetListingByHeadId(assetHeadId);
  const now = Date.now();

  let listingId = existingListing?.listingId ?? makeId("listing");

  if (existingListing) {
    db.prepare(`
      UPDATE asset_listings
      SET current_asset_version_id = ?, name = ?, thumb_storage_key = ?, updated_at = ?
      WHERE listing_id = ?
    `).run(version.assetVersionId, asset.name, asset.thumbStorageKey ?? null, now, listingId);
  } else {
    db.prepare(`
      INSERT INTO asset_listings (
        listing_id,
        owner_account_id,
        asset_head_id,
        current_asset_version_id,
        name,
        thumb_storage_key,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      listingId,
      ownerAccountId,
      assetHeadId,
      version.assetVersionId,
      asset.name,
      asset.thumbStorageKey ?? null,
      now,
      now
    );
  }

  return getPublishedAssetDetail(listingId);
}

export function listOwnedWorldManifest(ownerAccountId: string): OwnedWorldManifestItem[] {
  const stmt = db.prepare(`
    SELECT world_id, updated_at, draft_revision, deleted_at
    FROM world_heads
    WHERE owner_account_id = ?
    ORDER BY updated_at DESC
  `);

  return stmt.all(ownerAccountId).map((row: any) => ({
    worldId: row.world_id,
    updatedAt: Number(row.updated_at ?? 0),
    draftRevision: Number(row.draft_revision ?? 0),
    deletedAt: row.deleted_at == null ? null : Number(row.deleted_at),
  }));
}

export function getOwnedWorld(
  ownerAccountId: string,
  worldId: WorldId,
  opts?: { includeDeleted?: boolean }
): OwnedWorldHeadDocument | null {
  const row = db
    .prepare(`
      SELECT *
      FROM world_heads
      WHERE owner_account_id = ? AND world_id = ?
    `)
    .get(ownerAccountId, worldId) as any;

  if (!row) return null;
  const doc = mapOwnedWorld(row);
  if (!opts?.includeDeleted && doc.deletedAt) return null;
  return doc;
}

export function createOwnedWorld(
  ownerAccountId: string,
  input: CreateOwnedWorldInput
): OwnedWorldHeadDocument {
  const worldId = makeId("world");
  const now = Date.now();

  db.prepare(`
    INSERT INTO world_heads (
      world_id,
      owner_account_id,
      name,
      instances_json,
      draft_revision,
      thumb_storage_key,
      created_at,
      updated_at,
      deleted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL)
  `).run(
    worldId,
    ownerAccountId,
    input.name,
    JSON.stringify(input.instances),
    1,
    input.thumbStorageKey ?? null,
    now,
    now
  );

  return getOwnedWorld(ownerAccountId, worldId)!;
}

export function updateOwnedWorld(
  ownerAccountId: string,
  worldId: WorldId,
  input: UpdateOwnedWorldInput
): { ok: true; value: OwnedWorldHeadDocument } | { ok: false; current: OwnedWorldHeadDocument } | null {
  const current = getOwnedWorld(ownerAccountId, worldId, { includeDeleted: true });
  if (!current || current.deletedAt) return null;

  if (current.draftRevision !== input.expectedDraftRevision) {
    return { ok: false, current };
  }

  db.prepare(`
    UPDATE world_heads
    SET
      name = ?,
      instances_json = ?,
      draft_revision = ?,
      thumb_storage_key = ?,
      updated_at = ?,
      deleted_at = NULL
    WHERE owner_account_id = ? AND world_id = ?
  `).run(
    input.name,
    JSON.stringify(input.instances),
    current.draftRevision + 1,
    input.thumbStorageKey ?? null,
    Date.now(),
    ownerAccountId,
    worldId
  );

  return { ok: true, value: getOwnedWorld(ownerAccountId, worldId)! };
}

export function deleteOwnedWorld(ownerAccountId: string, worldId: WorldId): boolean {
  const current = getOwnedWorld(ownerAccountId, worldId, { includeDeleted: true });
  if (!current || current.deletedAt) return false;

  db.prepare(`
    UPDATE world_heads
    SET deleted_at = ?, updated_at = ?
    WHERE owner_account_id = ? AND world_id = ?
  `).run(Date.now(), Date.now(), ownerAccountId, worldId);

  return true;
}

export function listPublishedWorlds(): PublishedWorldSnapshotDocument[] {
  return (db
    .prepare(`
      SELECT *
      FROM published_worlds
      ORDER BY created_at DESC
    `)
    .all() as any[]).map(mapPublishedWorld);
}

export function getPublishedWorld(
  publishedWorldId: PublishedWorldId
): PublishedWorldSnapshotDocument | null {
  const row = db
    .prepare(`
      SELECT *
      FROM published_worlds
      WHERE published_world_id = ?
    `)
    .get(publishedWorldId) as any;

  return row ? mapPublishedWorld(row) : null;
}

export function publishOwnedWorld(
  ownerAccountId: string,
  worldId: WorldId
): PublishedWorldSnapshotDocument | null {
  const world = getOwnedWorld(ownerAccountId, worldId);
  if (!world) return null;

  const groups = world.instances.map((instance) => {
    const effectiveAssetHeadId =
      instance.overrideAssetHeadId ?? instance.assetHeadId;
    const asset = getOwnedAssetHead(ownerAccountId, effectiveAssetHeadId);

    if (!asset) {
      throw new Error(`Missing asset head ${effectiveAssetHeadId} during publish`);
    }

    const listing = getAssetListingByHeadId(effectiveAssetHeadId);
    const version =
      listing &&
      getAssetVersion(listing.currentAssetVersionId)?.sourceDraftRevision ===
        asset.draftRevision
        ? getAssetVersion(listing.currentAssetVersionId)
        : createAssetVersionSnapshot(asset, "unlisted");

    if (!version) {
      throw new Error(`Missing asset version for ${effectiveAssetHeadId}`);
    }

    return {
      groupId: instance.instanceId,
      assetVersionId: version.assetVersionId,
      sourceAssetHeadId: effectiveAssetHeadId,
      listingId: listing?.listingId ?? null,
      logicTag: instance.logicTag ?? null,
      position: instance.position,
      rotation: instance.rotation,
      bounds: version.compiledRender.bounds,
      voxelCount: version.compiledRender.voxelCount,
      surfaces: version.compiledRender.surfaces,
    };
  });

  const publishedWorldId = makeId("pubworld");
  const createdAt = Date.now();
  const voxelCount = groups.reduce((sum, group) => sum + group.voxelCount, 0);

  db.prepare(`
    INSERT INTO published_worlds (
      published_world_id,
      source_world_id,
      owner_account_id,
      source_world_draft_revision,
      world_name,
      voxel_count,
      groups_json,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    publishedWorldId,
    world.worldId,
    ownerAccountId,
    world.draftRevision,
    world.name,
    voxelCount,
    JSON.stringify(groups),
    createdAt
  );

  return getPublishedWorld(publishedWorldId);
}
