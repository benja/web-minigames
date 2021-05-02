import { createContext, Dispatch, SetStateAction } from "react";
import { Lobby, User } from "@wmg/shared";

export interface IDefaultStore {
  socket?: SocketIOClient.Socket;
  account?: User;
  lobby?: Lobby;
}
interface IStoreContext {
  state: IDefaultStore;
  dispatch: Dispatch<SetStateAction<IDefaultStore>>;
}
export const StoreContext = createContext<IStoreContext>({} as IStoreContext);
