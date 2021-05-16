import React from 'react';
import styled from 'styled-components';
import { isTypeAliasDeclaration } from 'typescript';
import { DefaultStore } from '../../utils/store';

interface ModalProps {
  state: DefaultStore;
}

export function Modal({ state }: ModalProps) {
  const isDrawer = state.game && state.gameSocket && state.game?.drawer === state.gameSocket?.socket?.id;

  return (
    <Container visible={state.game?.modal || false}>
      <Title></Title>

      {isDrawer &&
        state.game?.words?.map(w => (
          <WordBox onClick={() => state.gameSocket.pickWord(w)}>
            <p>{w}</p>
          </WordBox>
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
    </Container>
  );
}

const Container = styled.div<{ visible?: boolean }>`
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 20px;
  color: white;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
`;

const WordBox = styled.div`
  display: flex;
  padding: 20px;
  margin-right: 10px;

  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;
