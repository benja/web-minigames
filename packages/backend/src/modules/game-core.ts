import { GameTypes } from '@wmg/shared';
import generateId from '../utils/generate-id';
import { SocketUser } from '../client-manager';
import { ClientManager } from './client-manager';

interface IGameCore {
  onPlayerLeave: (socketId: string) => void;
}
export type IdentifiableUser = Required<Pick<SocketUser, 'username' | 'socket'>>;
export abstract class GameCore<T extends GameTypes> implements IGameCore {
  private readonly gameId: string;
  private readonly gameType: T;
  private readonly clientManager: ClientManager;

  protected constructor(gameType: T, players: IdentifiableUser[]) {
    this.gameType = gameType;
    this.clientManager = new ClientManager(players);
    this.gameId = generateId();
  }

  abstract start(): void;

  abstract onPlayerLeave(socketId: string): void;

  public getId(): string {
    return this.gameId;
  }

  public getGameType(): GameTypes {
    return this.gameType;
  }

  public getClientManager(): ClientManager {
    return this.clientManager;
  }
}
