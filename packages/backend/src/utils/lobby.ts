export class Lobby {
  private readonly id: string;
  private readonly players: string[];

  constructor() {
    this.id = this.generateId();
    this.players = [];
  }

  private generateId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result = [];

    for (let i = 0; i < 6; i++) {
      result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }

    return result.join('');
  }

  public getId(): string {
    return this.id;
  }

  public getPlayers(): string[] {
    return this.players;
  }

  public addPlayer(id: string) {
    return this.players.push(id);
  }
}
