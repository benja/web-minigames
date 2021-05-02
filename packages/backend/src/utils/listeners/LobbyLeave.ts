import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { deleteClient, getClient } from '../../client-manager';
import { leaveLobby } from '../../lobby-manager';
import { SocketEvents } from '../socket-events';

export class LobbyLeave extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_LEAVE);
  }

  async handle(socket: Socket) {
    const client = getClient(socket);

    if (client.currentLobby) {
      leaveLobby(socket, client.currentLobby);

      console.log(`Deleted lobby ${client.currentLobby} for user ${socket.id}`);
    }

    deleteClient(socket);
    console.log(`Disconnected user ${socket.id}`);
  }
}
