import { Socket } from 'socket.io';
import { SocketEvents } from '@wmg/shared';

export abstract class Listener {
  public readonly eventName: SocketEvents;

  constructor(eventName: SocketEvents) {
    this.eventName = eventName;
  }

  public async _handle(socket: Socket, data?: any) {
    console.log(this.eventName, socket.id, data)
    try {
      await this.handle(socket, data);
    } catch (err) {
      console.log(`Emitted error: ${err.message}`);
      socket.emit(SocketEvents.ERROR, err.message);
    }
  }

  abstract handle(socket: Socket, data?: any): Promise<any>;
}
