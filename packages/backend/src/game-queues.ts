import { GameLobbySizes, GameTypes, SocketEvents } from '@wmg/shared';
import { Lobby } from './utils/lobby';
import { getLobbyById } from './lobby-manager';
import { getClientById } from './client-manager';
import { startGameWithLobbyIds } from './game-manager';

type LobbyMeta = {
  id: string;
  numPlayers: number;
};

const queues: Record<GameTypes, LobbyMeta[]> = {
  [GameTypes.DRAWING]: []
};

export function addToQueue(lobby: Lobby, gameType: GameTypes) {
  queues[gameType].push({
    id: lobby.getId(),
    numPlayers: lobby.getPlayers().length,
  });
}

export function removeFromQueue(lobby: Lobby, gameType: GameTypes) {
  return removeFromQueueByLobbyId(lobby.getId(), gameType);
}

export function removeFromQueueByLobbyId(lobbyId: string, gameType: GameTypes) {
  return removeCollectionFromQueueByLobbyId([lobbyId], gameType);
}

export function removeCollectionFromQueue(lobbies: Lobby[], gameType: GameTypes) {
  return removeCollectionFromQueueByLobbyId(
    lobbies.map(l => l.getId()),
    gameType,
  );
}

export function removeCollectionFromQueueByLobbyId(lobbyIds: string[], gameType: GameTypes) {
  queues[gameType] = queues[gameType]!.filter(l => !lobbyIds.includes(l.id));

  // Emit to each of the sockets in that room that the game has started
  const game = startGameWithLobbyIds(gameType, lobbyIds);

  lobbyIds.forEach(lobby => {
    getLobbyById(lobby)
      .getPlayers()
      .forEach(player => {
        getClientById(player).socket.emit(SocketEvents.GAME_START, {
          ...game,
          clientManager: undefined
        });
      });
  });
}

function findCombinactories(gameType: GameTypes) {
  const lobbyMax = GameLobbySizes[gameType as GameTypes];
  const queue = queues[gameType as GameTypes]!;

  if (queue.length === 0) return;

  if (queue.length === 1) {
    if (queue[0].numPlayers === lobbyMax) {
      // Pair them and remove this one from the array
      removeFromQueueByLobbyId(queue[0].id, gameType);
    }
    return;
  }

  queue.sort((a, b) => a.numPlayers - b.numPlayers);

  for (let i = 0; i < Number(queue.length / 2); i++) {
    const first = queue[i];
    const last = queue[queue.length - (i + 1)];

    let combination = first.numPlayers + last.numPlayers;
    if (combination > lobbyMax) {
      break;
    } else if (combination === lobbyMax) {
      // Pair them and remove this one from the array
      removeCollectionFromQueueByLobbyId([first.id, last.id], gameType);
    } else {
      let group = [first.id, last.id];

      // If the length of these two is the same length as the list (could just do equals 2)
      // Then break because we already know its not a fit
      if (group.length === queue.length) {
        break;
      }

      for (let j = i + 1; j < queue.length - (i + 1); j++) {
        const current = queue[j];
        const temporaryCombination = combination + current.numPlayers;

        if (temporaryCombination === lobbyMax) {
          // Pair them and remove this one from the array
          removeCollectionFromQueueByLobbyId([...group, current.id], gameType);
          break;
        } else {
          // Add to the group of potentially matched candidates
          // Increment the combination key for next iteration
          group = [...group, current.id];
          combination = temporaryCombination;
        }
      }
    }
  }
}

setInterval(() => {
  try {
    console.log(`Checking ${Object.keys(queues).length} current queues:`);
    Object.keys(queues).map((gameType: string) => {
      console.log(`[${gameType}] - ${queues[gameType as GameTypes]!.length} players in the queue`);
      findCombinactories(gameType as GameTypes);
    });
  } catch (err) {
    console.log(err);
  }
}, 5000);
