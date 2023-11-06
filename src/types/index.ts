export interface Coordinate {
  x: number;
  y: number;
}

export interface LightningOption {
  ctx: CanvasRenderingContext2D;
  coordinate: Coordinate;
}

export interface ZappOption {
  canvas: HTMLCanvasElement;
}

export interface Scale {
  start: number;
  stop: number;
}
