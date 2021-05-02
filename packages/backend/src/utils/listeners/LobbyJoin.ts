import { Socket } from 'socket.io';
import { Listener } from '../listener';
import { SocketEvents } from '../socket-events';
import { addClient, getClientById, setCurrentLobby } from '../../client-manager';
import { createLobby } from '../../lobby-manager';

export class LobbyJoin extends Listener {
  constructor() {
    super(SocketEvents.LOBBY_JOIN);
  }

  async handle(socket: Socket, { username }: { username: string }) {
    addClient(socket, username);

    const lobby = createLobby(socket);

    setCurrentLobby(socket, lobby.getId());

    console.log(`Created lobby for ${username} (${socket.id}) with id ${lobby.getId()}`);

    socket.emit('setLobby', {
      lobbyId: lobby.getId(),
      players: lobby.getPlayers().map(p => ({
        ...getClientById(p),
        socket: undefined,
      })),
    });
  }
}
