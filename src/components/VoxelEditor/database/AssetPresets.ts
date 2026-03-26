import type { GroupState } from "../VoxelWorld";
import { assetRepository } from "../repositories";

type PresetManifest = {
  version: number;
  presets: { id: string; name: string; json: string; thumb?: string }[];
};

const KV_PRESETS_VERSION = "presets:installedVersion";

async function mapLimit<T>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<void>
) {
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
}

function resolvePresetUrl(u: string): string {
  if (!u) return u;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("/")) return u;
  return `/${u.replace(/^\.?\//, "")}`;
}

async function fetchJson<T>(url: string, cache: RequestCache, debug?: boolean): Promise<T> {
  const t0 = performance.now();
  const r = await fetch(url, { cache });
  const ms = Math.round(performance.now() - t0);

  if (debug) {
    console.info("[preset fetch json]", {
      url,
      status: r.status,
      ms,
      cache,
      cacheControl: r.headers.get("cache-control"),
      contentLength: r.headers.get("content-length"),
      contentType: r.headers.get("content-type"),
    });
  }

  if (!r.ok) throw new Error(`Failed to fetch ${url}: ${r.status}`);
  return (await r.json()) as T;
}

async function fetchBlob(url: string, cache: RequestCache, debug?: boolean): Promise<Blob> {
  const t0 = performance.now();
  const r = await fetch(url, { cache });
  const ms = Math.round(performance.now() - t0);

  if (debug) {
    console.info("[preset fetch blob]", {
      url,
      status: r.status,
      ms,
      cache,
      cacheControl: r.headers.get("cache-control"),
      contentLength: r.headers.get("content-length"),
      contentType: r.headers.get("content-type"),
    });
  }

  if (!r.ok) throw new Error(`Failed to fetch ${url}: ${r.status}`);
  return await r.blob();
}

export async function ensurePresetAssetsInstalled(opts?: {
  force?: boolean;
  debug?: boolean;
  concurrency?: number;
  onProgress?: (p: number, info?: { done: number; total: number; id?: string; name?: string }) => void;
}) {
  const debug = !!opts?.debug;

  const manifest = await fetchJson<PresetManifest>("/presets/manifest.json", "no-store", debug);

  if (manifest.version !== 1) {
    console.warn("Unknown preset manifest version:", manifest.version);
  }

  if (!opts?.force) {
    const installed = await assetRepository.getKv<number>(KV_PRESETS_VERSION).catch(() => null);
  
    if (installed === manifest.version) {
      const rows = await assetRepository.listAssets().catch(() => []);
      if (rows.length > 0) {
        if (debug) console.info("[presets] already installed version", installed);
        opts?.onProgress?.(1, { done: 1, total: 1 });
        return;
      } else {
        if (debug) console.info("[presets] KV says installed but DB empty -> reinstalling");
      }
    }
  }

  const presets = manifest.presets || [];
  const total = presets.length || 1;
  const concurrency = Math.max(1, Math.min(8, opts?.concurrency ?? 4));

  const tAll0 = performance.now();

  let done = 0;
  const tick = (info?: { id?: string; name?: string }) => {
    done++;
    const p = Math.max(0, Math.min(1, done / total));
    opts?.onProgress?.(p, { done, total, ...info });
  };

  opts?.onProgress?.(0, { done: 0, total });

  await mapLimit(presets, concurrency, async (p) => {
    try {
      if (!opts?.force) {
        const existing = await assetRepository.getAssetMeta(p.id).catch(() => null);
      
        const hasCorrectLineage =
          !!existing &&
          Array.isArray((existing as any).lineageAssetIds) &&
          (existing as any).lineageAssetIds.length > 0 &&
          (existing as any).lineageAssetIds[(existing as any).lineageAssetIds.length - 1] === p.id;
      
        if (hasCorrectLineage) {
          return;
        }
      }

      const jsonUrl = resolvePresetUrl(p.json);
      const thumbUrl = p.thumb ? resolvePresetUrl(p.thumb) : null;

      const [group, thumb] = await Promise.all([
        fetchJson<GroupState>(jsonUrl, "force-cache", debug),
        thumbUrl ? fetchBlob(thumbUrl, "force-cache", debug) : Promise.resolve(null),
      ]);

      await assetRepository.saveAsset({
        id: p.id,
        name: p.name,
        group,
        thumb,
        visibility: "marketplace",
        inLibrary: false,
        isPreset: true,
        isImmutable: true,
        lineageAssetIds: [p.id],
      });
    } finally {
      tick({ id: p.id, name: p.name });
    }
  });

  await assetRepository.setKv(KV_PRESETS_VERSION, manifest.version).catch(() => {});

  opts?.onProgress?.(1, { done: total, total });

  if (debug) {
    console.info("[presets] installed", {
      count: presets.length,
      ms: Math.round(performance.now() - tAll0),
      concurrency,
      version: manifest.version,
    });
  }
}