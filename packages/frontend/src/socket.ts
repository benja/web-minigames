import io from 'socket.io-client';
import { Dispatch, SetStateAction } from 'react';
import { DefaultStore } from './utils/store';
import { SocketEvents } from '@wmg/shared';
import toast from 'react-hot-toast';
import { NextRouter, useRouter } from 'next/router';

export class Sockets {
  private readonly socket: SocketIOClient.Socket = null;
  private readonly dispatch: Dispatch<SetStateAction<DefaultStore>>;
  private readonly router: NextRouter;

  constructor(dispatch: Dispatch<SetStateAction<DefaultStore>>) {
    this.dispatch = dispatch;
    this.socket = io('http://localhost:8080');
    this.router = useRouter();
    this.initialiseMethods();
  }

  private initialiseMethods() {
    this.socket.on(SocketEvents.ERROR, (message: string) => {
      toast.error(message);
      this.router.push('/');
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

    this.socket.on(SocketEvents.LOBBY_LEAVE, (username: string) => {
      this.dispatch(o => ({
        ...o,
        lobby: {
          ...o.lobby,
          players: (o.lobby.players ?? []).filter(p => p.username !== username),
        },
      }));
    });
  }

  public updateUsername(username: string) {
    this.socket.emit(SocketEvents.UPDATE_USERNAME, username);
  }

  public createLobby() {
    this.socket.emit(SocketEvents.LOBBY_CREATE);
  }

  public joinLobby(id: string) {
    this.socket.emit(SocketEvents.LOBBY_JOIN, id);
  }

  public leaveLobby() {
    this.socket.emit(SocketEvents.LOBBY_LEAVE);
  }

  public isConnected(): boolean {
    return !!this.socket;
  }

  public disconnect(): void {
    return void this.socket.close();
  }
}
