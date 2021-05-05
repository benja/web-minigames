import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';

export class LobbyKick extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_KICK);
  }

  async handle(socket: Socket, id: string) {
    LobbyHelper.kick(socket, id);
  }
}
