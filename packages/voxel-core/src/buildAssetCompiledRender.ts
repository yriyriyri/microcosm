import type { GroupState, GroupVoxel } from "./groupTypes";
import type { VoxelCoord } from "./voxelTypes";
import {
  ASSET_COMPILED_RENDER_VERSION,
  type AssetCompiledBounds,
  type AssetCompiledRender,
  type AssetCompiledSurface,
} from "./compiledAssetTypes";

function keyOfLocal(coord: VoxelCoord): string {
  return `${coord.x},${coord.y},${coord.z}`;
}

function computeBounds(voxels: GroupVoxel[]): AssetCompiledBounds | null {
  if (!voxels.length) return null;

  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  for (const voxel of voxels) {
    minX = Math.min(minX, voxel.local.x);
    minY = Math.min(minY, voxel.local.y);
    minZ = Math.min(minZ, voxel.local.z);
    maxX = Math.max(maxX, voxel.local.x);
    maxY = Math.max(maxY, voxel.local.y);
    maxZ = Math.max(maxZ, voxel.local.z);
  }

  return {
    min: { x: minX, y: minY, z: minZ },
    max: { x: maxX, y: maxY, z: maxZ },
  };
}

export function buildAssetCompiledRender(group: GroupState): AssetCompiledRender {
  const voxels = group.voxels ?? [];
  const occupied = new Set(voxels.map((voxel) => keyOfLocal(voxel.local)));

  const buckets = new Map<string, AssetCompiledSurface>();

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

  const hasLocalVoxel = (x: number, y: number, z: number) =>
    occupied.has(keyOfLocal({ x, y, z }));

  const pushFace = (
    bucket: AssetCompiledSurface,
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

  for (const voxel of voxels) {
    const { x, y, z } = voxel.local;
    const bucket = getBucket(voxel.color, voxel.isBlueprint);

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

  return {
    version: ASSET_COMPILED_RENDER_VERSION,
    bounds: computeBounds(voxels),
    voxelCount: voxels.length,
    surfaces: Array.from(buckets.values()).filter(
      (surface) => surface.vertexCount > 0 && surface.indices.length > 0
    ),
  };
}
