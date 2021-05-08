import { getClientById } from '../client-manager';
import { SocketEvents } from '@wmg/shared';

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
}
