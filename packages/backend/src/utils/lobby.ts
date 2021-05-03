import { getClient, getClientById, setClientAdmin } from '../client-manager';
import { getLobbyById } from '../lobby-manager';
import { SocketEvents } from '@wmg/shared';
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

    if (id === this.getAdmin() && this.players.length) {
      setClientAdmin(id, false);

      const filteredPlayers = this.players.filter(p => p !== id);
      const client = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];

      setClientAdmin(client, true);
    }

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
