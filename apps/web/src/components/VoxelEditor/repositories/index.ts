import { RemoteAssetRepository } from "./remoteAssetRepository";
import { RemoteWorldRepository } from "./remoteWorldRepository";

export const assetRepository = new RemoteAssetRepository();
export const worldRepository = new RemoteWorldRepository();
