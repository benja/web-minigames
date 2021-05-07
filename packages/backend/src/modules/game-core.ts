import { Socket } from "socket.io";
import { GameListener } from "./game-listener";
import { GameTypes } from "@wmg/shared";
import generateId from "../utils/generate-id";

export interface GameUser {
  socket: Socket;
  username?: string;
}
export interface ClientHelper {
  getClientById: (clientId: string) => GameUser;
}
interface IGameCore {
  onGameStart: () => void;
  onGameEnd: () => void;
  onPlayerLeave: (socketId: string) => void;
}
export abstract class GameCore<T extends GameTypes> implements IGameCore {
  private readonly clientManager: ClientHelper;
  private readonly gameType: T;
  private readonly gameId: string;

  public players: string[] = [];

  protected constructor(gameType: T,
                        players: string[],
                        clientManager: ClientHelper) {
    this.gameType = gameType;
    this.clientManager = clientManager;
    this.gameId = generateId();
    this.players = players;
  }

  abstract onGameEnd(): void;

  abstract onGameStart(): void;

  abstract onPlayerLeave(socketId: string): void;

  public getGameType(): GameTypes {
    return this.gameType;
  }

  public emit(socket: Socket, eventName: string, data?: any) {
    return void socket.emit(`${this.gameType}-${eventName}`, data);
  }

  public emitToAll(eventName: string, data?: any) {
    this.players.forEach(player => {
      this.emit(this.clientManager.getClientById(player).socket, eventName, data);
    })
  }

  public getClientManager(): ClientHelper {
    return this.clientManager;
  }

  public getPlayers(): string[] {
    return this.players;
  }

  public getId(): string {
    return this.gameId;
  }
}
