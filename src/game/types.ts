export type CropId = "turnip" | "carrot" | "potato";

export type CropData = {
  id: CropId;
  displayName: string;
  growSeconds: number;
  seedItemId: string;
  harvestItemId: string;
  harvestAmount: number;
};

export type PlotState = {
  index: number;
  cropId: CropId | null;
  readyAtMs: number; // 0 if empty
};

export type SaveState = {
  version: 1;
  selectedPlot: number;
  greenhouseStage: number;
  communityPoints: number;
  plots: PlotState[];
  inventory: Record<string, number>;
};
