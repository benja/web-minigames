import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import { setClientUsername } from '../client-manager';

export class SetUsername extends Listener {
  constructor() {
    super(SocketEvents.SET_USERNAME);
  }

  async handle(socket: Socket, username: string) {
    setClientUsername(socket, username);
  }
}
