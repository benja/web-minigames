import React from 'react';

export const defaultStore = {
  account: {
    socket: {} as SocketIOClient.Socket,
    username: null,
  },
  lobby: {
    id: null,
    players: [],
  },
};

export const StoreContext = React.createContext(defaultStore);
