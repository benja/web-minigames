import React from 'react';
import styled from 'styled-components';
import { DefaultStore } from '../../utils/store';
import { User } from './User';

const users = [
  { id: 'asdsa', username: 'Benjamin' },
  { id: 'asdasd', username: 'Matthew' },
  { id: 'asdasdd', username: 'Chris' },
];

interface LeaderboardProps {
  state: DefaultStore;
}

export function Leaderboard({ state }: LeaderboardProps) {
  return (
    <Container>
      <SpacedContainer>
        <Heading>Leaderboard</Heading>
        {state.game?.currentRound && (
          <Round>
            Round {state.game.currentRound}/{state.gameSocket?.game?.numRounds}
          </Round>
        )}
      </SpacedContainer>
      {state.gameSocket?.game?.players.map(p => (
        <User
          key={`${p.id}-${p.username}`}
          user={p}
          position={users.indexOf(p) + 1}
          points={state.game?.totalScores && state.game?.totalScores[p.id]}
          drawer={state.game?.drawer === p.id}
          correct={state.game?.correctGuessors.includes(p.id)}
          streak={state.game?.correctGuessors.includes(p.id) && 1}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 250px;
  height: 100%;
  background: white;
  border-radius: 10px;
  padding: 10px;
`;

const SpacedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Heading = styled.p`
  font-size: 17px;
  color: #717171;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
`;

const Round = styled.p`
  font-size: 15px;
  color: black;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
`;
