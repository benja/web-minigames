// Game logic
import React from "react";
import { Game } from '@wmg/shared';
import { GameContainer } from '@wmg/common';
import { DRAW_IT_CANVAS_ID, DRAW_IT_CONTAINER_ID } from './constants';

interface DrawItProps {
  socket: SocketIOClient.Socket;
  game: Game;
}
export function DrawIt(props: DrawItProps) {
  return (
    <GameContainer id={DRAW_IT_CONTAINER_ID}>
      <canvas id={DRAW_IT_CANVAS_ID} />
    </GameContainer>
  )
}
