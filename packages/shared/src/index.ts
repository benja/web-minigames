import { GameTypes } from './utils/game-types';

export * from './utils/socket-events';
export * from './utils/game-types';

export interface User {
  id?: string;
  username: string;
  admin?: boolean;
}

export interface Game {
  name: string;
  description: string;
  image: string;
  limit: number;
  players: User[];
  type: GameTypes;
}

export interface Lobby {
  id: string;
  players: User[];
  private: boolean;
  messages?: { id: string; message: string }[];
}

export interface Queue {
  type: GameTypes;
}
