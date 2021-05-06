import { Socket } from 'socket.io';
import { deleteClient, getClientById } from '../client-manager';
import LobbyHelper from './lobby-helper';

export default class UserHelper {
  public static disconnect(socket: Socket) {
    const client = getClientById(socket.id);

    if (client.currentLobby) {
      LobbyHelper.leave(socket);
    }

    deleteClient(socket);
  }
}
