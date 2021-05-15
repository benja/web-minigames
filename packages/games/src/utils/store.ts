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
    correctGuessors: string[];
    words?: string[];
    modal: boolean;
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
