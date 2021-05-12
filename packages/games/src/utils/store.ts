import { createContext, Dispatch, SetStateAction } from 'react';
import { Tools } from '../draw-it/constants';
import { GameSocket } from '../GameSocket';

export interface DefaultStore {
  gameSocket?: GameSocket;
  game?: {
    drawer: string;
    word: string;
    messages?: any[];
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
