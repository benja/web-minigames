import React, { useEffect, useState } from 'react';
import { Game } from '@wmg/shared';
import styled, { createGlobalStyle } from 'styled-components';
import { Leaderboard } from './components/Leaderboard';
import { Canvas } from './components/Canvas';
import { Chat } from './components/Chat';
import { DEFAULT_BRUSH_RADIUS, Tools } from './constants';
import { DefaultStore } from '../utils/store';
import { mountGame, unMountGame, GameManager } from './game-manager';
import { GameSocket } from '../GameSocket';

interface DrawItProps {
  socket: SocketIOClient.Socket;
  game: Game;
}

export function DrawIt(props: DrawItProps) {
  const [state, dispatch] = useState<DefaultStore>({
    hand: {
      activeTool: Tools.PAINT_BRUSH,
      brushRadius: DEFAULT_BRUSH_RADIUS,
      color: '#000000',
    },
  });

  const [message, setMessage] = useState('');

  // Functions to handle logic
  const handleMessageSend = e => {
    e.preventDefault();
    state.gameSocket.guessWord(message);
    setMessage('');
  };

  // Effects
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
        players: sockets.game.players,
      },
    }));
  }, [props]);

  useEffect(() => {
    GameManager.getGameManager().setState(state);
    console.log(state);
  }, [state]);

  return (
    <Container>
      <GlobalStyle />
      <Background />
      <ContentContainer>
        <Leaderboard state={state} />
        <Canvas state={state} dispatch={dispatch} />
        <Chat
          state={state}
          messages={state.game?.messages}
          message={message}
          onSubmit={handleMessageSend}
          onChange={e => setMessage(e.target.value)}
        />
      </ContentContainer>
    </Container>
  );
}

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  z-index: 2;
  position: relative;
  margin: auto;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 1250px;
  height: 600px;
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #0797ff;
  background-blend-mode: multiply;

  &::before {
    content: '';
    background-image: url('/drawit/background.png');
    background-repeat: repeat;
    background-blend-mode: multiply;
    opacity: 0.2;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
`;
