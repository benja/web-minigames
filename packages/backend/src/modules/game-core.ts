import { Socket } from 'socket.io';
import { GameListener } from './game-listener';
import { GameTypes } from '@wmg/shared';
import generateId from '../utils/generate-id';
import { ClientHandler } from './client-handler';

export interface GameUser {
  socket: Socket;
  username?: string;
}
export interface ClientHelper {
  getClientById: (clientId: string) => GameUser;
}
interface IGameCore {
  onGameStart: () => void;
  onGameEnd: () => void;
  onPlayerLeave: (socketId: string) => void;
}
export abstract class GameCore<T extends GameTypes> extends ClientHandler<T> implements IGameCore {
  private readonly gameId: string;

  protected constructor(gameType: T, players: string[], clientManager: ClientHelper) {
    super(gameType, players, clientManager);
    this.gameId = generateId();
  }

  abstract onGameEnd(): void;

  abstract onGameStart(): void;

  abstract onPlayerLeave(socketId: string): void;

  public getId(): string {
    return this.gameId;
  }
}
