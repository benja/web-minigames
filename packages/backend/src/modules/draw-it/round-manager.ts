import { GameLeaderboard } from '../game-leaderboard';
import { Round } from './round';
import GameAPI from '../game-api';
import { ClientManager } from '../client-manager';

interface IRoundManager {
  startRound: () => void;
  onGameEnd: () => void;
}
export class RoundManager implements IRoundManager {
  // 5 round per game
  public static readonly DEFAULT_NUMBER_OF_ROUNDS = 3;

  // Game identifier
  private readonly gameId: string;

  private readonly clientManager: ClientManager;
  private readonly globalGameLeaderboard: GameLeaderboard;

  private readonly numRounds: number;

  private rounds: Round[] = [];

  constructor(gameId: string, clientManager: ClientManager, gameLeaderboard: GameLeaderboard, numRounds?: number) {
    this.gameId = gameId;
    this.globalGameLeaderboard = gameLeaderboard;
    this.clientManager = clientManager;
    this.numRounds = numRounds || RoundManager.DEFAULT_NUMBER_OF_ROUNDS;
  }

  // Handle the starting of the round
  startRound(): void {
    const currentRound = this.getCurrentRound();
    if (currentRound && !currentRound.isFinished()) {
      return;
    }

    if (this.isFinished()) {
      return this.onGameEnd();
    }

    this.rounds.push(new Round(this.clientManager, this.globalGameLeaderboard, this));
  }

  // Handling the end of the round
  triggerRoundEnd(): void {
    // Check if there are still people in the game
    if (!this.clientManager.getSockets().length || this.isFinished()) {
      return this.onGameEnd();
    }

    // Start the new round after 2.5 seconds
    setTimeout(() => this.startRound(), 2500);
  }

  getCurrentRound(): Round | null {
    if (this.rounds.length === 0) {
      return null;
    }
    return this.rounds[this.rounds.length - 1];
  }

  // Reusable trigger for game ending
  onGameEnd(): void {
    return GameAPI.handleGameEnd(this.gameId, this.clientManager.getSocketIds(), {
      totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
    });
  }

  isFinished() {
    return this.rounds.length === this.numRounds;
  }

  getRoundCount(): number {
    return this.rounds.length;
  }

  getNumberOfRounds(): number {
    return this.numRounds;
  }
}
