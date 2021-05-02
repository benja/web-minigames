import React, { useState } from 'react';
import { useGameActions } from '@wmg/common';
import styled from 'styled-components';
import { useContext } from 'react';
import { StoreContext } from '../utils/store';
import { Container } from "../ui/components/layouts";

export default function Index() {
  const [username, setUsername] = useState('');
  const { login } = useGameActions();
  const store = useContext(StoreContext);

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
