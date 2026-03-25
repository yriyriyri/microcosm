//internal data structure ,, metadata referenced in voxelWorld
export type VoxelCoord = { x: number; y: number; z: number };

export type QuarterTurn = 0 | 1 | 2 | 3;

export type GroupRotation = {
  x: QuarterTurn;
  y: QuarterTurn;
  z: QuarterTurn;
};

export function keyOf(c: VoxelCoord): string {
  return `${c.x},${c.y},${c.z}`;
}

export function add(a: VoxelCoord, b: VoxelCoord): VoxelCoord {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function isSame(a: VoxelCoord, b: VoxelCoord): boolean {
  return a.x === b.x && a.y === b.y && a.z === b.z;
}