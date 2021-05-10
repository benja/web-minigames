import styled from 'styled-components';
import { Icon, Text } from '../../atoms';
import { User } from '@wmg/shared';
import Avatar from 'react-avatar';
import React, { useState, useContext } from 'react';
import { StoreContext } from '../../../../utils/store';
import { faCheck, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface userEntryProps extends User {
  /*
  Is current user that is logged in
   */
  active?: boolean;

  usernameOverride: string;
  onUsernameChange: (name: string) => void;
  onUsernameSave: () => void;
  kickable?: boolean;
}
export function UserEntry(props: userEntryProps) {
  const { state } = useContext(StoreContext);
  const [showInput, setShowInput] = useState(false);

  return (
    <Container>
      <Avatar name={props.username.split(/(?=[A-Z])/).join(' ')} size="35" round="5px" />

      {showInput ? (
        <input value={props.usernameOverride} onChange={e => props.onUsernameChange(e.target.value)} />
      ) : (
        <Text tooltip={'Test'}>{props.username}</Text>
      )}
      {props.admin && <strong>👑</strong>}
      {props.kickable && (
        <Icon onClick={() => state.socket.kickLobbyPlayer(props.id)} icon={faSignOutAlt} tooltip={'Kick player'} />
      )}
      {(props.username === props.usernameOverride || showInput) && (
        <Icon
          icon={!showInput ? faEdit : faCheck}
          onClick={() => {
            if (!showInput) return setShowInput(true);
            props.onUsernameSave();
            setShowInput(false);
          }}
          tooltip={'Edit username'}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;

  > div:first-child {
    margin-right: 10px;
  }

  > div:last-child {
    margin-left: auto;
  }

  > p {
    margin: auto 0;
  }

  overflow-x: hidden;
`;

const Button = styled.button`
  background: #dedede;
  padding: 2px 7px;
  margin-left: 5px;
`;
