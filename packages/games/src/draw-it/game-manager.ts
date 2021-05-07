import { DRAW_IT_CANVAS_ID, DRAW_IT_CONTAINER_ID } from './constants';
import { renderGame } from './game-renderer';

let gameManagerInstance: GameManager | null = null;

export function mountGame() {
  gameManagerInstance = new GameManager();
  gameManagerInstance.start();
}

export function unMountGame() {
  gameManagerInstance?.stop();
  gameManagerInstance = null;
}

export class GameManager {
  private canvas: HTMLCanvasElement | null = null;
  private canvasWrapper: HTMLDivElement | null = null;

  constructor() {
    this.draw = this.draw.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.updateCanvasSize = this.updateCanvasSize.bind(this);
  }

  public start() {
    this.canvas = document.getElementById(DRAW_IT_CANVAS_ID) as HTMLCanvasElement;
    this.canvasWrapper = document.getElementById(DRAW_IT_CONTAINER_ID) as HTMLDivElement;

    this.canvas && this.draw();
  }

  public stop() {
    window.removeEventListener('resize', this.updateCanvasSize);
  }

  public updateCanvasSize() {
    if (!this.canvas) return;

    this.canvas.width = this.canvasWrapper.clientWidth;
    this.canvas.height = this.canvasWrapper.clientHeight;
  }

  public draw() {
    renderGame(this);
  }

  public getCanvasContext() {
    return this.canvas?.getContext('2d');
  }

  public getCanvasSize() {
    return {
      width: this.canvas?.width ?? 0,
      height: this.canvas?.height ?? 0,
    };
  }
}
