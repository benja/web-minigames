import { Socket } from 'socket.io';
import { GameTypes, SocketEvents } from "@wmg/shared";
import { getClientById, SocketUser } from '../client-manager';
import { getLobbyById } from '../lobby-manager';
import { addToQueue, removeFromQueue } from '../game-queues';

export default class QueueHelper {
  public static join(user: SocketUser, gameType: GameTypes) {
    if (!user.currentLobby) {
      throw new Error('You are not currently in a lobby.');
    }
    const lobby = getLobbyById(user.currentLobby);
    if (lobby.getAdmin() !== user.socket.id) {
      throw new Error('You must be the lobby admin to join a game queue.')
    }
    addToQueue(lobby, gameType);
    lobby.getPlayers().forEach(player => {
      getClientById(player).socket.emit(SocketEvents.QUEUE_JOIN, gameType)
    });
  }

  public static leave(user: SocketUser, gameType: GameTypes) {
    if (!user.currentLobby) {
      throw new Error('You are not currently in a lobby.');
    }
    const lobby = getLobbyById(user.currentLobby);
    if (lobby.getAdmin() !== user.socket.id) {
      throw new Error('You must be the lobby admin to leave a game queue.')
    }
    removeFromQueue(lobby, gameType);
    lobby.getPlayers().forEach(player => {
      getClientById(player).socket.emit(SocketEvents.QUEUE_LEAVE, gameType)
    });
  }
}
