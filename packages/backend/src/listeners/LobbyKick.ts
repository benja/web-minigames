import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';
import { SocketUser } from '../client-manager';

export class LobbyKick extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_KICK);
  }

  async handle(user: SocketUser, id: string) {
    LobbyHelper.kick(user, id);
  }
}
