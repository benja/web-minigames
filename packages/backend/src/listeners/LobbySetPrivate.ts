import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';
import { SocketUser } from '../client-manager';

export class LobbySetPrivate extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_SET_PRIVATE);
  }

  async handle(user: SocketUser, status: boolean) {
    LobbyHelper.setPrivate(user, status);
  }
}
