import { ClientHelper, GameCore } from "../game-core";
import { DrawItSocketEvents, GameTypes } from "@wmg/shared";
import listeners from "./listeners";
import { GameListener } from "../game-listener";

export class DrawIt extends GameCore<GameTypes.DRAWING> {
  constructor(clientManager: ClientHelper, players: string[]) {
    super(GameTypes.DRAWING, players, clientManager);
  }

  onGameEnd(): void {
    return this.emitToAll(DrawItSocketEvents.GAME_END);
  }

  onGameStart(): void {
    return this.emitToAll(DrawItSocketEvents.GAME_START);
  }

  onPlayerLeave(socketId: string): void {
    this.players = this.players.filter(p => p !== socketId);
    return this.emitToAll(DrawItSocketEvents.GAME_PLAYER_LEAVE, socketId);
  }

  getListeners(): GameListener[] {
    return listeners;
  }
}
