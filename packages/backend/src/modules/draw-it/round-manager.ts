import { DrawItSocketEvents, IRoundFinish } from '@wmg/shared';
import { GameLeaderboard } from '../game-leaderboard';
import { Round } from './round';
import GameAPI from '../game-api';
import { ClientManager } from '../client-manager';
import WordUtil from './utils/word-util';

interface IRoundManager {
  startRound: () => void;
  triggerRoundStart: () => void;
  onRoundFinish: () => void;
}
export class RoundManager implements IRoundManager {
  // 5 round per game
  public static readonly DEFAULT_NUMBER_OF_ROUNDS = 5;

  private readonly clientManager: ClientManager;
  private readonly globalGameLeaderboard: GameLeaderboard;

  private roundCountdown: number = Round.DEFAULT_ROUND_LENGTH;

  private readonly numRounds: number;

  private currentRound: Round;
  private currentRoundIndex: number = 1;

  constructor(clientManager: ClientManager, gameLeaderboard: GameLeaderboard, numRounds?: number) {
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

    // Generate the word options
    const wordOptions = this.currentRound.generateWordSelection();

    // Ship the options to the new drawer
    GameAPI.emit(nextDrawer, DrawItSocketEvents.GAME_PICK_WORD, wordOptions);

    // TODO: Potentially tell other users who's the new drawer

    setTimeout(() => this.triggerRoundStart(), Round.WORD_PICK_TIME * 1000);
  }

  // Trigger a round start
  triggerRoundStart(): void {
    // If the round has started already then return
    // This can be triggered when the user doesnt pick the word
    if (this.currentRound.hasRoundStarted()) {
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
          word: new Array(word.length).fill('_').join(''),
        });
      }
    });
  }

  // Handling the end of the round
  onRoundFinish(): void {
    // Tell players the round has ended
    GameAPI.emitToSockets(this.clientManager.getSockets(), DrawItSocketEvents.GAME_TURN_END, {
      correctWord: this.currentRound.getCurrentWord(),
      roundScores: this.currentRound.getRoundLeaderboard().getLeaderboardScores(),
    });

    // If the game isn't finished, start a new round
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
    this.currentRound = new Round(this.clientManager, this.globalGameLeaderboard);

    // Start the new round after 2.5 seconds
    setTimeout(() => this.startRound(), 2500);
  }

  public getCurrentRound(): Round {
    return this.currentRound;
  }
}
