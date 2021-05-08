import { ClientHelper } from '../game-core';
import { ClientHandler } from '../client-handler';
import { DrawItSocketEvents, GameTypes, IRoundFinish } from '@wmg/shared';
import { GameLeaderboard } from '../game-leaderboard';
import GameAPI from '../game-api';

interface IRound {
  startRound: () => void;
  onRoundFinish: () => void;
  findNextDrawer: () => string | null;
  getCurrentDrawer: () => string | null;
  generateCurrentWord: () => string;
  guessWord: (player: string, word: string) => void;
  revealLetter: (letter: number) => void;
}
export class Round extends ClientHandler<GameTypes.DRAWING> implements IRound {
  // 10 seconds per round
  public static readonly DEFAULT_ROUND_LENGTH = 30;
  public static readonly ROUND_LETTER_REVEAL_ROUNDS = [15, 10, 5];

  public static readonly DEFAULT_ROUND_SCORE = 500;

  private readonly previousDrawers: string[] = [];
  private readonly globalGameLeaderboard: GameLeaderboard;
  private readonly roundLeaderboard: GameLeaderboard;

  private currentDrawer: string | null = null;
  private currentWord: string | null = null;
  private correctGuessors: string[] = [];

  // Array of letter indexes of the string word
  private revealedLetters: number[] = [];

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
    const word = this.generateCurrentWord();
    (function timer(round: Round, word: string) {
      if (--round.roundCountdown < 0) {
        // Emit the end of round
        return round.onRoundFinish();
      }

      if (Round.ROUND_LETTER_REVEAL_ROUNDS.includes(round.roundCountdown)) {
        const split = word.split('');
        let letter: number | null = null;
        let iterations: number = 0;
        while (letter === null && iterations < split.length) {
          const access = Math.floor(Math.random() * split.length);
          if (!round.revealedLetters.includes(access)) {
            letter = access;
          }
          iterations++;
        }
        if (!letter) {
          return round.onRoundFinish();
        }
        round.revealLetter(letter);
      }

      setTimeout(() => timer(round, word), 1000);
    })(this, word);

    GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_ROUND_START, {
      drawer: nextDrawer,
      word: new Array(word.length).fill('_').join(''),
    });
  }

  onRoundFinish(): void {
    this.globalGameLeaderboard.add(this.roundLeaderboard);

    // TODO: Switch to Pub/Sub in the future to notify all clients that the game has finished.

    GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_ROUND_END, {
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
      return GameAPI.emitToCollection(this.correctGuessors, DrawItSocketEvents.GAME_SEND_MESSAGE, message);
    }
    if (message === this.currentWord) {
      this.correctGuessors.push(player);
      this.roundLeaderboard.incrementScore(player, this.calculateScore());
      return GameAPI.emit(player, DrawItSocketEvents.GAME_CORRECT_GUESS);
    }
    return GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_SEND_MESSAGE, message);
  }

  revealLetter(letterIndex: number): void {
    if (!this.currentWord) {
      throw new Error('The current word has not been set yet');
    }
    this.revealedLetters.push(letterIndex);
    const secret = Round.getSecretWord(this.currentWord, this.revealedLetters);
    GameAPI.emitToCollection(this.players, DrawItSocketEvents.GAME_LETTER_REVEAL, secret);
  }

  static getSecretWord(word: string, revealed: number[]): string {
    let blanks = new Array(word.length).fill('_');
    revealed.forEach(letter => (blanks[letter] = word[letter]));
    return blanks.join();
  }
}
