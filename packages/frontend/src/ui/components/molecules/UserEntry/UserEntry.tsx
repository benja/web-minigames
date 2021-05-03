import styled from 'styled-components';
import { Text } from '../../atoms';
import { User } from '@wmg/shared';
import Avatar from 'react-avatar';
import { useState, useContext } from 'react';
import { StoreContext } from '../../../../utils/store';

interface userEntryProps extends User {}

export function UserEntry(props: userEntryProps) {
  const { state } = useContext(StoreContext);

  const [username, setUsername] = useState(state.account.username);
  const [showInput, setShowInput] = useState(false);

  return (
    <Container>
      <Avatar
        name={
          props.username === state.account.username
            ? username.split(/(?=[A-Z])/).join(' ')
            : props.username.split(/(?=[A-Z])/).join(' ')
        }
        size="35"
        round="5px"
      />

      {showInput ? (
        <input value={username} onChange={e => setUsername(e.target.value)} />
      ) : (
        <Text>{props.username === state.account.username ? username : props.username}</Text>
      )}
      {props.admin && <strong>👑</strong>}
      {state.account.admin && props.username !== state.account.username && (
        <Button
          onClick={() => {
            state.socket.kickLobbyPlayer(props.id);
          }}
        >
          Kick
        </Button>
      )}
      {props.username === state.account.username && (
        <Button
          onClick={() => {
            if (!showInput) return setShowInput(true);
            state.socket.updateUsername(username);
            setShowInput(false);
          }}
        >
          {showInput ? 'Save' : 'Edit'}
        </Button>
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
