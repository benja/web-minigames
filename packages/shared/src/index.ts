import { GameTypes } from './utils/game-types';

export * from './utils/socket-events';
export * from './utils/game-types';

export interface User {
  id?: string;
  username: string;
  admin?: boolean;
  image?: string;
}

export interface Game {
  name: string;
  description: string;
  image: string;
  limit: number;
  players: User[];
  type: GameTypes;
}

export interface Message {
  id: string;
  username: string;
  message: string;
}

export interface Lobby {
  id: string;
  players: User[];
  private: boolean;
  messages?: Message[];
}

export interface Queue {
  type: GameTypes;
}
