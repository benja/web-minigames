import { GameManager } from './game-manager';

export function renderGame(gameManager: GameManager) {
  const ctx = gameManager.getCanvasContext();

  if (!ctx) return;
}
