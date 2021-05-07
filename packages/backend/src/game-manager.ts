import { GameTypes } from '@wmg/shared';
import { Lobby } from './utils/lobby';
import { getLobbyById } from './lobby-manager';
import { ClientHelper, GameCore } from './modules/game-core';
import { getClientById } from './client-manager';
import { DrawIt } from './modules/draw-it';

const games: Map<string, GameCore<GameTypes>> = new Map();

const moduleEvents: ClientHelper = {
  getClientById: (id: string) => {
    const client = getClientById(id);
    return {
      socket: client.socket,
      username: client.username,
    };
  },
};
function initGame(gameType: GameTypes, lobbies: Lobby[]): GameCore<GameTypes> {
  switch (gameType) {
    case GameTypes.DRAWING:
      return new DrawIt(moduleEvents, lobbies.map(l => l.getPlayers()).flat());
  }
}

export function startGame(gameType: GameTypes, lobby: Lobby): GameCore<GameTypes> {
  const game = initGame(gameType, [lobby]);
  if (games.has(game.getId())) {
    throw new Error('A game already exists with this id.');
  }
  games.set(game.getId(), game);
  return game;
}

export function startGameWithLobbyIds(gameType: GameTypes, lobbies: string[]): GameCore<GameTypes> {
  const game = initGame(
    gameType,
    lobbies.map(l => getLobbyById(l)),
  );
  if (games.has(game.getId())) {
    throw new Error('A game already exists with this id.');
  }
  games.set(game.getId(), game);
  return game;
}

export function startGameWithLobbies(gameType: GameTypes, lobbies: Lobby[]): GameCore<GameTypes> {
  const game = initGame(gameType, lobbies);
  if (games.has(game.getId())) {
    throw new Error('A game already exists with this id.');
  }
  games.set(game.getId(), game);
  return game;
}

export function getGame(gameId: string): GameCore<GameTypes> {
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
