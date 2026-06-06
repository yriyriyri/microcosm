import { mkdirSync } from "node:fs";
import path from "node:path";

const CWD = process.cwd();
const WORKSPACE_SUFFIX = path.join("apps", "api");

export const REPO_ROOT = CWD.endsWith(WORKSPACE_SUFFIX)
  ? path.resolve(CWD, "../..")
  : CWD;

export const VOXL_API_PORT = Number(process.env.VOXL_API_PORT ?? "4001");
export const VOXL_AUTH_API_URL =
  process.env.VOXL_AUTH_API_URL ?? "https://api.voxldev.world";
export const VOXL_WEB_ORIGIN = process.env.VOXL_WEB_ORIGIN ?? "*";

export const DATA_DIR =
  process.env.VOXL_API_DATA_DIR ?? path.join(REPO_ROOT, "data", "api");
export const DATABASE_PATH =
  process.env.VOXL_API_DATABASE_PATH ?? path.join(DATA_DIR, "microcosm.sqlite");

mkdirSync(DATA_DIR, { recursive: true });
