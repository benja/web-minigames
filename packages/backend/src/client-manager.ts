import { Socket } from "socket.io";

interface SocketUser {
  username: string;
  socket: Socket;
  currentLobby?: string;
}
const clients: Map<string, SocketUser> = new Map();

export function addClient(socket: Socket, username: string) {
  if (clients.has(socket.id)) {
    throw new Error("User already exists in the cluster.")
  }
  clients.set(socket.id, {
    username,
    socket
  })
}

export function getClientById(id: string): SocketUser {
  if (!clients.has(id)) {
    throw new Error("Client does not exist.")
  }
  return clients.get(id)!;
}

export function getClient(socket: Socket): SocketUser {
  if (!hasClient(socket)) {
    throw new Error("Client does not exist.")
  }
  return clients.get(socket.id)!;
}

export function deleteClient(socket: Socket) {
  if (!clients.has(socket.id)) {
    throw new Error("No client exists with that socket identifier.")
  }
  clients.delete(socket.id);
}

export function hasClient(socket: Socket) {
  return clients.has(socket.id);
}

export function setCurrentLobby(socket: Socket, lobbyId: string | undefined) {
  if (clients.has(socket.id)) {
    clients.set(socket.id, {
      ...clients.get(socket.id)!,
      currentLobby: lobbyId
    })
  }
}
