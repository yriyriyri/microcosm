import * as THREE from "three";
import type { VoxelCoord } from "./Types";
import { keyOf } from "./Types";
import type { WorldData, WorldInstanceRecord } from "./domain/worldTypes";
import { assetRepository } from "./repositories";

export type GroupId = string;
export type AssetVisibility = "private" | "marketplace" | "system";

//coordinates relative to group origin

export type LocalVoxel = {
  local: VoxelCoord;
  color: string;
  mesh: THREE.Mesh;
  isBlueprint: boolean;
  groupId: GroupId;
};

//marketplace source

export type GroupSource = {
  instanceId: string;
  assetId: string | null;
  assetVisibility: AssetVisibility | null;
  overrideAssetId: string | null;
  overrideAssetVisibility: AssetVisibility | null;
};

//group three data + mesh + pos

type GroupRecord = {
  position: VoxelCoord;
  root: THREE.Group;
  voxels: Map<string, LocalVoxel>;
  source: GroupSource;
};

//group logical voxel ,, no three etc

export type GroupVoxel = {
  local: VoxelCoord;
  color: string;
  isBlueprint: boolean;
};

//group logical voxel state, used for focus mode and asset saving

export type GroupState = {
  groupId: GroupId;
  position: VoxelCoord;
  voxels: GroupVoxel[];
};

//serialised data for world save

export type WorldPacked = {
  localPositions: Int32Array; // LOCAL xyz
  colors: Uint32Array;
  blueprints?: Uint8Array;
  groupIds?: Uint32Array;
  groupTable?: string[];
  groupPositions?: Int32Array;
};

//render config

export type VoxelWorldRenderConfig = {
  blueprintOpacity?: number;
  blueprintDepthWrite?: boolean;
  blueprintTint?: boolean;
};

const DEFAULT_GROUP: GroupId = "default";

function makeRuntimeId(): string {
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return `instance_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

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

export class VoxelWorld {
  private scene: THREE.Scene;

  private groups = new Map<GroupId, GroupRecord>();
  private worldIndex = new Map<string, LocalVoxel>(); // keyOf(world)

  private geometry: THREE.BoxGeometry;
  private materialCache = new Map<string, THREE.MeshStandardMaterial>();

  private renderCfg: Required<VoxelWorldRenderConfig>;

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

  createGroup(position: VoxelCoord, baseId: string = "group"): GroupId {
    const gid = this.makeUniqueGroupId(baseId);
    this.addGroup(gid, position);
    return gid;
  }

  addGroup(groupId: GroupId, position: VoxelCoord) {
    this.ensureGroup(groupId, position);
  }

  listGroupIds(): GroupId[] {
    return Array.from(this.groups.keys());
  }

  getGroupPosition(groupId: GroupId): VoxelCoord {
    return this.groups.get(groupId)?.position ?? { x: 0, y: 0, z: 0 };
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
  
      assetVisibility:
        source.assetVisibility !== undefined
          ? source.assetVisibility
          : g.source.assetVisibility,
  
      overrideAssetId:
        source.overrideAssetId !== undefined
          ? source.overrideAssetId
          : g.source.overrideAssetId,
  
      overrideAssetVisibility:
        source.overrideAssetVisibility !== undefined
          ? source.overrideAssetVisibility
          : g.source.overrideAssetVisibility,
    };
  
    g.root.userData.instanceId = g.source.instanceId;
    g.root.userData.sourceAssetId = g.source.assetId;
    g.root.userData.sourceAssetVisibility = g.source.assetVisibility;
    g.root.userData.overrideAssetId = g.source.overrideAssetId;
    g.root.userData.overrideAssetVisibility = g.source.overrideAssetVisibility;
  
    for (const v of g.voxels.values()) {
      v.mesh.userData.instanceId = g.source.instanceId;
      v.mesh.userData.sourceAssetId = g.source.assetId;
      v.mesh.userData.sourceAssetVisibility = g.source.assetVisibility;
      v.mesh.userData.overrideAssetId = g.source.overrideAssetId;
      v.mesh.userData.overrideAssetVisibility = g.source.overrideAssetVisibility;
    }
  
    return true;
  }

  clearGroupSource(groupId: GroupId): boolean {
    return this.setGroupSource(groupId, {
      assetId: null,
      assetVisibility: null,
    });
  }

  setGroupPosition(groupId: GroupId, position: VoxelCoord): boolean {
    const g = this.groups.get(groupId);
    if (!g) return false;

    const oldPos = g.position;
    if (oldPos.x === position.x && oldPos.y === position.y && oldPos.z === position.z) return true;

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
      v.mesh.userData.overrideAssetId = g.source.overrideAssetId;
      v.mesh.userData.overrideAssetVisibility = g.source.overrideAssetVisibility;
      v.mesh.userData.sourceAssetVisibility = g.source.assetVisibility;
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
      sourceAssetVisibility?: AssetVisibility | null;
    }
  ): GroupId {
    const base = opts.baseId ?? state.groupId ?? "asset";
    const gid = this.makeUniqueGroupId(base);
    
    this.addGroup(gid, { ...opts.at });
    this.setGroupSource(gid, {
      instanceId: opts.instanceId ?? makeRuntimeId(),
      assetId: opts.sourceAssetId ?? null,
      assetVisibility: opts.sourceAssetVisibility ?? null,
    });
    
    for (const v of state.voxels) {
      this.addVoxelLocal(gid, v.local, v.color, { isBlueprint: v.isBlueprint });
    }
    
    return gid;
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
    v.mesh.userData.overrideAssetId = to.source.overrideAssetId;
    v.mesh.userData.overrideAssetVisibility = to.source.overrideAssetVisibility;
    v.mesh.userData.sourceAssetVisibility = to.source.assetVisibility;

    to.root.add(v.mesh);
    to.voxels.set(nextLocalKey, v);
    this.worldIndex.set(worldKey, v);
  }

  getGroupBounds(groupId: GroupId): { min: VoxelCoord; max: VoxelCoord } | null {
    const g = this.groups.get(groupId);
    if (!g || g.voxels.size === 0) return null;

    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity;
    let maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity;

    for (const v of g.voxels.values()) {
      const world = this.worldFrom(g.position, v.local);

      minX = Math.min(minX, world.x);
      maxX = Math.max(maxX, world.x);
      minY = Math.min(minY, world.y);
      maxY = Math.max(maxY, world.y);
      minZ = Math.min(minZ, world.z);
      maxZ = Math.max(maxZ, world.z);
    }

    return {
      min: { x: minX, y: minY, z: minZ },
      max: { x: maxX, y: maxY, z: maxZ },
    };
  }

  getAllGroupBounds(): Map<GroupId, { min: VoxelCoord; max: VoxelCoord }> {
    const out = new Map<GroupId, { min: VoxelCoord; max: VoxelCoord }>();

    for (const [groupId, g] of this.groups.entries()) {
      if (g.voxels.size === 0) continue;
      const b = this.getGroupBounds(groupId);
      if (b) out.set(groupId, b);
    }

    return out;
  }

  listMeshes(): THREE.Mesh[] {
    const out: THREE.Mesh[] = [];
    for (const g of this.groups.values()) {
      for (const v of g.voxels.values()) out.push(v.mesh);
    }
    return out;
  }

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
      sourceAssetVisibility: g?.source.assetVisibility ?? null,
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
    mesh.userData.overrideAssetId = g.source.overrideAssetId;
    mesh.userData.overrideAssetVisibility = g.source.overrideAssetVisibility;
    mesh.userData.sourceAssetVisibility = g.source.assetVisibility;

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

  rotateGroupLocals90(groupId: GroupId, axis: "x" | "y" | "z", dir: 1 | -1): boolean {
    const g = this.groups.get(groupId);
    if (!g) return false;

    const gp = g.position;

    const rot = (p: VoxelCoord): VoxelCoord => {
      const x = p.x | 0,
        y = p.y | 0,
        z = p.z | 0;

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
      v.mesh.userData.overrideAssetId = g.source.overrideAssetId;
      v.mesh.userData.overrideAssetVisibility = g.source.overrideAssetVisibility;
      v.mesh.userData.sourceAssetVisibility = g.source.assetVisibility;
      
      nextVoxels.set(nextLocalKey, v);
      this.worldIndex.set(keyOf(worldNew), v);
    }

    g.voxels = nextVoxels;
    return true;
  }

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
      if (!g.source.assetId || !g.source.assetVisibility) continue;
  
      instances.push({
        instanceId: g.source.instanceId,
        assetId: g.source.assetId,
        assetVisibility: g.source.assetVisibility,
        overrideAssetId: g.source.overrideAssetId ?? null,
        overrideAssetVisibility: g.source.overrideAssetVisibility ?? null,
        position: { ...g.position },
      });
    }
  
    return { instances };
  }

  async importWorldData(data: WorldData): Promise<void> {
    this.clear();
  
    for (const inst of data.instances) {
      if (!inst.assetId || !inst.assetVisibility) continue;
  
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
        sourceAssetVisibility: inst.assetVisibility,
      });
  
      const gid = this.listGroupIds().at(-1);
      if (!gid) continue;
  
      this.setGroupSource(gid, {
        instanceId: inst.instanceId,
        assetId: inst.assetId,
        assetVisibility: inst.assetVisibility,
        overrideAssetId: inst.overrideAssetId ?? null,
        overrideAssetVisibility: inst.overrideAssetVisibility ?? null,
      });
    }
  }

  private ensureGroup(groupId: GroupId, position: VoxelCoord): GroupRecord {
    let g = this.groups.get(groupId);
    if (g) return g;
  
    const instanceId = makeRuntimeId();
  
    const root = new THREE.Group();
    root.name = `voxel-group:${groupId}`;
    root.position.set(position.x, position.y, position.z);
    root.userData.groupId = groupId;
    root.userData.instanceId = instanceId;
    root.userData.sourceAssetId = null;
    root.userData.sourceAssetVisibility = null;
    root.userData.overrideAssetId = null;
    root.userData.overrideAssetVisibility = null;
  
    this.scene.add(root);
  
    g = {
      position: { ...position },
      root,
      voxels: new Map(),
      source: {
        instanceId,
        assetId: null,
        assetVisibility: null,
        overrideAssetId: null,
        overrideAssetVisibility: null,
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
}