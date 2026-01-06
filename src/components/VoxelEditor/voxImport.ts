export type ImportedVoxel = {
  x: number;
  y: number;
  z: number;
  color: string;
};

export type ImportedGroup = {
  groupId: string;
  position: { x: number; y: number; z: number }; // world-space group origin
  voxels: ImportedVoxel[]; // LOCAL coords relative to position
};

type VoxRGBA = { r: number; g: number; b: number; a: number };
type VoxVec3 = { x: number; y: number; z: number };

type Model = {
  size: VoxVec3;
  voxels: { x: number; y: number; z: number; ci: number }[];
};

type TRN = { id: number; child: number; rotPacked: number; t: VoxVec3 };
type GRP = { id: number; children: number[] };
type SHP = { id: number; modelIds: number[] };

type Node =
  | { kind: "trn"; trn: TRN }
  | { kind: "grp"; grp: GRP }
  | { kind: "shp"; shp: SHP };

class R {
  dv: DataView;
  o = 0;
  td = new TextDecoder();
  constructor(buf: ArrayBuffer) {
    this.dv = new DataView(buf);
  }
  u8() {
    const v = this.dv.getUint8(this.o);
    this.o += 1;
    return v;
  }
  i32() {
    const v = this.dv.getInt32(this.o, true);
    this.o += 4;
    return v;
  }
  u32() {
    const v = this.dv.getUint32(this.o, true);
    this.o += 4;
    return v;
  }
  str(len: number) {
    const bytes = new Uint8Array(this.dv.buffer, this.o, len);
    this.o += len;
    return this.td.decode(bytes);
  }
  id4() {
    return this.str(4);
  }
  dict(): Record<string, string> {
    const n = this.i32();
    const out: Record<string, string> = {};
    for (let i = 0; i < n; i++) {
      const k = this.str(this.i32());
      const v = this.str(this.i32());
      out[k] = v;
    }
    return out;
  }
}

function parseTranslation(s?: string): VoxVec3 {
  if (!s) return { x: 0, y: 0, z: 0 };
  const parts = s.trim().split(/\s+/).map((n) => parseInt(n, 10));
  return { x: parts[0] || 0, y: parts[1] || 0, z: parts[2] || 0 };
}

function rotatePaletteRightBy1(p: VoxRGBA[]): VoxRGBA[] {
  const out = p.slice();
  const last = out[255];
  for (let i = 255; i > 0; i--) out[i] = out[i - 1];
  out[0] = { ...last, a: 0 };
  return out;
}

const ID3: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 1];

function decodePackedRotation(packed: number): number[] {
  const i0 = (packed >> 0) & 0x3;
  const i1 = (packed >> 2) & 0x3;

  const s0 = (packed >> 4) & 1 ? -1 : 1;
  const s1 = (packed >> 5) & 1 ? -1 : 1;
  const s2 = (packed >> 6) & 1 ? -1 : 1;

  if (i0 > 2 || i1 > 2 || i0 === i1) return ID3.slice();

  const i2 = 3 - i0 - i1;

  const m = new Array(9).fill(0);
  m[0 * 3 + i0] = s0;
  m[1 * 3 + i1] = s1;
  m[2 * 3 + i2] = s2;
  return m;
}

function mulMat3(A: number[], B: number[]): number[] {
  const C = new Array(9).fill(0);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      C[r * 3 + c] =
        A[r * 3 + 0] * B[0 * 3 + c] +
        A[r * 3 + 1] * B[1 * 3 + c] +
        A[r * 3 + 2] * B[2 * 3 + c];
    }
  }
  return C;
}

function mulMat3Vec3(m: number[], v: VoxVec3): VoxVec3 {
  return {
    x: m[0] * v.x + m[1] * v.y + m[2] * v.z,
    y: m[3] * v.x + m[4] * v.y + m[5] * v.z,
    z: m[6] * v.x + m[7] * v.y + m[8] * v.z,
  };
}

type Xform = { R: number[]; t: VoxVec3 };

function compose(parent: Xform, local: Xform): Xform {
  const R = mulMat3(parent.R, local.R);
  const tLocalInParent = mulMat3Vec3(parent.R, local.t);
  const t = {
    x: tLocalInParent.x + parent.t.x,
    y: tLocalInParent.y + parent.t.y,
    z: tLocalInParent.z + parent.t.z,
  };
  return { R, t };
}

function rgbaToHex(c: VoxRGBA): string {
  const to2 = (n: number) => n.toString(16).padStart(2, "0");
  return `#${to2(c.r)}${to2(c.g)}${to2(c.b)}`;
}

// map to y up
function mvToEditor(p: VoxVec3): VoxVec3 {
  return { x: p.x, y: p.z, z: -p.y };
}

function roundCellFromCenter(center: number): number {
  return Math.round(center - 0.5);
}

export function parseVox(buffer: ArrayBuffer): ImportedGroup[] {
  const r = new R(buffer);

  const magic = r.id4();
  if (magic !== "VOX ") throw new Error("not a .vox file (missing VOX header)");

  const version = r.i32();
  if (version !== 150 && version !== 200) {
    throw new Error(`unsupported .vox version: ${version} expected 150 or 200`);
  }

  let palette: VoxRGBA[] | null = null;
  const models: Model[] = [];
  const nodes = new Map<number, Node>();
  let pendingSize: VoxVec3 | null = null;

  function parseChunkList(endOffset: number) {
    while (r.o < endOffset) {
      const chunkId = r.id4();
      const chunkSize = r.u32();
      const childSize = r.u32();

      const dataStart = r.o;
      const dataEnd = dataStart + chunkSize;
      const childrenEnd = dataEnd + childSize;

      switch (chunkId) {
        case "MAIN": {
          r.o = dataEnd;
          if (childSize > 0) parseChunkList(childrenEnd);
          r.o = childrenEnd;
          continue;
        }

        case "SIZE": {
          const x = r.i32();
          const y = r.i32();
          const z = r.i32();
          pendingSize = { x, y, z };
          break;
        }

        case "XYZI": {
          const n = r.i32();
          const voxels: Model["voxels"] = new Array(n);
          for (let i = 0; i < n; i++) {
            const x = r.u8();
            const y = r.u8();
            const z = r.u8();
            const ci = r.u8();
            voxels[i] = { x, y, z, ci };
          }
          models.push({ size: pendingSize ?? { x: 0, y: 0, z: 0 }, voxels });
          pendingSize = null;
          break;
        }

        case "RGBA": {
          const raw: VoxRGBA[] = new Array(256);
          for (let i = 0; i < 256; i++) raw[i] = { r: r.u8(), g: r.u8(), b: r.u8(), a: r.u8() };
          palette = rotatePaletteRightBy1(raw);
          break;
        }

        case "nTRN": {
          const id = r.i32();
          r.dict();
          const child = r.i32();
          r.i32();
          r.i32();
          const numFrames = r.i32();

          const frame0 = r.dict();
          for (let f = 1; f < numFrames; f++) r.dict();

          const rotPacked = frame0["_r"] ? (parseInt(frame0["_r"], 10) & 0xff) : 0;
          const t = parseTranslation(frame0["_t"]);
          nodes.set(id, { kind: "trn", trn: { id, child, rotPacked, t } });
          break;
        }

        case "nGRP": {
          const id = r.i32();
          r.dict();
          const numChildren = r.i32();
          const children: number[] = [];
          for (let i = 0; i < numChildren; i++) children.push(r.i32());
          nodes.set(id, { kind: "grp", grp: { id, children } });
          break;
        }

        case "nSHP": {
          const id = r.i32();
          r.dict();
          const numModels = r.i32();
          const modelIds: number[] = [];
          for (let k = 0; k < numModels; k++) {
            modelIds.push(r.i32());
            r.dict();
          }
          nodes.set(id, { kind: "shp", shp: { id, modelIds } });
          break;
        }

        default:
          break;
      }

      r.o = dataEnd;
      if (childSize > 0) parseChunkList(childrenEnd);
      r.o = childrenEnd;
    }
  }

  parseChunkList(buffer.byteLength);

  if (!palette) {
    palette = new Array(256).fill(0).map((_, i) => ({ r: i, g: i, b: i, a: 255 }));
    palette[0].a = 0;
  }

  // build instances (Option B: group per nSHP)
  type Instance = { modelId: number; xf: Xform; groupId: string };
  const instances: Instance[] = [];

  if (nodes.size === 0) {
    instances.push({
      modelId: 0,
      xf: { R: ID3, t: { x: 0, y: 0, z: 0 } },
      groupId: "default",
    });
  } else {
    const referenced = new Set<number>();
    for (const n of nodes.values()) {
      if (n.kind === "trn") referenced.add(n.trn.child);
      if (n.kind === "grp") for (const c of n.grp.children) referenced.add(c);
    }

    const roots = [...nodes.keys()].filter((id) => !referenced.has(id));
    const startRoots = roots.length ? roots : nodes.has(0) ? [0] : [...nodes.keys()].slice(0, 1);

    function walk(nodeId: number, parentXf: Xform, stack: Set<number>) {
      const n = nodes.get(nodeId);
      if (!n) return;

      if (stack.has(nodeId)) return;
      stack.add(nodeId);

      if (n.kind === "trn") {
        const local: Xform = { R: decodePackedRotation(n.trn.rotPacked), t: n.trn.t };
        walk(n.trn.child, compose(parentXf, local), stack);
        stack.delete(nodeId);
        return;
      }

      if (n.kind === "grp") {
        for (const c of n.grp.children) walk(c, parentXf, stack);
        stack.delete(nodeId);
        return;
      }

      // nSHP => instance
      const modelId = n.shp.modelIds[0] ?? 0;
      const groupId = `shp:${n.shp.id}`;
      instances.push({ modelId, xf: parentXf, groupId });

      stack.delete(nodeId);
    }

    for (const root of startRoots) walk(root, { R: ID3, t: { x: 0, y: 0, z: 0 } }, new Set());
  }

  // emit WORLD voxels first (then convert to group-local)
  const voxelsByGroup = new Map<string, { x: number; y: number; z: number; color: string }[]>();
  const globalDedupe = new Set<string>();

  for (const inst of instances) {
    const model = models[inst.modelId];
    if (!model) continue;

    const pivot = {
      x: model.size.x / 2,
      y: model.size.y / 2,
      z: model.size.z / 2,
    };

    let arr = voxelsByGroup.get(inst.groupId);
    if (!arr) {
      arr = [];
      voxelsByGroup.set(inst.groupId, arr);
    }

    for (const v of model.voxels) {
      const localCenter: VoxVec3 = {
        x: v.x + 0.5 - pivot.x,
        y: v.y + 0.5 - pivot.y,
        z: v.z + 0.5 - pivot.z,
      };

      const rotated = mulMat3Vec3(inst.xf.R, localCenter);

      const worldCenterMV: VoxVec3 = {
        x: rotated.x + inst.xf.t.x,
        y: rotated.y + inst.xf.t.y,
        z: rotated.z + inst.xf.t.z,
      };

      const worldCenterEditor = mvToEditor(worldCenterMV);

      const cell = {
        x: roundCellFromCenter(worldCenterEditor.x),
        y: roundCellFromCenter(worldCenterEditor.y),
        z: roundCellFromCenter(worldCenterEditor.z),
      };

      const c = palette[v.ci] ?? palette[1];
      const color = rgbaToHex(c);

      const k = `${cell.x}|${cell.y}|${cell.z}`;
      if (globalDedupe.has(k)) continue;
      globalDedupe.add(k);

      arr.push({ x: cell.x, y: cell.y, z: cell.z, color });
    }
  }

  // convert WORLD voxels -> GROUPS with local coords
  const groups: ImportedGroup[] = [];

  for (const [groupId, worldVoxels] of voxelsByGroup.entries()) {
    if (worldVoxels.length === 0) continue;

    let minX = Infinity, minY = Infinity, minZ = Infinity;

    for (const v of worldVoxels) {
      minX = Math.min(minX, v.x);
      minY = Math.min(minY, v.y);
      minZ = Math.min(minZ, v.z);
    }

    const position = { x: minX, y: minY, z: minZ };

    const localVoxels: ImportedVoxel[] = worldVoxels.map((v) => ({
      x: v.x - position.x,
      y: v.y - position.y,
      z: v.z - position.z,
      color: v.color,
    }));

    groups.push({ groupId, position, voxels: localVoxels });
  }

  // recenter + ground (apply to group positions, not voxel locals)
  if (groups.length) {
    let gMinX = Infinity, gMinY = Infinity, gMinZ = Infinity;
    let gMaxX = -Infinity, gMaxY = -Infinity, gMaxZ = -Infinity;

    for (const g of groups) {
      for (const v of g.voxels) {
        const x = g.position.x + v.x;
        const y = g.position.y + v.y;
        const z = g.position.z + v.z;
        gMinX = Math.min(gMinX, x); gMaxX = Math.max(gMaxX, x);
        gMinY = Math.min(gMinY, y); gMaxY = Math.max(gMaxY, y);
        gMinZ = Math.min(gMinZ, z); gMaxZ = Math.max(gMaxZ, z);
      }
    }

    const offX = -Math.floor((gMinX + gMaxX) / 2);
    const offY = -gMinY;
    const offZ = -Math.floor((gMinZ + gMaxZ) / 2);

    for (const g of groups) {
      g.position.x += offX;
      g.position.y += offY;
      g.position.z += offZ;
    }
  }

  console.log("[vox] models:", models.length, "nodes:", nodes.size, "instances:", instances.length);
  console.log("[vox] groups:", groups.map((g) => [g.groupId, g.voxels.length]).sort((a, b) => (b[1] as number) - (a[1] as number)).slice(0, 20));

  return groups;
}