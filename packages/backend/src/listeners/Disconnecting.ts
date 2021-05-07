import { Listener } from '../listener';
import { SocketEvents } from '@wmg/shared';
import UserHelper from '../helpers/user-helper';
import { SocketUser } from '../client-manager';

export class Disconnecting extends Listener {
  constructor() {
    super(SocketEvents.DISCONNECTING);
  }

  async handle(user: SocketUser) {
    UserHelper.disconnect(user);
  }
}
