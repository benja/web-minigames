import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Column, Container, Row } from '../ui/components/layouts';
import { StoreContext } from '../utils/store';
import { GameLobbySizes } from '@wmg/shared';
import { toast } from 'react-hot-toast';
import { useGames } from '../hooks/useGames';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import { Centered } from '../ui/components/layouts/Centered';
import { Text } from '../ui';
import { AvatarRow, Button, UserEntry } from '../ui/components/molecules';
import { ListItem } from '../ui';
import { GameEntry } from '../ui/components/molecules';

export default function Index() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const { data: games } = useGames();
  const { state } = useContext(StoreContext);
  const { lobbyId } = router.query;

  console.log(state);

  useEffect(() => {
    if (!state.socket || state.lobby || !state.account) return;

    // Username is generated on FE and therefore might not exist on lobby join (if you get an invite link)
    if (!state.account.username || !state.account.id) return;

    if (lobbyId && typeof lobbyId === 'string') {
      console.log('joined', state);
      state.socket.joinLobby(lobbyId);
    }
  }, [lobbyId, state.lobby, state.socket, state.account]);

  if (state.queue) {
    return (
      <Centered>
        <Text header>You are currently in queue for {state.queue.type}...</Text>
        <AvatarRow
          users={(function () {
            const emptyUsers = new Array(GameLobbySizes[state.queue.type]).fill({});
            console.log(GameLobbySizes[state.queue.type]);
            state.lobby.players.forEach((p, i) => (emptyUsers[i] = p));
            return emptyUsers;
          })()}
          showName
        />
        {state.lobby.players.filter(p => p.id === state.account.id)[0].admin && (
          <Button text={'Leave queue'} onClick={() => state.socket.leaveGameSearch(state.queue.type)} />
        )}
      </Centered>
    );
  }

  return (
    <Container>
      <Row>
        <Column widthFlex={1}>
          <Card header={'Lobby members'} subHeader={'People in your lobby'}>
            {(state.lobby?.players || []).map((u, index) => (
              <UserEntry {...u} key={`user-${u.username}-index-${index}`} />
            ))}
            {!state.lobby?.id ? (
              <button onClick={() => state.socket?.createLobby()}>Create lobby</button>
            ) : (
              <Button
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
                text={copied ? 'Copied' : 'Copy lobby link'}
              />
            )}
          </Card>
          {state.lobby?.id && (
            <Card header={'Messages'} subHeader={'Chat directly with your lobby'}>
              {state.lobby.messages && (
                <Messages>
                  {state.lobby.messages.map((m, index) => (
                    <Message key={`message-${m}-${index}`}>
                      <Avatar name={m.username} size="25" round="5px" />
                      <p style={{ marginLeft: 5 }}>
                        <strong>
                          {m.username}
                          {(state.account.admin && <strong>👑</strong>) ?? ''} :
                        </strong>
                      </p>
                      <p style={{ marginLeft: 5 }}>{m.message}</p>
                    </Message>
                  ))}
                </Messages>
              )}
              <form
                style={{ display: 'flex', flexDirection: 'row' }}
                onSubmit={e => {
                  e.preventDefault();
                  if (message) {
                    state.socket.sendMessage(message);
                    setMessage('');
                  }
                }}
              >
                <input value={message} onChange={e => setMessage(e.target.value)} />
                <button>send</button>
              </form>
            </Card>
          )}
        </Column>
        <Column widthFlex={2}>
          {games &&
            games.map((game, index) => (
              <ListItem key={`game-${game.type}-${index}`}>
                <GameEntry
                  onClick={() => {
                    if (state.lobby) {
                      const isAdmin = state.lobby.players.filter(p => p.id === state.account.id)[0];
                      if (isAdmin && isAdmin.admin) {
                        state.socket.startGameSearch(game.type);
                      } else {
                        toast.error('You must be the lobby leader to start a game.');
                      }
                    } else {
                      toast.error('You must be in a lobby to start a game.');
                    }
                  }}
                  {...game}
                />
              </ListItem>
            ))}
        </Column>
      </Row>
    </Container>
  );
}

const Messages = styled.div`
  border: 1px solid #dedede;
  border-radius: 5px;
  height: 250px;
  flex-grow: 1;
  margin-top: 10px;
  padding: 0.5rem;
  overflow-y: scroll;
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
