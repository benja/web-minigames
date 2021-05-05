import { createContext, Dispatch, SetStateAction } from 'react';
import { Lobby, Queue, User } from '@wmg/shared';
import { Sockets } from '../socket';

export interface DefaultStore {
  socket?: Sockets;
  account?: User;
  lobby?: Lobby;
  queue?: Queue;
}

interface StoreContext {
  state: DefaultStore;
  dispatch: Dispatch<SetStateAction<DefaultStore>>;
}
export const StoreContext = createContext<StoreContext>({} as StoreContext);
