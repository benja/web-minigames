import { Socket } from 'socket.io';
import { GameTypes, SocketEvents } from '@wmg/shared';
import generateId from '../utils/generate-id';
import { ClientHandler } from './client-handler';
import GameAPI from './game-api';

export interface GameUser {
  socket: Socket;
  username?: string;
}
export interface ClientHelper {
  getClientById: (clientId: string) => GameUser;
}
interface IGameCore {
  onPlayerLeave: (socketId: string) => void;
}
export abstract class GameCore<T extends GameTypes> extends ClientHandler<T> implements IGameCore {
  private readonly gameId: string;

  protected constructor(gameType: T, players: string[]) {
    super(gameType, players);
    this.gameId = generateId();
  }

  abstract onPlayerLeave(socketId: string): void;

  public getId(): string {
    return this.gameId;
  }
}
