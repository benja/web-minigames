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
  numRounds: number;
  leaderboard: {
    leaderboardId: string;
    leaderbord: Record<string, number>;
  };
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

export enum MessageType {
  ALERT = 'game_alert',
  MESSAGE = 'game_message',
}

export interface Message {
  type: MessageType;
  id?: string;
  username?: string;
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
