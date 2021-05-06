import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';
import { SocketUser } from '../client-manager';

export class LobbyCreate extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_CREATE);
  }

  async handle(user: SocketUser) {
    LobbyHelper.create(user);
  }
}
