import { voxlMiniClient } from "./voxlMiniClient";
import type {
  CreateOwnedWorldInput,
  OwnedWorldHeadDocument,
  OwnedWorldManifestItem,
  PublishedWorldSnapshotDocument,
  UpdateOwnedWorldInput,
} from "@microcosm/voxel-core";

export async function listOwnedWorldManifest(): Promise<OwnedWorldManifestItem[]> {
  const res = await voxlMiniClient.get("/v1/me/worlds/manifest");
  return Array.isArray(res.data?.items) ? res.data.items : [];
}

export async function getOwnedWorld(
  worldId: string
): Promise<OwnedWorldHeadDocument | null> {
  try {
    const res = await voxlMiniClient.get(`/v1/me/worlds/${worldId}`);
    return (res.data?.value as OwnedWorldHeadDocument | undefined) ?? null;
  } catch (error: any) {
    if (error?.response?.status === 404) return null;
    throw error;
  }
}

export async function createOwnedWorld(
  input: CreateOwnedWorldInput
): Promise<OwnedWorldHeadDocument> {
  const res = await voxlMiniClient.post("/v1/me/worlds", input);
  return res.data.value as OwnedWorldHeadDocument;
}

export async function updateOwnedWorld(
  worldId: string,
  input: UpdateOwnedWorldInput
): Promise<{ ok: true; value: OwnedWorldHeadDocument } | { ok: false; current: OwnedWorldHeadDocument }> {
  try {
    const res = await voxlMiniClient.put(`/v1/me/worlds/${worldId}`, input);
    return { ok: true, value: res.data.value as OwnedWorldHeadDocument };
  } catch (error: any) {
    if (error?.response?.status === 409 && error.response.data?.current) {
      return {
        ok: false,
        current: error.response.data.current as OwnedWorldHeadDocument,
      };
    }

    throw error;
  }
}

export async function deleteOwnedWorld(worldId: string): Promise<void> {
  try {
    await voxlMiniClient.delete(`/v1/me/worlds/${worldId}`);
  } catch (error: any) {
    if (error?.response?.status === 404) return;
    throw error;
  }
}

export async function publishOwnedWorld(
  worldId: string
): Promise<PublishedWorldSnapshotDocument> {
  const res = await voxlMiniClient.post(`/v1/me/worlds/${worldId}/publish`);
  return res.data.value as PublishedWorldSnapshotDocument;
}

export async function listPublishedWorldSnapshots(): Promise<PublishedWorldSnapshotDocument[]> {
  const res = await voxlMiniClient.get("/v1/published-worlds");
  return Array.isArray(res.data?.worlds) ? res.data.worlds : [];
}

export async function getPublishedWorldSnapshot(
  publishedWorldId: string
): Promise<PublishedWorldSnapshotDocument | null> {
  try {
    const res = await voxlMiniClient.get(`/v1/published-worlds/${publishedWorldId}`);
    return (res.data?.value as PublishedWorldSnapshotDocument | undefined) ?? null;
  } catch (error: any) {
    if (error?.response?.status === 404) return null;
    throw error;
  }
}
