import { ClientHelper } from './game-core';
import { GameTypes } from '@wmg/shared';

export class ClientHandler<T extends GameTypes> {
  private readonly clientManager: ClientHelper;
  private readonly gameType: T;
  public players: string[] = [];

  protected constructor(gameType: T, players: string[], clientManager: ClientHelper) {
    this.gameType = gameType;
    this.clientManager = clientManager;
    this.players = players;
  }

  public getGameType(): GameTypes {
    return this.gameType;
  }

  public getClientManager(): ClientHelper {
    return this.clientManager;
  }

  public getPlayers(): string[] {
    return this.players;
  }
}
