import { GameManager } from '../game-manager';
import { Tools } from '../hand';

export function BrushRenderer(ctx: CanvasRenderingContext2D, e: MouseEvent) {
  const GM = GameManager.getGameManager();

  ctx.beginPath(); // begin

  ctx.lineWidth = GM.hand.brushRadius;
  ctx.lineCap = 'round';
  ctx.strokeStyle = GM.hand.activeTool === Tools.RUBBER ? 'white' : GM.hand.color;

  ctx.moveTo(GM.mousePos.x, GM.mousePos.y); // from

  GM.mousePos = { x: e.clientX, y: e.clientY };
  ctx.lineTo(GM.mousePos.x, GM.mousePos.y); // to

  ctx.stroke(); // draw it!
}
