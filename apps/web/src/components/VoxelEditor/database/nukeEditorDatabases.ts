import { deleteAssetDatabase } from "./AssetDb";
import { deleteWorldDatabase } from "./LibraryDb";
import { deleteOwnedAssetCache } from "../repositories/ownedAssetCache";
import { deleteOwnedWorldCache } from "../repositories/ownedWorldCache";

export async function nukeVoxelEditorDatabases(): Promise<void> {
  const assetOwner =
    typeof window !== "undefined"
      ? localStorage.getItem("voxl:last-owned-asset-owner")
      : null;
  const worldOwner =
    typeof window !== "undefined"
      ? localStorage.getItem("voxl:last-owned-world-owner")
      : null;

  await Promise.all([
    deleteAssetDatabase(),
    deleteWorldDatabase(),
    assetOwner ? deleteOwnedAssetCache(assetOwner).catch(() => {}) : Promise.resolve(),
    worldOwner ? deleteOwnedWorldCache(worldOwner).catch(() => {}) : Promise.resolve(),
  ]);

  try {
    localStorage.removeItem("voxbox:primaryWorldId");
    localStorage.removeItem("voxl:last-owned-asset-owner");
    localStorage.removeItem("voxl:last-owned-world-owner");
  } catch {}
}
