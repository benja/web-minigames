import { GameTypes } from "@wmg/shared";
import generateId from "./generate-id";


export class GameLobby {
  private readonly gameId: string;
  private readonly gameType: GameTypes;
  private readonly players: string[];

  constructor(gameType: GameTypes, players: string[]) {
    this.players = players;
    this.gameType = gameType;
    this.gameId = generateId();
  }

  public getPlayers(): string[] {
    return this.players;
  }

  public getId(): string {
    return this.gameId;
  }
}
