import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { GameTypes, SocketEvents } from "@wmg/shared";
import LobbyHelper from '../helpers/lobby-helper';
import QueueHelper from "../helpers/queue.helpers";

export class JoinQueue extends Listener {
  constructor() {
    super(SocketEvents.QUEUE_JOIN);
  }

  async handle(socket: Socket, gameType: GameTypes) {
    QueueHelper.join(socket, gameType);
  }
}
