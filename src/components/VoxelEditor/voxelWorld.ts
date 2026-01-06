import * as THREE from "three";
import type { VoxelCoord } from "./types";
import { keyOf } from "./types";

export type GroupId = string;

type VoxelRecord = {
  coord: VoxelCoord;
  color: string; // base color #rrggbb stored
  mesh: THREE.Mesh;
  isBlueprint: boolean;
  groupId: GroupId;
};

export type WorldPacked = {
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
  private voxels = new Map<string, VoxelRecord>();

  private geometry: THREE.BoxGeometry;
  private materialCache = new Map<string, THREE.MeshStandardMaterial>();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  dispose() {
    for (const v of this.voxels.values()) this.scene.remove(v.mesh);
    this.voxels.clear();

    this.geometry.dispose();
    for (const m of this.materialCache.values()) m.dispose();
    this.materialCache.clear();
  }

  has(coord: VoxelCoord) {
    return this.voxels.has(keyOf(coord));
  }

  get(coord: VoxelCoord) {
    return this.voxels.get(keyOf(coord));
  }

  isBlueprint(coord: VoxelCoord) {
    return this.voxels.get(keyOf(coord))?.isBlueprint ?? false;
  }

  getGroupId(coord: VoxelCoord): GroupId {
    return this.voxels.get(keyOf(coord))?.groupId ?? DEFAULT_GROUP;
  }

  listMeshes(): THREE.Mesh[] {
    return Array.from(this.voxels.values()).map((v) => v.mesh);
  }

  listGroupIds(): GroupId[] {
    const s = new Set<GroupId>();
    for (const v of this.voxels.values()) s.add(v.groupId);
    return Array.from(s.values());
  }

  clear() {
    for (const v of this.voxels.values()) this.scene.remove(v.mesh);
    this.voxels.clear();
  }

  addVoxel(
    coord: VoxelCoord,
    color: string,
    opts?: { isBlueprint?: boolean; groupId?: GroupId }
  ) {
    const k = keyOf(coord);
    if (this.voxels.has(k)) return;

    const isBlueprint = !!opts?.isBlueprint;
    const groupId = opts?.groupId ?? DEFAULT_GROUP;

    const mat = this.getMaterial(color, isBlueprint);

    const mesh = new THREE.Mesh(this.geometry, mat);
    mesh.position.set(coord.x + 0.5, coord.y + 0.5, coord.z + 0.5);
    mesh.castShadow = !isBlueprint;
    mesh.receiveShadow = true;
    mesh.renderOrder = isBlueprint ? 1 : 0;

    mesh.userData.coord = { ...coord };
    mesh.userData.isBlueprint = isBlueprint;
    mesh.userData.groupId = groupId;

    this.scene.add(mesh);
    this.voxels.set(k, { coord, color, mesh, isBlueprint, groupId });
  }

  removeVoxel(coord: VoxelCoord) {
    const k = keyOf(coord);
    const v = this.voxels.get(k);
    if (!v) return;

    this.scene.remove(v.mesh);
    this.voxels.delete(k);
  }

  setIsBlueprint(coord: VoxelCoord, isBlueprint: boolean) {
    const rec = this.voxels.get(keyOf(coord));
    if (!rec) return;
    if (rec.isBlueprint === isBlueprint) return;

    rec.isBlueprint = isBlueprint;
    rec.mesh.material = this.getMaterial(rec.color, isBlueprint);
    rec.mesh.castShadow = !isBlueprint;
    rec.mesh.renderOrder = isBlueprint ? 1 : 0;

    rec.mesh.userData.isBlueprint = isBlueprint;
  }

  setColor(coord: VoxelCoord, color: string) {
    const rec = this.voxels.get(keyOf(coord));
    if (!rec) return;
    if (rec.color === color) return;

    rec.color = color;
    rec.mesh.material = this.getMaterial(rec.color, rec.isBlueprint);
  }

  setGroupId(coord: VoxelCoord, groupId: GroupId) {
    const rec = this.voxels.get(keyOf(coord));
    if (!rec) return;
    if (rec.groupId === groupId) return;

    rec.groupId = groupId;
    rec.mesh.userData.groupId = groupId;
  }

  getGroupBounds(groupId: GroupId): { min: VoxelCoord; max: VoxelCoord } | null {
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    let found = false;

    for (const v of this.voxels.values()) {
      if (v.groupId !== groupId) continue;
      found = true;

      minX = Math.min(minX, v.coord.x); maxX = Math.max(maxX, v.coord.x);
      minY = Math.min(minY, v.coord.y); maxY = Math.max(maxY, v.coord.y);
      minZ = Math.min(minZ, v.coord.z); maxZ = Math.max(maxZ, v.coord.z);
    }

    if (!found) return null;

    return {
      min: { x: minX, y: minY, z: minZ },
      max: { x: maxX, y: maxY, z: maxZ },
    };
  }

  getAllGroupBounds(): Map<GroupId, { min: VoxelCoord; max: VoxelCoord }> {
    const out = new Map<GroupId, { min: VoxelCoord; max: VoxelCoord }>();

    for (const v of this.voxels.values()) {
      const g = v.groupId ?? DEFAULT_GROUP;

      const b = out.get(g);
      if (!b) {
        out.set(g, {
          min: { ...v.coord },
          max: { ...v.coord },
        });
        continue;
      }

      b.min.x = Math.min(b.min.x, v.coord.x);
      b.min.y = Math.min(b.min.y, v.coord.y);
      b.min.z = Math.min(b.min.z, v.coord.z);

      b.max.x = Math.max(b.max.x, v.coord.x);
      b.max.y = Math.max(b.max.y, v.coord.y);
      b.max.z = Math.max(b.max.z, v.coord.z);
    }

    return out;
  }

  exportPacked(): WorldPacked {
    const n = this.voxels.size;
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
    for (const v of this.voxels.values()) {
      positions[i * 3 + 0] = v.coord.x | 0;
      positions[i * 3 + 1] = v.coord.y | 0;
      positions[i * 3 + 2] = v.coord.z | 0;

      colors[i] = hexToRgb24(v.color);
      blueprints[i] = v.isBlueprint ? 1 : 0;

      const g = v.groupId ?? DEFAULT_GROUP;
      groupIds[i] = ensureGroup(g);

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

      this.addVoxel({ x, y, z }, color, { isBlueprint, groupId });
    }
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

    if (isBlueprint) {
      mat.depthWrite = false;
    }

    this.materialCache.set(key, mat);
    return mat;
  }
}