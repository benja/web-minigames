import { GameLeaderboard } from '../game-leaderboard';
import { ClientManager } from '../client-manager';
import { Turn } from './turn';
import GameAPI from '../game-api';
import { DrawItSocketEvents, IRoundFinish } from '@wmg/shared';
import { RoundManager } from './round-manager';

interface IRound {
  findNextDrawer: () => string | null;
  isFinished: () => boolean;
  isFirstTurn: () => boolean;
}
export class Round implements IRound {
  private readonly globalGameLeaderboard: GameLeaderboard;
  private readonly roundLeaderboard: GameLeaderboard;
  private readonly clientManager: ClientManager;
  private readonly roundManager: RoundManager;

  private turns: Turn[] = [];

  constructor(clientManager: ClientManager, gameLeaderboard: GameLeaderboard, roundManager: RoundManager) {
    this.clientManager = clientManager;
    this.roundManager = roundManager;
    this.globalGameLeaderboard = gameLeaderboard;
    this.roundLeaderboard = new GameLeaderboard(clientManager.getSocketIds());

    this.startRound();
  }

  private startRound() {
    if (this.isFirstTurn()) {
      GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_ROUND_START);
    }

    this.startNewTurn();
  }

  private endRound() {
    // Get last turn

    // Add the round leaderboard to global leaderboard
    this.globalGameLeaderboard.add(this.roundLeaderboard);

    // Emit the end of round scores
    GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_ROUND_END, {
      roundScores: this.roundLeaderboard.getLeaderboardScores(),
      totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
    } as IRoundFinish);

    this.roundManager.triggerRoundEnd();
  }

  startNewTurn(): void {
    const nextDrawer = this.findNextDrawer();
    if (!nextDrawer) {
      return this.endRound();
    }
    this.turns.push(new Turn(nextDrawer, this.clientManager, this));
  }

  onTurnEnd(): void {
    if (this.isFinished()) {
      return this.endRound();
    }

    return this.startNewTurn();
  }

  getCurrentTurn(): Turn | null {
    if (this.turns.length === 0) {
      return null;
    }
    return this.turns[this.turns.length - 1];
  }

  /*
  Find the next drawer given the state of the game
   */
  findNextDrawer(): string | null {
    let nextDrawer: string | null = null;
    for (const drawer of this.clientManager.getSocketIds()) {
      if (this.getPreviousDrawers().includes(drawer)) {
        continue;
      }
      nextDrawer = drawer;
      break;
    }
    return nextDrawer;
  }

  getRoundLeaderboard(): GameLeaderboard {
    return this.roundLeaderboard;
  }

  isFinished(): boolean {
    return this.turns.length === this.clientManager.getSockets().length;
  }

  isFirstTurn(): boolean {
    return this.turns.length === 0;
  }

  getPreviousDrawers(): string[] {
    return this.turns.map(turn => turn.getTurnDrawer());
  }
}
