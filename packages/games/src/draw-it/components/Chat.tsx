import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PaperPlaneIcon } from './Icons/PaperPlane';
import { Message, MessageType } from '@wmg/shared';
import { DefaultStore } from '../../utils/store';

export function Chat(props: {
  state: DefaultStore;
  messages: Message[];
  onSubmit: (e: FormEvent) => void;
  onChange: (e) => void;
  message: string;
}) {
  const ref = useRef<HTMLDivElement>();
  const isDrawer =
    props.state.game && props.state.gameSocket && props.state.game?.drawer === props.state.gameSocket?.socket?.id;

  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollTop = ref.current.scrollHeight;
  }, [props.messages]);

  return (
    <Container>
      <Messages ref={ref}>
        {props.messages &&
          props.messages.map((m, i) => {
            switch (m.type) {
              case MessageType.MESSAGE:
                return (
                  <Message key={`${MessageType.MESSAGE}-${m.username}-${m.message}-${i}`}>
                    <span>{m.username}:</span>
                    {m.message}
                  </Message>
                );
              case MessageType.ALERT:
                return (
                  <Alert
                    key={`${MessageType.ALERT}-${m.message}-${i}`}
                    type={m.message.includes('drawer') ? 'info' : m.message.includes('guessed') ? 'success' : 'error'}
                  >
                    {m.message}
                  </Alert>
                );
            }
          })}
      </Messages>

      {!isDrawer && (
        <Form onSubmit={props.onSubmit}>
          <Chatbox value={props.message} placeholder="Guess the word!" onChange={props.onChange} />
          <Button>
            <PaperPlaneIcon size={20} color="#0797FF" />
          </Button>
        </Form>
      )}
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

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  height: 93.5%;
  margin-bottom: 10px;
  flex-grow: 1;
  overflow-y: auto;
`;

const Message = styled.p`
  font-size: 14.5px;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 5px;

  span {
    font-weight: inherit;
    font-family: inherit;
    font-weight: bold;
    margin-right: 3px;
  }
`;

const Alert = styled.p<{ type: 'success' | 'info' | 'error' }>`
  color: ${props =>
    props.type === 'success'
      ? '#009F10'
      : props.type === 'info'
      ? '#0797ff'
      : props.type === 'error'
      ? '#ff4c4c'
      : '#000000'};
  margin-bottom: 5px;
  font-size: 14.5px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Chatbox = styled.input`
  padding: 6px;
  border-radius: 5px;
  border: none;
  background: #f2f2f2;
  color: #6a6a6a;
`;

const Button = styled.button`
  border: none;
  padding: 2px 5px;
  border-radius: 5px;
  background: #f2f2f2;
  margin-left: 6px;

  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
`;
