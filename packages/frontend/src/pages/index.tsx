import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Column, Container, Row } from '../ui/components/layouts';
import { StoreContext } from '../utils/store';
import { Game } from '@wmg/shared';
import { GameListing, UserListing } from '../ui/components/organisms';
import { toast } from 'react-hot-toast';
import { useGames } from '../hooks/useGames';
import styled from 'styled-components';
import Avatar from 'react-avatar';

export default function Index() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const { data: games } = useGames();
  const { state } = useContext(StoreContext);
  const { lobbyId } = router.query;

  useEffect(() => {
    if (!state.socket || state.lobby) return;

    if (lobbyId && typeof lobbyId === 'string') {
      state.socket.joinLobby(lobbyId);
    }
  }, [lobbyId, state.lobby, state.socket]);

  return (
    <Container>
      <Row>
        <Column widthFlex={2}>
          <UserListing users={state.lobby?.players || []} />
          {!state.lobby?.id && <button onClick={() => state.socket?.createLobby()}>Create lobby</button>}
          {state.lobby?.id && (
            <>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`http://localhost:3000/?lobbyId=${state.lobby.id}`);
                  toast('Copied lobby link', {
                    icon: '🎉',
                  });
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
              >
                {copied ? 'Copied' : 'Copy lobby link'}
              </button>
              <Messages>
                {state.lobby.messages &&
                  state.lobby.messages.map(m => (
                    <Message>
                      <Avatar
                        name={state.lobby.players
                          .filter(p => p.id === m.id)[0]
                          .username.split(/(?=[A-Z])/)
                          .join(' ')}
                        size="25"
                        round="5px"
                      />
                      <p style={{ marginLeft: 5 }}>
                        <strong>
                          {state.lobby.players.filter(p => p.id === m.id)[0].username}{' '}
                          {state.lobby.players.filter(p => p.id === m.id)[0].admin && <strong>👑</strong>} :
                        </strong>
                      </p>
                      <p style={{ marginLeft: 5 }}>{m.message}</p>
                    </Message>
                  ))}
              </Messages>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <input value={message} onChange={e => setMessage(e.target.value)} />
                <button onClick={() => state.socket.sendMessage(message)}>send</button>
              </div>
            </>
          )}
        </Column>
        <Column widthFlex={2}>
          <GameListing games={games} />
        </Column>
      </Row>
    </Container>
  );
}

const Messages = styled.div`
  border: 1px solid #dedede;
  border-radius: 5px;
  height: 150px;
  flex-grow: 1;
  margin-top: 10px;
  padding: 0.5rem;
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
