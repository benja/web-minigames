import { Game } from '@wmg/shared';
import generateId from './generate-id';
import { SocketEvents } from '@wmg/shared';
import { getClientById, setClientAdmin, setCurrentLobby } from '../client-manager';
import { getLobbyById } from '../lobby-manager';
export class Lobby {
  private readonly id: string;
  private players: string[];

  private currentGame: Game | null;
  private inQueue: boolean = false;
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

    if (id === this.getAdmin() && this.players.length) {
      setClientAdmin(id, false);

      const filteredPlayers = this.players.filter(p => p !== id);
      const randomLobbyPlayer = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];

      setClientAdmin(randomLobbyPlayer, true);
    }

    setCurrentLobby(getClientById(id).socket, undefined);

    this.players = this.players.filter(p => p !== id);

    const lobby = getLobbyById(this.getId());
    lobby.getPlayers().forEach(p => {
      getClientById(p).socket.emit(SocketEvents.LOBBY_JOIN, {
        lobbyId: lobby.getId(),
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

  public setInQueue(status: boolean): void {
    this.inQueue = status;
  }

  public isPrivate(): boolean {
    return this.private;
  }

  public setPrivate(state: boolean) {
    this.private = state;
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
    if (!this.getAdmin()) {
      setClientAdmin(id, true);
    }
    return this.players.push(id);
  }

  public getAdmin() {
    return this.players.filter(p => getClientById(p).admin)[0];
  }
}
