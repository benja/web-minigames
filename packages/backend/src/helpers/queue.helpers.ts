import { Socket } from 'socket.io';
import { GameTypes } from '@wmg/shared';
import { getClientById } from '../client-manager';
import { getLobbyById } from '../lobby-manager';
import { addToQueue, removeFromQueue } from '../game-queues';

export default class QueueHelper {
  public static join(socket: Socket, gameType: GameTypes) {
    const client = getClientById(socket.id);
    if (!client.currentLobby) {
      throw new Error('You are not currently in a lobby.');
    }
    const lobby = getLobbyById(client.currentLobby);
    addToQueue(lobby, gameType);
  }

  public static leave(socket: Socket, gameType: GameTypes) {
    const client = getClientById(socket.id);
    if (!client.currentLobby) {
      throw new Error('You are not currently in a lobby.');
    }
    const lobby = getLobbyById(client.currentLobby);
    removeFromQueue(lobby, gameType);
  }
}
