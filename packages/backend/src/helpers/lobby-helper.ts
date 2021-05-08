import { SocketEvents } from '@wmg/shared';
import { getClientById, setClientUsername, SocketUser } from '../client-manager';
import { getLobbyById, deleteLobby, createLobby, setLobbyPrivate } from '../lobby-manager';

export default class LobbyHelper {
  public static leave(user: SocketUser) {
    if (user.currentLobby) {
      const oldLobby = getLobbyById(user.currentLobby);

      if (oldLobby.kickPlayer(user.socket.id)) {
        deleteLobby(oldLobby.getId());
        console.log(`Deleted lobby ${user.currentLobby} for user ${user.socket.id}`);
      } else {
        oldLobby.getPlayers().forEach(p => {
          getClientById(p).socket.emit(SocketEvents.LOBBY_LEAVE, user.socket.id);
        });
      }
    }
  }

  public static join(user: SocketUser, id: string) {
    const lobby = getLobbyById(id);

    if (!user.username) return;

    this.leave(user);

    user.currentLobby = lobby.getId();

    lobby.addPlayer(user.socket.id);

    console.log(`Player ${user.username} joined lobby ${lobby.getId()}`);

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

  public static create(user: SocketUser) {
    this.leave(user);

    const lobby = createLobby(user.socket);

    user.currentLobby = lobby.getId();

    console.log(`Created lobby for ${user.username} (${user.socket.id}) with id ${lobby.getId()}`);

    user.socket.emit(SocketEvents.LOBBY_JOIN, {
      id: lobby.getId(),
      players: [
        {
          id: user.socket.id,
          username: user.username,
          admin: true,
        },
      ],
      private: lobby.isPrivate(),
    });
  }

  public static kick(user: SocketUser, id: string) {
    const client = getClientById(id);

    const lobby = getLobbyById(user.currentLobby!);

    if (user.currentLobby === client.currentLobby && lobby.getAdmin() === user.socket.id) {
      lobby.getPlayers().forEach(p => {
        getClientById(p).socket.emit(SocketEvents.LOBBY_KICK, id);
      });
      lobby.kickPlayer(id);
    }
  }

  public static sendMessage(user: SocketUser, message: string) {
    const lobby = getLobbyById(user.currentLobby!);

    lobby.getPlayers().forEach(p => {
      const player = getClientById(p);
      player.socket.emit(SocketEvents.LOBBY_SEND_MESSAGE, {
        id: user.socket.id,
        username: user.username,
        message,
      });
    });
  }

  public static updateUsername(user: SocketUser, username: string) {
    setClientUsername(user.socket, username);

    if (!user.currentLobby) return;

    const lobby = getLobbyById(user.currentLobby);

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

  public static setPrivate(user: SocketUser, status: boolean) {
    if (!user.currentLobby) {
      throw new Error('Could not find your lobby.');
    }

    const lobby = getLobbyById(user.currentLobby);
    setLobbyPrivate(user.currentLobby, status);

    lobby.getPlayers().forEach(p => {
      getClientById(p).socket.emit(SocketEvents.LOBBY_SET_PRIVATE, status);
    });
  }
}
