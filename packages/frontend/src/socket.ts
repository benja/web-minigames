import io from "socket.io-client";
import { Dispatch, SetStateAction, useContext } from "react";
import { DefaultStore, StoreContext } from "./utils/store";
import { GameTypes, SocketEvents } from "@wmg/shared";

export class Sockets {
  private readonly socket: SocketIOClient.Socket = null;
  private readonly dispatch: Dispatch<SetStateAction<DefaultStore>>;

  constructor(dispatch: Dispatch<SetStateAction<DefaultStore>>) {
    this.dispatch = dispatch;
    this.socket = io("http://localhost:8080");
    this.initialiseMethods();
  }

  private initialiseMethods() {
    this.socket.on(SocketEvents.ERROR, (message: string) => {
      alert(message);
    });

    this.socket.on(SocketEvents.LOBBY_JOIN, (data: { lobbyId: string; players: { username: string }[] }) => {
      this.dispatch(o => ({
        ...o,
        lobby: {
          id: data.lobbyId,
          players: data.players
        }
      }));
    });

    this.socket.on(SocketEvents.LOBBY_LEAVE, (username: string) => {
      this.dispatch(o => ({
        ...o,
        lobby: {
          ...o.lobby,
          players: (o.lobby.players ?? []).filter(p => p.username !== username)
        }
      }));
    });

    this.socket.on(SocketEvents.GAME_START, (elem: []) => {
      this.dispatch(o => ({
        ...o,
        inQueue: false
      }))
    })
  }

  public claimUsername(username: string) {
    this.socket.emit(SocketEvents.SET_USERNAME, username);
  }

  public createLobby() {
    this.socket.emit(SocketEvents.LOBBY_CREATE);
  }

  public startGameSearch(gameType: GameTypes) {
    this.socket.emit(SocketEvents.QUEUE_JOIN, gameType);
    this.dispatch(o => ({
      ...o,
      queue: {
        type: gameType
      }
    }))
  }

  public leaveGameSearch(gameType: GameTypes) {
    this.socket.emit(SocketEvents.QUEUE_LEAVE, gameType);
    this.dispatch(o => ({
      ...o,
      queue: undefined
    }))
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
