import "./style.css";
import Phaser from "phaser";
import { GreenhouseScene } from "./game/GreenhouseScene";
import { loadSave, saveNow } from "./game/save";
import { bindUI } from "./game/ui";
import { plant, harvest } from "./game/state";

const state = loadSave();

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#8ea88f",
  scene: [GreenhouseScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: "100%",
    height: "100%",
  },
});

game.scene.start("greenhouse", { state });

const renderHUD = bindUI({
  getState: () => state,
  onPlantTurnip: () => {
    plant(state, state.selectedPlot, "turnip");
    saveNow(state);
    renderHUD();
  },
  onPlantCarrot: () => {
    plant(state, state.selectedPlot, "carrot");
    saveNow(state);
    renderHUD();
  },
  onPlantPotato: () => {
    plant(state, state.selectedPlot, "potato");
    saveNow(state);
    renderHUD();
  },
  onHarvest: () => {
    harvest(state, state.selectedPlot);
    saveNow(state);
    renderHUD();
  },
});

renderHUD();
