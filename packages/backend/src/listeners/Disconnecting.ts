import { Socket } from "socket.io";
import { Listener } from "../listener";
import { SocketEvents } from "@wmg/shared";
import UserHelper from "../helpers/user-helper";

export class Disconnecting extends Listener {
  constructor() {
    super(SocketEvents.DISCONNECTING);
  }

  async handle(socket: Socket) {
    UserHelper.disconnect(socket)
  }
}
