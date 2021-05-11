import { DrawItSocketEvents, IRoundFinish } from '@wmg/shared';
import { GameLeaderboard } from '../game-leaderboard';
import { Round } from './round';
import GameAPI from '../game-api';

interface IRoundManager {
  startRound: () => void;
  onRoundFinish: () => void;
}
export class RoundManager implements IRoundManager {
  // 10 seconds per round
  public static readonly DEFAULT_ROUND_LENGTH = 30;

  // 1 round per game
  public static readonly DEFAULT_NUMBER_OF_ROUNDS = 1;

  private readonly players: string[];
  private readonly globalGameLeaderboard: GameLeaderboard;

  private roundCountdown: number = RoundManager.DEFAULT_ROUND_LENGTH;

  private readonly numRounds: number;

  private currentRound: Round;
  private currentRoundIndex: number = 1;

  constructor(players: string[], gameLeaderboard: GameLeaderboard, numRounds?: number) {
    this.globalGameLeaderboard = gameLeaderboard;
    this.players = players;
    this.currentRound = new Round(players, gameLeaderboard);
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

      manager.currentRound.triggerLetterReveal(manager.roundCountdown);

      setTimeout(() => timer(manager, word), 1000);
    })(this, word);

    // Emit that the round has started
    GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_ROUND_START, {
      drawer: nextDrawer,
      word: new Array(word.length).fill('_').join(''),
    });

    // Emit the word to the drawer
    GameAPI.emit(nextDrawer, DrawItSocketEvents.GAME_LETTER_REVEAL, word);
  }

  // Handling the end of the round
  onRoundFinish(): void {
    this.globalGameLeaderboard.add(this.currentRound.getRoundLeaderboard());

    // Emit the end of round scores
    GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_ROUND_END, {
      correctWord: this.currentRound.getCurrentWord(),
      roundScores: this.currentRound.getRoundLeaderboard().getLeaderboardScores(),
      totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
    } as IRoundFinish);

    // If it is the final round. Handle the ending of the game
    if (this.currentRoundIndex === this.numRounds) {
      return GameAPI.handleGameEnd(this.players, {
        totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
      });
    }

    // Create a new current round instance
    this.currentRound = new Round(this.players, this.globalGameLeaderboard);

    // Start the new round after 2.5 seconds
    setTimeout(() => this.startRound(), 2500);
  }

  public getCurrentRound(): Round {
    return this.currentRound;
  }
}
