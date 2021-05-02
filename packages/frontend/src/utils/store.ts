import { createContext, Dispatch, SetStateAction } from 'react';
import { Lobby, User } from '@wmg/shared';

export interface DefaultStore {
  socket?: SocketIOClient.Socket;
  account?: User;
  lobby?: Lobby;
}

interface StoreContext {
  state: DefaultStore;
  dispatch: Dispatch<SetStateAction<DefaultStore>>;
}
export const StoreContext = createContext<StoreContext>({} as StoreContext);
