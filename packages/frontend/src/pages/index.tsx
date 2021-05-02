import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../ui/components/layouts';
import { StoreContext } from '../utils/store';

export default function Index() {
  const [username, setUsername] = useState('');
  const { state, dispatch } = useContext(StoreContext);

  const onConnect = () => {
    state.socket.updateUsername(username);
    state.socket.createLobby();
    dispatch(o => ({
      ...o,
      account: { username },
    }));
    localStorage?.setItem('username', username);
  };

  return (
    <Container>
      <label htmlFor="username">Enter your username</label>
      <Input id="username" name="username" type="text" onChange={e => setUsername(e.target.value)} />
      <Button onClick={onConnect} disabled={username.length === 0}>
        Join
      </Button>
    </Container>
  );
}

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
`;

const Button = styled.button`
  border: none;
  background: #52b788;
  color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  margin-top: 15px;
  cursor: pointer;
`;
