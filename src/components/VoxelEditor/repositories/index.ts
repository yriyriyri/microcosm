import { IndexedDbAssetRepository } from "./indexedDbAssetRepository";
import { IndexedDbWorldRepository } from "./indexedDbWorldRepository";

export const assetRepository = new IndexedDbAssetRepository();
export const worldRepository = new IndexedDbWorldRepository();