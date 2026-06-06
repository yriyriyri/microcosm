export async function ensurePresetAssetsInstalled(opts?: {
  force?: boolean;
  debug?: boolean;
  concurrency?: number;
  onProgress?: (p: number, info?: { done: number; total: number; id?: string; name?: string }) => void;
}) {
  opts?.onProgress?.(1, { done: 1, total: 1 });
}

export function ensurePresetAssetsInstalledOnce(opts?: {
  force?: boolean;
  debug?: boolean;
  concurrency?: number;
  onProgress?: (p: number, info?: { done: number; total: number; id?: string; name?: string }) => void;
}) {
  opts?.onProgress?.(1, { done: 1, total: 1 });
  return Promise.resolve();
}
