import { GameTypes, User } from "@wmg/shared";


export class GameLobby {
  private readonly gameType: GameTypes;
  private readonly players: User[];

  constructor(gameType: GameTypes, players: User[]) {
    this.players = players;
    this.gameType = gameType;
  }

  public getPlayers(): User[] {
    return this.players;
  }
}
