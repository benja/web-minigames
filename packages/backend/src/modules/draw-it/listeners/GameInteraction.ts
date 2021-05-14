import { DrawItSocketEvents } from '@wmg/shared';
import { SocketUser } from '../../../client-manager';
import { GameListener } from '../../game-listener';
import GameAPI from '../../game-api';
import { DrawIt } from '../DrawIt';

export class GameInteraction extends GameListener {
  constructor() {
    super(DrawItSocketEvents.GAME_INTERACTION);
  }

  async handle(user: SocketUser, game: DrawIt, message: string) {
    game.startInteraction(user.socket, message);
  }
}
