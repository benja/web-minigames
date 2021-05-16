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
      <Title>
        {isDrawer && state.game?.words
          ? 'Select your word to draw'
          : !isDrawer && state.game?.roundScores
          ? `The correct word was '${state.game.correctWord}'`
          : ''}
      </Title>

      {isDrawer && state.game?.words && (
        <SelectContainer>
          {state.game?.words?.map(w => (
            <WordBox onClick={() => state.gameSocket.pickWord(w)}>
              <Text>{w}</Text>
            </WordBox>
          ))}
        </SelectContainer>
      )}

      {!isDrawer && state.game?.roundScores && (
        <ScoreContainer>
          <h3>Round scores</h3>

          <Scores>
            {Object.keys(state.game?.roundScores).map(o => (
              <Name>
                <strong>{state.gameSocket.game.players.find(p => p.id === o).username}</strong>:
                <span>{state.game.roundScores[o]}</span>
              </Name>
            ))}
          </Scores>
        </ScoreContainer>
      )}
    </Container>
  );
}

const Container = styled.div<{ visible?: boolean }>`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgb(0 0 0 / 50%);
`;

const Title = styled.h1`
  font-size: 20px;
  color: white;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 50px;
`;

const WordBox = styled.div`
  background: white;
  height: fit-content;
  padding: 20px;
  margin-right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

const Text = styled.p`
  font-size: 20px;
  color: black;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Scores = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  font-size: 14.5px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
`;

const Points = styled.p<{ number?: number }>`
  font-size: 13px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;

  span {
    font-size: 12px;
    font-weight: inherit;
    font-family: inherit;
    color: ${props => (props.number ? '#57ec55' : '#ff4c4c')};
  }
`;
