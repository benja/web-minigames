import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';
import { SocketUser } from '../client-manager';

export class LobbyMessage extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_SEND_MESSAGE);
  }

  async handle(user: SocketUser, message: string) {
    LobbyHelper.sendMessage(user, message);
  }
}
