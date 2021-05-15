import { DrawItSocketEvents, IRoundFinish } from '@wmg/shared';
import { GameLeaderboard } from '../game-leaderboard';
import { Round } from './round';
import GameAPI from '../game-api';
import { ClientManager } from '../client-manager';
import WordUtil from './utils/word-util';
import { Socket } from 'socket.io';

interface IRoundManager {
  startRound: () => void;
  triggerRoundStart: () => void;
  onRoundFinish: () => void;
  hasRoundStarted: () => boolean;
  onGameEnd: () => void;
  guessWord: (socket: Socket, word: string) => void;
}
export class RoundManager implements IRoundManager {
  // 5 round per game
  public static readonly DEFAULT_NUMBER_OF_ROUNDS = 5;

  // Game identifier
  private readonly gameId: string;

  private readonly clientManager: ClientManager;
  private readonly globalGameLeaderboard: GameLeaderboard;

  private roundCountdown: number = Round.DEFAULT_ROUND_LENGTH;

  private readonly numRounds: number;

  private currentRound: Round;
  private currentRoundIndex: number = 1;

  constructor(gameId: string, clientManager: ClientManager, gameLeaderboard: GameLeaderboard, numRounds?: number) {
    this.gameId = gameId;
    this.globalGameLeaderboard = gameLeaderboard;
    this.clientManager = clientManager;
    this.currentRound = new Round(clientManager, gameLeaderboard);
    this.numRounds = numRounds || RoundManager.DEFAULT_NUMBER_OF_ROUNDS;
  }

  // Handle the starting of the round
  startRound(): void {
    // If its the first turn, tell players round has started
    if (this.currentRound.isFirstTurn()) {
      GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_ROUND_START);
    }

    // Find the new drawer from the state
    const nextDrawer = this.currentRound.findNextDrawer();
    if (!nextDrawer) {
      throw new Error('First selected player as part of the game was null.');
    }

    this.roundCountdown = Round.DEFAULT_ROUND_LENGTH;

    // Tell all players in the game who the drawer is
    GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_DRAWER_SELECTED, nextDrawer);

    // Generate the word options
    const wordOptions = this.currentRound.generateWordSelection();

    // Ship the options to the new drawer
    GameAPI.emit(nextDrawer, DrawItSocketEvents.GAME_PICK_WORD, wordOptions);

    setTimeout(() => this.triggerRoundStart(), Round.WORD_PICK_TIME * 1000);
  }

  // Trigger a round start
  triggerRoundStart(): void {
    // If the round has started already then return
    // This can be triggered when the user doesnt pick the word
    if (this.hasRoundStarted()) {
      return;
    }
    let word = this.currentRound.getCurrentWord();
    if (!word) {
      word = this.currentRound.selectWord(WordUtil.pickRandomWord(this.currentRound.getWordOptions()));
    }
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
    // Emit this message to the people that arent the current drawer
    this.clientManager.getSockets().forEach(socket => {
      if (socket.id === this.currentRound.getCurrentDrawer()) {
        GameAPI.emitToSocket(socket, DrawItSocketEvents.GAME_TURN_START, {
          drawer: this.currentRound.getCurrentDrawer(),
          roundLength: Round.DEFAULT_ROUND_LENGTH,
          word: word,
        });
      } else {
        GameAPI.emitToSocket(socket, DrawItSocketEvents.GAME_TURN_START, {
          drawer: this.currentRound.getCurrentDrawer(),
          roundLength: Round.DEFAULT_ROUND_LENGTH,
          word: RoundManager.serializeWord(word),
        });
      }
    });
  }

  // Handling the end of the round
  onRoundFinish(): void {
    // Check if there are still people in the game
    if (!this.clientManager.getSockets().length) {
      return this.onGameEnd();
    }

    // Tell players the round has ended
    GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_TURN_END, {
      correctWord: this.currentRound.getCurrentWord(),
      roundScores: this.currentRound.getRoundLeaderboard().getLeaderboardScores(),
    });

    // If the game isn't finished, start a new round
    if (!this.currentRound.isFinished()) {
      this.currentRound.resetRound();
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
      return this.onGameEnd();
    }

    // Create a new current round instance
    this.currentRound = new Round(this.clientManager, this.globalGameLeaderboard);

    // Start the new round after 2.5 seconds
    setTimeout(() => this.startRound(), 2500);
  }

  getCurrentRound(): Round {
    return this.currentRound;
  }

  // TODO Find a better way of determining whether the round has started
  hasRoundStarted(): boolean {
    return this.roundCountdown !== Round.DEFAULT_ROUND_LENGTH;
  }

  // Reusable trigger for game ending
  onGameEnd(): void {
    return GameAPI.handleGameEnd(this.gameId, this.clientManager.getSocketIds(), {
      totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
    });
  }

  static serializeWord(word: string): string {
    let underscored = new Array(word.length).fill('_');
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === ' ') underscored[i] = ' ';
    }
    return underscored.join('');
  }

  private calculateScore(): number {
    console.log(Round.DEFAULT_ROUND_LENGTH, this.roundCountdown, Round.DEFAULT_ROUND_SCORE);

    return (
      (1 - (Round.DEFAULT_ROUND_LENGTH - this.roundCountdown) / Math.abs(Round.DEFAULT_ROUND_LENGTH)) *
      Round.DEFAULT_ROUND_SCORE
    );
  }

  guessWord(socket: Socket, word: string): void {
    const correctlyGuessed = this.currentRound.guessWord(socket, word);
    if (correctlyGuessed) {
      this.currentRound.getRoundLeaderboard().incrementScore(socket.id, this.calculateScore());
      if (this.currentRound.getCorrectGuessers().length === this.clientManager.getPlayers().length) {
        this.currentRound.resetRound();
        return this.startRound();
      }
    }
  }
}
