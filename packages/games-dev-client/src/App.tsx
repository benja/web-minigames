import React, { useEffect, useState } from 'react';
import { DrawIt } from '@wmg/games';
import { Game, GameTypes } from '@wmg/shared';
import io from 'socket.io-client';

const game: Game = {
  gameId: 'gameidasdsa',
  gameType: GameTypes.DRAWING,
  numRounds: 3,
  leaderboard: {
    leaderboardId: 'string',
    leaderboard: {
      21312321: 0,
      12312312: 0,
    },
  },
  players: [
    {
      id: '21312321',
      username: 'Matt',
    },
    {
      id: '12312312',
      username: 'Benja',
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
