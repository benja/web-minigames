import { GameManager } from './game-manager';


export function renderGame(gameManager: GameManager) {
  const canvas = gameManager.getCanvasContext();
  const canvasSize = gameManager.getCanvasSize();

  if (!canvas) return;

  canvas.clearRect(0, 0, canvasSize.width, canvasSize.height);
}
