import { Socket } from 'socket.io';

interface SocketUser {
  username?: string;
  socket: Socket;
  admin?: boolean;
  currentLobby?: string;
}
export const clients: Map<string, SocketUser> = new Map();

export function addClient(socket: Socket): void {
  if (hasClient(socket)) throw new Error('User already exists in the cluster.');

  clients.set(socket.id, {
    socket,
  });
}

export function setClientUsername(socket: Socket, username: string): void {
  const client = clients.get(socket.id);
  if (!client) throw new Error('User does not exists in the cluster.');

  clients.set(socket.id, {
    ...client,
    username,
  });
}

export function setClientAdmin(id: Socket['id'], status: boolean): void {
  const client = getClientById(id);
  if (!client) throw new Error('User does not exists in the cluster.');

  clients.set(id, {
    ...client,
    admin: status,
  });
}

export function getClientById(id: string): SocketUser {
  if (!clients.has(id)) throw new Error('Client does not exist.');
  return clients.get(id)!;
}

export function getClient(socket: Socket): SocketUser {
  if (!hasClient(socket)) throw new Error('Client does not exist.');
  return clients.get(socket.id)!;
}

export function deleteClient(socket: Socket): void {
  if (!hasClient(socket)) throw new Error('No client exists with that socket identifier.');
  clients.delete(socket.id);
}

export function hasClient(socket: Socket): boolean {
  return clients.has(socket.id);
}

export function setCurrentLobby(socket: Socket, lobbyId: string | undefined): void {
  if (!hasClient(socket)) throw new Error('No client exists with that socket identifier');
  clients.set(socket.id, {
    ...clients.get(socket.id)!,
    currentLobby: lobbyId,
  });
}

setInterval(() => {
  clients.forEach(c => {
    console.log({
      id: c.socket.id,
      username: c.username,
      admin: c.admin,
      currentLobby: c.currentLobby,
    });
  });
}, 5000);
