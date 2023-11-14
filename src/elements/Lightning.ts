import { Coordinate, LightningOption } from "../types";
import { map, random, clamp } from "../utility";

class Lightning {
  ctx: CanvasRenderingContext2D;
  positions: Coordinate[] = [];
  direction: number = this.getRandomDirection();
  step = 15;
  lineLength = 50;
  maxLife = random(80, 150);
  life = this.maxLife;
  alpha = 1000;
  maxStrokeWidth = random(1, 2);
  strokeWidth = this.maxStrokeWidth;
  // step: number = random(5, 40);

  constructor({ ctx, coordinate }: LightningOption) {
    this.ctx = ctx;
    this.positions.push(coordinate);

  }
  getRandomDirection() {
    return random(0, 3) * ((2 * Math.PI) / 4);
  }
  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.globalAlpha = this.alpha;

    for (const [index, position] of this.positions.entries()) {
      if (index === 0) this.ctx.moveTo(position.x, position.y);
      else this.ctx.lineTo(position.x, position.y);
    }

    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    this.update();
  }
  get latestPosition() {
    return this.positions[this.positions.length - 1];
  }
  get isDead() {
    return this.life < 0;
  }
  update() {
    this.life--;

    const alpha = map(
      this.life,
      { start: 0, stop: this.maxLife },
      { start: 0, stop: 1 }
    );
    this.alpha = clamp(alpha, 0, this.maxLife);

    const strokeWidth = map(
      this.life,
      {start: 0, stop: this.maxLife},
      {start: 0, stop: this.maxStrokeWidth}
    )
    this.strokeWidth = clamp(strokeWidth, 0, this.maxStrokeWidth)

    const { x, y } = this.latestPosition;
    const newPosition = {
      x: x + this.step * Math.cos(this.direction),
      y: y + this.step * Math.sin(this.direction),
    };

    if (Math.random() < 0.5) {
      this.direction = this.getRandomDirection();
    }

    this.positions.push(newPosition);

    if (this.positions.length > this.lineLength) {
      this.positions.splice(0, 1);
    }
  }
}

export default Lightning;
