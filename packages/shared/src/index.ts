export * from './utils/socket-events';
export * from './utils/game-types';

export interface User {
  image?: string;
  username: string;
}

export interface Game {
  name: string;
  description: string;
  image: string;
  players: User[];
}

export interface Lobby {
  id: string;
  players: User[];
}
