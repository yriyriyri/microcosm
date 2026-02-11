import type { GroupState } from "../VoxelWorld";
import { getAssetMeta, saveAsset } from "./AssetDb";

type PresetManifest = {
  version: number;
  presets: { id: string; name: string; json: string; thumb?: string }[];
};

async function fetchJson<T>(url: string): Promise<T> {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`Failed to fetch ${url}: ${r.status}`);
  return (await r.json()) as T;
}

async function fetchBlob(url: string): Promise<Blob> {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`Failed to fetch ${url}: ${r.status}`);
  return await r.blob();
}

export async function ensurePresetAssetsInstalled(opts?: { force?: boolean }) {
  const manifest = await fetchJson<PresetManifest>("/presets/manifest.json");

  if (manifest.version !== 1) {
    console.warn("Unknown preset manifest version:", manifest.version);
  }

  for (const p of manifest.presets) {
    if (!opts?.force) {
      const existing = await getAssetMeta(p.id).catch(() => null);
      if (existing) continue;
    }

    const group = await fetchJson<GroupState>(p.json);

    const thumb = p.thumb ? await fetchBlob(p.thumb) : null;

    await saveAsset({
      id: p.id,
      name: p.name,
      group,
      thumb,
    });
  }
}