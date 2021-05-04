import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { GameTypes, SocketEvents } from "@wmg/shared";
import LobbyHelper from '../helpers/lobby-helper';
import QueueHelper from "../helpers/queue.helpers";

export class LeaveQueue extends Listener {
  constructor() {
    super(SocketEvents.QUEUE_LEAVE);
  }

  async handle(socket: Socket, gameType: GameTypes) {
    QueueHelper.leave(socket, gameType);
  }
}
