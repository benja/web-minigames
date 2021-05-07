// Game logic
import React, { useEffect } from 'react';
import { Game } from '@wmg/shared';
import { GameContainer } from '@wmg/common';
import { DRAW_IT_CANVAS_ID, DRAW_IT_CONTAINER_ID } from './constants';
import { mountGame, unMountGame } from './game-manager';

interface DrawItProps {
  socket: SocketIOClient.Socket;
  game: Game;
}

export function DrawIt(props: DrawItProps) {
  useEffect(() => {
    mountGame();

    return () => {
      unMountGame();
    };
  }, []);

  return (
    <GameContainer id={DRAW_IT_CONTAINER_ID}>
      <canvas id={DRAW_IT_CANVAS_ID} />
    </GameContainer>
  );
}
