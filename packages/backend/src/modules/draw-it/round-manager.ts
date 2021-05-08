/*
import { ClientHelper } from '../game-core';
import { ClientHandler } from '../client-handler';
import { DrawItSocketEvents, GameTypes, IRoundFinish } from '@wmg/shared';
import { GameLeaderboard } from '../game-leaderboard';
import { Round } from './round';
import GameAPI from "../game-api";

interface ITaskManager {}
export class RoundManager implements ITaskManager {
  // 10 seconds per round
  public static readonly DEFAULT_ROUND_LENGTH = 30;

  private readonly globalGameLeaderboard: GameLeaderboard;

  private roundCountdown: number = RoundManager.DEFAULT_ROUND_LENGTH;

  constructor(clientManager: ClientHelper, players: string[], gameLeaderboard: GameLeaderboard) {
    this.globalGameLeaderboard = gameLeaderboard;
  }

  startRound(): void {
    const nextDrawer = this.findNextDrawer();
    if (!nextDrawer) {
      throw new Error('First selected player as part of the game was null.');
    }

    this.roundCountdown = RoundManager.DEFAULT_ROUND_LENGTH;
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

    GameAPI.emitToCollection(DrawItSocketEvents.GAME_ROUND_START, {
      drawer: nextDrawer,
      word: new Array(word.length).fill('_').join(''),
    });
  }

  onRoundFinish(): void {
    this.globalGameLeaderboard.add(this.roundLeaderboard);

    // TODO: Switch to Pub/Sub in the future to notify all clients that the game has finished.

    this.emitToAll(DrawItSocketEvents.GAME_ROUND_END, {
      correctWord: this.currentWord,
      roundScores: this.roundLeaderboard.getLeaderboardScores(),
      totalScores: this.globalGameLeaderboard.getLeaderboardScores(),
    } as IRoundFinish);
  }
}
 */
