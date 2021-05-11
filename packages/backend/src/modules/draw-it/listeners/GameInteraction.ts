import { DrawItSocketEvents, GameTypes } from '@wmg/shared';
import { SocketUser } from '../../../client-manager';
import { GameListener } from '../../game-listener';
import { GameCore } from '../../game-core';
import GameAPI from '../../game-api';

export class GameInteraction extends GameListener {
  constructor() {
    super(DrawItSocketEvents.GAME_INTERACTION);
  }

  async handle(user: SocketUser, game: GameCore<GameTypes.DRAWING>, message: string) {
    // TODO: Make sure only the drawer the can do this
    GameAPI.emitToSockets(game.getClientManager().getSockets(), DrawItSocketEvents.GAME_INTERACTION, message);
  }
}
