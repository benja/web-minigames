import { DrawItSocketEvents, MessageType } from '@wmg/shared';
import { GameLeaderboard } from '../game-leaderboard';
import GameAPI from '../game-api';
import { Socket } from 'socket.io';
import { ClientManager } from '../client-manager';
import { getClientById } from '../../client-manager';
import words from './words';
import WordUtil from './utils/word-util';

interface IRound {
  findNextDrawer: () => string | null;
  getCurrentDrawer: () => string | null;
  generateWordSelection: () => string[];
  selectWord: (word: string) => void;
  guessWord: (socket: Socket, word: string) => void;
  revealLetter: (letter: number) => void;
  isFinished: () => boolean;
  isFirstTurn: () => boolean;
  resetRound: () => void;
}
export class Round implements IRound {
  // 60 seconds per round
  public static readonly DEFAULT_ROUND_LENGTH = 60;

  // When to reveal the letters
  public static readonly ROUND_LETTER_REVEAL_ROUNDS = [45, 30, 15];

  // Max score potential
  public static readonly DEFAULT_ROUND_SCORE = 500;

  // Time to pick word
  public static readonly WORD_PICK_TIME = 10;

  private readonly previousDrawers: string[] = [];
  private readonly globalGameLeaderboard: GameLeaderboard;
  private readonly roundLeaderboard: GameLeaderboard;
  private readonly clientManager: ClientManager;

  private currentDrawer: string | null = null;
  private currentWord: string | null = null;
  private correctGuessors: string[] = [];

  // Cleared every turn. Words user can pick from.
  private wordSelection: string[] = [];

  // Array of letter indexes of the string word
  private revealedLetters: number[] = [];

  private roundCountdown: number = Round.DEFAULT_ROUND_LENGTH;

  constructor(clientManager: ClientManager, gameLeaderboard: GameLeaderboard) {
    this.clientManager = clientManager;
    this.globalGameLeaderboard = gameLeaderboard;
    this.roundLeaderboard = new GameLeaderboard(clientManager.getSocketIds());
  }

  /*
  Find the next drawer given the state of the game
   */
  findNextDrawer(): string | null {
    console.log(this.clientManager.getPlayers(), this.previousDrawers);

    let nextDrawer: string | null = null;
    for (const drawer of this.clientManager.getSocketIds()) {
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
    this.wordSelection = [];
    this.previousDrawers.push(nextDrawer);
    return nextDrawer;
  }

  generateWordSelection(): string[] {
    const selection = WordUtil.pickCollection(words);
    this.wordSelection = selection;
    return selection;
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
   * @param socket Player that has send the message
   * @param message Message they have sent
   */
  guessWord(socket: Socket, message: string): void {
    if (!this.clientManager.getSocketIds().find(p => p === socket.id)) {
      throw new Error('Cannot guess word for player that does not exist.');
    }
    const client = getClientById(socket.id);
    if (this.correctGuessors.includes(socket.id)) {
      return GameAPI.emitToCollection(this.correctGuessors, DrawItSocketEvents.GAME_SEND_MESSAGE, {
        id: socket.id,
        type: MessageType.MESSAGE,
        username: client.username,
        message,
      });
    }
    if (message === this.currentWord) {
      this.correctGuessors.push(socket.id);
      this.roundLeaderboard.incrementScore(socket.id, this.calculateScore());
      return GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_CORRECT_GUESS, socket.id);
    }

    return GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_SEND_MESSAGE, {
      id: socket.id,
      type: MessageType.MESSAGE,
      username: client.username,
      message,
    });
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
      this.clientManager.getSockets().filter(p => p.id !== this.currentDrawer),
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

  isFinished(): boolean {
    return this.previousDrawers.length === this.clientManager.getSockets().length;
  }

  isFirstTurn(): boolean {
    return this.previousDrawers.length <= 1 || this.currentDrawer === null;
  }

  selectWord(word: string): string {
    if (!this.wordSelection.includes(word)) {
      throw new Error('Word was not one of the options.');
    }
    this.currentWord = word;
    return word;
  }

  getWordOptions(): string[] {
    return this.wordSelection;
  }

  resetRound(): void {
    this.currentWord = null;
    this.currentDrawer = null;
    this.wordSelection = [];
    this.revealedLetters = [];
  }
}
