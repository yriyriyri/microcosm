"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOwnedAssetManifest = listOwnedAssetManifest;
exports.getOwnedAssetHead = getOwnedAssetHead;
exports.createOwnedAsset = createOwnedAsset;
exports.updateOwnedAsset = updateOwnedAsset;
exports.deleteOwnedAsset = deleteOwnedAsset;
exports.getAssetVersion = getAssetVersion;
exports.getAssetListingByHeadId = getAssetListingByHeadId;
exports.seedPresetMarketplaceAssets = seedPresetMarketplaceAssets;
exports.getPublishedAssetDetail = getPublishedAssetDetail;
exports.listPublishedAssetDetails = listPublishedAssetDetails;
exports.publishOwnedAsset = publishOwnedAsset;
exports.listOwnedWorldManifest = listOwnedWorldManifest;
exports.getOwnedWorld = getOwnedWorld;
exports.createOwnedWorld = createOwnedWorld;
exports.updateOwnedWorld = updateOwnedWorld;
exports.deleteOwnedWorld = deleteOwnedWorld;
exports.listPublishedWorlds = listPublishedWorlds;
exports.getPublishedWorld = getPublishedWorld;
exports.publishOwnedWorld = publishOwnedWorld;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_sqlite_1 = require("node:sqlite");
const env_js_1 = require("./env.js");
const buildAssetCompiledRender_js_1 = require("../../../packages/voxel-core/src/buildAssetCompiledRender.js");
const db = new node_sqlite_1.DatabaseSync(env_js_1.DATABASE_PATH);
const PRESET_OWNER_ACCOUNT_ID = "system:presets";
const PRESET_PUBLIC_ROOT = node_path_1.default.join(env_js_1.REPO_ROOT, "apps", "web", "public");
const PRESET_MANIFEST_PATH = node_path_1.default.join(PRESET_PUBLIC_ROOT, "presets", "manifest.json");
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
function makeId(prefix) {
    const c = globalThis.crypto;
    if (c?.randomUUID)
        return `${prefix}_${c.randomUUID()}`;
    return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}
function parseJson(value, fallback) {
    if (typeof value !== "string" || !value)
        return fallback;
    try {
        return JSON.parse(value);
    }
    catch {
        return fallback;
    }
}
function boolFromSql(value) {
    return Number(value ?? 0) !== 0;
}
function publicFilePath(publicPath) {
    return node_path_1.default.join(PRESET_PUBLIC_ROOT, publicPath.replace(/^\/+/, ""));
}
function readJsonFile(filePath) {
    return JSON.parse((0, node_fs_1.readFileSync)(filePath, "utf8"));
}
function fileDataUrl(filePath) {
    const bytes = (0, node_fs_1.readFileSync)(filePath);
    const ext = node_path_1.default.extname(filePath).toLowerCase();
    const mimeType = ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
            ? "image/jpeg"
            : ext === ".webp"
                ? "image/webp"
                : "application/octet-stream";
    return `data:${mimeType};base64,${bytes.toString("base64")}`;
}
function presetAssetHeadId(listingId) {
    return `preset_head:${listingId}`;
}
function loadPresetManifestEntries() {
    const manifest = readJsonFile(PRESET_MANIFEST_PATH);
    if (!Array.isArray(manifest.presets))
        return [];
    return manifest.presets.filter((entry) => !!entry &&
        typeof entry.id === "string" &&
        typeof entry.name === "string" &&
        typeof entry.json === "string");
}
function mapOwnedAssetHead(row) {
    return {
        assetHeadId: row.asset_head_id,
        ownerAccountId: row.owner_account_id,
        name: row.name,
        voxelGroup: parseJson(row.voxel_group_json, {
            groupId: row.asset_head_id,
            position: { x: 0, y: 0, z: 0 },
            voxels: [],
        }),
        compiledRender: parseJson(row.compiled_render_json, (0, buildAssetCompiledRender_js_1.buildAssetCompiledRender)(parseJson(row.voxel_group_json, {
            groupId: row.asset_head_id,
            position: { x: 0, y: 0, z: 0 },
            voxels: [],
        }))),
        draftRevision: Number(row.draft_revision ?? 0),
        thumbStorageKey: row.thumb_storage_key ?? null,
        sourceAssetHeadId: row.source_asset_head_id ?? null,
        linkedListingId: row.linked_listing_id ?? null,
        lineageAssetHeadIds: parseJson(row.lineage_asset_head_ids_json, []),
        draftKind: (row.draft_kind ?? "normal"),
        isLibraryItem: boolFromSql(row.is_library_item),
        createdAt: Number(row.created_at ?? 0),
        updatedAt: Number(row.updated_at ?? 0),
        deletedAt: row.deleted_at == null ? null : Number(row.deleted_at),
    };
}
function mapAssetVersion(row) {
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
        compiledRender: parseJson(row.compiled_render_json, (0, buildAssetCompiledRender_js_1.buildAssetCompiledRender)(parseJson(row.voxel_group_json, {
            groupId: row.asset_head_id,
            position: { x: 0, y: 0, z: 0 },
            voxels: [],
        }))),
        thumbStorageKey: row.thumb_storage_key ?? null,
        visibility: row.visibility,
        createdAt: Number(row.created_at ?? 0),
    };
}
function mapListing(row) {
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
function mapOwnedWorld(row) {
    return {
        worldId: row.world_id,
        ownerAccountId: row.owner_account_id,
        name: row.name,
        draftRevision: Number(row.draft_revision ?? 0),
        instances: parseJson(row.instances_json, []),
        thumbStorageKey: row.thumb_storage_key ?? null,
        createdAt: Number(row.created_at ?? 0),
        updatedAt: Number(row.updated_at ?? 0),
        deletedAt: row.deleted_at == null ? null : Number(row.deleted_at),
    };
}
function mapPublishedWorld(row) {
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
function jsonEquals(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}
function getAnyAssetHead(assetHeadId) {
    const row = db
        .prepare(`
      SELECT *
      FROM asset_heads
      WHERE asset_head_id = ?
    `)
        .get(assetHeadId);
    return row ? mapOwnedAssetHead(row) : null;
}
function getAssetListing(listingId) {
    const row = db
        .prepare(`
      SELECT *
      FROM asset_listings
      WHERE listing_id = ?
    `)
        .get(listingId);
    return row ? mapListing(row) : null;
}
function listOwnedAssetManifest(ownerAccountId) {
    const stmt = db.prepare(`
    SELECT asset_head_id, updated_at, draft_revision, deleted_at
    FROM asset_heads
    WHERE owner_account_id = ?
    ORDER BY updated_at DESC
  `);
    return stmt.all(ownerAccountId).map((row) => ({
        assetHeadId: row.asset_head_id,
        updatedAt: Number(row.updated_at ?? 0),
        draftRevision: Number(row.draft_revision ?? 0),
        deletedAt: row.deleted_at == null ? null : Number(row.deleted_at),
    }));
}
function getOwnedAssetHead(ownerAccountId, assetHeadId, opts) {
    const row = db
        .prepare(`
      SELECT *
      FROM asset_heads
      WHERE owner_account_id = ? AND asset_head_id = ?
    `)
        .get(ownerAccountId, assetHeadId);
    if (!row)
        return null;
    const doc = mapOwnedAssetHead(row);
    if (!opts?.includeDeleted && doc.deletedAt)
        return null;
    return doc;
}
function createOwnedAsset(ownerAccountId, input) {
    const now = Date.now();
    const assetHeadId = makeId("asset");
    const compiledRender = (0, buildAssetCompiledRender_js_1.buildAssetCompiledRender)(input.voxelGroup);
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
  `).run(assetHeadId, ownerAccountId, input.name, JSON.stringify(input.voxelGroup), JSON.stringify(compiledRender), 1, input.thumbStorageKey ?? null, input.sourceAssetHeadId ?? null, input.linkedListingId ?? null, JSON.stringify(input.lineageAssetHeadIds ?? []), input.draftKind ?? "normal", input.isLibraryItem ? 1 : 0, now, now);
    return getOwnedAssetHead(ownerAccountId, assetHeadId);
}
function updateOwnedAsset(ownerAccountId, assetHeadId, input) {
    const current = getOwnedAssetHead(ownerAccountId, assetHeadId, {
        includeDeleted: true,
    });
    if (!current || current.deletedAt)
        return null;
    if (current.draftRevision !== input.expectedDraftRevision) {
        return { ok: false, current };
    }
    const voxelGroupChanged = !jsonEquals(current.voxelGroup, input.voxelGroup);
    const nextCompiledRender = voxelGroupChanged
        ? (0, buildAssetCompiledRender_js_1.buildAssetCompiledRender)(input.voxelGroup)
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
  `).run(input.name, JSON.stringify(input.voxelGroup), JSON.stringify(nextCompiledRender), current.draftRevision + 1, input.thumbStorageKey ?? null, input.sourceAssetHeadId ?? null, input.linkedListingId ?? current.linkedListingId ?? null, JSON.stringify(input.lineageAssetHeadIds ?? []), input.draftKind ?? current.draftKind, input.isLibraryItem ? 1 : 0, now, ownerAccountId, assetHeadId);
    return { ok: true, value: getOwnedAssetHead(ownerAccountId, assetHeadId) };
}
function deleteOwnedAsset(ownerAccountId, assetHeadId) {
    const current = getOwnedAssetHead(ownerAccountId, assetHeadId, {
        includeDeleted: true,
    });
    if (!current || current.deletedAt)
        return false;
    db.prepare(`
    UPDATE asset_heads
    SET deleted_at = ?, updated_at = ?
    WHERE owner_account_id = ? AND asset_head_id = ?
  `).run(Date.now(), Date.now(), ownerAccountId, assetHeadId);
    return true;
}
function getAssetVersion(assetVersionId) {
    const row = db
        .prepare(`SELECT * FROM asset_versions WHERE asset_version_id = ?`)
        .get(assetVersionId);
    return row ? mapAssetVersion(row) : null;
}
function getAssetVersionByHeadRevision(assetHeadId, sourceDraftRevision, visibility) {
    const row = db
        .prepare(`
      SELECT *
      FROM asset_versions
      WHERE asset_head_id = ? AND source_draft_revision = ? AND visibility = ?
    `)
        .get(assetHeadId, sourceDraftRevision, visibility);
    return row ? mapAssetVersion(row) : null;
}
function createAssetVersionSnapshot(asset, visibility) {
    const existing = getAssetVersionByHeadRevision(asset.assetHeadId, asset.draftRevision, visibility);
    if (existing)
        return existing;
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
  `).run(assetVersionId, asset.assetHeadId, asset.ownerAccountId, asset.draftRevision, asset.name, JSON.stringify(asset.voxelGroup), JSON.stringify(asset.compiledRender), asset.thumbStorageKey ?? null, visibility, Date.now());
    return getAssetVersion(assetVersionId);
}
function getAssetListingByHeadId(assetHeadId) {
    const row = db
        .prepare(`SELECT * FROM asset_listings WHERE asset_head_id = ?`)
        .get(assetHeadId);
    return row ? mapListing(row) : null;
}
function upsertPresetAssetHead(preset) {
    const assetHeadId = presetAssetHeadId(preset.id);
    const voxelGroup = readJsonFile(publicFilePath(preset.json));
    const compiledRender = (0, buildAssetCompiledRender_js_1.buildAssetCompiledRender)(voxelGroup);
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
    `).run(assetHeadId, PRESET_OWNER_ACCOUNT_ID, preset.name, JSON.stringify(voxelGroup), JSON.stringify(compiledRender), 1, thumbStorageKey, null, preset.id, JSON.stringify([]), "normal", 0, now, now);
        return getAnyAssetHead(assetHeadId);
    }
    const needsVersionBump = current.ownerAccountId !== PRESET_OWNER_ACCOUNT_ID ||
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
    `).run(PRESET_OWNER_ACCOUNT_ID, preset.name, JSON.stringify(voxelGroup), JSON.stringify(compiledRender), current.draftRevision + 1, thumbStorageKey, preset.id, JSON.stringify([]), "normal", 0, now, assetHeadId);
        return getAnyAssetHead(assetHeadId);
    }
    const needsRepair = current.deletedAt != null ||
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
    `).run(PRESET_OWNER_ACCOUNT_ID, thumbStorageKey, preset.id, JSON.stringify([]), "normal", 0, now, assetHeadId);
    }
    return getAnyAssetHead(assetHeadId);
}
function upsertPresetListing(listingId, asset) {
    const version = createAssetVersionSnapshot(asset, "listed");
    const existingById = getAssetListing(listingId);
    const existingByHead = getAssetListingByHeadId(asset.assetHeadId);
    const now = Date.now();
    if (existingById &&
        existingById.assetHeadId !== asset.assetHeadId &&
        existingByHead &&
        existingByHead.listingId !== listingId) {
        throw new Error(`Preset listing conflict for ${listingId}: linked to ${existingById.assetHeadId} and ${existingByHead.assetHeadId}`);
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
    `).run(PRESET_OWNER_ACCOUNT_ID, asset.assetHeadId, version.assetVersionId, asset.name, asset.thumbStorageKey ?? null, now, listingId);
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
    `).run(listingId, PRESET_OWNER_ACCOUNT_ID, version.assetVersionId, asset.name, asset.thumbStorageKey ?? null, now, asset.assetHeadId);
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
  `).run(listingId, PRESET_OWNER_ACCOUNT_ID, asset.assetHeadId, version.assetVersionId, asset.name, asset.thumbStorageKey ?? null, now, now);
}
function seedPresetMarketplaceAssets() {
    const presets = loadPresetManifestEntries();
    db.exec("BEGIN");
    try {
        for (const preset of presets) {
            const asset = upsertPresetAssetHead(preset);
            upsertPresetListing(preset.id, asset);
        }
        db.exec("COMMIT");
        return { presetCount: presets.length };
    }
    catch (error) {
        db.exec("ROLLBACK");
        throw error;
    }
}
function getPublishedAssetDetail(listingId) {
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
        .get(listingId);
    if (!row)
        return null;
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
            compiledRender: parseJson(row.compiled_render_json, (0, buildAssetCompiledRender_js_1.buildAssetCompiledRender)(parseJson(row.voxel_group_json, {
                groupId: row.asset_head_id,
                position: { x: 0, y: 0, z: 0 },
                voxels: [],
            }))),
            thumbStorageKey: row.version_thumb_storage_key ?? null,
            visibility: row.visibility,
            createdAt: Number(row.version_created_at ?? 0),
        },
    };
}
function listPublishedAssetDetails() {
    const rows = db
        .prepare(`
      SELECT listing_id
      FROM asset_listings
      ORDER BY updated_at DESC
    `)
        .all();
    return rows
        .map((row) => getPublishedAssetDetail(row.listing_id))
        .filter((value) => !!value);
}
function publishOwnedAsset(ownerAccountId, assetHeadId) {
    const asset = getOwnedAssetHead(ownerAccountId, assetHeadId);
    if (!asset)
        return null;
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
    }
    else {
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
    `).run(listingId, ownerAccountId, assetHeadId, version.assetVersionId, asset.name, asset.thumbStorageKey ?? null, now, now);
    }
    return getPublishedAssetDetail(listingId);
}
function listOwnedWorldManifest(ownerAccountId) {
    const stmt = db.prepare(`
    SELECT world_id, updated_at, draft_revision, deleted_at
    FROM world_heads
    WHERE owner_account_id = ?
    ORDER BY updated_at DESC
  `);
    return stmt.all(ownerAccountId).map((row) => ({
        worldId: row.world_id,
        updatedAt: Number(row.updated_at ?? 0),
        draftRevision: Number(row.draft_revision ?? 0),
        deletedAt: row.deleted_at == null ? null : Number(row.deleted_at),
    }));
}
function getOwnedWorld(ownerAccountId, worldId, opts) {
    const row = db
        .prepare(`
      SELECT *
      FROM world_heads
      WHERE owner_account_id = ? AND world_id = ?
    `)
        .get(ownerAccountId, worldId);
    if (!row)
        return null;
    const doc = mapOwnedWorld(row);
    if (!opts?.includeDeleted && doc.deletedAt)
        return null;
    return doc;
}
function createOwnedWorld(ownerAccountId, input) {
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
  `).run(worldId, ownerAccountId, input.name, JSON.stringify(input.instances), 1, input.thumbStorageKey ?? null, now, now);
    return getOwnedWorld(ownerAccountId, worldId);
}
function updateOwnedWorld(ownerAccountId, worldId, input) {
    const current = getOwnedWorld(ownerAccountId, worldId, { includeDeleted: true });
    if (!current || current.deletedAt)
        return null;
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
  `).run(input.name, JSON.stringify(input.instances), current.draftRevision + 1, input.thumbStorageKey ?? null, Date.now(), ownerAccountId, worldId);
    return { ok: true, value: getOwnedWorld(ownerAccountId, worldId) };
}
function deleteOwnedWorld(ownerAccountId, worldId) {
    const current = getOwnedWorld(ownerAccountId, worldId, { includeDeleted: true });
    if (!current || current.deletedAt)
        return false;
    db.prepare(`
    UPDATE world_heads
    SET deleted_at = ?, updated_at = ?
    WHERE owner_account_id = ? AND world_id = ?
  `).run(Date.now(), Date.now(), ownerAccountId, worldId);
    return true;
}
function listPublishedWorlds() {
    return db
        .prepare(`
      SELECT *
      FROM published_worlds
      ORDER BY created_at DESC
    `)
        .all().map(mapPublishedWorld);
}
function getPublishedWorld(publishedWorldId) {
    const row = db
        .prepare(`
      SELECT *
      FROM published_worlds
      WHERE published_world_id = ?
    `)
        .get(publishedWorldId);
    return row ? mapPublishedWorld(row) : null;
}
function publishOwnedWorld(ownerAccountId, worldId) {
    const world = getOwnedWorld(ownerAccountId, worldId);
    if (!world)
        return null;
    const groups = world.instances.map((instance) => {
        const effectiveAssetHeadId = instance.overrideAssetHeadId ?? instance.assetHeadId;
        const asset = getOwnedAssetHead(ownerAccountId, effectiveAssetHeadId);
        if (!asset) {
            throw new Error(`Missing asset head ${effectiveAssetHeadId} during publish`);
        }
        const listing = getAssetListingByHeadId(effectiveAssetHeadId);
        const version = listing &&
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
  `).run(publishedWorldId, world.worldId, ownerAccountId, world.draftRevision, world.name, voxelCount, JSON.stringify(groups), createdAt);
    return getPublishedWorld(publishedWorldId);
}
