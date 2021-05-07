import { GameListener } from "./game-listener";
import { DrawIt } from "./draw-it";
import { GameTypes } from "@wmg/shared";

const listeners: {
  gameType: GameTypes;
  listener: GameListener
}[] = [
  ...DrawIt.getListeners().map(listener => ({
    gameType: GameTypes.DRAWING,
    listener
  }))
]

export default listeners;
