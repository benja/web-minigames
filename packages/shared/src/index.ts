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
  gameId: string;
  gameType: string;
  leaderboard: {
    [key: string]: number;
  };
  leaderboardId: string;
  players: {
    id: string;
    username: string;
  }[];
}

export interface GameListing {
  name: string;
  description: string;
  type: GameTypes;
  limit: number;
  image: string;
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
