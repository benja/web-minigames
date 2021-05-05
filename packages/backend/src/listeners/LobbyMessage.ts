import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';

export class LobbyMessage extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_SEND_MESSAGE);
  }

  async handle(socket: Socket, message: string) {
    LobbyHelper.sendMessage(socket, message);
  }
}
