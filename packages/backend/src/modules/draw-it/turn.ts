import WordUtil from './utils/word-util';
import words from './words';
import { ClientManager } from '../client-manager';
import GameAPI from '../game-api';
import { DrawItSocketEvents, MessageType } from '@wmg/shared';
import { Round } from './round';

export class Turn {
  // 60 seconds per round
  public static readonly DEFAULT_TURN_LENGTH = 20;

  // When to reveal the letters
  public static readonly TURN_LETTER_REVEAL_TIMES = [45, 30, 15];

  // Time to pick word
  public static readonly WORD_PICK_TIME = 10;

  private readonly clientManager: ClientManager;
  private readonly round: Round;

  private readonly turnDrawer: string;
  private readonly wordSelection: string[];

  private revealedLetters: number[] = [];
  private turnWord: string | null = null;
  private correctGuessers: string[] = [];
  private turnCountdown: number = Turn.DEFAULT_TURN_LENGTH;

  constructor(turnDrawer: string, clientManager: ClientManager, round: Round) {
    this.turnDrawer = turnDrawer;
    this.clientManager = clientManager;
    this.round = round;
    this.wordSelection = WordUtil.pickCollection(words);

    this.startTurn();
  }

  private startTurn() {
    // Tell all players in the game who the drawer is
    GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_DRAWER_SELECTED, this.turnDrawer);

    // Ship the options to the new drawer
    GameAPI.emit(this.turnDrawer, DrawItSocketEvents.GAME_PICK_WORD, this.wordSelection);

    setTimeout(() => this.pickDefaultWord(), Turn.WORD_PICK_TIME * 1000);
  }

  private triggerTurnStart() {
    // If the turn word has not been set yet
    if (!this.turnWord) {
      return;
    }

    (function timer(turn: Turn) {
      if (turn.isFinished()) {
        return;
      }

      if (--turn.turnCountdown < 0) {
        return turn.triggerTurnEnd();
      }

      if (Turn.TURN_LETTER_REVEAL_TIMES.includes(turn.turnCountdown)) {
        turn.triggerLetterReveal(turn.turnCountdown);
      }

      setTimeout(() => timer(turn), 1000);
    })(this);

    this.clientManager.getSockets().forEach(socket => {
      if (socket.id === this.turnDrawer) {
        GameAPI.emitToSocket(socket, DrawItSocketEvents.GAME_TURN_START, {
          drawer: this.turnDrawer,
          roundLength: Round.DEFAULT_ROUND_LENGTH,
          word: this.turnWord,
        });
      } else {
        GameAPI.emitToSocket(socket, DrawItSocketEvents.GAME_TURN_START, {
          drawer: this.turnDrawer,
          roundLength: Round.DEFAULT_ROUND_LENGTH,
          word: Turn.serializeWord(this.turnWord!),
        });
      }
    });
  }

  private triggerTurnEnd() {
    // Tell players the round has ended
    GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_TURN_END, {
      correctWord: this.turnWord,
      roundScores: this.round.getRoundLeaderboard().getLeaderboardScores(),
    });

    // Trigger the parent round end
    return this.round.onTurnEnd();
  }

  private pickDefaultWord() {
    if (this.turnWord) {
      return;
    }
    this.turnWord = WordUtil.pickRandomWord(this.wordSelection);
    this.triggerTurnStart();
  }

  getTurnWord(): string | null {
    return this.turnWord;
  }

  getRevealedLetters(): string[] {
    if (!this.turnWord) {
      return [];
    }
    return this.revealedLetters.map(l => this.turnWord!.charAt(l));
  }

  getTurnDrawer(): string {
    return this.turnDrawer;
  }

  getCorrectGuessors(): string[] {
    return this.correctGuessers;
  }

  isFinished(): boolean {
    return this.correctGuessers.length === this.clientManager.getPlayers().length - 1;
  }

  private calculateScore(): number {
    return (
      (1 - (Round.DEFAULT_ROUND_LENGTH - this.turnCountdown) / Math.abs(Round.DEFAULT_ROUND_LENGTH)) *
      Round.DEFAULT_ROUND_SCORE
    );
  }

  guessWord(guesser: string, message: string): void {
    const client = this.clientManager.getPlayer(guesser);
    if (!client) {
      throw new Error('Cannot guess word for player that does not exist.');
    }
    if (this.correctGuessers.includes(guesser)) {
      return GameAPI.emitToCollection(this.correctGuessers, DrawItSocketEvents.GAME_SEND_MESSAGE, {
        id: guesser,
        type: MessageType.MESSAGE,
        username: client?.username,
        message,
      });
    }
    if (message === this.turnWord) {
      GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_CORRECT_GUESS, guesser);
      this.correctGuessers.push(guesser);
      this.round.getRoundLeaderboard().incrementScore(guesser, this.calculateScore());
      if (this.isFinished()) {
        this.triggerTurnEnd();
      }
      return;
    }

    return GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_SEND_MESSAGE, {
      id: guesser,
      type: MessageType.MESSAGE,
      username: client?.username,
      message,
    });
  }

  revealLetter(letterIndex: number): void {
    if (!this.turnWord) {
      throw new Error('The current word has not been set yet');
    }
    this.revealedLetters.push(letterIndex);

    // Get the secret with replaced letters
    const secret = Turn.getSecretWord(this.turnWord, this.revealedLetters);

    // Emit to all but the drawer
    GameAPI.emitToSockets(
      this.clientManager.getSockets().filter(p => p.id !== this.turnDrawer),
      DrawItSocketEvents.GAME_LETTER_REVEAL,
      secret,
    );
  }

  triggerLetterReveal(countdownTime: number): boolean {
    if (!this.turnWord) {
      throw new Error('Current word is not set.');
    }
    if (Turn.TURN_LETTER_REVEAL_TIMES.includes(countdownTime)) {
      if (this.revealedLetters.length + 1 === this.turnWord.length) {
        return false;
      }
      const split = this.turnWord!.split('');
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

  selectWord(selector: string, word: string): string {
    if (selector !== this.turnDrawer) {
      throw new Error('You are not the current drawer.');
    }
    if (!this.wordSelection.includes(word)) {
      throw new Error('Word was not one of the options.');
    }
    this.turnWord = word;
    this.triggerTurnStart();
    return word;
  }

  // TODO Find a better way of determining whether the round has started
  hasTurnStarted(): boolean {
    return this.turnCountdown !== Turn.DEFAULT_TURN_LENGTH;
  }

  static getSecretWord(word: string, revealed: number[]): string {
    let blanks = new Array(word.length).fill('_');
    revealed.forEach(letter => (blanks[letter] = word[letter]));
    return blanks.join();
  }

  static serializeWord(word: string): string {
    let underscored = new Array(word.length).fill('_');
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === ' ') underscored[i] = ' ';
    }
    return underscored.join('');
  }
}
