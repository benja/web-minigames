import { Socket } from 'socket.io';
import { SocketEvents } from '@wmg/shared';
import { getClient, SocketUser } from './client-manager';

export abstract class Listener {
  public readonly eventName: SocketEvents;

  protected constructor(eventName: SocketEvents) {
    this.eventName = eventName;
  }

  public async _handle(socket: Socket, data?: any) {
    console.log(this.eventName, socket.id, data);
    try {
      const client = getClient(socket);

      await this.handle(client, data);
    } catch (err) {
      console.log(`[${socket.id}] Emitted error: ${err.message}`);
      socket.emit(SocketEvents.ERROR, err.message);
    }
  }

  abstract handle(user: SocketUser, data?: any): Promise<any>;
}
