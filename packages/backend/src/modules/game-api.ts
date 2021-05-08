import { getClientById } from '../client-manager';

export default class GameAPI {
  public static emit(player: string, eventName: string, data?: any): void {
    const client = getClientById(player);
    return void client.socket.emit(eventName, data);
  }

  public static emitToCollection(players: string[], eventName: string, data?: any) {
    players.forEach(player => {
      getClientById(player).socket.emit(eventName, data);
    });
  }
}
