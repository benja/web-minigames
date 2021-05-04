import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';

export class LobbySetPrivate extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_SET_PRIVATE);
  }

  async handle(socket: Socket, status: boolean) {
    LobbyHelper.setPrivate(socket, status);
  }
}
