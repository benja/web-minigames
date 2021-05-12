import { useEffect } from 'react';
import { Game } from '@wmg/shared';
import { GameContainer } from '@wmg/common';
import { DRAW_IT_CANVAS_ID, DRAW_IT_CONTAINER_ID, Tools } from './constants';
import { mountGame, unMountGame } from './game-manager';
import styled from 'styled-components';
import { useState } from 'react';
import { DEFAULT_BRUSH_RADIUS } from './constants';
import { GameManager } from './game-manager';
import { DefaultStore } from '../utils/store';
import { GameSocket } from '../GameSocket';

interface DrawItProps {
  socket: SocketIOClient.Socket;
  game: Game;
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

export function DrawIt(props: DrawItProps) {
  const [state, dispatch] = useState<DefaultStore>({
    hand: {
      activeTool: Tools.PAINT_BRUSH,
      brushRadius: DEFAULT_BRUSH_RADIUS,
      color: '#000000',
    },
  });

  const [message, setMessage] = useState('');

  const isDrawer = state.game && state.gameSocket && state.game?.drawer === state.gameSocket?.socket?.id;

  useEffect(() => {
    mountGame();

    return () => {
      unMountGame();
    };
  }, []);

  useEffect(() => {
    if (state.gameSocket) return;

    const sockets = new GameSocket(props.socket, props.game, dispatch);

    dispatch(o => ({
      ...o,
      gameSocket: sockets,
    }));
  }, [props]);

  useEffect(() => {
    GameManager.getGameManager().setState(state);
  }, [state]);

  return (
    <Container>
      {/* Users */}

      {state.game && (
        <div>
          <h3>{state.game.word}</h3>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <GameContainer id={DRAW_IT_CONTAINER_ID}>
          <canvas id={DRAW_IT_CANVAS_ID} />
        </GameContainer>

        {/* Chat */}
        <div style={{ width: '600px', height: 'fit-content' }}></div>
      </div>

      {/* If you are current drawer */}
      {isDrawer && (
        <div style={{ padding: 20, background: '#ebce96' }}>
          <input
            type="range"
            min="1"
            max="25"
            value={state.hand?.brushRadius}
            onChange={e =>
              dispatch(o => ({
                ...o,
                hand: {
                  ...o.hand,
                  brushRadius: Number(e.target.value),
                },
              }))
            }
          />

          <div style={{ display: 'flex' }}>
            <ActiveColor color={state.hand?.color} />
            <ColorsContainer>
              {colors.map(c => (
                <Color
                  onClick={() =>
                    dispatch(o => ({
                      ...o,
                      hand: {
                        ...o.hand,
                        color: c,
                      },
                    }))
                  }
                  color={c}
                />
              ))}
            </ColorsContainer>
          </div>

          <button
            onClick={() =>
              dispatch(o => ({
                ...o,
                hand: {
                  ...o.hand,
                  activeTool: Tools.PAINT_BRUSH,
                },
              }))
            }
          >
            pencil
          </button>
          <button
            onClick={() =>
              dispatch(o => ({
                ...o,
                hand: {
                  ...o.hand,
                  activeTool: Tools.RUBBER,
                },
              }))
            }
          >
            rubber
          </button>
        </div>
      )}
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
