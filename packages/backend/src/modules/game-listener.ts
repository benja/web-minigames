import { Socket } from 'socket.io';
import { GameTypes, SocketEvents } from '@wmg/shared';
import { getClient, SocketUser } from '../client-manager';
import { getGame } from '../game-manager';
import { GameCore } from './game-core';

export abstract class GameListener {
  public readonly eventName: string;

  protected constructor(eventName: string) {
    this.eventName = eventName;
  }

  private static fetchCurrentGame(user: SocketUser): GameCore<GameTypes> {
    if (!user.currentGame) {
      throw new Error('You are not currently in a game.');
    }
    return getGame(user.currentGame);
  }

  public async _handle(socket: Socket, data?: any) {
    console.log(this.eventName, socket.id, data);
    try {
      const client = getClient(socket);

      const game = GameListener.fetchCurrentGame(client);

      await this.handle(client, game, data);
    } catch (err) {
      console.log(`[${socket.id}] Emitted error: ${err.message}`);
      socket.emit(SocketEvents.ERROR, err.message);
    }
  }

  abstract handle(user: SocketUser, game: GameCore<GameTypes>, data?: any): Promise<any>;
}
