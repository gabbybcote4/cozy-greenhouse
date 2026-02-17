import Phaser from "phaser";
import type { SaveState } from "./types";

export class GreenhouseScene extends Phaser.Scene {
  private state!: SaveState;
  private tiles: Phaser.GameObjects.Rectangle[] = [];
  private labels: Phaser.GameObjects.Text[] = [];

  constructor() {
    super("greenhouse");
  }

  init(data: { state: SaveState }) {
    this.state = data.state;
  }

  create() {
    this.cameras.main.setBackgroundColor(0x8ea88f);

    const cols = 4;
    const rows = Math.ceil(this.state.plots.length / cols);

    const w = this.scale.width;
    const h = this.scale.height;

    const padding = 12;
    const gap = 12;

    const tileW = Math.floor((w - padding * 2 - gap * (cols - 1)) / cols);
    const tileH = tileW;

    const gridH = rows * tileH + (rows - 1) * gap;
    const startX = padding;
    const startY = Math.max(padding, Math.floor((h - gridH) / 2));

    for (let i = 0; i < this.state.plots.length; i++) {
      const r = Math.floor(i / cols);
      const c = i % cols;

      const x = startX + c * (tileW + gap) + tileW / 2;
      const y = startY + r * (tileH + gap) + tileH / 2;

      const rect = this.add.rectangle(x, y, tileW, tileH, 0x6f7b6f).setStrokeStyle(3, 0x2a2f2a);
      rect.setInteractive({ useHandCursor: true });
      rect.on("pointerdown", () => {
        this.state.selectedPlot = i;
      });

      const label = this.add.text(x, y, "", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "14px",
        color: "#1b1f1b",
        align: "center",
      }).setOrigin(0.5);

      this.tiles.push(rect);
      this.labels.push(label);
    }
  }

  update() {
    const now = Date.now();

    for (let i = 0; i < this.state.plots.length; i++) {
      const plot = this.state.plots[i];
      const selected = i === this.state.selectedPlot;

      let fill = 0x6f7b6f; // empty
      let text = `Plot ${i}`;

      if (plot.cropId) {
        const remaining = Math.max(0, Math.ceil((plot.readyAtMs - now) / 1000));
        const ready = remaining === 0;
        fill = ready ? 0x4aa06a : 0x6aa16a;
        text = ready ? `${plot.cropId}\nREADY` : `${plot.cropId}\n${remaining}s`;
      } else {
        text = `(Empty)`;
      }

      if (selected) text += `\n[Selected]`;

      this.tiles[i].setFillStyle(fill);
      this.labels[i].setText(text);
    }
  }
}
