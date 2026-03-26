import { NextRequest, NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  CreatePublishedWorldInput,
  PublishedWorldDocument,
} from "@/components/VoxelEditor/domain/publishedWorldTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "published-worlds.json");
const MAX_WORLDS = 100;

function makeId(): string {
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return `published_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isInt(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isQuarterTurn(value: unknown): value is 0 | 1 | 2 | 3 {
  return value === 0 || value === 1 || value === 2 || value === 3;
}

function isVec3(value: unknown): value is { x: number; y: number; z: number } {
  return (
    isObject(value) &&
    isInt(value.x) &&
    isInt(value.y) &&
    isInt(value.z)
  );
}

function isRotation(
  value: unknown
): value is { x: 0 | 1 | 2 | 3; y: 0 | 1 | 2 | 3; z: 0 | 1 | 2 | 3 } {
  return (
    isObject(value) &&
    isQuarterTurn(value.x) &&
    isQuarterTurn(value.y) &&
    isQuarterTurn(value.z)
  );
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isNumber);
}

function isIntArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isInt);
}

function validateCreatePublishedWorldInput(
  body: unknown
): { ok: true; value: CreatePublishedWorldInput } | { ok: false; error: string } {
  if (!isObject(body)) {
    return { ok: false, error: "Body must be an object" };
  }

  const { publisherUserId, worldName, voxelCount, sourceAssetIds, groups } = body;

  if (typeof publisherUserId !== "string" || !publisherUserId.trim()) {
    return { ok: false, error: "publisherUserId is required" };
  }

  if (typeof worldName !== "string" || !worldName.trim()) {
    return { ok: false, error: "worldName is required" };
  }

  if (!isInt(voxelCount) || voxelCount < 0) {
    return { ok: false, error: "voxelCount must be a non-negative integer" };
  }

  if (
    !Array.isArray(sourceAssetIds) ||
    !sourceAssetIds.every((v) => typeof v === "string")
  ) {
    return { ok: false, error: "sourceAssetIds must be a string array" };
  }

  if (!Array.isArray(groups)) {
    return { ok: false, error: "groups must be an array" };
  }

  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    if (!isObject(g)) {
      return { ok: false, error: `groups[${i}] must be an object` };
    }

    if (typeof g.groupId !== "string" || !g.groupId.trim()) {
      return { ok: false, error: `groups[${i}].groupId is required` };
    }

    if (
      g.sourceAssetId !== null &&
      g.sourceAssetId !== undefined &&
      typeof g.sourceAssetId !== "string"
    ) {
      return { ok: false, error: `groups[${i}].sourceAssetId must be string|null` };
    }

    if (
      g.assetKind !== "draft" &&
      g.assetKind !== "marketplace" &&
      g.assetKind !== null &&
      g.assetKind !== undefined
    ) {
      return { ok: false, error: `groups[${i}].assetKind must be draft|marketplace|null` };
    }

    if (!isVec3(g.position)) {
      return { ok: false, error: `groups[${i}].position must be an integer vec3` };
    }

    if (!isRotation(g.rotation)) {
      return { ok: false, error: `groups[${i}].rotation must be a valid quarter-turn rotation` };
    }

    if (
      g.bounds !== null &&
      g.bounds !== undefined &&
      (!isObject(g.bounds) || !isVec3(g.bounds.min) || !isVec3(g.bounds.max))
    ) {
      return { ok: false, error: `groups[${i}].bounds must be null or valid bounds` };
    }

    if (!isInt(g.voxelCount) || g.voxelCount < 0) {
      return { ok: false, error: `groups[${i}].voxelCount must be a non-negative integer` };
    }

    if (!Array.isArray(g.surfaces)) {
      return { ok: false, error: `groups[${i}].surfaces must be an array` };
    }

    for (let j = 0; j < g.surfaces.length; j++) {
      const s = g.surfaces[j];
      if (!isObject(s)) {
        return { ok: false, error: `groups[${i}].surfaces[${j}] must be an object` };
      }

      if (typeof s.color !== "string" || !s.color.trim()) {
        return { ok: false, error: `groups[${i}].surfaces[${j}].color is required` };
      }

      if (typeof s.isBlueprint !== "boolean") {
        return { ok: false, error: `groups[${i}].surfaces[${j}].isBlueprint must be boolean` };
      }

      if (!isNumberArray(s.positions) || s.positions.length % 3 !== 0) {
        return { ok: false, error: `groups[${i}].surfaces[${j}].positions must be a number[] divisible by 3` };
      }

      if (!isNumberArray(s.normals) || s.normals.length !== s.positions.length) {
        return { ok: false, error: `groups[${i}].surfaces[${j}].normals must be a number[] matching positions length` };
      }

      if (!isIntArray(s.indices) || s.indices.length % 3 !== 0) {
        return { ok: false, error: `groups[${i}].surfaces[${j}].indices must be an integer[] divisible by 3` };
      }

      if (!isInt(s.vertexCount) || s.vertexCount < 0) {
        return { ok: false, error: `groups[${i}].surfaces[${j}].vertexCount must be a non-negative integer` };
      }

      if (!isInt(s.triangleCount) || s.triangleCount < 0) {
        return { ok: false, error: `groups[${i}].surfaces[${j}].triangleCount must be a non-negative integer` };
      }
    }
  }

  return {
    ok: true,
    value: {
      publisherUserId: publisherUserId.trim(),
      worldName: worldName.trim(),
      voxelCount,
      sourceAssetIds,
      groups: groups as CreatePublishedWorldInput["groups"],
    },
  };
}

async function ensureStore(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    await writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function readAllWorlds(): Promise<PublishedWorldDocument[]> {
  await ensureStore();
  const raw = await readFile(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PublishedWorldDocument[]) : [];
  } catch {
    return [];
  }
}

async function writeAllWorlds(worlds: PublishedWorldDocument[]): Promise<void> {
  await ensureStore();
  await writeFile(DATA_FILE, JSON.stringify(worlds, null, 2), "utf8");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = validateCreatePublishedWorldInput(body);

    if (!parsed.ok) {
      return NextResponse.json(
        { ok: false, error: parsed.error },
        { status: 400 }
      );
    }

    const now = Date.now();

    const doc: PublishedWorldDocument = {
      publishedWorldId: makeId(),
      publisherUserId: parsed.value.publisherUserId,
      worldName: parsed.value.worldName,
      voxelCount: parsed.value.voxelCount,
      sourceAssetIds: Array.from(new Set(parsed.value.sourceAssetIds)),
      groups: parsed.value.groups,
      createdAt: now,
      updatedAt: now,
    };

    const worlds = await readAllWorlds();
    worlds.unshift(doc);

    if (worlds.length > MAX_WORLDS) {
      worlds.length = MAX_WORLDS;
    }

    await writeAllWorlds(worlds);

    return NextResponse.json({
      ok: true,
      publishedWorldId: doc.publishedWorldId,
      createdAt: doc.createdAt,
    });
  } catch (error) {
    console.error("POST /api/published-worlds failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to publish world" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const worlds = await readAllWorlds();
    return NextResponse.json({
      ok: true,
      worlds,
    });
  } catch (error) {
    console.error("GET /api/published-worlds failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load published worlds" },
      { status: 500 }
    );
  }
}