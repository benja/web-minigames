export class Lobby {
  private readonly id: string;
  private players: string[];

  constructor() {
    this.id = Lobby.generateId();
    this.players = [];
  }

  private static generateId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result = [];

    for (let i = 0; i < 6; i++) {
      result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }

    return result.join('');
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

  public getPlayers(): string[] {
    return this.players;
  }

  public addPlayer(id: string) {
    return this.players.push(id);
  }
}
