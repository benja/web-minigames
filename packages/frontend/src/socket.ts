import io from 'socket.io-client';
import { Dispatch, SetStateAction } from 'react';
import { DefaultStore } from './utils/store';
import { GameTypes, Lobby, Message, SocketEvents } from '@wmg/shared';
import { NextRouter } from 'next/router';
import toast from 'react-hot-toast';

export class Sockets {
  public readonly socket: SocketIOClient.Socket = null;
  private readonly dispatch: Dispatch<SetStateAction<DefaultStore>>;
  private router: NextRouter;

  constructor(dispatch: Dispatch<SetStateAction<DefaultStore>>, router?: NextRouter) {
    this.dispatch = dispatch;
    this.socket = io('http://localhost:8080');
    this.router = router;
    this.initialiseMethods();
  }

  private initialiseMethods() {
    this.socket.on('connect', () => {
      this.dispatch(o => ({
        ...o,
        account: { id: this.socket.id, username: o.account?.username },
      }));
    });

    this.socket.on(SocketEvents.ERROR, (message: string) => {
      // toast.error(message);
    });

    this.socket.on(SocketEvents.LOBBY_JOIN, (data: Lobby) => {
      this.dispatch(o => ({
        ...o,
        account: {
          ...o.account,
          admin: data.players && data.players.filter(p => p.username === o.account.username)[0].admin,
        },
        lobby: {
          ...o.lobby,
          id: data.id,
          players: data.players,
          private: data.private,
          messages: [],
        },
      }));
    });

    this.socket.on(SocketEvents.LOBBY_LEAVE, (id: string) => {
      this.dispatch(o => ({
        ...o,
        lobby: {
          ...o.lobby,
          players: (o.lobby.players ?? []).filter(p => p.id !== id),
        },
      }));
    });

    this.socket.on(SocketEvents.LOBBY_KICK, (id: string) => {
      this.dispatch(o => {
        const players = (o.lobby.players ?? []).filter(p => p.id !== id);

        if (o.account.id === id) {
          toast.error('The party leader kicked you');
          this.router.push('/');

          return {
            ...o,
            account: {
              ...o.account,
              admin: false,
            },
            lobby: {
              id: null,
              private: false,
              players: [],
            },
          };
        }

        return {
          ...o,
          lobby: {
            ...o.lobby,
            players,
          },
        };
      });
    });

    this.socket.on(SocketEvents.UPDATE_USERNAME, (data: { id: string; players: { username: string }[] }) => {
      this.dispatch(o => ({
        ...o,
        lobby: {
          ...o.lobby,
          id: data.id,
          players: data.players,
        },
      }));
    });

    this.socket.on(SocketEvents.LOBBY_SEND_MESSAGE, (data: Message) => {
      this.dispatch(o => ({
        ...o,
        lobby: {
          ...o.lobby,
          messages: [...(o.lobby.messages || []), data],
        },
      }));
    });

    this.socket.on(SocketEvents.GAME_START, data => {
      this.dispatch(o => ({
        ...o,
        queue: undefined,
        game: data,
      }));
    });

    this.socket.on(SocketEvents.LOBBY_SET_PRIVATE, (status: boolean) => {
      this.dispatch(o => ({
        ...o,
        lobby: {
          ...o.lobby,
          private: status,
        },
      }));
    });

    this.socket.on(SocketEvents.QUEUE_JOIN, (gameType: GameTypes) => {
      this.dispatch(o => ({
        ...o,
        queue: {
          type: gameType,
        },
      }));
    });

    this.socket.on(SocketEvents.QUEUE_LEAVE, (_gameType: GameTypes) => {
      this.dispatch(o => ({
        ...o,
        queue: undefined,
      }));
    });
  }

  public updateUsername(username: string) {
    this.socket.emit(SocketEvents.UPDATE_USERNAME, username);
    this.dispatch(o => ({
      ...o,
      account: { id: o.account?.id, username },
    }));
    localStorage?.setItem('username', username);
  }

  public createLobby() {
    toast.success('Successfully created lobby');
    this.socket.emit(SocketEvents.LOBBY_CREATE);
  }

  public startGameSearch(gameType: GameTypes) {
    this.socket.emit(SocketEvents.QUEUE_JOIN, gameType);
  }

  public leaveGameSearch(gameType: GameTypes) {
    this.socket.emit(SocketEvents.QUEUE_LEAVE, gameType);
  }

  public kickLobbyPlayer(id: string) {
    this.socket.emit(SocketEvents.LOBBY_KICK, id);
  }

  public joinLobby(id: string) {
    this.socket.emit(SocketEvents.LOBBY_JOIN, id);
  }

  public setPrivate(status: boolean) {
    this.socket.emit(SocketEvents.LOBBY_SET_PRIVATE, status);
  }

  public leaveLobby() {
    this.socket.emit(SocketEvents.LOBBY_LEAVE);
    this.dispatch(o => ({
      ...o,
      lobby: undefined,
    }));
  }

  public sendMessage(message: string) {
    this.socket.emit(SocketEvents.LOBBY_SEND_MESSAGE, message);
  }

  public isConnected(): boolean {
    return !!this.socket;
  }

  public disconnect(): void {
    return void this.socket.close();
  }
}
