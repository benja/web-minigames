import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import { Message } from '@wmg/shared';
import { Text } from '../../atoms';

interface MessageBoxProps {
  messages: Message[];
}
export function MessageBox(props: MessageBoxProps) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [props.messages]);

  return (
    <Container ref={ref}>
      {props.messages.map((m, index) => (
        <MessageContainer key={`message-${m}-${index}`}>
          <Avatar name={m.username.split(/(?=[A-Z])/).join(' ')} size="25" round="5px" />
          <Text header style={{ marginLeft: 5 }}>
            {m.username}:
          </Text>
          <Text style={{ marginLeft: 5 }}>{m.message}</Text>
        </MessageContainer>
      ))}
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid ${props => props.theme.textPrimary};
  border-radius: 5px;
  height: 250px;
  flex-grow: 1;
  margin-top: 10px;
  padding: 0.5rem;
  overflow-y: scroll;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
