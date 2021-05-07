import React, { useEffect, useState } from 'react';
import { DrawIt } from '@wmg/games';
import { Game, GameTypes } from '@wmg/shared';
import io from 'socket.io-client';

const game: Game = {
  name: 'Something',
  description: 'A description',
  image: '',
  limit: 8,
  type: GameTypes.DRAWING,
  players: [
    {
      id: 'Matt',
      username: 'Matt',
      admin: true,
    },
  ],
};

export default function App() {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  useEffect(() => {
    if (!socket) {
      setSocket(io('http://localhost:8080'));
    }
  }, [socket]);

  if (!socket) {
    return <p>Establishing the socket connection...</p>;
  }

  return <DrawIt game={game} socket={socket} />;
}
