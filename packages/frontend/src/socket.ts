import io from 'socket.io-client';
import { Dispatch, SetStateAction } from 'react';
import { DefaultStore } from './utils/store';
import { SocketEvents } from '@wmg/shared';
import toast from 'react-hot-toast';
import { NextRouter, useRouter } from 'next/router';

export class Sockets {
  private readonly socket: SocketIOClient.Socket = null;
  private readonly dispatch: Dispatch<SetStateAction<DefaultStore>>;

  constructor(dispatch: Dispatch<SetStateAction<DefaultStore>>, router?: NextRouter) {
    this.dispatch = dispatch;
    this.socket = io('http://localhost:8080');
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
      toast.error(message);
    });

    this.socket.on(SocketEvents.LOBBY_JOIN, (data: { lobbyId: string; players: { username: string }[] }) => {
      this.dispatch(o => ({
        ...o,
        lobby: {
          id: data.lobbyId,
          players: data.players,
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

    this.socket.on(SocketEvents.UPDATE_USERNAME, (data: { lobbyId: string; players: { username: string }[] }) => {
      this.dispatch(o => ({
        ...o,
        lobby: {
          id: data.lobbyId,
          players: data.players,
        },
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

  public joinLobby(id: string) {
    this.socket.emit(SocketEvents.LOBBY_JOIN, id);
  }

  public leaveLobby() {
    this.socket.emit(SocketEvents.LOBBY_LEAVE);
    this.dispatch(o => ({
      ...o,
      lobby: undefined,
    }));
  }

  public isConnected(): boolean {
    return !!this.socket;
  }

  public disconnect(): void {
    return void this.socket.close();
  }
}
