import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';

export class LobbyLeave extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_LEAVE);
  }

  async handle(socket: Socket) {
    LobbyHelper.leave(socket);
  }
}
