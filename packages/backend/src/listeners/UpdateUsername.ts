import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import LobbyHelper from '../helpers/lobby-helper';
import { SocketUser } from '../client-manager';

export class UpdateUsername extends Listener {
  constructor() {
    super(SocketEvents.UPDATE_USERNAME);
  }

  async handle(user: SocketUser, username: string) {
    LobbyHelper.updateUsername(user, username);
  }
}
