import { getClientById } from '../client-manager';
import { SocketEvents } from '@wmg/shared';
import { Socket } from 'socket.io';

export default class GameAPI {
  public static emit(player: string, eventName: string, data?: any): void {
    return void getClientById(player).socket.emit(eventName, data);
  }

  public static emitToCollection(players: string[], eventName: string, data?: any) {
    players.forEach(player => this.emit(player, eventName, data));
  }

  public static handleGameEnd(players: string[], data?: any) {
    return this.emitToCollection(players, SocketEvents.GAME_END, data);
  }

  public static emitToSockets(sockets: Socket[], eventName: string, data?: any) {
    sockets.forEach(socket => socket.emit(eventName, data));
  }
}
