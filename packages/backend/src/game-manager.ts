import { GameTypes } from '@wmg/shared';
import { GameLobby } from './utils/game';
import { Lobby } from './utils/lobby';
import { getLobbyById } from './lobby-manager';

const games: Map<string, GameLobby> = new Map();

export function startGame(gameType: GameTypes, lobby: Lobby): GameLobby {
  const game = new GameLobby(gameType, lobby.getPlayers());
  if (games.has(game.getId())) {
    throw new Error('A game already exists with this id.');
  }
  games.set(game.getId(), game);
  return game;
}

export function startGameWithLobbyIds(gameType: GameTypes, lobbies: string[]): GameLobby {
  const game = new GameLobby(gameType, lobbies.map(l => getLobbyById(l).getPlayers()).flat());
  if (games.has(game.getId())) {
    throw new Error('A game already exists with this id.');
  }
  games.set(game.getId(), game);
  return game;
}

export function startGameWithLobbies(gameType: GameTypes, lobbies: Lobby[]): GameLobby {
  const game = new GameLobby(gameType, lobbies.map(l => l.getPlayers()).flat());
  if (games.has(game.getId())) {
    throw new Error('A game already exists with this id.');
  }
  games.set(game.getId(), game);
  return game;
}

export function getGame(gameId: string): GameLobby {
  if (!games.has(gameId)) {
    throw new Error('No game exists with this game identifier.');
  }
  return games.get(gameId)!;
}

export function endGame(gameId: string): void {
  if (!games.has(gameId)) {
    throw new Error('No game exists with this game identifier.');
  }
  return void games.delete(gameId);
}
