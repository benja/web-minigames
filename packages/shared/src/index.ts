import { GameTypes } from "./utils/game-types";

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
  type: GameTypes;
}

export interface Lobby {
  id: string;
  players: User[];
}

export interface Queue {
  type: GameTypes;
}
