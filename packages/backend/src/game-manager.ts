import { GameTypes } from "@wmg/shared";
import { GameLobby } from "./utils/game";
import { Lobby } from "./utils/lobby";

const games: Map<string, GameLobby> = new Map();

export function startGame(gameType: GameTypes, lobby: Lobby): GameLobby {
  const game = new GameLobby(gameType, lobby.getPlayers());
  if (games.has(game.getId())) {
    throw new Error("A game already exists with this id.")
  }
  games.set(game.getId(), game);
  return game;
}

export function getGame(gameId: string): GameLobby {
  if (!games.has(gameId)) {
    throw new Error("No game exists with this game identifier.")
  }
  return games.get(gameId)!;
}

export function endGame(gameId: string): void {
  if (!games.has(gameId)) {
    throw new Error("No game exists with this game identifier.")
  }
  return void games.delete(gameId);
}
