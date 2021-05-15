import { GameCore, IdentifiableUser } from '../game-core';
import { DrawItSocketEvents, GameTypes, SocketEvents } from '@wmg/shared';
import listeners from './listeners';
import { GameListener } from '../game-listener';
import { GameLeaderboard } from '../game-leaderboard';
import GameAPI from '../game-api';
import { RoundManager } from './round-manager';
import { Socket } from 'socket.io';

interface IDrawIt {
  startInteraction: (socket: Socket, interaction: any) => void;
}
export class DrawIt extends GameCore<GameTypes.DRAWING> implements IDrawIt {
  private readonly pointsLeaderboard: GameLeaderboard;
  private readonly roundManager: RoundManager;

  constructor(players: IdentifiableUser[]) {
    super(GameTypes.DRAWING, players);
    this.pointsLeaderboard = new GameLeaderboard(this.getClientManager().getSocketIds());
    this.roundManager = new RoundManager(this.getId(), this.getClientManager(), this.pointsLeaderboard);
  }

  onPlayerLeave(socketId: string): void {
    this.getClientManager().removePlayerBySocketId(socketId);

    // Triggers game end if the last person leaves
    if (!this.getClientManager().getSockets().length) {
      return GameAPI.handleGameEnd(this.getId(), []);
    }
    return GameAPI.emitToSockets(this.getClientManager().getSockets(), DrawItSocketEvents.GAME_PLAYER_LEAVE, socketId);
  }

  static getListeners(): GameListener[] {
    return listeners;
  }

  startInteraction(socket: Socket, interaction: any) {
    if (this.roundManager.getCurrentRound()?.getCurrentTurn()?.getTurnDrawer() !== socket.id) {
      throw new Error('You are not the current drawer.');
    }
    return GameAPI.emitToSockets(
      this.getClientManager()
        .getSockets()
        .filter(s => s.id !== socket.id),
      DrawItSocketEvents.GAME_INTERACTION,
      interaction,
    );
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
      numRounds: this.roundManager.getNumberOfRounds(),
    });

    this.roundManager.startRound();
  }

  getRoundManager(): RoundManager {
    return this.roundManager;
  }
}
