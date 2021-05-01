import React, { useEffect, useState } from 'react';
import { useGameActions } from '@wmg/common';
import styled from 'styled-components';
import { useContext } from 'react';
import { StoreContext } from '../utils/store';

export default function Index() {
  const [username, setUsername] = useState('');
  const { login } = useGameActions();
  const store = useContext(StoreContext);

  console.log(store.lobby);

  const onLogin = () => {
    login({ username });
  };

  return (
    <Container>
      <label htmlFor="username">Enter your username</label>
      <Input id="username" name="username" type="text" onChange={e => setUsername(e.target.value)} />
      <Button onClick={onLogin}>Join</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 500px;
  background: #dedede;
  padding: 2rem;
`;

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
