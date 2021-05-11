// Game logic
import { useEffect } from 'react';
import { Game } from '@wmg/shared';
import { GameContainer } from '@wmg/common';
import { DRAW_IT_CANVAS_ID, DRAW_IT_CONTAINER_ID, Tools } from './constants';
import { mountGame, unMountGame } from './game-manager';
import styled from 'styled-components';
import { useState } from 'react';
import { DEFAULT_BRUSH_RADIUS } from './constants';
import { GameManager } from './game-manager';
import { GameTypes } from '@wmg/shared';
import { SocketEvents } from '@wmg/shared';
import { DrawItSocketEvents } from '@wmg/shared';

interface DrawItProps {
  socket: SocketIOClient.Socket;
  // game: Game;
  game: {
    gameId: string;
    gameType: GameTypes;
  };
}

const colors = [
  '#ffffff',
  '#CBCBC9',
  '#F12D08',
  '#F48500',
  '#FADD03',
  '#3FB601',
  '#47B2FF',
  '#2430DE',
  '#B51DC6',
  '#DE94B2',
  '#B1632E',
  '#000000',
  '#565656',
  '#861605',
  '#D44C00',
  '#F0AA00',
  '#17520A',
  '#255DA9',
  '#0A0B72',
  '#650B77',
  '#B56A7C',
  '#723B08',
];

export interface State {
  activeTool: Tools;
  brushRadius: number;
  color: string;
}

export function DrawIt(props: DrawItProps) {
  const [state, setState] = useState<State>({
    activeTool: Tools.PAINT_BRUSH,
    brushRadius: DEFAULT_BRUSH_RADIUS,
    color: '#000000',
  });

  useEffect(() => {
    mountGame(state);

    return () => {
      unMountGame();
    };
  }, []);

  useEffect(() => {
    GameManager.getGameManager().setState(state);
  }, [state]);

  return (
    <Container>
      <GameContainer id={DRAW_IT_CONTAINER_ID}>
        <canvas id={DRAW_IT_CANVAS_ID} />
      </GameContainer>

      <input
        type="range"
        min="1"
        max="25"
        value={state.brushRadius}
        onChange={e =>
          setState(o => ({
            ...o,
            brushRadius: Number(e.target.value),
          }))
        }
      />

      <div style={{ display: 'flex' }}>
        <ActiveColor color={state.color}></ActiveColor>
        <ColorsContainer>
          {colors.map(c => (
            <Color
              onClick={() =>
                setState(o => ({
                  ...o,
                  color: c,
                }))
              }
              color={c}
            ></Color>
          ))}
        </ColorsContainer>
      </div>

      <button
        onClick={() =>
          setState(o => ({
            ...o,
            activeTool: Tools.PAINT_BRUSH,
          }))
        }
      >
        pencil
      </button>
      <button
        onClick={() =>
          setState(o => ({
            ...o,
            activeTool: Tools.RUBBER,
          }))
        }
      >
        rubber
      </button>
    </Container>
  );
}

const Container = styled.div``;

const ColorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 330px;
`;

const ActiveColor = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.color};
  border-radius: 5px;
  margin-right: 15px;
`;

const Color = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  background: ${props => props.color};

  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;
