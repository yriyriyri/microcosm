import type { WorldRepository } from "./WorldRepository";
import type {
  SaveWorldInput,
  WorldId,
  WorldMetaRecord,
  WorldRecord,
} from "../domain/worldTypes";

import { worldRecordToWorldDocument } from "../domain/cloudMappers";
import type { WorldDocument } from "../domain/cloudWorldTypes";

import {
  deleteIsland,
  findIslandIdByName,
  getIslandMeta,
  listIslands,
  loadIsland,
  renameIsland,
  saveIsland,
} from "../database/LibraryDb";

export class IndexedDbWorldRepository implements WorldRepository {
  async listWorlds(): Promise<WorldMetaRecord[]> {
    return await listIslands();
  }

  async findWorldIdByName(name: string): Promise<WorldId | null> {
    return await findIslandIdByName(name);
  }

  async getWorldMeta(id: WorldId): Promise<WorldMetaRecord | null> {
    return await getIslandMeta(id);
  }

  async loadWorld(id: WorldId): Promise<WorldRecord | null> {
    return await loadIsland(id);
  }

  async saveWorld(input: SaveWorldInput): Promise<WorldId> {
    return await saveIsland(input);
  }

  async renameWorld(id: WorldId, name: string): Promise<void> {
    await renameIsland(id, name);
  }

  async deleteWorld(id: WorldId): Promise<void> {
    await deleteIsland(id);
  }

  async loadWorldDocument(
    id: WorldId,
    ownerAccountId: string | null = null
  ): Promise<WorldDocument | null> {
    const record = await this.loadWorld(id);
    if (!record) return null;
    return worldRecordToWorldDocument(record, ownerAccountId);
  }
}