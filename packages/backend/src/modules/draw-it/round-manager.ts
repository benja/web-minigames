import { DrawItSocketEvents, IRoundFinish } from '@wmg/shared';
import { GameLeaderboard } from '../game-leaderboard';
import { Round } from './round';
import GameAPI from '../game-api';
import { ClientManager } from '../client-manager';

interface IRoundManager {
  startRound: () => void;
  onRoundFinish: () => void;
}
export class RoundManager implements IRoundManager {
  // 10 seconds per round
  public static readonly DEFAULT_ROUND_LENGTH = 15;

  // 1 round per game
  public static readonly DEFAULT_NUMBER_OF_ROUNDS = 5;

  private readonly clientManager: ClientManager;
  private readonly globalGameLeaderboard: GameLeaderboard;

  private roundCountdown: number = RoundManager.DEFAULT_ROUND_LENGTH;

  private readonly numRounds: number;

  private currentRound: Round;
  private currentRoundIndex: number = 1;

  constructor(clientManager: ClientManager, gameLeaderboard: GameLeaderboard, numRounds?: number) {
    this.globalGameLeaderboard = gameLeaderboard;
    this.clientManager = clientManager;
    this.currentRound = new Round(clientManager.getSockets(), gameLeaderboard);
    this.numRounds = numRounds || RoundManager.DEFAULT_NUMBER_OF_ROUNDS;
  }

  // Handle the starting of the round
  startRound(): void {
    // Find the new drawer from the state
    const nextDrawer = this.currentRound.findNextDrawer();
    if (!nextDrawer) {
      throw new Error('First selected player as part of the game was null.');
    }

    this.roundCountdown = RoundManager.DEFAULT_ROUND_LENGTH;
    const word = this.currentRound.generateCurrentWord();

    // Start the round timer
    (function timer(manager: RoundManager, word: string) {
      if (--manager.roundCountdown < 0) {
        // Emit the end of round
        return manager.onRoundFinish();
      }

      if (Round.ROUND_LETTER_REVEAL_ROUNDS.includes(manager.roundCountdown)) {
        manager.currentRound.triggerLetterReveal(manager.roundCountdown);
      }

      setTimeout(() => timer(manager, word), 1000);
    })(this, word);

    // Emit that the round has started
    GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_ROUND_START, {
      drawer: nextDrawer,
      word: new Array(word.length).fill('_').join(''),
    });

    // Emit the word to the drawer
    GameAPI.emit(nextDrawer, DrawItSocketEvents.GAME_LETTER_REVEAL, word);
  }

  // Handling the end of the round
  onRoundFinish(): void {
    if (!this.currentRound.isFinished()) {
      return this.startRound();
    }

    this.globalGameLeaderboard.add(this.currentRound.getRoundLeaderboard());

    // Emit the end of round scores
    GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_ROUND_END, {
      correctWord: this.currentRound.getCurrentWord(),
      roundScores: this.currentRound.getRoundLeaderboard().getLeaderboardScores(),
      totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
    } as IRoundFinish);

    // If it is the final round. Handle the ending of the game
    if (this.currentRoundIndex === this.numRounds) {
      return GameAPI.handleGameEnd(this.clientManager.getSocketIds(), {
        totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
      });
    }

    // Create a new current round instance
    this.currentRound = new Round(this.clientManager.getSockets(), this.globalGameLeaderboard);

    // Start the new round after 2.5 seconds
    setTimeout(() => this.startRound(), 2500);
  }

  public getCurrentRound(): Round {
    return this.currentRound;
  }
}
