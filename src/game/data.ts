import type { CropData } from "./types";

export const CROPS: Record<string, CropData> = {
  turnip: { id: "turnip", displayName: "Turnip", growSeconds: 30, seedItemId: "turnip_seed", harvestItemId: "turnip", harvestAmount: 1 },
  carrot: { id: "carrot", displayName: "Carrot", growSeconds: 45, seedItemId: "carrot_seed", harvestItemId: "carrot", harvestAmount: 1 },
  potato: { id: "potato", displayName: "Potato", growSeconds: 60, seedItemId: "potato_seed", harvestItemId: "potato", harvestAmount: 1 },
};
