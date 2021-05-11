import { DrawItSocketEvents } from '@wmg/shared';
import { GameLeaderboard } from '../game-leaderboard';
import GameAPI from '../game-api';
import { Socket } from 'socket.io';

interface IRound {
  findNextDrawer: () => string | null;
  getCurrentDrawer: () => string | null;
  generateCurrentWord: () => string;
  guessWord: (player: string, word: string) => void;
  revealLetter: (letter: number) => void;
}
export class Round implements IRound {
  // 10 seconds per round
  public static readonly DEFAULT_ROUND_LENGTH = 30;
  public static readonly ROUND_LETTER_REVEAL_ROUNDS = [15, 10, 5];

  public static readonly DEFAULT_ROUND_SCORE = 500;

  private readonly previousDrawers: string[] = [];
  private readonly globalGameLeaderboard: GameLeaderboard;
  private readonly roundLeaderboard: GameLeaderboard;
  private readonly players: Socket[];

  private currentDrawer: string | null = null;
  private currentWord: string | null = null;
  private correctGuessors: string[] = [];

  // Array of letter indexes of the string word
  private revealedLetters: number[] = [];

  private roundCountdown: number = Round.DEFAULT_ROUND_LENGTH;

  constructor(players: Socket[], gameLeaderboard: GameLeaderboard) {
    this.players = players;
    this.globalGameLeaderboard = gameLeaderboard;
    this.roundLeaderboard = new GameLeaderboard(players.map(s => s.id));
  }

  /*
  Find the next drawer given the state of the game
   */
  findNextDrawer(): string | null {
    let nextDrawer: string | null = null;
    for (const drawer of this.players) {
      if (this.previousDrawers.includes(drawer.id)) {
        continue;
      }
      nextDrawer = drawer.id;
      break;
    }
    if (!nextDrawer) {
      return null;
    }
    this.currentDrawer = nextDrawer;
    this.previousDrawers.push(nextDrawer);
    return nextDrawer;
  }

  // TODO: Word generation
  generateCurrentWord(): string {
    this.currentWord = 'elephant';
    return this.currentWord;
  }

  getCurrentDrawer(): string | null {
    return this.currentDrawer;
  }

  /*
  Calculate the score based on how long the game has gone on for
   */
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
    if (!!this.players.find(p => p.id === player)) {
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
    return GameAPI.emitToSockets(this.players, DrawItSocketEvents.GAME_SEND_MESSAGE, message);
  }

  /**
   * @returns boolean Returns true if letter is revealed
   * @param countdownTime Current round timer
   */
  triggerLetterReveal(countdownTime: number): boolean {
    if (!this.currentWord) {
      throw new Error('Current word is not set.');
    }
    if (Round.ROUND_LETTER_REVEAL_ROUNDS.includes(countdownTime)) {
      if (this.revealedLetters.length + 1 === this.currentWord.length) {
        return false;
      }
      const split = this.currentWord!.split('');
      let letter: number | null = null;
      let iterations: number = 0;
      while (letter === null && iterations < split.length) {
        const access = Math.floor(Math.random() * split.length);
        if (!this.revealedLetters.includes(access)) {
          letter = access;
        }
        iterations++;
      }
      if (!letter) {
        return false;
      }
      this.revealLetter(letter);
      return true;
    }
    return false;
  }

  /*
  Reveal a letter to the players who are guessing
   */
  revealLetter(letterIndex: number): void {
    if (!this.currentWord) {
      throw new Error('The current word has not been set yet');
    }
    this.revealedLetters.push(letterIndex);

    // Get the secret with replaced letters
    const secret = Round.getSecretWord(this.currentWord, this.revealedLetters);

    // Emit to all but the drawer
    GameAPI.emitToSockets(
      this.players.filter(p => p.id !== this.currentDrawer),
      DrawItSocketEvents.GAME_LETTER_REVEAL,
      secret,
    );
  }

  static getSecretWord(word: string, revealed: number[]): string {
    let blanks = new Array(word.length).fill('_');
    revealed.forEach(letter => (blanks[letter] = word[letter]));
    return blanks.join();
  }

  getRoundLeaderboard(): GameLeaderboard {
    return this.roundLeaderboard;
  }

  getCurrentWord(): string {
    return this.currentWord!;
  }
}
