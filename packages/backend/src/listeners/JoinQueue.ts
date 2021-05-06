import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { GameTypes, SocketEvents } from '@wmg/shared';
import QueueHelper from '../helpers/queue.helpers';
import { SocketUser } from '../client-manager';

export class JoinQueue extends Listener {
  constructor() {
    super(SocketEvents.QUEUE_JOIN);
  }

  async handle(user: SocketUser, gameType: GameTypes) {
    QueueHelper.join(user, gameType);
  }
}
