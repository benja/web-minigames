import { ClientHelper } from '../game-core';
import { ClientHandler } from '../client-handler';
import { DrawItSocketEvents, GameTypes, IRoundFinish } from '@wmg/shared';
import { GameLeaderboard } from '../game-leaderboard';

interface IRound {
  startRound: () => void;
  onRoundFinish: () => void;
  findNextDrawer: () => string | null;
  getCurrentDrawer: () => string | null;
  generateCurrentWord: () => string;
  guessWord: (player: string, word: string) => void;
}
export class Round extends ClientHandler<GameTypes.DRAWING> implements IRound {
  // 10 seconds per round
  public static readonly DEFAULT_ROUND_LENGTH = 10;
  public static readonly DEFAULT_ROUND_SCORE = 500;

  private readonly previousDrawers: string[] = [];
  private readonly globalGameLeaderboard: GameLeaderboard;
  private readonly roundLeaderboard: GameLeaderboard;

  private currentDrawer: string | null = null;
  private currentWord: string | null = null;
  private correctGuessors: string[] = [];

  private roundCountdown: number = Round.DEFAULT_ROUND_LENGTH;

  constructor(clientManager: ClientHelper, players: string[], gameLeaderboard: GameLeaderboard) {
    super(GameTypes.DRAWING, players, clientManager);
    this.globalGameLeaderboard = gameLeaderboard;
    this.roundLeaderboard = new GameLeaderboard(players);
  }

  startRound(): void {
    const nextDrawer = this.findNextDrawer();
    if (!nextDrawer) {
      throw new Error('First selected player as part of the game was null.');
    }

    this.roundCountdown = Round.DEFAULT_ROUND_LENGTH;
    (function timer(round: Round) {
      if (--round.roundCountdown < 0) {
        // Emit round end with the correct word etc.
        round.onRoundFinish();
        return;
      }
      setTimeout(() => timer(round), 1000);
    })(this);

    this.emitToAll(DrawItSocketEvents.GAME_ROUND_START, nextDrawer);
  }

  onRoundFinish(): void {
    this.globalGameLeaderboard.add(this.roundLeaderboard);
    this.emitToAll(DrawItSocketEvents.GAME_ROUND_END, {
      correctWord: this.currentWord,
      roundScores: this.roundLeaderboard.getLeaderboardScores(),
      totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
    } as IRoundFinish);
  }

  findNextDrawer(): string | null {
    let nextDrawer: string | null = null;
    for (const drawer of this.players) {
      if (this.previousDrawers.includes(drawer)) {
        continue;
      }
      nextDrawer = drawer;
      break;
    }
    if (!nextDrawer) {
      return null;
    }
    this.currentDrawer = nextDrawer;
    this.previousDrawers.push(nextDrawer);
    this.generateCurrentWord();
    return nextDrawer;
  }

  generateCurrentWord(): string {
    this.currentWord = 'elephant';
    return this.currentWord;
  }

  getCurrentDrawer(): string | null {
    return this.currentDrawer;
  }

  private calculateScore(): number {
    return (
      ((Round.DEFAULT_ROUND_LENGTH - this.roundCountdown) / Math.abs(Round.DEFAULT_ROUND_LENGTH)) *
      Round.DEFAULT_ROUND_SCORE
    );
  }

  /**
   * If the player has correctly guessed the word before, send it only to the
   * people that have correctly guessed so far.
   *
   * Check if the word is the same as the given, if so add them as a correctly
   * guessed player and send them a notification.
   *
   * Send all players the message
   *
   * @param player Player that has send the message
   * @param message Message they have sent
   */
  guessWord(player: string, message: string): void {
    if (!this.players.includes(player)) {
      throw new Error('Cannot guess word for player that does not exist.');
    }
    if (this.correctGuessors.includes(player)) {
      return this.emitToSelection(this.correctGuessors, DrawItSocketEvents.GAME_SEND_MESSAGE, message);
    }
    if (message === this.currentWord) {
      this.correctGuessors.push(player);
      this.roundLeaderboard.incrementScore(player, this.calculateScore());
      return this.emit(player, DrawItSocketEvents.GAME_CORRECT_GUESS);
    }
    return this.emitToAll(DrawItSocketEvents.GAME_SEND_MESSAGE, message);
  }
}
