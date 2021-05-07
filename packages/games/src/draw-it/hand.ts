import { GameManager } from './game-manager';

export enum Tools {
  PAINT_BRUSH = 'paint_brush',
  BUCKET = 'bucket',
  RUBBER = 'rubber',
}

export class Hand {
  public static DEFAULT_BRUSH_RADIUS: number = 10;

  public activeTool: Tools = Tools.PAINT_BRUSH;
  public brushRadius: number = Hand.DEFAULT_BRUSH_RADIUS;
  public color: string = 'black';
}
