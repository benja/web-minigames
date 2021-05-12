import { Tools } from '../constants';
import { GameManager } from '../game-manager';

export function BrushRenderer(ctx: CanvasRenderingContext2D, e: MouseEvent) {
  const GM = GameManager.getGameManager();

  ctx.beginPath(); // begin

  ctx.lineWidth = GM.state.hand.brushRadius;
  ctx.lineCap = 'round';
  ctx.strokeStyle = GM.state.hand.activeTool === Tools.RUBBER ? 'white' : GM.state.hand.color;

  ctx.moveTo(GM.mousePos.x, GM.mousePos.y); // from

  // Send of data in between previous and new mousePos
  GM.state.gameSocket.gameInteraction({
    hand: GM.state.hand,
    position: {
      from: {
        x: GM.mousePos.x,
        y: GM.mousePos.y,
      },
      to: {
        x: e.clientX,
        y: e.clientY,
      },
    },
  });

  GM.mousePos = { x: e.clientX, y: e.clientY };
  ctx.lineTo(GM.mousePos.x, GM.mousePos.y); // to

  ctx.stroke(); // draw it!
}
