// Game logic
import { useEffect, useState } from 'react';
import { Game } from '@wmg/shared';
import { GameContainer } from '@wmg/common';
import { DRAW_IT_CANVAS_ID, DRAW_IT_CONTAINER_ID } from './constants';
import { mountGame, unMountGame } from './game-manager';
import { Tools } from './hand';
import { GameManager } from './game-manager';

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

      <input
        type="range"
        min="1"
        max="25"
        value={GameManager.getGameManager()?.hand.brushRadius}
        onChange={e => {
          GameManager.getGameManager().hand.brushRadius = Number(e.target.value);
        }}
      />
      <button onClick={() => (GameManager.getGameManager().hand.activeTool = Tools.PAINT_BRUSH)}>pencil</button>
      <button onClick={() => (GameManager.getGameManager().hand.activeTool = Tools.RUBBER)}>rubber</button>
    </GameContainer>
  );
}
