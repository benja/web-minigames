import { IdentifiableUser } from './game-core';
import { Socket } from 'socket.io';

export class ClientManager {
  private players: IdentifiableUser[];

  constructor(players: IdentifiableUser[]) {
    this.players = players;
  }

  getPlayers(): IdentifiableUser[] {
    return this.players;
  }

  getSockets(): Socket[] {
    return this.players.map(p => p.socket);
  }

  getSocketIds(): string[] {
    return this.players.map(p => p.socket.id);
  }

  addPlayer(player: IdentifiableUser): IdentifiableUser[] {
    this.players.push(player);
    return this.players;
  }

  removePlayer(player: IdentifiableUser): IdentifiableUser[] {
    this.players = this.players.filter(p => p.socket.id !== player.socket.id);
    return this.players;
  }

  removePlayerBySocketId(socketId: string): IdentifiableUser[] {
    this.players = this.players.filter(p => p.socket.id !== socketId);
    return this.players;
  }
}
