export * from './utils/socket-events';

export interface User {
  id?: string;
  username: string;
  admin?: boolean;
}

export interface Game {
  name: string;
  description: string;
  image: string;
}

export interface Lobby {
  id: string;
  players: User[];
  messages?: { id: string; message: string }[];
}
