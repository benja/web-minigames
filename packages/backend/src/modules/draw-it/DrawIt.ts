import { ClientHelper, GameCore } from '../game-core';
import { DrawItSocketEvents, GameTypes } from '@wmg/shared';
import listeners from './listeners';
import { GameListener } from '../game-listener';
import { GameLeaderboard } from '../game-leaderboard';
import { Round } from './round';
import GameAPI from '../game-api';

interface IDrawIt {
  guessWord: (player: string, word: string) => void;
}
export class DrawIt extends GameCore<GameTypes.DRAWING> implements IDrawIt {
  private currentRound: Round;

  private readonly pointsLeaderboard: GameLeaderboard;
  private readonly numRounds: number;

  constructor(clientManager: ClientHelper, players: string[]) {
    super(GameTypes.DRAWING, players, clientManager);
    this.pointsLeaderboard = new GameLeaderboard(players);
    this.currentRound = new Round(clientManager, players, this.pointsLeaderboard);

    this.numRounds = 1;

    this.currentRound.startRound();
  }

  onPlayerLeave(socketId: string): void {
    this.players = this.players.filter(p => p !== socketId);
    return GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_PLAYER_LEAVE, socketId);
  }

  onRoundEnd() {}

  static getListeners(): GameListener[] {
    return listeners;
  }

  guessWord(player: string, word: string): void {
    return this.currentRound.guessWord(player, word);
  }
}
