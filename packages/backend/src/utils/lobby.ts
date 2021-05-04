import { Game } from "@wmg/shared";
import generateId from "./generate-id";

export class Lobby {
  private readonly id: string;
  private players: string[];

  private currentGame: Game | null;
  private inQueue: boolean = false;

  constructor() {
    this.id = generateId();
    this.currentGame = null;
    this.players = [];
  }

  public kickPlayer(id: string): boolean {
    if (!this.players.includes(id)) {
      throw new Error('Player does not exist in this lobby.');
    }
    this.players = this.players.filter(p => p !== id);
    return this.players.length === 0;
  }

  public getId(): string {
    return this.id;
  }

  public isInGame(): boolean {
    return !!this.currentGame;
  }

  public getGame(): Game | null {
    return this.currentGame;
  }

  public setInQueue(status: boolean): void {
    this.inQueue = status;
  }

  public isInQueue(): boolean {
    return this.inQueue;
  }

  public setGame(game: Game): void {
    this.currentGame = game;
  }

  public getPlayers(): string[] {
    return this.players;
  }

  public addPlayer(id: string) {
    return this.players.push(id);
  }
}
