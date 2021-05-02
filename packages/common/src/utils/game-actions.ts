import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export function useGameActions() {
  const socketRef = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:8080');

    return () => {
      socketRef.current?.disconnect();
    };
  }, [socketRef]);

  return {
    login: (username: string) => socketRef.current?.emit('login', { username }),
    joinLobby: (lobbyId: string) => socketRef.current?.emit('joinLobby', { lobbyId })
  };
}
