import { SocketEvents } from '@wmg/shared';
import { Socket } from 'socket.io';
import { getClientById, setClientUsername, setCurrentLobby } from '../client-manager';
import { getLobbyById, deleteLobby, createLobby, setLobbyPrivate } from '../lobby-manager';

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
          getClientById(p).socket.emit(SocketEvents.LOBBY_LEAVE, socket.id);
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
        id: lobby.getId(),
        private: lobby.isPrivate(),
        players: lobby.getPlayers().map(p => {
          const client = getClientById(p);
          return {
            username: client.username,
            id: client.socket.id,
            admin: client.admin,
          };
        }),
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
      id: lobby.getId(),
      players: [
        {
          username: client.username,
          id: socket.id,
          admin: client.admin,
        },
      ],
    });
  }

  public static kick(socket: Socket, id: string) {
    const admin = getClientById(socket.id);
    const client = getClientById(id);

    const lobby = getLobbyById(admin.currentLobby!);

    if (admin.currentLobby === client.currentLobby && lobby.getAdmin() === admin.socket.id) {
      lobby.getPlayers().forEach(p => {
        getClientById(p).socket.emit(SocketEvents.LOBBY_KICK, id);
      });
      lobby.kickPlayer(id);
    }
  }

  public static sendMessage(socket: Socket, message: string) {
    const client = getClientById(socket.id);
    const lobby = getLobbyById(client.currentLobby!);

    lobby.getPlayers().forEach(p => {
      const player = getClientById(p);
      player.socket.emit(SocketEvents.LOBBY_SEND_MESSAGE, {
        id: socket.id,
        message,
      });
    });
  }

  public static updateUsername(socket: Socket, username: string) {
    setClientUsername(socket, username);

    const client = getClientById(socket.id);

    if (!client.currentLobby) return;

    const lobby = getLobbyById(client.currentLobby);

    lobby.getPlayers().forEach(p => {
      getClientById(p).socket.emit(SocketEvents.UPDATE_USERNAME, {
        id: lobby.getId(),
        players: lobby.getPlayers().map(p => {
          const client = getClientById(p);
          return {
            username: client.username,
            id: client.socket.id,
            admin: client.admin,
          };
        }),
      });
    });
  }

  public static setPrivate(socket: Socket, status: boolean) {
    const client = getClientById(socket.id);
    if (!client.currentLobby) {
      throw new Error('Could not find your lobby.');
    }

    const lobby = getLobbyById(client.currentLobby);
    setLobbyPrivate(client.currentLobby, status);

    lobby.getPlayers().forEach(p => {
      getClientById(p).socket.emit(SocketEvents.LOBBY_SET_PRIVATE, status);
    });
  }
}
