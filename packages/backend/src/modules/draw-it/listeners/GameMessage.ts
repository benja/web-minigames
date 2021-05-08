import { DrawItSocketEvents } from '@wmg/shared';
import { SocketUser } from '../../../client-manager';
import { GameListener } from '../../game-listener';
import { DrawIt } from '../DrawIt';

export class GameMessage extends GameListener {
  constructor() {
    super(DrawItSocketEvents.GAME_SEND_MESSAGE);
  }

  async handle(user: SocketUser, game: DrawIt, message: string) {
    game.guessWord(user.socket.id, message);
  }
}
