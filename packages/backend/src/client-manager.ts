import { Socket } from 'socket.io';

export interface SocketUser {
  username?: string;
  socket: Socket;
  admin?: boolean;
  currentLobby?: string;
  currentGame?: string;
}
const clients: Map<string, SocketUser> = new Map();

export function addClient(socket: Socket): void {
  if (hasClient(socket)) throw new Error('User already exists in the cluster.');

  clients.set(socket.id, {
    socket,
  });
}

export function setClientUsername(socket: Socket, username: string): void {
  const client = clients.get(socket.id);
  if (!client) throw new Error('User does not exists in the cluster.');

  client.username = username;
}

export function getClientById(id: string): SocketUser {
  if (!clients.has(id)) throw new Error('Client does not exist.');
  return clients.get(id)!;
}

export function getClient(socket: Socket): SocketUser {
  if (!hasClient(socket)) throw new Error('Client does not exist.');
  return clients.get(socket.id)!;
}

export function deleteClient(user: SocketUser): void {
  if (!hasClient(user.socket)) throw new Error('No client exists with that socket identifier.');
  clients.delete(user.socket.id);
}

export function hasClient(socket: Socket): boolean {
  return clients.has(socket.id);
}
