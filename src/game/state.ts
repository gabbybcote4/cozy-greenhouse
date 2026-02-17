import { CROPS } from "./data";
import type { CropId, SaveState } from "./types";
import { saveNow } from "./save";

export function qty(state: SaveState, itemId: string): number {
  return state.inventory[itemId] ?? 0;
}

export function add(state: SaveState, itemId: string, amount: number) {
  state.inventory[itemId] = (state.inventory[itemId] ?? 0) + amount;
}

export function consume(state: SaveState, itemId: string, amount: number): boolean {
  const have = qty(state, itemId);
  if (have < amount) return false;
  state.inventory[itemId] = have - amount;
  return true;
}

export function plant(state: SaveState, plotIndex: number, cropId: CropId): boolean {
  const plot = state.plots[plotIndex];
  if (!plot || plot.cropId) return false;

  const crop = CROPS[cropId];
  if (!consume(state, crop.seedItemId, 1)) return false;

  plot.cropId = cropId;
  plot.readyAtMs = Date.now() + crop.growSeconds * 1000;

  saveNow(state);
  return true;
}

export function harvest(state: SaveState, plotIndex: number): boolean {
  const plot = state.plots[plotIndex];
  if (!plot || !plot.cropId) return false;
  if (Date.now() < plot.readyAtMs) return false;

  const crop = CROPS[plot.cropId];
  add(state, crop.harvestItemId, crop.harvestAmount);

  plot.cropId = null;
  plot.readyAtMs = 0;

  saveNow(state);
  return true;
}
