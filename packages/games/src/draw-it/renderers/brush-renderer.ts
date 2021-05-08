import { Tools } from '../constants';
import { GameManager } from '../game-manager';

export function BrushRenderer(ctx: CanvasRenderingContext2D, e: MouseEvent) {
  const GM = GameManager.getGameManager();

  ctx.beginPath(); // begin

  ctx.lineWidth = GM.state.brushRadius;
  ctx.lineCap = 'round';
  ctx.strokeStyle = GM.state.activeTool === Tools.RUBBER ? 'white' : GM.state.color;

  ctx.moveTo(GM.mousePos.x, GM.mousePos.y); // from

  GM.mousePos = { x: e.clientX, y: e.clientY };
  ctx.lineTo(GM.mousePos.x, GM.mousePos.y); // to

  ctx.stroke(); // draw it!
}
