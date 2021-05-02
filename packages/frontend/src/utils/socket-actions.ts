import { SocketEvents } from '@wmg/shared';
import { useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { StoreContext } from './store';

export function useSocketActions() {
  const socketRef = useRef<SocketIOClient.Socket | null>(null);
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    socketRef.current = io('http://localhost:8080');

    socketRef.current?.on(SocketEvents.ERROR, (message: string) => {
      alert(message);
    });

    socketRef.current?.on(SocketEvents.LOBBY_JOIN, (data: { lobbyId: string; players: { username: string }[] }) => {
      dispatch(o => ({
        ...o,
        lobby: {
          id: data.lobbyId,
          players: data.players,
        },
      }));
    });

    socketRef.current?.on(SocketEvents.LOBBY_LEAVE, (username: string) => {
      dispatch(o => ({
        ...o,
        lobby: {
          ...o.lobby,
          players: o.lobby.players.filter(p => p.username !== username),
        },
      }));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [socketRef]);

  return {
    claimUsername: (username: string) => socketRef.current?.emit(SocketEvents.SET_USERNAME, username),
    createLobby: () => socketRef.current?.emit(SocketEvents.LOBBY_CREATE),
    joinLobby: (id: string) => socketRef.current?.emit(SocketEvents.LOBBY_JOIN, id),
    leaveLobby: () => socketRef.current?.emit(SocketEvents.LOBBY_LEAVE),
  };
}
