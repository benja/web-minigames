import { Socket } from "socket.io";
import { Lobby } from "./utils/lobby";

const lobbies: Map<string, Lobby> = new Map();

export function createLobby(socket: Socket): Lobby {
  const lobby = new Lobby();
  if (lobbies.has(lobby.getId())) {
    throw new Error("A lobby already exists with this id.")
  }
  lobby.addPlayer(socket.id);
  lobbies.set(lobby.getId(), lobby);
  return lobby;
}

export function deleteLobby(lobbyId: string) {
  if (!lobbies.has(lobbyId)) {
    throw new Error("No lobby exists with this id.")
  }
  lobbies.delete(lobbyId);
}

export function leaveLobby(socket: Socket, lobbyId: string) {
  const lobby = lobbies.get(lobbyId);
  if (lobby) {
    const full = lobby.kickPlayer(socket.id);
    if (full) {
      lobbies.delete(socket.id);
    }
  } else {

  }
}
