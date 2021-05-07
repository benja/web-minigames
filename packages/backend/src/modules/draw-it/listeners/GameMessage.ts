import { DrawItSocketEvents, GameTypes } from "@wmg/shared";
import { SocketUser } from "../../../client-manager";
import { GameListener } from "../../game-listener";
import { GameCore } from "../../game-core";

export class GameMessage extends GameListener {
  constructor() {
    super(DrawItSocketEvents.GAME_SEND_MESSAGE);
  }

  async handle(user: SocketUser, game: GameCore<GameTypes.DRAWING>, message: string) {
    game.emitToAll(DrawItSocketEvents.GAME_SEND_MESSAGE, message);
  }
}
