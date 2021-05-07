import { GameMessage } from "./GameMessage";
import { GameListener } from "../../game-listener";

const events: GameListener[] = [
  new GameMessage()
]

export default events;
