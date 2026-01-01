import * as THREE from "three";
import type { VoxelCoord } from "./types";
import { keyOf } from "./types";

type VoxelRecord = {
  coord: VoxelCoord;
  color: string; // base color #rrggbb stored
  mesh: THREE.Mesh;
  isBlueprint: boolean;
};

export type WorldPacked = {
  positions: Int32Array;
  colors: Uint32Array; // 0xRRGGBB
  blueprints?: Uint8Array; 
};

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

//white shift matrix

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

  listMeshes(): THREE.Mesh[] {
    return Array.from(this.voxels.values()).map((v) => v.mesh);
  }

  clear() {
    for (const v of this.voxels.values()) this.scene.remove(v.mesh);
    this.voxels.clear();
  }

  addVoxel(coord: VoxelCoord, color: string, opts?: { isBlueprint?: boolean }) {
    const k = keyOf(coord);
    if (this.voxels.has(k)) return;

    const isBlueprint = !!opts?.isBlueprint;
    const mat = this.getMaterial(color, isBlueprint);

    const mesh = new THREE.Mesh(this.geometry, mat);
    mesh.position.set(coord.x + 0.5, coord.y + 0.5, coord.z + 0.5);
    mesh.castShadow = !isBlueprint;
    mesh.receiveShadow = true;
    mesh.renderOrder = isBlueprint ? 1 : 0;

    mesh.userData.coord = { ...coord };
    mesh.userData.isBlueprint = isBlueprint;

    this.scene.add(mesh);
    this.voxels.set(k, { coord, color, mesh, isBlueprint });
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

  exportPacked(): WorldPacked {
    const n = this.voxels.size;
    const positions = new Int32Array(n * 3);
    const colors = new Uint32Array(n);
    const blueprints = new Uint8Array(n);

    let i = 0;
    for (const v of this.voxels.values()) {
      positions[i * 3 + 0] = v.coord.x | 0;
      positions[i * 3 + 1] = v.coord.y | 0;
      positions[i * 3 + 2] = v.coord.z | 0;
      colors[i] = hexToRgb24(v.color);
      blueprints[i] = v.isBlueprint ? 1 : 0;
      i++;
    }

    return { positions, colors, blueprints };
  }

  importPacked(packed: WorldPacked) {
    this.clear();

    const { positions, colors } = packed;
    const bp = packed.blueprints;

    const n = Math.min(colors.length, Math.floor(positions.length / 3));
    for (let i = 0; i < n; i++) {
      const x = positions[i * 3 + 0];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];
      const color = rgb24ToHex(colors[i]);
      const isBlueprint = bp ? bp[i] === 1 : false;

      this.addVoxel({ x, y, z }, color, { isBlueprint });
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