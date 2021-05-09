import { Centered } from '../../layouts/Centered';
import { Button, Text } from '../../atoms';
import { AvatarRow } from '../../molecules';
import { GameLobbySizes, GameTypes, User } from '@wmg/shared';
import React from 'react';
import styled from 'styled-components';

interface InQueueProps {
  isAdmin: boolean;
  queueType: GameTypes;
  lobbyPlayers: User[];
  onLeaveQueue: () => void;
}
export function InQueue(props: InQueueProps) {
  return (
    <Centered>
      <Text header>You are currently in queue for {props.queueType}...</Text>
      <AvatarRow
        users={(function () {
          const emptyUsers = new Array(GameLobbySizes[props.queueType]).fill({});
          props.lobbyPlayers.forEach((p, i) => (emptyUsers[i] = p));
          return emptyUsers;
        })()}
        showName
      />
      {props.isAdmin && (
        <ButtonContainer>
          <Button text={'Leave queue'} onClick={props.onLeaveQueue} />
        </ButtonContainer>
      )}
    </Centered>
  );
}

const ButtonContainer = styled.div`
  > button {
    width: fit-content;
  }
`;
