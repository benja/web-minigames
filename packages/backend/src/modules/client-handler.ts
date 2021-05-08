import { Socket } from 'socket.io';
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

  public emit(player: string, eventName: string, data?: any): void {
    const client = this.clientManager.getClientById(player);
    return void client.socket.emit(`${this.gameType}-${eventName}`, data);
  }

  public emitToAll(eventName: string, data?: any): void {
    this.players.forEach(player => this.emit(player, eventName, data));
  }

  public emitToSelection(players: string[], eventName: string, data?: any): void {
    players.forEach(player => this.emit(player, eventName, data));
  }

  public getClientManager(): ClientHelper {
    return this.clientManager;
  }

  public getPlayers(): string[] {
    return this.players;
  }
}
