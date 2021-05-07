import { DrawItSocketEvents, GameTypes } from '@wmg/shared';
import { SocketUser } from '../../../client-manager';
import { GameListener } from '../../game-listener';
import { GameCore } from '../../game-core';

export class GameInteraction extends GameListener {
  constructor() {
    super(DrawItSocketEvents.GAME_INTERACTION);
  }

  async handle(user: SocketUser, game: GameCore<GameTypes.DRAWING>, message: string) {
    game.emitToAll(DrawItSocketEvents.GAME_INTERACTION, message);
  }
}
