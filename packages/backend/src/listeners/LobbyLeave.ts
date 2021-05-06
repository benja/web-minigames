import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';
import { SocketUser } from '../client-manager';

export class LobbyLeave extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_LEAVE);
  }

  async handle(user: SocketUser) {
    LobbyHelper.leave(user);
  }
}
