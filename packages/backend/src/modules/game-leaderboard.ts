import generateId from '../utils/generate-id';

interface IGameLeaderboard {
  incrementScore: (id: string, amount: number) => number;
  decrementScore: (id: string, amount: number) => number;
  resetScore: (id: string) => void;
  getLeaderboardScores: () => Record<string, number>;
  getSortedLeaderboardScores: () => Record<string, number>;
  getWinner: () => string;
  addPlayer: (id: string) => void;
  removePlayer: (id: string) => void;
  resetScores: () => void;
  add: (leaderboard: GameLeaderboard) => GameLeaderboard;
  subtract: (leaderboard: GameLeaderboard) => GameLeaderboard;
}
export class GameLeaderboard implements IGameLeaderboard {
  public readonly leaderboardId: string;

  private leaderboard: Map<string, number> = new Map();
  private readonly players: string[];

  constructor(players: string[]) {
    this.leaderboardId = generateId();
    if (!players.length) {
      throw new Error('Players of invalid length provided.');
    }
    players.forEach(player => this.leaderboard.set(player, 0));
    this.players = players;
  }

  static serialize(leaderboard: Map<string, number>): Record<string, number> {
    const mappedLeaderboard: Record<string, number> = {};
    leaderboard.forEach((value, key) => {
      mappedLeaderboard[key] = value;
    });
    return mappedLeaderboard;
  }

  getLeaderboardScores(): Record<string, number> {
    return GameLeaderboard.serialize(this.leaderboard);
  }

  getWinner(): string {
    let highestScore: number = 0;
    let highestPlayer: string | null = null;
    this.leaderboard.forEach((value, key) => {
      if (value > highestScore) {
        highestPlayer = key;
        highestScore = value;
      }
    });
    if (!highestPlayer) {
      throw new Error('Unable to calculate leaderboard scores.');
    }
    return highestPlayer;
  }

  incrementScore(id: string, amount: number): number {
    const entry = this.leaderboard.get(id);
    if (entry === undefined) {
      throw new Error('This player is not a part of this leaderboard.');
    }
    console.log(id, entry, amount);

    this.leaderboard.set(id, entry + amount);
    return entry + amount;
  }

  decrementScore(id: string, amount: number): number {
    const entry = this.leaderboard.get(id);
    if (entry === undefined) {
      throw new Error('This player is not a part of this leaderboard.');
    }
    this.leaderboard.set(id, entry - amount);
    return entry - amount;
  }

  resetScore(id: string): void {
    if (!this.leaderboard.has(id)) {
      throw new Error('This player is not a part of this leaderboard.');
    }
    this.leaderboard.set(id, 0);
  }

  getSortedLeaderboardScores(): Record<string, number> {
    return GameLeaderboard.serialize(new Map([...this.leaderboard.entries()].sort((a, b) => a[1] - b[1])));
  }

  addPlayer(id: string): void {
    if (this.leaderboard.has(id) || this.players.includes(id)) {
      throw new Error(`This leaderboard already has the player ${id}`);
    }
    this.leaderboard.set(id, 0);
    this.players.push(id);
  }

  removePlayer(id: string): void {
    if (!this.leaderboard.has(id) || !this.players.includes(id)) {
      throw new Error(`This leaderboard does not have the player ${id}`);
    }
    this.leaderboard.delete(id);
    this.players.filter(p => p !== id);
  }

  resetScores(): void {
    const newLeaderboard: Map<string, number> = new Map();
    this.players.forEach(player => newLeaderboard.set(player, 0));
    this.leaderboard = newLeaderboard;
  }

  add(leaderboard: GameLeaderboard): GameLeaderboard {
    const scores = leaderboard.getLeaderboardScores();
    Object.keys(scores).forEach(key => {
      this.incrementScore(key, scores[key]);
    });
    return this;
  }

  subtract(leaderboard: GameLeaderboard): GameLeaderboard {
    const scores = leaderboard.getLeaderboardScores();
    Object.keys(scores).forEach(key => {
      this.decrementScore(key, scores[key]);
    });
    return this;
  }
}
