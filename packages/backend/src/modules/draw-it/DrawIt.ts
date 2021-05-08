import { GameCore } from '../game-core';
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

  constructor(players: string[]) {
    super(GameTypes.DRAWING, players);
    this.pointsLeaderboard = new GameLeaderboard(players);
    this.roundManager = new RoundManager(players, this.pointsLeaderboard);
  }

  onPlayerLeave(socketId: string): void {
    this.players = this.players.filter(p => p !== socketId);
    return GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_PLAYER_LEAVE, socketId);
  }

  static getListeners(): GameListener[] {
    return listeners;
  }

  guessWord(player: string, word: string): void {
    return this.roundManager.getCurrentRound().guessWord(player, word);
  }
}
