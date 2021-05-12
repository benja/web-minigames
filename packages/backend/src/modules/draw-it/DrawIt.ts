import { GameCore, IdentifiableUser } from '../game-core';
import { DrawItSocketEvents, GameTypes, SocketEvents } from '@wmg/shared';
import listeners from './listeners';
import { GameListener } from '../game-listener';
import { GameLeaderboard } from '../game-leaderboard';
import GameAPI from '../game-api';
import { RoundManager } from './round-manager';
import { Socket } from 'socket.io';
import { getClientById, setCurrentGame } from '../../client-manager';

interface IDrawIt {
  guessWord: (socket: Socket, word: string) => void;
}
export class DrawIt extends GameCore<GameTypes.DRAWING> implements IDrawIt {
  private readonly pointsLeaderboard: GameLeaderboard;
  private readonly roundManager: RoundManager;

  constructor(players: IdentifiableUser[]) {
    super(GameTypes.DRAWING, players);
    this.pointsLeaderboard = new GameLeaderboard(this.getClientManager().getSocketIds());
    this.roundManager = new RoundManager(this.getClientManager(), this.pointsLeaderboard);
  }

  onPlayerLeave(socketId: string): void {
    this.getClientManager().removePlayerBySocketId(socketId);
    return GameAPI.emitToSockets(this.getClientManager().getSockets(), DrawItSocketEvents.GAME_PLAYER_LEAVE, socketId);
  }

  static getListeners(): GameListener[] {
    return listeners;
  }

  guessWord(socket: Socket, word: string): void {
    return this.roundManager.getCurrentRound().guessWord(socket, word);
  }

  start(): void {
    GameAPI.emitToSockets(this.getClientManager().getSockets(), SocketEvents.GAME_START, {
      gameId: this.getId(),
      gameType: this.getGameType(),
      players: this.getClientManager()
        .getPlayers()
        .map(p => ({
          id: p.socket.id,
          username: p.username,
        })),
      leaderboard: {
        leaderboardId: this.pointsLeaderboard.leaderboardId,
        leaderboard: this.pointsLeaderboard.getLeaderboardScores(),
      },
    });

    this.roundManager.startRound();
  }
}
