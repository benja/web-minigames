import { Socket } from 'socket.io';
import { SocketEvents } from './socket-events';
import { WmgError } from './error';

export abstract class Listener {
  public readonly eventName: SocketEvents;

  constructor(eventName: SocketEvents) {
    this.eventName = eventName;
  }

  public _handle(socket: Socket, data?: any) {
    try {
      this.handle(socket, data);
    } catch (err) {
      console.log(err);
      if (err instanceof WmgError) {
        socket.emit(SocketEvents.ERROR, err.message);
      }
    }
  }

  abstract handle(socket: Socket, data?: any): Promise<any>;
}
