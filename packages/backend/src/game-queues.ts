import { GameLobbySizes, GameTypes, SocketEvents } from "@wmg/shared";
import { Lobby } from "./utils/lobby";
import { getLobbyById } from "./lobby-manager";
import { getClientById } from "./client-manager";
import { startGame, startGameWithLobbies, startGameWithLobbyIds } from "./game-manager";

type LobbyMeta = {
  id: string;
  numPlayers: number;
};
const queues: Partial<Record<GameTypes, LobbyMeta[]>> = {};

export function addToQueue(lobby: Lobby, gameType: GameTypes) {
  if (!queues[gameType]) {
    queues[gameType] = [{
      id: lobby.getId(),
      numPlayers: lobby.getPlayers().length,
    }]
  } else {
    queues[gameType]!.push({
      id: lobby.getId(),
      numPlayers: lobby.getPlayers().length,
    })
  }
}

export function removeFromQueue(lobby: Lobby, gameType: GameTypes) {
  return removeFromQueueByLobbyId(lobby.getId(), gameType);
}

export function removeFromQueueByLobbyId(lobbyId: string, gameType: GameTypes) {
  if (!queues[gameType]) {
    return;
  } else {
    const index = queues[gameType]!.findIndex(l => l.id === lobbyId);
    if (index === -1) {
      return
    }
    queues[gameType]!.splice(index, 1)
  }
}

export function removeCollectionFromQueue(lobbies: Lobby[], gameType: GameTypes) {
  return removeCollectionFromQueueByLobbyId(lobbies.map(l => l.getId()), gameType)
}

export function removeCollectionFromQueueByLobbyId(lobbyIds: string[], gameType: GameTypes) {
  if (!queues[gameType]) {
    return;
  } else {
    queues[gameType] = queues[gameType]!.filter(l => !lobbyIds.includes(l.id));

    // Emit to each of the sockets in that room that the game has started
    startGameWithLobbyIds(gameType, lobbyIds);

    lobbyIds.forEach(lobby => {
      getLobbyById(lobby).getPlayers().forEach(player => {
        getClientById(player).socket.emit(SocketEvents.GAME_START, [])
      })
    });
  }
}

function findCombinactories(gameType: GameTypes) {
  const lobbyMax = GameLobbySizes[gameType as GameTypes];
  const queue = queues[gameType as GameTypes]!;

  if (queue.length === 0) {
    return;
  }

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
    const last = queue[queue.length - i];
    let combination = first.numPlayers + last.numPlayers;
    if (combination > lobbyMax) {
      break;
    } else if (combination === lobbyMax) {
      // Pair them and remove this one from the array
      removeCollectionFromQueueByLobbyId([first.id, last.id], gameType);
    } else {
      let group = [first.id, last.id];
      for (let j = i + 1; j < queue.length - i; j++) {
        const current = queue[j];
        const temporaryCombination = combination + current.numPlayers;
        if (temporaryCombination > lobbyMax) {
          break;
        } else if (temporaryCombination === lobbyMax) {
          // Pair them and remove this one from the array
          removeCollectionFromQueueByLobbyId([...group, current.id], gameType)
          break;
        } else {
          group = [...group, current.id];
        }
      }
    }
  }
}

setInterval(() => {
  Object.keys(queues).map((gameType: string) => {
    findCombinactories(gameType as GameTypes);
  })
}, 1000)
