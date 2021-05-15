import { DrawItSocketEvents } from '@wmg/shared';
import { SocketUser } from '../../../client-manager';
import { GameListener } from '../../game-listener';
import { DrawIt } from '../DrawIt';

export class GamePickWord extends GameListener {
  constructor() {
    super(DrawItSocketEvents.GAME_PICK_WORD);
  }

  async handle(user: SocketUser, game: DrawIt, message: string) {
    game.getRoundManager().getCurrentRound()?.getCurrentTurn()?.selectWord(user.socket.id, message);
  }
}
