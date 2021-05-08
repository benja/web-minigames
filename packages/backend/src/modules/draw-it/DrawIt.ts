import { ClientHelper, GameCore } from '../game-core';
import { DrawItSocketEvents, GameTypes } from '@wmg/shared';
import listeners from './listeners';
import { GameListener } from '../game-listener';
import { GameLeaderboard } from '../game-leaderboard';

interface IDrawIt {
  startRound: () => void;
  onRoundFinish: () => void;
}
export class DrawIt extends GameCore<GameTypes.DRAWING> implements IDrawIt {
  private static readonly DEFAULT_ROUND_LENGTH = 600;

  private currentDrawer: string | null = null;

  private pointsLeaderboard: GameLeaderboard;

  constructor(clientManager: ClientHelper, players: string[]) {
    super(GameTypes.DRAWING, players, clientManager);
    this.pointsLeaderboard = new GameLeaderboard(players);
  }

  onGameEnd(): void {
    return this.emitToAll(DrawItSocketEvents.GAME_END);
  }

  onGameStart(): void {
    return this.emitToAll(DrawItSocketEvents.GAME_START);
  }

  onPlayerLeave(socketId: string): void {
    this.players = this.players.filter(p => p !== socketId);
    return this.emitToAll(DrawItSocketEvents.GAME_PLAYER_LEAVE, socketId);
  }

  startRound(): void {}

  onRoundFinish(): void {}

  static getListeners(): GameListener[] {
    return listeners;
  }
}
