import { Listener } from '../listener';
import { GameTypes, SocketEvents } from "@wmg/shared";
import QueueHelper from "../helpers/queue.helpers";
import { SocketUser } from '../client-manager';

export class LeaveQueue extends Listener {
  constructor() {
    super(SocketEvents.QUEUE_LEAVE);
  }

  async handle(user: SocketUser, gameType: GameTypes) {
    QueueHelper.leave(user, gameType);
  }
}
