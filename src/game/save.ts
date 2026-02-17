import type { SaveState, PlotState } from "./types";

const KEY = "COZY_SAVE_V1";

export function makeNewSave(plotCount = 12): SaveState {
  const plots: PlotState[] = Array.from({ length: plotCount }, (_, i) => ({
    index: i,
    cropId: null,
    readyAtMs: 0,
  }));

  return {
    version: 1,
    selectedPlot: 0,
    greenhouseStage: 0,
    communityPoints: 0,
    plots,
    inventory: {
      turnip_seed: 6,
      carrot_seed: 6,
      potato_seed: 6,
      turnip: 0,
      carrot: 0,
      potato: 0,
    },
  };
}

export function loadSave(): SaveState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return makeNewSave(12);
  try {
    const parsed = JSON.parse(raw) as SaveState;
    if (parsed.version !== 1) return makeNewSave(12);
    return parsed;
  } catch {
    return makeNewSave(12);
  }
}

export function saveNow(state: SaveState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
