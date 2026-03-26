import { voxlMiniClient } from "./voxlMiniClient";
import type {
  CreatePublishedWorldInput,
  PublishedWorldDocument,
  PublishedWorldGroupPayload,
  PublishedWorldSurfacePayload,
} from "@/components/VoxelEditor/domain/publishedWorldTypes";

export type {
  PublishedWorldSurfacePayload,
  PublishedWorldGroupPayload,
  CreatePublishedWorldInput,
  PublishedWorldDocument,
};

export async function publishWorld(payload: CreatePublishedWorldInput) {
  const res = await voxlMiniClient.post("/api/published-worlds", payload);
  return res.data;
}

export async function listPublishedWorlds(): Promise<{
  ok: boolean;
  worlds: PublishedWorldDocument[];
}> {
  const res = await voxlMiniClient.get("/api/published-worlds");
  return res.data;
}