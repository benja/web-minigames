export * from './utils/socket-events';

export interface User {
  image?: string;
  username: string;
}

export interface Game {
  name: string;
  description: string;
  image: string;
}

export interface Lobby {
  id: string;
  players: User[];
}
