import { useContext } from 'react';
import { StoreContext } from '../utils/store';

export function useLobby() {
  const { state } = useContext(StoreContext);

  return {
    isAdmin: () => {
      const user = state.lobby.players.find(p => p.id === state.account.id);
      return user && user.admin;
    },
  };
}
