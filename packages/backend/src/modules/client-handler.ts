import { GameTypes } from '@wmg/shared';

export class ClientHandler<T extends GameTypes> {
  private readonly gameType: T;
  public players: string[] = [];

  protected constructor(gameType: T, players: string[]) {
    this.gameType = gameType;
    this.players = players;
  }

  public getGameType(): GameTypes {
    return this.gameType;
  }

  public getPlayers(): string[] {
    return this.players;
  }
}
