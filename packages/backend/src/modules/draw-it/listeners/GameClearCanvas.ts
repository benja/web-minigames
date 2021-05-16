import { DrawItSocketEvents } from '@wmg/shared';
import { SocketUser } from '../../../client-manager';
import { GameListener } from '../../game-listener';
import { DrawIt } from '../DrawIt';
import GameAPI from '../../game-api';

export class GameClearCanvas extends GameListener {
  constructor() {
    super(DrawItSocketEvents.GAME_CLEAR_CANVAS);
  }

  async handle(user: SocketUser, game: DrawIt, message: string) {
    GameAPI.emitToCollection(
      game
        .getClientManager()
        .getPlayers()
        .map(p => p.socket.id),
      DrawItSocketEvents.GAME_CLEAR_CANVAS,
    );
  }
}
