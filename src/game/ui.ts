import type { SaveState } from "./types";
import { qty } from "./state";

export function bindUI(opts: {
  getState: () => SaveState;
  onPlantTurnip: () => void;
  onPlantCarrot: () => void;
  onPlantPotato: () => void;
  onHarvest: () => void;
}) {
  const inv = document.getElementById("inventory")!;
  const selected = document.getElementById("selected")!;

  (document.getElementById("plant-turnip") as HTMLButtonElement).onclick = opts.onPlantTurnip;
  (document.getElementById("plant-carrot") as HTMLButtonElement).onclick = opts.onPlantCarrot;
  (document.getElementById("plant-potato") as HTMLButtonElement).onclick = opts.onPlantPotato;
  (document.getElementById("harvest") as HTMLButtonElement).onclick = opts.onHarvest;

  return function renderHUD() {
    const s = opts.getState();
    selected.textContent = `Selected: ${s.selectedPlot}`;
    inv.textContent =
      `Seeds: Turnip ${qty(s, "turnip_seed")} | Carrot ${qty(s, "carrot_seed")} | Potato ${qty(s, "potato_seed")}\n` +
      `Harvest: Turnip ${qty(s, "turnip")} | Carrot ${qty(s, "carrot")} | Potato ${qty(s, "potato")}`;
  };
}
