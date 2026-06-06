import { voxlMiniClient } from "./voxlMiniClient";
import type {
  AssetVersionSnapshotDocument,
  CreateOwnedAssetInput,
  OwnedAssetHeadDocument,
  OwnedAssetManifestItem,
  PublishedAssetDetailDocument,
  UpdateOwnedAssetInput,
} from "@microcosm/voxel-core";

export async function listOwnedAssetManifest(): Promise<OwnedAssetManifestItem[]> {
  const res = await voxlMiniClient.get("/v1/me/assets/manifest");
  return Array.isArray(res.data?.items) ? res.data.items : [];
}

export async function getOwnedAsset(
  assetHeadId: string
): Promise<OwnedAssetHeadDocument | null> {
  try {
    const res = await voxlMiniClient.get(`/v1/me/assets/${assetHeadId}`);
    return (res.data?.value as OwnedAssetHeadDocument | undefined) ?? null;
  } catch (error: any) {
    if (error?.response?.status === 404) return null;
    throw error;
  }
}

export async function createOwnedAsset(
  input: CreateOwnedAssetInput
): Promise<OwnedAssetHeadDocument> {
  const res = await voxlMiniClient.post("/v1/me/assets", input);
  return res.data.value as OwnedAssetHeadDocument;
}

export async function updateOwnedAsset(
  assetHeadId: string,
  input: UpdateOwnedAssetInput
): Promise<{ ok: true; value: OwnedAssetHeadDocument } | { ok: false; current: OwnedAssetHeadDocument }> {
  try {
    const res = await voxlMiniClient.put(`/v1/me/assets/${assetHeadId}`, input);
    return { ok: true, value: res.data.value as OwnedAssetHeadDocument };
  } catch (error: any) {
    if (error?.response?.status === 409 && error.response.data?.current) {
      return {
        ok: false,
        current: error.response.data.current as OwnedAssetHeadDocument,
      };
    }

    throw error;
  }
}

export async function deleteOwnedAsset(assetHeadId: string): Promise<void> {
  try {
    await voxlMiniClient.delete(`/v1/me/assets/${assetHeadId}`);
  } catch (error: any) {
    if (error?.response?.status === 404) return;
    throw error;
  }
}

export async function publishOwnedAsset(
  assetHeadId: string
): Promise<PublishedAssetDetailDocument> {
  const res = await voxlMiniClient.post(`/v1/me/assets/${assetHeadId}/publish`);
  return res.data.value as PublishedAssetDetailDocument;
}

export async function listPublishedAssets(): Promise<PublishedAssetDetailDocument[]> {
  const res = await voxlMiniClient.get("/v1/published-assets");
  return Array.isArray(res.data?.assets) ? res.data.assets : [];
}

export async function getPublishedAsset(
  listingId: string
): Promise<PublishedAssetDetailDocument | null> {
  try {
    const res = await voxlMiniClient.get(`/v1/published-assets/${listingId}`);
    return (res.data?.value as PublishedAssetDetailDocument | undefined) ?? null;
  } catch (error: any) {
    if (error?.response?.status === 404) return null;
    throw error;
  }
}

export async function getAssetVersion(
  assetVersionId: string
): Promise<AssetVersionSnapshotDocument | null> {
  try {
    const res = await voxlMiniClient.get(`/v1/asset-versions/${assetVersionId}`);
    return (res.data?.value as AssetVersionSnapshotDocument | undefined) ?? null;
  } catch (error: any) {
    if (error?.response?.status === 404) return null;
    throw error;
  }
}
