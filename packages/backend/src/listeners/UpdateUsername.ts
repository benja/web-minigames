import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';

export class UpdateUsername extends Listener {
  constructor() {
    super(SocketEvents.UPDATE_USERNAME);
  }

  async handle(socket: Socket, username: string) {
    LobbyHelper.updateUsername(socket, username);
  }
}
