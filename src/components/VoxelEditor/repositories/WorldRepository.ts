import type {
  SaveWorldInput,
  WorldId,
  WorldMetaRecord,
  WorldRecord,
} from "../domain/worldTypes";
import type { WorldDocument } from "../domain/cloudWorldTypes";

export interface WorldRepository {
  listWorlds(): Promise<WorldMetaRecord[]>;
  findWorldIdByName(name: string): Promise<WorldId | null>;
  getWorldMeta(id: WorldId): Promise<WorldMetaRecord | null>;
  loadWorld(id: WorldId): Promise<WorldRecord | null>;
  saveWorld(input: SaveWorldInput): Promise<WorldId>;
  renameWorld(id: WorldId, name: string): Promise<void>;
  deleteWorld(id: WorldId): Promise<void>;
  loadWorldDocument(
    id: WorldId,
    ownerAccountId?: string | null
  ): Promise<WorldDocument | null>;
}