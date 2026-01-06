import * as THREE from "three";
import type { VoxelCoord } from "./types";
import { keyOf } from "./types";

export type GroupId = string;

export type LocalVoxel = {
  local: VoxelCoord;       // coord relative to group position
  color: string;           // base color #rrggbb stored
  mesh: THREE.Mesh;
  isBlueprint: boolean;
  groupId: GroupId;
};

type GroupRecord = {
  id: GroupId;
  position: VoxelCoord;         // world-space integer cell coord of group origin
  root: THREE.Group;            // THREE transform root for the group
  voxels: Map<string, LocalVoxel>; // keyOf(local) -> voxel
};

export type WorldPacked = {
  // NOTE: still flattened for now so your library db doesn't break.
  // Later we can introduce a v2 packed format with groupPositions + localPositions.
  positions: Int32Array;
  colors: Uint32Array; // 0xRRGGBB
  blueprints?: Uint8Array;
  groupIds?: Uint32Array;
  groupTable?: string[];
};

const DEFAULT_GROUP: GroupId = "default";

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

// white shift matrix
const BLUEPRINT_M = [
  0.75, 0,    0,    0, 0.25,
  0,    0.75, 0,    0, 0.25,
  0,    0,    0.75, 0, 0.25,
  0,    0,    0,    1, 0.00,
];

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function blueprintTint(hex: string): string {
  const { r, g, b } = hexToRgb01(hex);
  const a = 1;

  const m = BLUEPRINT_M;

  const r2 = m[0] * r + m[1] * g + m[2] * b + m[3] * a + m[4];
  const g2 = m[5] * r + m[6] * g + m[7] * b + m[8] * a + m[9];
  const b2 = m[10] * r + m[11] * g + m[12] * b + m[13] * a + m[14];

  return rgb01ToHex(clamp01(r2), clamp01(g2), clamp01(b2));
}

export class VoxelWorld {
  private scene: THREE.Scene;

  // NEW: groups are the source-of-truth
  private groups = new Map<GroupId, GroupRecord>();

  // NEW: fast world lookup so editor/raycast stays simple
  // worldKey -> LocalVoxel record (stores groupId + local coord)
  private worldIndex = new Map<string, LocalVoxel>();

  private geometry: THREE.BoxGeometry;
  private materialCache = new Map<string, THREE.MeshStandardMaterial>();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.geometry = new THREE.BoxGeometry(1, 1, 1);

    // ensure default group exists at origin
    this.ensureGroup(DEFAULT_GROUP, { x: 0, y: 0, z: 0 });
  }

  dispose() {
    // remove all group roots (which also removes child meshes from render graph)
    for (const g of this.groups.values()) this.scene.remove(g.root);
    this.groups.clear();
    this.worldIndex.clear();

    this.geometry.dispose();
    for (const m of this.materialCache.values()) m.dispose();
    this.materialCache.clear();
  }

  clear() {
    for (const g of this.groups.values()) {
      // remove meshes from group root
      for (const v of g.voxels.values()) g.root.remove(v.mesh);
    }
    this.groups.clear();
    this.worldIndex.clear();

    // re-create default group
    this.ensureGroup(DEFAULT_GROUP, { x: 0, y: 0, z: 0 });
  }

  // --- Group API (new) ---

  addGroup(groupId: GroupId, position: VoxelCoord) {
    this.ensureGroup(groupId, position);
  }

  getGroupPosition(groupId: GroupId): VoxelCoord {
    return this.groups.get(groupId)?.position ?? { x: 0, y: 0, z: 0 };
  }

  setGroupPosition(groupId: GroupId, position: VoxelCoord) {
    const g = this.groups.get(groupId);
    if (!g) return;

    const oldPos = g.position;
    if (oldPos.x === position.x && oldPos.y === position.y && oldPos.z === position.z) return;

    // remove old world keys for this group
    for (const v of g.voxels.values()) {
      const world = {
        x: oldPos.x + v.local.x,
        y: oldPos.y + v.local.y,
        z: oldPos.z + v.local.z,
      };
      this.worldIndex.delete(keyOf(world));
    }

    // apply transform
    g.position = { ...position };
    g.root.position.set(position.x, position.y, position.z);

    // re-add world keys + update mesh userData.coord
    for (const v of g.voxels.values()) {
      const world = {
        x: position.x + v.local.x,
        y: position.y + v.local.y,
        z: position.z + v.local.z,
      };
      this.worldIndex.set(keyOf(world), v);

      v.mesh.userData.coord = { ...world };
      v.mesh.userData.groupId = groupId;
    }
  }

  listGroupIds(): GroupId[] {
    return Array.from(this.groups.keys());
  }

  // --- World-Coord API (kept, so editor/raycast doesn’t need rewriting yet) ---

  has(coord: VoxelCoord) {
    return this.worldIndex.has(keyOf(coord));
  }

  get(coord: VoxelCoord) {
    const v = this.worldIndex.get(keyOf(coord));
    if (!v) return undefined;

    const g = this.groups.get(v.groupId);
    const gp = g?.position ?? { x: 0, y: 0, z: 0 };

    return {
      coord,             // world coord (as asked)
      color: v.color,
      mesh: v.mesh,
      isBlueprint: v.isBlueprint,
      groupId: v.groupId,
      local: { ...v.local }, // extra (useful later)
      groupPosition: { ...gp }, // extra (useful later)
    };
  }

  isBlueprint(coord: VoxelCoord) {
    return this.worldIndex.get(keyOf(coord))?.isBlueprint ?? false;
  }

  getGroupId(coord: VoxelCoord): GroupId {
    return this.worldIndex.get(keyOf(coord))?.groupId ?? DEFAULT_GROUP;
  }

  listMeshes(): THREE.Mesh[] {
    const out: THREE.Mesh[] = [];
    for (const g of this.groups.values()) {
      for (const v of g.voxels.values()) out.push(v.mesh);
    }
    return out;
  }

  // Add voxel by WORLD coord (existing call sites keep working)
  addVoxel(
    coord: VoxelCoord,
    color: string,
    opts?: { isBlueprint?: boolean; groupId?: GroupId }
  ) {
    const groupId = opts?.groupId ?? DEFAULT_GROUP;
    const g = this.ensureGroup(groupId, { x: 0, y: 0, z: 0 });

    const local: VoxelCoord = {
      x: coord.x - g.position.x,
      y: coord.y - g.position.y,
      z: coord.z - g.position.z,
    };

    this.addVoxelLocal(groupId, local, color, { isBlueprint: opts?.isBlueprint });
  }

  // NEW: Add voxel by LOCAL coord within a group
  addVoxelLocal(
    groupId: GroupId,
    local: VoxelCoord,
    color: string,
    opts?: { isBlueprint?: boolean }
  ) {
    const g = this.ensureGroup(groupId, { x: 0, y: 0, z: 0 });

    const world: VoxelCoord = {
      x: g.position.x + local.x,
      y: g.position.y + local.y,
      z: g.position.z + local.z,
    };

    const worldKey = keyOf(world);
    if (this.worldIndex.has(worldKey)) return; // occupied by any group

    const localKey = keyOf(local);
    if (g.voxels.has(localKey)) return;

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

    g.root.add(mesh);

    const rec: LocalVoxel = { local: { ...local }, color, mesh, isBlueprint, groupId };
    g.voxels.set(localKey, rec);
    this.worldIndex.set(worldKey, rec);
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

  // Move voxel between groups while keeping the same WORLD coordinate
  setGroupId(coord: VoxelCoord, nextGroupId: GroupId) {
    const worldKey = keyOf(coord);
    const v = this.worldIndex.get(worldKey);
    if (!v) return;
    if (v.groupId === nextGroupId) return;

    const from = this.groups.get(v.groupId);
    if (!from) return;

    const to = this.ensureGroup(nextGroupId, { x: 0, y: 0, z: 0 });

    // compute new local in target group
    const nextLocal: VoxelCoord = {
      x: coord.x - to.position.x,
      y: coord.y - to.position.y,
      z: coord.z - to.position.z,
    };

    const nextLocalKey = keyOf(nextLocal);
    if (to.voxels.has(nextLocalKey)) return; // occupied inside target group
    if (this.worldIndex.get(worldKey)?.groupId !== v.groupId) return;

    // detach from old group
    from.root.remove(v.mesh);
    from.voxels.delete(keyOf(v.local));

    // attach to new group
    v.groupId = nextGroupId;
    v.local = { ...nextLocal };

    v.mesh.position.set(nextLocal.x + 0.5, nextLocal.y + 0.5, nextLocal.z + 0.5);
    v.mesh.userData.groupId = nextGroupId;
    v.mesh.userData.local = { ...nextLocal };

    to.root.add(v.mesh);
    to.voxels.set(nextLocalKey, v);
    this.worldIndex.set(worldKey, v);
  }

  getGroupBounds(groupId: GroupId): { min: VoxelCoord; max: VoxelCoord } | null {
    const g = this.groups.get(groupId);
    if (!g || g.voxels.size === 0) return null;

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (const v of g.voxels.values()) {
      const x = g.position.x + v.local.x;
      const y = g.position.y + v.local.y;
      const z = g.position.z + v.local.z;

      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
    }

    return { min: { x: minX, y: minY, z: minZ }, max: { x: maxX, y: maxY, z: maxZ } };
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

  // --- Packing (still flat/legacy for now) ---

  exportPacked(): WorldPacked {
    // flatten from worldIndex to keep current save format stable
    const n = this.worldIndex.size;
    const positions = new Int32Array(n * 3);
    const colors = new Uint32Array(n);
    const blueprints = new Uint8Array(n);

    const groupTable: string[] = [];
    const groupIndex = new Map<string, number>();
    const groupIds = new Uint32Array(n);

    const ensureGroup = (g: string) => {
      let idx = groupIndex.get(g);
      if (idx != null) return idx;
      idx = groupTable.length;
      groupTable.push(g);
      groupIndex.set(g, idx);
      return idx;
    };

    let i = 0;
    for (const [worldKey, v] of this.worldIndex.entries()) {
      // recover world coord from key (fast + safe fallback)
      // but you already have mesh.userData.coord; use that:
      const c = v.mesh.userData.coord as VoxelCoord | undefined;
      const coord = c ?? (() => {
        // very defensive fallback; parse "x|y|z"
        const parts = worldKey.split("|").map((n) => parseInt(n, 10));
        return { x: parts[0] | 0, y: parts[1] | 0, z: parts[2] | 0 };
      })();

      positions[i * 3 + 0] = coord.x | 0;
      positions[i * 3 + 1] = coord.y | 0;
      positions[i * 3 + 2] = coord.z | 0;

      colors[i] = hexToRgb24(v.color);
      blueprints[i] = v.isBlueprint ? 1 : 0;

      groupIds[i] = ensureGroup(v.groupId ?? DEFAULT_GROUP);
      i++;
    }

    return { positions, colors, blueprints, groupIds, groupTable };
  }

  importPacked(packed: WorldPacked) {
    this.clear();

    const { positions, colors } = packed;
    const bp = packed.blueprints;

    const groupIds = packed.groupIds;
    const groupTable = packed.groupTable;

    const n = Math.min(colors.length, Math.floor(positions.length / 3));

    for (let i = 0; i < n; i++) {
      const x = positions[i * 3 + 0];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      const color = rgb24ToHex(colors[i]);
      const isBlueprint = bp ? bp[i] === 1 : false;

      let groupId: GroupId = DEFAULT_GROUP;
      if (groupIds && groupTable) {
        const gi = groupIds[i] ?? 0;
        groupId = groupTable[gi] ?? DEFAULT_GROUP;
      }

      // groups imported from packed currently have position {0,0,0} (legacy flat format)
      this.ensureGroup(groupId, { x: 0, y: 0, z: 0 });
      this.addVoxel({ x, y, z }, color, { isBlueprint, groupId });
    }
  }

  // --- internals ---

  private ensureGroup(groupId: GroupId, position: VoxelCoord): GroupRecord {
    let g = this.groups.get(groupId);
    if (g) return g;

    const root = new THREE.Group();
    root.name = `voxel-group:${groupId}`;
    root.position.set(position.x, position.y, position.z);
    root.userData.groupId = groupId;

    this.scene.add(root);

    g = {
      id: groupId,
      position: { ...position },
      root,
      voxels: new Map(),
    };

    this.groups.set(groupId, g);
    return g;
  }

  private getMaterial(color: string, isBlueprint: boolean) {
    const key = `${color}|${isBlueprint ? "bp" : "solid"}`;
    let mat = this.materialCache.get(key);
    if (mat) return mat;

    const displayColor = isBlueprint ? blueprintTint(color) : color;

    mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(displayColor),
      transparent: isBlueprint,
      opacity: isBlueprint ? 0.7 : 1.0,
    });

    if (isBlueprint) mat.depthWrite = false;

    this.materialCache.set(key, mat);
    return mat;
  }
}