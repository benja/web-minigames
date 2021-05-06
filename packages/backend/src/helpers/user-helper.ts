import { Socket } from 'socket.io';
import { deleteClient, getClientById, SocketUser } from '../client-manager';
import LobbyHelper from './lobby-helper';

export default class UserHelper {
  public static disconnect(user: SocketUser) {
    if (user.currentLobby) {
      LobbyHelper.leave(user);
    }

    deleteClient(user);
  }
}
