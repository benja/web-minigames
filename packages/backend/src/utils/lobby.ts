import { Game, GameTypes } from '@wmg/shared';
import generateId from './generate-id';
import { SocketEvents } from '@wmg/shared';
import { getClientById } from '../client-manager';
import { getLobbyById } from '../lobby-manager';

export class Lobby {
  private readonly id: string;
  private players: string[];

  private currentGame: Game | null;
  private currentQueue: GameTypes | null = null;
  private private: boolean = false;

  constructor() {
    this.id = generateId();
    this.currentGame = null;
    this.players = [];
  }

  public kickPlayer(id: string): boolean {
    if (!this.players.includes(id)) {
      throw new Error('Player does not exist in this lobby.');
    }

    const client = getClientById(id);

    if (id === this.getAdmin() && this.players.length) {
      client.admin = false;

      const filteredPlayers = this.players.filter(p => p !== id);
      const randomLobbyPlayer = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];

      if (randomLobbyPlayer) {
        getClientById(randomLobbyPlayer).admin = true;
      }
    }

    client.currentLobby = undefined;

    this.players = this.players.filter(p => p !== id);

    const lobby = getLobbyById(this.getId());
    lobby.getPlayers().forEach(p => {
      getClientById(p).socket.emit(SocketEvents.LOBBY_JOIN, {
        id: lobby.getId(),
        players: lobby.getPlayers().map(p => {
          const client = getClientById(p);
          return {
            username: client.username,
            id: client.socket.id,
            admin: client.admin,
          };
        }),
      });
    });

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

  public setInQueue(gameType: GameTypes | null): void {
    this.currentQueue = gameType;
  }

  public getQueueType(): GameTypes | null {
    return this.currentQueue;
  }

  public isPrivate(): boolean {
    return this.private;
  }

  public setPrivate(state: boolean) {
    this.private = state;
  }

  public isInQueue(): boolean {
    return !!this.currentQueue;
  }

  public setGame(game: Game): void {
    this.currentGame = game;
  }

  public getPlayers(): string[] {
    return this.players;
  }

  public addPlayer(id: string) {
    if (!this.getAdmin()) {
      getClientById(id).admin = true;
    }
    return this.players.push(id);
  }

  public getAdmin() {
    return this.players.filter(p => getClientById(p).admin)[0];
  }
}
