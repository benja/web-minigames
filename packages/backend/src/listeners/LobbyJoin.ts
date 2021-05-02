import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';

export class LobbyJoin extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_JOIN);
  }

  async handle(socket: Socket, id: string) {
    LobbyHelper.join(socket, id);
  }
}
