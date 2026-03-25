import { deleteAssetDatabase } from "./AssetDb";
import { deleteWorldDatabase } from "./LibraryDb";

export async function nukeVoxelEditorDatabases(): Promise<void> {
  await Promise.all([
    deleteAssetDatabase(),
    deleteWorldDatabase(),
  ]);

  try {
    localStorage.removeItem("voxbox:primaryWorldId");
  } catch {}
}