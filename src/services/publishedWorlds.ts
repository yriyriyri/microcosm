import { voxlMiniClient } from "./voxlMiniClient";

export type PublishedWorldGroupVoxel = {
  local: { x: number; y: number; z: number };
  color: string;
  isBlueprint: boolean;
};

export type PublishedWorldGroupPayload = {
  groupId: string;
  sourceAssetId: string | null;
  assetKind: "draft" | "marketplace" | null;
  position: { x: number; y: number; z: number };
  rotation: { x: 0 | 1 | 2 | 3; y: 0 | 1 | 2 | 3; z: 0 | 1 | 2 | 3 };
  bounds: {
    min: { x: number; y: number; z: number };
    max: { x: number; y: number; z: number };
  } | null;
  voxelCount: number;
  voxels: PublishedWorldGroupVoxel[];
};

export type PublishWorldPayload = {
  publisherUserId: string;
  worldName: string;
  voxelCount: number;
  sourceAssetIds: string[];
  groups: PublishedWorldGroupPayload[];
};

export async function publishWorld(payload: PublishWorldPayload) {
  const res = await voxlMiniClient.post("/api/published-worlds", payload);
  return res.data;
}

export async function listPublishedWorlds() {
  const res = await voxlMiniClient.get("/api/published-worlds");
  return res.data;
}