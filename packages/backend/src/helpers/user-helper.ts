import { deleteClient, SocketUser } from '../client-manager';
import LobbyHelper from './lobby-helper';
import { getGame } from '../game-manager';

export default class UserHelper {
  public static disconnect(user: SocketUser) {
    if (user.currentLobby) {
      LobbyHelper.leave(user);
    }

    if (user.currentGame) {
      const game = getGame(user.currentGame);
      game.onPlayerLeave(user.socket.id);
    }

    deleteClient(user);
  }
}
