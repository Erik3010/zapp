import { ZappOption } from "../types";
import Lightning from "./Lightning";

class Zapp {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lightnings: Lightning[] = [];
  lightningCount: number;

  constructor({ canvas }: ZappOption) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;

    this.lightnings = [];
    // this.lightningCount = 1;
    this.lightningCount = 30;

    this.registerEventListener();
    this.render();
  }
  registerEventListener() {
    this.canvas.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(event: MouseEvent) {
    const { offsetX: x, offsetY: y } = event;

    for (let i = 0; i < this.lightningCount; i++) {
      const lightning = new Lightning({ ctx: this.ctx, coordinate: { x, y } });
      this.lightnings.push(lightning);
    }
  }
  draw() {
    this.drawBackground();
    this.drawLightning();
  }
  drawLightning() {
    for (const [index, lightning] of this.lightnings.entries()) {
      lightning.draw();

      // if (lightning.isDead) {
      //   this.lightnings.splice(index, 1);
      // }
    }
  }
  drawBackground() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.closePath();
  }
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.draw();

    requestAnimationFrame(this.render.bind(this));
  }
}

export default Zapp;
