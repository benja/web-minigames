import { useEffect } from 'react';
import { Game, Message, MessageType } from '@wmg/shared';
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
  const [time, setTime] = useState(0);

  const isDrawer = state.game && state.gameSocket && state.game?.drawer === state.gameSocket?.socket?.id;
  const hasGuessedCorrectly =
    state.game && state.gameSocket && state.game.correctGuessors.find(p => p === state.gameSocket.socket.id);

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
      game: {
        ...o.game,
        modal: false,
        correctGuessors: [],
        messages: [],
      },
    }));
  }, [props]);

  useEffect(() => {
    GameManager.getGameManager().setState(state);
    console.log(state);
  }, [state]);

  useEffect(() => {
    let timer = null;
    if (!state.game) return;

    if (state.game?.roundLength !== null) {
      setTime(state.game.roundLength);
      timer = setInterval(() => {
        setTime(t => t - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [state.game?.roundLength]);

  return (
    <Container>
      {/* Users */}
      <div style={{ display: 'flex' }}>
        {state.gameSocket?.game?.players.map(p => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 5,
              backgroundColor: state.game?.drawer === p.id ? 'gold' : 'rgba(0,0,0,.3)',
            }}
          >
            <img
              src={`https://avatars.dicebear.com/api/human/${p.username}.svg`}
              width="35"
              height="35"
              style={{ borderRadius: 999 }}
            />
            <p>{p.username}</p>
          </div>
        ))}
      </div>

      {state.game && (
        <div>
          {!isDrawer && state.game.roundLength && <h3>Time left: {time}</h3>}

          <h3>{state.game.word}</h3>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <GameContainer id={DRAW_IT_CONTAINER_ID}>
          {!state.game?.drawer && !state.game?.words && <p>The drawer is currently picking a word</p>}
          <Modal visible={state.game?.modal || false}>
            {isDrawer &&
              state.game?.words?.map(word => (
                <WordContainer onClick={() => state.gameSocket.pickWord(word)}>
                  <p>{word}</p>
                </WordContainer>
              ))}

            {!isDrawer && state.game?.roundScores && (
              <div style={{ background: 'orange', display: 'flex', flexDirection: 'column', width: '100%' }}>
                <h3>
                  The correct word was: <strong>{state.game.correctWord}</strong>
                </h3>
                <h3>Round scores</h3>
                {Object.keys(state.game?.roundScores).map(o => (
                  <p>
                    <strong>{state.gameSocket.game.players.find(p => p.id === o).username}</strong>
                    {state.game.roundScores[o]}
                  </p>
                ))}
              </div>
            )}
          </Modal>
          <canvas id={DRAW_IT_CANVAS_ID} />
        </GameContainer>

        {/* Chat */}
        <ChatContainer>
          {state.game?.messages && (
            <MessagesContainer>
              {state.game?.messages?.map(m => (
                <>
                  {m.type === MessageType.MESSAGE ? (
                    <p style={{ fontStyle: hasGuessedCorrectly && 'italic', color: hasGuessedCorrectly && '#dedede' }}>
                      <strong>{m.username}</strong>: {m.message}
                    </p>
                  ) : m.type === MessageType.ALERT ? (
                    <p>
                      <strong style={{ color: 'green' }}>{m.message}</strong>
                    </p>
                  ) : (
                    ''
                  )}
                </>
              ))}
            </MessagesContainer>
          )}
          {!isDrawer && (
            <form
              style={{ width: '600px', height: 'fit-content' }}
              onSubmit={e => {
                e.preventDefault();
                state.gameSocket.guessWord(message);
                setMessage('');
              }}
            >
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
              <button>Send message</button>
            </form>
          )}
        </ChatContainer>
      </div>

      {/* If you are current drawer */}
      {isDrawer && state.game?.roundLength && (
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

const Modal = styled.div<{ visible?: boolean }>`
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

const WordContainer = styled.div`
  display: flex;
  padding: 20px;
  margin-right: 10px;

  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 400px;
`;

const MessagesContainer = styled.div`
  overflow-y: scroll;
`;
