import { Socket } from 'socket.io';
import { Lobby } from './utils/lobby';
import { Game } from "@wmg/shared";

const lobbies: Map<string, Lobby> = new Map();

export function getLobbyById(id: string): Lobby {
  if (!lobbies.has(id)) {
    throw new Error('No lobby exists with this id.');
  }
  return lobbies.get(id)!;
}

export function createLobby(socket: Socket): Lobby {
  const lobby = new Lobby();
  if (lobbies.has(lobby.getId())) {
    throw new Error('A lobby already exists with this id.');
  }
  lobby.addPlayer(socket.id);
  lobbies.set(lobby.getId(), lobby);
  return lobby;
}

export function deleteLobby(lobbyId: string) {
  if (!lobbies.has(lobbyId)) {
    throw new Error('No lobby exists with this id.');
  }
  lobbies.delete(lobbyId);
}

export function leaveLobby(socket: Socket, lobbyId: string) {
  const lobby = lobbies.get(lobbyId);
  if (!lobby) {
    throw new Error('No lobby exists with this id.');
  }
  const empty = lobby.kickPlayer(socket.id);
  if (empty) {
    lobbies.delete(socket.id);
  }
}

export function setLobbyQueueStatus(lobbyId: string, inQueue: boolean) {
  const lobby = lobbies.get(lobbyId);
  if (!lobby) {
    throw new Error('No lobby exists with this id.');
  }
  lobby.setInQueue(inQueue);
  lobbies.set(lobby.getId(), lobby);
  return lobby;
}

export function setLobbyPrivate(lobbyId: string, status: boolean) {
  const lobby = lobbies.get(lobbyId);
  if (!lobby) {
    throw new Error('No lobby exists with this id.');
  }
  lobby.setPrivate(status);
  lobbies.set(lobby.getId(), lobby);
  return lobby;
}

export function setLobbyInGame(lobbyId: string, game: Game) {
  const lobby = lobbies.get(lobbyId);
  if (!lobby) {
    throw new Error('No lobby exists with this id.');
  }
  lobby.setGame(game);
  lobbies.set(lobby.getId(), lobby);
  return lobby;
}
