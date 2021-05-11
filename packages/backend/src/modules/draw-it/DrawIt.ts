import { GameCore, IdentifiableUser } from '../game-core';
import { DrawItSocketEvents, GameTypes } from '@wmg/shared';
import listeners from './listeners';
import { GameListener } from '../game-listener';
import { GameLeaderboard } from '../game-leaderboard';
import GameAPI from '../game-api';
import { RoundManager } from './round-manager';

interface IDrawIt {
  guessWord: (player: string, word: string) => void;
}
export class DrawIt extends GameCore<GameTypes.DRAWING> implements IDrawIt {
  private readonly pointsLeaderboard: GameLeaderboard;
  private readonly roundManager: RoundManager;

  constructor(players: IdentifiableUser[]) {
    super(GameTypes.DRAWING, players);
    this.pointsLeaderboard = new GameLeaderboard(this.getClientManager().getSocketIds());
    this.roundManager = new RoundManager(this.getClientManager(), this.pointsLeaderboard);
  }

  onPlayerLeave(socketId: string): void {
    this.getClientManager().removePlayerBySocketId(socketId);
    return GameAPI.emitToSockets(this.getClientManager().getSockets(), DrawItSocketEvents.GAME_PLAYER_LEAVE, socketId);
  }

  static getListeners(): GameListener[] {
    return listeners;
  }

  guessWord(player: string, word: string): void {
    return this.roundManager.getCurrentRound().guessWord(player, word);
  }

  start(): void {
    this.roundManager.startRound();
  }
}
