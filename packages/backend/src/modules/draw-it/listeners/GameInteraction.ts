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
    GameAPI.emitToCollection(game.getPlayers(), DrawItSocketEvents.GAME_INTERACTION, message);
  }
}
