import { GameTypes } from '@wmg/shared';
import { Lobby } from './utils/lobby';
import { GameCore } from './modules/game-core';
import { DrawIt } from './modules/draw-it';
import { getClientById, setCurrentGame } from './client-manager';

const games: Map<string, GameCore<GameTypes>> = new Map();

function initGame(gameType: GameTypes, lobbies: Lobby[]): GameCore<GameTypes> {
  switch (gameType) {
    case GameTypes.DRAWING:
      return new DrawIt(
        lobbies
          .map(l =>
            l.getPlayers().map(p => {
              const client = getClientById(p);
              return {
                username: client.username!,
                socket: client.socket,
              };
            }),
          )
          .flat(),
      );
  }
}

export function startGameWithLobbies(gameType: GameTypes, lobbies: Lobby[]): GameCore<GameTypes> {
  const game = initGame(gameType, lobbies);
  if (games.has(game.getId())) {
    throw new Error('A game already exists with this id.');
  }
  games.set(game.getId(), game);
  game
    .getClientManager()
    .getSockets()
    .forEach(socket => setCurrentGame(socket, game.getId()));

  game.start();
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
    return;
  }
  return void games.delete(gameId);
}
