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

    // Emit the word to the drawer
    GameAPI.emit(nextDrawer, DrawItSocketEvents.GAME_LETTER_REVEAL, word);

    // Start the round timer
    (function timer(manager: RoundManager, word: string) {
      if (--manager.roundCountdown < 0) {
        // Emit the end of round
        return manager.onRoundFinish();
      }

      manager.currentRound.triggerLetterReveal(manager.roundCountdown);

      setTimeout(() => timer(manager, word), 1000);
    })(this, word);

    GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_ROUND_START, {
      drawer: nextDrawer,
      word: new Array(word.length).fill('_').join(''),
    });
  }

  // Handling the end of the round
  onRoundFinish(): void {
    this.globalGameLeaderboard.add(this.currentRound.getRoundLeaderboard());

    GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_ROUND_END, {
      correctWord: this.currentRound.getCurrentWord(),
      roundScores: this.currentRound.getRoundLeaderboard().getLeaderboardScores(),
      totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
    } as IRoundFinish);

    if (this.currentRoundIndex === this.numRounds) {
      return GameAPI.handleGameEnd(this.players, {
        totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
      });
    }

    this.currentRound = new Round(this.players, this.globalGameLeaderboard);
  }

  public getCurrentRound(): Round {
    return this.currentRound;
  }
}
