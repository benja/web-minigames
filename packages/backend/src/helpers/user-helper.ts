import { Socket } from 'socket.io';
import { deleteClient, getClientById } from "../client-manager";
import { leaveLobby } from "../lobby-manager";

export default class UserHelper {
  public static disconnect(socket: Socket) {
    const client = getClientById(socket.id);

    if (client.currentLobby) {
      leaveLobby(socket, client.currentLobby);
    }

    deleteClient(socket);
  }
}
