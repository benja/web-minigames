import { GameLobbySizes, GameTypes } from '@wmg/shared';
import { Lobby } from './utils/lobby';
import { startGameWithLobbies } from './game-manager';

const queues: Record<GameTypes, Lobby[]> = {
  [GameTypes.DRAWING]: [],
};

export function addToQueue(lobby: Lobby, gameType: GameTypes) {
  if (lobby.getPlayers().length === GameLobbySizes[gameType]) {
    startGameWithLobbies(gameType, [lobby]);
    return;
  }

  const queue = queues[gameType];
  if (!!queue.find(l => l.getId() === lobby.getId())) {
    throw new Error('Your lobby is already in a queue.');
  }
  queues[gameType].push(lobby);
  lobby.setInQueue(gameType);
}

export function removeFromQueue(lobby: Lobby, gameType: GameTypes) {
  return removeCollectionFromQueue([lobby], gameType);
}

export function removeCollectionFromQueue(lobbies: Lobby[], gameType: GameTypes) {
  const ids = lobbies.map(l => l.getId());
  queues[gameType] = queues[gameType]!.filter(l => !ids.includes(l.getId()));
  lobbies.forEach(lobby => lobby.setInQueue(null));
}

function findCombinactories(gameType: GameTypes) {
  const lobbyMax = GameLobbySizes[gameType as GameTypes];
  const queue = queues[gameType as GameTypes]!;

  if (queue.length === 0) return;

  if (queue.length === 1) {
    if (queue[0].getPlayers().length === lobbyMax) {
      // Pair them and remove this one from the array
      removeCollectionFromQueue([queue[0]], gameType);
      startGameWithLobbies(gameType, [queue[0]]);
    }
    return;
  }

  queue.sort((a, b) => a.getPlayers().length - b.getPlayers().length);

  for (let i = 0; i < Number(queue.length / 2); i++) {
    const first = queue[i];
    const last = queue[queue.length - (i + 1)];

    let combination = first.getPlayers().length + last.getPlayers().length;
    if (combination > lobbyMax) {
      break;
    } else if (combination === lobbyMax) {
      // Pair them and remove this one from the array
      removeCollectionFromQueue([first, last], gameType);
      startGameWithLobbies(gameType, [first, last]);
    } else {
      let group = [first, last];

      // If the length of these two is the same length as the list (could just do equals 2)
      // Then break because we already know its not a fit
      if (group.length === queue.length) {
        break;
      }

      for (let j = i + 1; j < queue.length - (i + 1); j++) {
        const current = queue[j];
        const temporaryCombination = combination + current.getPlayers().length;

        if (temporaryCombination === lobbyMax) {
          // Pair them and remove this one from the array
          removeCollectionFromQueue([...group, current], gameType);
          startGameWithLobbies(gameType, [...group, current]);
          break;
        } else {
          // Add to the group of potentially matched candidates
          // Increment the combination key for next iteration
          group = [...group, current];
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
