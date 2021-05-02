import { SocketEvents } from '@wmg/shared';
import { Socket } from 'socket.io';
import { getClientById, setCurrentLobby } from '../client-manager';
import { getLobbyById, deleteLobby, createLobby } from '../lobby-manager';

export default class LobbyHelper {
  public static leave(socket: Socket) {
    const client = getClientById(socket.id);
    if (client.currentLobby) {
      const oldLobby = getLobbyById(client.currentLobby);

      if (oldLobby.kickPlayer(socket.id)) {
        deleteLobby(oldLobby.getId());
        console.log(`Deleted lobby ${client.currentLobby} for user ${socket.id}`);
      } else {
        oldLobby.getPlayers().forEach(p => {
          getClientById(p).socket.emit(SocketEvents.LOBBY_LEAVE, client.username);
        });
      }
    }
  }

  public static join(socket: Socket, id: string) {
    const lobby = getLobbyById(id);
    const client = getClientById(socket.id);

    this.leave(socket);

    setCurrentLobby(socket, lobby.getId());

    lobby.addPlayer(socket.id);

    console.log(`Player ${client.username} joined lobby ${lobby.getId()}`);

    lobby.getPlayers().forEach(p => {
      getClientById(p).socket.emit(SocketEvents.LOBBY_JOIN, {
        lobbyId: lobby.getId(),
        players: lobby.getPlayers().map(p => ({
          ...getClientById(p),
          socket: undefined,
          currentLobby: undefined,
        })),
      });
    });
  }

  public static create(socket: Socket) {
    this.leave(socket);

    const lobby = createLobby(socket);
    setCurrentLobby(socket, lobby.getId());

    const client = getClientById(socket.id);
    console.log(`Created lobby for ${client.username} (${socket.id}) with id ${lobby.getId()}`);

    socket.emit(SocketEvents.LOBBY_JOIN, {
      lobbyId: lobby.getId(),
      players: [{
        username: client.username
      }]
    });
  }
}
