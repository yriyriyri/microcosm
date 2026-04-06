import * as THREE from "three";

import type { VoxelCoord, GroupRotation } from "./Types";
import { keyOf } from "./Types";

import type {
  WorldAssetKind,
  WorldData,
  WorldInstanceRecord,
} from "./domain/worldTypes";

import { assetRepository } from "./repositories";

// public domain aliases

export type GroupId = string;
export type AssetKind = WorldAssetKind;

// local voxel relative to group origin

export type LocalVoxel = {
  local: VoxelCoord;
  color: string;
  mesh: THREE.Mesh;
  isBlueprint: boolean;
  groupId: GroupId;
};

// group marketplace source

export type GroupSource = {
  instanceId: string;
  assetId: string | null;
  assetKind: AssetKind | null;
  overrideAssetId: string | null;
  logicTag: string | null;
};

// group runtime record

type GroupRecord = {
  position: VoxelCoord;
  rotation: GroupRotation;
  root: THREE.Group;
  voxels: Map<string, LocalVoxel>;
  source: GroupSource;
};

// group logical voxels state -> used for focus mode and asset saving

export type GroupState = {
  groupId: GroupId;
  position: VoxelCoord;
  voxels: GroupVoxel[];
};

// group logical voxel

export type GroupVoxel = {
  local: VoxelCoord;
  color: string;
  isBlueprint: boolean;
};

// serialised data for depreciated world save 

export type WorldPacked = {
  localPositions: Int32Array; 
  colors: Uint32Array;
  blueprints?: Uint8Array;
  groupIds?: Uint32Array;
  groupTable?: string[];
  groupPositions?: Int32Array;
};

// render config

export type VoxelWorldRenderConfig = {
  blueprintOpacity?: number;
  blueprintDepthWrite?: boolean;
  blueprintTint?: boolean;
};

// published world bake

export type PublishedWorldSurface = {
  color: string;
  isBlueprint: boolean;
  positions: number[];
  normals: number[];
  indices: number[];
  vertexCount: number;
  triangleCount: number;
};

export type PublishedWorldBakedGroupSnapshot = {
  groupId: string;
  latestMarketplaceAssetId: string | null;
  assetKind: AssetKind | null;
  logicTag: string | null;
  position: VoxelCoord;
  rotation: GroupRotation;
  bounds: {
    min: VoxelCoord;
    max: VoxelCoord;
  } | null;
  voxelCount: number;
  surfaces: PublishedWorldSurface[];
};

export type PublishedWorldBakedSnapshot = {
  voxelCount: number;
  latestMarketplaceAssetIds: string[];
  groups: PublishedWorldBakedGroupSnapshot[];
};

// file scope constants

const DEFAULT_GROUP: GroupId = "default";

// helpers

// identity

function makeRuntimeId(): string {
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return `instance_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

// color helpers for depreciated blueprint tint

function hexToRgb24(hex: string): number {
  const h = hex.startsWith("#") ? hex.slice(1) : hex;
  return parseInt(h, 16) & 0x00ffffff;
}

function rgb24ToHex(v: number): string {
  const s = (v & 0x00ffffff).toString(16).padStart(6, "0");
  return `#${s}`;
}

function hexToRgb01(hex: string): { r: number; g: number; b: number } {
  const v = hexToRgb24(hex);
  return {
    r: ((v >> 16) & 255) / 255,
    g: ((v >> 8) & 255) / 255,
    b: (v & 255) / 255,
  };
}

function rgb01ToHex(r: number, g: number, b: number): string {
  const R = Math.max(0, Math.min(255, Math.round(r * 255)));
  const G = Math.max(0, Math.min(255, Math.round(g * 255)));
  const B = Math.max(0, Math.min(255, Math.round(b * 255)));
  return `#${R.toString(16).padStart(2, "0")}${G.toString(16).padStart(2, "0")}${B
    .toString(16)
    .padStart(2, "0")}`;
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function rgbToHsv(r: number, g: number, b: number) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
    if (h < 0) h += 1;
  }

  const s = max === 0 ? 0 : d / max;
  const v = max;

  return { h, s, v };
}

function hsvToRgb(h: number, s: number, v: number) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      return { r: v, g: t, b: p };
    case 1:
      return { r: q, g: v, b: p };
    case 2:
      return { r: p, g: v, b: t };
    case 3:
      return { r: p, g: q, b: v };
    case 4:
      return { r: t, g: p, b: v };
    case 5:
      return { r: v, g: p, b: q };
    default:
      return { r: v, g: t, b: p };
  }
}

function blueprintTint(hex: string): string {
  const { r, g, b } = hexToRgb01(hex);

  const lum = clamp01(0.2126 * r + 0.7152 * g + 0.0722 * b);

  const hsv0 = rgbToHsv(r, g, b);

  const BLUE_MIN = 195 / 360;
  const BLUE_MAX = 225 / 360;

  const h2 = BLUE_MIN + hsv0.h * (BLUE_MAX - BLUE_MIN);

  const s2 = 0.6;

  const V_MIN = 0.72;
  const V_MAX = 0.995;

  const lum2 = Math.pow(lum, 0.9);
  const v2 = V_MIN + (V_MAX - V_MIN) * lum2;

  const bp = hsvToRgb(h2, s2, clamp01(v2));

  const bpMix = 0.6;

  let r2 = r * (1 - bpMix) + bp.r * bpMix;
  let g2 = g * (1 - bpMix) + bp.g * bpMix;
  let b2 = b * (1 - bpMix) + bp.b * bpMix;

  const lift = 1.1;
  r2 *= lift;
  g2 *= lift;
  b2 *= lift;

  return rgb01ToHex(clamp01(r2), clamp01(g2), clamp01(b2));
}

// rotation helpers

function normalizeQuarterTurn(v?: number): 0 | 1 | 2 | 3 {
  const n = ((v ?? 0) % 4 + 4) % 4;
  return n as 0 | 1 | 2 | 3;
}

function normalizeRotation(
  r?: Partial<GroupRotation> | null
): GroupRotation {
  return {
    x: normalizeQuarterTurn(r?.x),
    y: normalizeQuarterTurn(r?.y),
    z: normalizeQuarterTurn(r?.z),
  };
}

function rotationToEuler(r: GroupRotation): THREE.Euler {
  return new THREE.Euler(
    r.x * (Math.PI / 2),
    r.y * (Math.PI / 2),
    r.z * (Math.PI / 2),
    "XYZ"
  );
}

export class VoxelWorld {
  // fields 

  private scene: THREE.Scene;

  private groups = new Map<GroupId, GroupRecord>();
  private worldIndex = new Map<string, LocalVoxel>(); 

  private geometry: THREE.BoxGeometry;
  private materialCache = new Map<string, THREE.MeshStandardMaterial>();

  private renderCfg: Required<VoxelWorldRenderConfig>;

  // lifecycle

  constructor(scene: THREE.Scene, cfg?: VoxelWorldRenderConfig) {
    this.scene = scene;
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.renderCfg = {
      blueprintOpacity: cfg?.blueprintOpacity ?? 0.7,
      blueprintDepthWrite: cfg?.blueprintDepthWrite ?? false,
      blueprintTint: cfg?.blueprintTint ?? false,
    };
    this.ensureGroup(DEFAULT_GROUP, { x: 0, y: 0, z: 0 });
  }

  dispose() {
    for (const g of this.groups.values()) this.scene.remove(g.root);
    this.groups.clear();
    this.worldIndex.clear();

    this.geometry.dispose();
    for (const m of this.materialCache.values()) m.dispose();
    this.materialCache.clear();
  }

  clear() {
    for (const g of this.groups.values()) {
      for (const v of g.voxels.values()) g.root.remove(v.mesh);
      g.voxels.clear();
      this.scene.remove(g.root);
    }

    this.groups.clear();
    this.worldIndex.clear();

    this.ensureGroup(DEFAULT_GROUP, { x: 0, y: 0, z: 0 });
  }

  // private internals

  private ensureGroup(groupId: GroupId, position: VoxelCoord): GroupRecord {
    let g = this.groups.get(groupId);
    if (g) return g;

    const instanceId = makeRuntimeId();
    const rotation = normalizeRotation();

    const root = new THREE.Group();
    root.name = `voxel-group:${groupId}`;
    root.position.set(position.x, position.y, position.z);

    const euler = rotationToEuler(rotation);
    root.rotation.set(euler.x, euler.y, euler.z);

    root.userData.groupId = groupId;
    root.userData.instanceId = instanceId;
    root.userData.sourceAssetId = null;
    root.userData.sourceAssetKind = null;
    root.userData.overrideAssetId = null;
    root.userData.logicTag = null;
    root.userData.rotation = { ...rotation };

    this.scene.add(root);

    g = {
      position: { ...position },
      rotation,
      root,
      voxels: new Map(),
      source: {
        instanceId,
        assetId: null,
        assetKind: null,
        overrideAssetId: null,
        logicTag: null,
      },
    };

    this.groups.set(groupId, g);
    return g;
  }

  private getMaterial(color: string, isBlueprint: boolean) {
    const key = `${color}|${isBlueprint ? "bp" : "solid"}|${isBlueprint ? this.renderCfg.blueprintOpacity : 1}`;
    let mat = this.materialCache.get(key);
    if (mat) return mat;

    const displayColor =
      isBlueprint && this.renderCfg.blueprintTint ? blueprintTint(color) : color;

    mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(displayColor),
      transparent: isBlueprint,
      opacity: isBlueprint ? this.renderCfg.blueprintOpacity : 0.7,
    });

    if (isBlueprint) {
      mat.depthWrite = this.renderCfg.blueprintDepthWrite;
    }

    this.materialCache.set(key, mat);
    return mat;
  }

  private worldFrom(groupPos: VoxelCoord, local: VoxelCoord): VoxelCoord {
    return {
      x: groupPos.x + local.x,
      y: groupPos.y + local.y,
      z: groupPos.z + local.z,
    };
  }

  private normalizeGroupIdBase(base: string) {
    const b = (base ?? "").trim();
    const safe = b
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_\-]/g, "")
      .slice(0, 48);

    return safe || "group";
  }

  // group identity

  makeUniqueGroupId(base: string = "group"): GroupId {
    let root = this.normalizeGroupIdBase(base);
    if (root === DEFAULT_GROUP) root = "group";

    let candidate: GroupId = root;
    let i = 1;
    while (this.groups.has(candidate)) {
      candidate = `${root}_${i++}`;
    }
    return candidate;
  }

  createGroup(position: VoxelCoord, baseId: string = "group"): GroupId {
    const gid = this.makeUniqueGroupId(baseId);
    this.addGroup(gid, position);
    return gid;
  }

  addGroup(groupId: GroupId, position: VoxelCoord) {
    this.ensureGroup(groupId, position);
  }

  removeGroup(groupId: GroupId): boolean {
    const g = this.groups.get(groupId);
    if (!g) return false;

    const gp = g.position;

    for (const v of g.voxels.values()) {
      const world = this.worldFrom(gp, v.local);
      this.worldIndex.delete(keyOf(world));
      g.root.remove(v.mesh);
    }

    g.voxels.clear();
    this.scene.remove(g.root);
    this.groups.delete(groupId);

    return true;
  }

  listGroupIds(): GroupId[] {
    return Array.from(this.groups.keys());
  }

    // group snapshot / replacement

    getGroupSnapshot(groupId: GroupId): GroupState | null {
      const g = this.groups.get(groupId);
      if (!g) return null;
  
      const voxels: GroupVoxel[] = [];
      for (const v of g.voxels.values()) {
        voxels.push({
          local: { ...v.local },
          color: v.color,
          isBlueprint: v.isBlueprint,
        });
      }
  
      return {
        groupId,
        position: { ...g.position },
        voxels,
      };
    }
  
    setGroupVoxelsLocal(groupId: GroupId, voxels: GroupVoxel[], opts?: { keepPosition?: boolean }): boolean {
      const keepPosition = opts?.keepPosition ?? true;
  
      const existing = this.groups.get(groupId);
      if (existing && !keepPosition) {
        const ok = this.setGroupPosition(groupId, { x: 0, y: 0, z: 0 });
        if (!ok) return false;
      }
  
      const g = this.ensureGroup(groupId, this.getGroupPosition(groupId));
  
      const gp = g.position;
      for (const v of g.voxels.values()) {
        const world = this.worldFrom(gp, v.local);
        this.worldIndex.delete(keyOf(world));
        g.root.remove(v.mesh);
      }
      g.voxels.clear();
  
      for (const v of voxels) {
        this.addVoxelLocal(groupId, v.local, v.color, { isBlueprint: v.isBlueprint });
      }
  
      return true;
    }
  
    instantiateGroupState(
      state: GroupState,
      opts: {
        at: VoxelCoord;
        baseId?: string;
        instanceId?: string;
        sourceAssetId?: string | null;
        sourceAssetKind?: AssetKind | null;
        logicTag?: string | null;
        rotation?: GroupRotation | null;
      }
    ): GroupId {
      const base = opts.baseId ?? state.groupId ?? "asset";
      const gid = this.makeUniqueGroupId(base);
  
      this.addGroup(gid, { ...opts.at });
      this.setGroupRotation(gid, opts.rotation ?? { x: 0, y: 0, z: 0 });
      this.setGroupSource(gid, {
        instanceId: opts.instanceId ?? makeRuntimeId(),
        assetId: opts.sourceAssetId ?? null,
        assetKind: opts.sourceAssetKind ?? null,
        logicTag: opts.logicTag ?? null,
      });
  
      for (const v of state.voxels) {
        this.addVoxelLocal(gid, v.local, v.color, { isBlueprint: v.isBlueprint });
      }
  
      return gid;
    }

  // group level actions

  getGroupPosition(groupId: GroupId): VoxelCoord {
    return this.groups.get(groupId)?.position ?? { x: 0, y: 0, z: 0 };
  }

  setGroupPosition(groupId: GroupId, position: VoxelCoord): boolean {
    const g = this.groups.get(groupId);
    if (!g) return false;

    const oldPos = g.position;
    if (
      oldPos.x === position.x &&
      oldPos.y === position.y &&
      oldPos.z === position.z
    ) return true;

    for (const v of g.voxels.values()) {
      const world = {
        x: oldPos.x + v.local.x,
        y: oldPos.y + v.local.y,
        z: oldPos.z + v.local.z,
      };
      this.worldIndex.delete(keyOf(world));
    }

    g.position = { ...position };
    g.root.position.set(position.x, position.y, position.z);

    for (const v of g.voxels.values()) {
      const world = {
        x: position.x + v.local.x,
        y: position.y + v.local.y,
        z: position.z + v.local.z,
      };
      this.worldIndex.set(keyOf(world), v);

      v.mesh.userData.coord = { ...world };
      v.mesh.userData.groupId = groupId;
      v.mesh.userData.local = { ...v.local };
      v.mesh.userData.instanceId = g.source.instanceId;
      v.mesh.userData.sourceAssetId = g.source.assetId;
      v.mesh.userData.sourceAssetKind = g.source.assetKind;
      v.mesh.userData.overrideAssetId = g.source.overrideAssetId;
      v.mesh.userData.logicTag = g.source.logicTag;
    }

    return true;
  }

  getGroupRotation(groupId: GroupId): GroupRotation {
    const g = this.groups.get(groupId);
    return g ? { ...g.rotation } : { x: 0, y: 0, z: 0 };
  }

  setGroupRotation(
    groupId: GroupId,
    rotation: Partial<GroupRotation>
  ): boolean {
    const g = this.groups.get(groupId);
    if (!g) return false;

    g.rotation = normalizeRotation({
      ...g.rotation,
      ...rotation,
    });

    const euler = rotationToEuler(g.rotation);
    g.root.rotation.set(euler.x, euler.y, euler.z);

    return true;
  }

  getGroupSource(groupId: GroupId): GroupSource | null {
    const g = this.groups.get(groupId);
    if (!g) return null;
    return { ...g.source };
  }

  setGroupSource(groupId: GroupId, source: Partial<GroupSource>): boolean {
    const g = this.groups.get(groupId);
    if (!g) return false;
  
    g.source = {
      instanceId:
        source.instanceId !== undefined
          ? source.instanceId
          : g.source.instanceId,
  
      assetId:
        source.assetId !== undefined
          ? source.assetId
          : g.source.assetId,
  
      assetKind:
        source.assetKind !== undefined
          ? source.assetKind
          : g.source.assetKind,
  
      overrideAssetId:
        source.overrideAssetId !== undefined
          ? source.overrideAssetId
          : g.source.overrideAssetId,
  
      logicTag:
        source.logicTag !== undefined
          ? source.logicTag
          : g.source.logicTag,
    };
  
    g.root.userData.instanceId = g.source.instanceId;
    g.root.userData.sourceAssetId = g.source.assetId;
    g.root.userData.sourceAssetKind = g.source.assetKind;
    g.root.userData.overrideAssetId = g.source.overrideAssetId;
    g.root.userData.logicTag = g.source.logicTag;
  
    for (const v of g.voxels.values()) {
      v.mesh.userData.instanceId = g.source.instanceId;
      v.mesh.userData.sourceAssetId = g.source.assetId;
      v.mesh.userData.sourceAssetKind = g.source.assetKind;
      v.mesh.userData.overrideAssetId = g.source.overrideAssetId;
      v.mesh.userData.logicTag = g.source.logicTag;
    }
  
    return true;
  }

  clearGroupSource(groupId: GroupId): boolean {
    return this.setGroupSource(groupId, {
      assetId: null,
      assetKind: null,
      overrideAssetId: null,
      logicTag: null,
    });
  }

  getGroupLogicTag(groupId: GroupId): string | null {
    return this.groups.get(groupId)?.source.logicTag ?? null;
  }
  
  setGroupLogicTag(groupId: GroupId, logicTag: string | null): boolean {
    return this.setGroupSource(groupId, { logicTag });
  }

  rotateGroup90(groupId: GroupId, axis: "x" | "y" | "z", dir: 1 | -1): boolean {
    const g = this.groups.get(groupId);
    if (!g) return false;

    const next = { ...g.rotation };
    next[axis] = normalizeQuarterTurn(next[axis] + dir);
    return this.setGroupRotation(groupId, next);
  }

  // voxel level actions

  has(coord: VoxelCoord) {
    return this.worldIndex.has(keyOf(coord));
  }

  get(coord: VoxelCoord) {
    const v = this.worldIndex.get(keyOf(coord));
    if (!v) return undefined;

    const g = this.groups.get(v.groupId);
    const gp = g?.position ?? { x: 0, y: 0, z: 0 };

    return {
      coord,
      color: v.color,
      mesh: v.mesh,
      isBlueprint: v.isBlueprint,
      groupId: v.groupId,
      local: { ...v.local },
      groupPosition: { ...gp },
      sourceAssetId: g?.source.assetId ?? null,
      sourceAssetKind: g?.source.assetKind ?? null,
      overrideAssetId: g?.source.overrideAssetId ?? null,
      logicTag: g?.source.logicTag ?? null,
    };
  }

  addVoxel(coord: VoxelCoord, color: string, opts?: { isBlueprint?: boolean; groupId?: GroupId }): boolean {
    const groupId = opts?.groupId ?? DEFAULT_GROUP;
    const g = this.ensureGroup(groupId, { x: 0, y: 0, z: 0 });

    const local: VoxelCoord = {
      x: coord.x - g.position.x,
      y: coord.y - g.position.y,
      z: coord.z - g.position.z,
    };

    return this.addVoxelLocal(groupId, local, color, { isBlueprint: opts?.isBlueprint });
  }

  addVoxelLocal(groupId: GroupId, local: VoxelCoord, color: string, opts?: { isBlueprint?: boolean }): boolean {
    const g = this.ensureGroup(groupId, { x: 0, y: 0, z: 0 });

    const world = this.worldFrom(g.position, local);
    const worldKey = keyOf(world);
    if (this.worldIndex.has(worldKey)) return false;

    const localKey = keyOf(local);
    if (g.voxels.has(localKey)) return false;

    const isBlueprint = !!opts?.isBlueprint;
    const mat = this.getMaterial(color, isBlueprint);

    const mesh = new THREE.Mesh(this.geometry, mat);
    mesh.position.set(local.x + 0.5, local.y + 0.5, local.z + 0.5);
    mesh.castShadow = !isBlueprint;
    mesh.receiveShadow = true;
    mesh.renderOrder = isBlueprint ? 1 : 0;

    mesh.userData.coord = { ...world };
    mesh.userData.isBlueprint = isBlueprint;
    mesh.userData.groupId = groupId;
    mesh.userData.local = { ...local };
    mesh.userData.instanceId = g.source.instanceId;
    mesh.userData.sourceAssetId = g.source.assetId;
    mesh.userData.sourceAssetKind = g.source.assetKind;
    mesh.userData.overrideAssetId = g.source.overrideAssetId;
    mesh.userData.logicTag = g.source.logicTag;

    g.root.add(mesh);

    const rec: LocalVoxel = { local: { ...local }, color, mesh, isBlueprint, groupId };
    g.voxels.set(localKey, rec);
    this.worldIndex.set(worldKey, rec);

    return true;
  }

  removeVoxel(coord: VoxelCoord) {
    const worldKey = keyOf(coord);
    const v = this.worldIndex.get(worldKey);
    if (!v) return;

    const g = this.groups.get(v.groupId);
    if (!g) {
      this.worldIndex.delete(worldKey);
      return;
    }

    const localKey = keyOf(v.local);
    g.root.remove(v.mesh);
    g.voxels.delete(localKey);
    this.worldIndex.delete(worldKey);
  }

  isBlueprint(coord: VoxelCoord) {
    return this.worldIndex.get(keyOf(coord))?.isBlueprint ?? false;
  }

  setIsBlueprint(coord: VoxelCoord, isBlueprint: boolean) {
    const v = this.worldIndex.get(keyOf(coord));
    if (!v) return;
    if (v.isBlueprint === isBlueprint) return;

    v.isBlueprint = isBlueprint;
    v.mesh.material = this.getMaterial(v.color, isBlueprint);
    v.mesh.castShadow = !isBlueprint;
    v.mesh.renderOrder = isBlueprint ? 1 : 0;

    v.mesh.userData.isBlueprint = isBlueprint;
  }

  setColor(coord: VoxelCoord, color: string) {
    const v = this.worldIndex.get(keyOf(coord));
    if (!v) return;
    if (v.color === color) return;

    v.color = color;
    v.mesh.material = this.getMaterial(v.color, v.isBlueprint);
  }

  getGroupId(coord: VoxelCoord): GroupId {
    return this.worldIndex.get(keyOf(coord))?.groupId ?? DEFAULT_GROUP;
  }

  setGroupId(coord: VoxelCoord, nextGroupId: GroupId) {
    const worldKey = keyOf(coord);
    const v = this.worldIndex.get(worldKey);
    if (!v) return;
    if (v.groupId === nextGroupId) return;

    const from = this.groups.get(v.groupId);
    if (!from) return;

    const to = this.ensureGroup(nextGroupId, { x: 0, y: 0, z: 0 });

    const nextLocal: VoxelCoord = {
      x: coord.x - to.position.x,
      y: coord.y - to.position.y,
      z: coord.z - to.position.z,
    };

    const nextLocalKey = keyOf(nextLocal);
    if (to.voxels.has(nextLocalKey)) return;

    if (this.worldIndex.get(worldKey)?.groupId !== v.groupId) return;

    from.root.remove(v.mesh);
    from.voxels.delete(keyOf(v.local));

    v.groupId = nextGroupId;
    v.local = { ...nextLocal };

    v.mesh.position.set(nextLocal.x + 0.5, nextLocal.y + 0.5, nextLocal.z + 0.5);
    v.mesh.userData.groupId = nextGroupId;
    v.mesh.userData.local = { ...nextLocal };
    v.mesh.userData.instanceId = to.source.instanceId;
    v.mesh.userData.sourceAssetId = to.source.assetId;
    v.mesh.userData.sourceAssetKind = to.source.assetKind;
    v.mesh.userData.overrideAssetId = to.source.overrideAssetId;
    v.mesh.userData.logicTag = to.source.logicTag;

    to.root.add(v.mesh);
    to.voxels.set(nextLocalKey, v);
    this.worldIndex.set(worldKey, v);
  }

  rotateGroupLocals90(groupId: GroupId, axis: "x" | "y" | "z", dir: 1 | -1): boolean {
    const g = this.groups.get(groupId);
    if (!g) return false;

    const gp = g.position;

    const rot = (p: VoxelCoord): VoxelCoord => {
      const x = p.x | 0, y = p.y | 0, z = p.z | 0;

      if (axis === "y") {
        return dir === 1 ? { x: z, y, z: -x } : { x: -z, y, z: x };
      }

      if (axis === "x") {
        return dir === 1 ? { x, y: z, z: -y } : { x, y: -z, z: y };
      }

      return dir === 1 ? { x: y, y: -x, z } : { x: -y, y: x, z };
    };

    for (const v of g.voxels.values()) {
      const worldOld = this.worldFrom(gp, v.local);
      this.worldIndex.delete(keyOf(worldOld));
    }

    const nextVoxels = new Map<string, LocalVoxel>();

    for (const v of g.voxels.values()) {
      const nextLocal = rot(v.local);
      const nextLocalKey = keyOf(nextLocal);

      if (nextVoxels.has(nextLocalKey)) {
        for (const vv of g.voxels.values()) {
          const world = this.worldFrom(gp, vv.local);
          this.worldIndex.set(keyOf(world), vv);
        }
        return false;
      }

      v.local = { ...nextLocal };
      v.mesh.position.set(nextLocal.x + 0.5, nextLocal.y + 0.5, nextLocal.z + 0.5);

      const worldNew = this.worldFrom(gp, nextLocal);

      v.mesh.userData.local = { ...nextLocal };
      v.mesh.userData.coord = { ...worldNew };
      v.mesh.userData.groupId = groupId;
      v.mesh.userData.instanceId = g.source.instanceId;
      v.mesh.userData.sourceAssetId = g.source.assetId;
      v.mesh.userData.sourceAssetKind = g.source.assetKind;
      v.mesh.userData.overrideAssetId = g.source.overrideAssetId;
      v.mesh.userData.logicTag = g.source.logicTag;

      nextVoxels.set(nextLocalKey, v);
      this.worldIndex.set(keyOf(worldNew), v);
    }

    g.voxels = nextVoxels;
    return true;
  }

  listMeshes(): THREE.Mesh[] {
    const out: THREE.Mesh[] = [];
    for (const g of this.groups.values()) {
      for (const v of g.voxels.values()) out.push(v.mesh);
    }
    return out;
  }

  // group bounds

  getGroupBounds(groupId: GroupId): { min: VoxelCoord; max: VoxelCoord } | null {
    const g = this.groups.get(groupId);
    if (!g || g.voxels.size === 0) return null;

    g.root.updateMatrixWorld(true);

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    const p = new THREE.Vector3();

    for (const v of g.voxels.values()) {
      p.set(v.local.x + 0.5, v.local.y + 0.5, v.local.z + 0.5);
      p.applyMatrix4(g.root.matrixWorld);

      const vxMin = p.x - 0.5;
      const vyMin = p.y - 0.5;
      const vzMin = p.z - 0.5;
      const vxMax = p.x + 0.5;
      const vyMax = p.y + 0.5;
      const vzMax = p.z + 0.5;

      minX = Math.min(minX, vxMin);
      minY = Math.min(minY, vyMin);
      minZ = Math.min(minZ, vzMin);
      maxX = Math.max(maxX, vxMax);
      maxY = Math.max(maxY, vyMax);
      maxZ = Math.max(maxZ, vzMax);
    }

    return {
      min: {
        x: Math.floor(minX),
        y: Math.floor(minY),
        z: Math.floor(minZ),
      },
      max: {
        x: Math.ceil(maxX) - 1,
        y: Math.ceil(maxY) - 1,
        z: Math.ceil(maxZ) - 1,
      },
    };
  }

  getAllGroupBounds(): Map<GroupId, { min: VoxelCoord; max: VoxelCoord }> {
    const out = new Map<GroupId, { min: VoxelCoord; max: VoxelCoord }>();

    for (const [groupId] of this.groups.entries()) {
      const b = this.getGroupBounds(groupId);
      if (b) out.set(groupId, b);
    }

    return out;
  }

  getPublishedGroupBounds(
    groupId: GroupId
  ): { min: VoxelCoord; max: VoxelCoord } | null {
    const g = this.groups.get(groupId);
    if (!g || g.voxels.size === 0) return null;
  
    g.root.updateMatrixWorld(true);
  
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  
    const p = new THREE.Vector3();
    let found = false;
  
    for (const v of g.voxels.values()) {
      if (v.isBlueprint) continue;
  
      found = true;
  
      p.set(v.local.x + 0.5, v.local.y + 0.5, v.local.z + 0.5);
      p.applyMatrix4(g.root.matrixWorld);
  
      const vxMin = p.x - 0.5;
      const vyMin = p.y - 0.5;
      const vzMin = p.z - 0.5;
      const vxMax = p.x + 0.5;
      const vyMax = p.y + 0.5;
      const vzMax = p.z + 0.5;
  
      minX = Math.min(minX, vxMin);
      minY = Math.min(minY, vyMin);
      minZ = Math.min(minZ, vzMin);
      maxX = Math.max(maxX, vxMax);
      maxY = Math.max(maxY, vyMax);
      maxZ = Math.max(maxZ, vzMax);
    }
  
    if (!found) return null;
  
    return {
      min: {
        x: Math.floor(minX),
        y: Math.floor(minY),
        z: Math.floor(minZ),
      },
      max: {
        x: Math.ceil(maxX) - 1,
        y: Math.ceil(maxY) - 1,
        z: Math.ceil(maxZ) - 1,
      },
    };
  }

  // world persistence

  exportPacked(): WorldPacked {
    let n = 0;
    for (const g of this.groups.values()) n += g.voxels.size;

    const localPositions = new Int32Array(n * 3);
    const colors = new Uint32Array(n);
    const blueprints = new Uint8Array(n);

    const groupTable: string[] = [];
    const groupIndex = new Map<string, number>();
    const ensureGroupIndex = (gid: string) => {
      let idx = groupIndex.get(gid);
      if (idx != null) return idx;
      idx = groupTable.length;
      groupTable.push(gid);
      groupIndex.set(gid, idx);
      return idx;
    };

    const all = this.listGroupIds();
    all.sort();
    for (const gid of all) ensureGroupIndex(gid);

    const groupPositions = new Int32Array(groupTable.length * 3);
    for (let gi = 0; gi < groupTable.length; gi++) {
      const gid = groupTable[gi];
      const gp = this.getGroupPosition(gid);
      groupPositions[gi * 3 + 0] = gp.x | 0;
      groupPositions[gi * 3 + 1] = gp.y | 0;
      groupPositions[gi * 3 + 2] = gp.z | 0;
    }

    const groupIds = new Uint32Array(n);

    let i = 0;
    for (const gid of groupTable) {
      const g = this.groups.get(gid);
      if (!g) continue;

      const gi = ensureGroupIndex(gid);

      for (const v of g.voxels.values()) {
        localPositions[i * 3 + 0] = v.local.x | 0;
        localPositions[i * 3 + 1] = v.local.y | 0;
        localPositions[i * 3 + 2] = v.local.z | 0;

        colors[i] = hexToRgb24(v.color);
        blueprints[i] = v.isBlueprint ? 1 : 0;
        groupIds[i] = gi;

        i++;
      }
    }

    return { localPositions, colors, blueprints, groupIds, groupTable, groupPositions };
  }

  importPacked(packed: WorldPacked) {
    this.clear();

    const { localPositions: positions, colors } = packed;
    const bp = packed.blueprints;

    const groupIds = packed.groupIds;
    const groupTable = packed.groupTable;
    const groupPositions = packed.groupPositions;

    if (groupTable && groupTable.length) {
      for (let gi = 0; gi < groupTable.length; gi++) {
        const gid = groupTable[gi] ?? DEFAULT_GROUP;
        const x = groupPositions ? groupPositions[gi * 3 + 0] : 0;
        const y = groupPositions ? groupPositions[gi * 3 + 1] : 0;
        const z = groupPositions ? groupPositions[gi * 3 + 2] : 0;
        this.addGroup(gid, { x, y, z });
      }
    } else {
      this.addGroup(DEFAULT_GROUP, { x: 0, y: 0, z: 0 });
    }

    const n = Math.min(colors.length, Math.floor(positions.length / 3));

    for (let i = 0; i < n; i++) {
      const lx = positions[i * 3 + 0] | 0;
      const ly = positions[i * 3 + 1] | 0;
      const lz = positions[i * 3 + 2] | 0;

      const color = rgb24ToHex(colors[i]);
      const isBlueprint = bp ? bp[i] === 1 : false;

      let gid: GroupId = DEFAULT_GROUP;
      if (groupIds && groupTable) {
        gid = groupTable[groupIds[i] ?? 0] ?? DEFAULT_GROUP;
      }

      this.addVoxelLocal(gid, { x: lx, y: ly, z: lz }, color, { isBlueprint });
    }
  }

  exportWorldData(): WorldData {
    const instances: WorldInstanceRecord[] = [];

    for (const [groupId, g] of this.groups.entries()) {
      if (groupId === DEFAULT_GROUP) continue;
      if (!g.voxels.size) continue;
      if (!g.source.assetId || !g.source.assetKind) continue;

      instances.push({
        instanceId: g.source.instanceId,
        assetId: g.source.assetId,
        assetKind: g.source.assetKind,
        overrideAssetId: g.source.overrideAssetId ?? null,
        logicTag: g.source.logicTag ?? null,
        position: { ...g.position },
        rotation: { ...g.rotation },
      });
    }

    return { instances };
  }

  async importWorldData(data: WorldData): Promise<void> {
    this.clear();

    for (const inst of data.instances) {
      if (!inst.assetId || !inst.assetKind) continue;

      const renderAssetId = inst.overrideAssetId ?? inst.assetId;
      const loaded = await assetRepository.loadAsset(renderAssetId);

      if (!loaded) {
        console.warn("Missing asset while importing world:", renderAssetId);
        continue;
      }

      this.instantiateGroupState(loaded.group, {
        at: inst.position,
        baseId: loaded.meta.name,
        instanceId: inst.instanceId,
        sourceAssetId: inst.assetId,
        sourceAssetKind: inst.assetKind,
        logicTag: inst.logicTag ?? null,
        rotation: inst.rotation ?? { x: 0, y: 0, z: 0 },
      });

      const gid = this.listGroupIds().at(-1);
      if (!gid) continue;

      this.setGroupSource(gid, {
        instanceId: inst.instanceId,
        assetId: inst.assetId,
        assetKind: inst.assetKind,
        overrideAssetId: inst.overrideAssetId ?? null,
        logicTag: inst.logicTag ?? null,
      });
    }
  }

  async refreshInstancesFromSourceAsset(params: {
    sourceAssetId: string;
    nextAssetId?: string;
    nextAssetKind?: AssetKind | null;
    skipGroupId?: string | null;
    includeOverridden?: boolean;
  }): Promise<string[]> {
    const {
      sourceAssetId,
      nextAssetId,
      nextAssetKind,
      skipGroupId = null,
      includeOverridden = false,
    } = params;

    const resolvedAssetId = nextAssetId ?? sourceAssetId;
    const loaded = await assetRepository.loadAsset(resolvedAssetId);
    if (!loaded) {
      console.warn("Missing asset while refreshing instances:", resolvedAssetId);
      return [];
    }

    const touched: string[] = [];

    for (const [groupId, g] of this.groups.entries()) {
      if (groupId === DEFAULT_GROUP) continue;
      if (skipGroupId && groupId === skipGroupId) continue;
      if (g.source.assetId !== sourceAssetId) continue;

      const hasOverride = !!g.source.overrideAssetId;
      if (hasOverride && !includeOverridden) continue;

      this.setGroupVoxelsLocal(groupId, loaded.group.voxels, { keepPosition: true });

      if (nextAssetId !== undefined || nextAssetKind !== undefined) {
        this.setGroupSource(groupId, {
          assetId: nextAssetId !== undefined ? nextAssetId : g.source.assetId,
          assetKind:
            nextAssetKind !== undefined
              ? nextAssetKind
              : g.source.assetKind,
        });
      }

      touched.push(groupId);
    }

    return touched;
  }

  // publishing

  async getPublishedWorldSnapshot(): Promise<PublishedWorldBakedSnapshot> {
    const groups: PublishedWorldBakedGroupSnapshot[] = [];
    const latestMarketplaceAssetIdsSet = new Set<string>();
    let voxelCount = 0;
  
    for (const [groupId, g] of this.groups.entries()) {
      if (groupId === DEFAULT_GROUP) continue;
      if (!g.voxels.size) continue;
  
      const baked = await this.getPublishedBakedGroupSnapshot(groupId);
      if (!baked) continue;
  
      if (baked.latestMarketplaceAssetId) {
        latestMarketplaceAssetIdsSet.add(baked.latestMarketplaceAssetId);
      }
  
      voxelCount += baked.voxelCount;
      groups.push(baked);
    }
  
    return {
      voxelCount,
      latestMarketplaceAssetIds: Array.from(latestMarketplaceAssetIdsSet),
      groups,
    };
  }

  // private publishing helpers

  private async getPublishedBakedGroupSnapshot(
    groupId: GroupId
  ): Promise<PublishedWorldBakedGroupSnapshot | null> {
    const g = this.groups.get(groupId);
    if (!g || !g.voxels.size) return null;
  
    const realVoxelCount = Array.from(g.voxels.values()).reduce(
      (sum, v) => sum + (v.isBlueprint ? 0 : 1),
      0
    );
  
    if (realVoxelCount <= 0) return null;
  
    return {
      groupId,
      latestMarketplaceAssetId: await this.getLatestMarketplaceAssetIdForGroup(groupId),
      assetKind: g.source.assetKind ?? null,
      logicTag: g.source.logicTag ?? null,
      position: { ...g.position },
      rotation: { ...g.rotation },
      bounds: this.getPublishedGroupBounds(groupId),
      voxelCount: realVoxelCount,
      surfaces: this.getPublishedFaceBuckets(groupId),
    };
  }

  private getPublishedFaceBuckets(groupId: GroupId): PublishedWorldSurface[] {
    const g = this.groups.get(groupId);
    if (!g || !g.voxels.size) return [];

    const buckets = new Map<string, PublishedWorldSurface>();

    const getBucket = (color: string, isBlueprint: boolean) => {
      const key = `${color}|${isBlueprint ? "bp" : "solid"}`;
      let bucket = buckets.get(key);
      if (!bucket) {
        bucket = {
          color,
          isBlueprint,
          positions: [],
          normals: [],
          indices: [],
          vertexCount: 0,
          triangleCount: 0,
        };
        buckets.set(key, bucket);
      }
      return bucket;
    };

    const hasLocalVoxel = (x: number, y: number, z: number) => {
      const neighbor = g.voxels.get(keyOf({ x, y, z }));
      return !!neighbor && !neighbor.isBlueprint;
    };

    const pushFace = (
      bucket: PublishedWorldSurface,
      verts: [number, number, number][],
      normal: [number, number, number]
    ) => {
      const base = bucket.vertexCount;

      for (const [x, y, z] of verts) {
        bucket.positions.push(x, y, z);
        bucket.normals.push(normal[0], normal[1], normal[2]);
      }

      bucket.indices.push(
        base + 0,
        base + 1,
        base + 2,
        base + 0,
        base + 2,
        base + 3
      );

      bucket.vertexCount += 4;
      bucket.triangleCount += 2;
    };

    for (const v of g.voxels.values()) {
      if (v.isBlueprint) continue;
      const x = v.local.x;
      const y = v.local.y;
      const z = v.local.z;

      const bucket = getBucket(v.color, v.isBlueprint);

      if (!hasLocalVoxel(x + 1, y, z)) {
        pushFace(
          bucket,
          [
            [x + 1, y, z],
            [x + 1, y + 1, z],
            [x + 1, y + 1, z + 1],
            [x + 1, y, z + 1],
          ],
          [1, 0, 0]
        );
      }

      if (!hasLocalVoxel(x - 1, y, z)) {
        pushFace(
          bucket,
          [
            [x, y, z + 1],
            [x, y + 1, z + 1],
            [x, y + 1, z],
            [x, y, z],
          ],
          [-1, 0, 0]
        );
      }

      if (!hasLocalVoxel(x, y + 1, z)) {
        pushFace(
          bucket,
          [
            [x, y + 1, z],
            [x, y + 1, z + 1],
            [x + 1, y + 1, z + 1],
            [x + 1, y + 1, z],
          ],
          [0, 1, 0]
        );
      }

      if (!hasLocalVoxel(x, y - 1, z)) {
        pushFace(
          bucket,
          [
            [x, y, z + 1],
            [x, y, z],
            [x + 1, y, z],
            [x + 1, y, z + 1],
          ],
          [0, -1, 0]
        );
      }

      if (!hasLocalVoxel(x, y, z + 1)) {
        pushFace(
          bucket,
          [
            [x + 1, y, z + 1],
            [x + 1, y + 1, z + 1],
            [x, y + 1, z + 1],
            [x, y, z + 1],
          ],
          [0, 0, 1]
        );
      }

      if (!hasLocalVoxel(x, y, z - 1)) {
        pushFace(
          bucket,
          [
            [x, y, z],
            [x, y + 1, z],
            [x + 1, y + 1, z],
            [x + 1, y, z],
          ],
          [0, 0, -1]
        );
      }
    }

    return Array.from(buckets.values()).filter(
      (s) => s.vertexCount > 0 && s.indices.length > 0
    );
  }

  private async getLatestMarketplaceAssetIdForGroup(
    groupId: GroupId
  ): Promise<string | null> {
    const g = this.groups.get(groupId);
    if (!g) return null;
  
    const assetId = g.source.assetId;
    if (!assetId) return null;
  
    try {
      const meta = await assetRepository.getAssetMeta(assetId);
      const lineage = (meta as any)?.lineageAssetIds;
  
      if (Array.isArray(lineage) && lineage.length > 0) {
        const first = lineage[0];
        return typeof first === "string" && first.trim() ? first : null;
      }
  
      return null;
    } catch (err) {
      console.warn("Failed to resolve latest marketplace lineage for asset:", assetId, err);
      return null;
    }
  }
}