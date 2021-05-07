import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';
import { SocketUser } from '../client-manager';

export class LobbyJoin extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_JOIN);
  }

  async handle(user: SocketUser, id: string) {
    LobbyHelper.join(user, id);
  }
}
