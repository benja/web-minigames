import { createContext, Dispatch, SetStateAction } from 'react';
import { Tools } from '../draw-it/constants';
import { GameSocket } from '../GameSocket';
import { Message } from '@wmg/shared';
export interface DefaultStore {
  gameSocket?: GameSocket;
  game?: {
    drawer: string;
    word: string;
    messages: Message[];
    roundLength?: number | null;
    roundScores?: { id: number }[];
    totalScores?: { id: number }[];
    correctWord?: string;
    currentRound?: number;
    correctGuessors: string[];
    words?: string[];
    modal: boolean;
    players: {
      id: string;
      username: string;
    }[];
  };
  hand?: {
    activeTool: Tools;
    brushRadius: number;
    color: string;
  };
}

interface StoreContext {
  state: DefaultStore;
  dispatch: Dispatch<SetStateAction<DefaultStore>>;
}

export const StoreContext = createContext<StoreContext>({} as StoreContext);
