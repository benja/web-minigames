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
import { Button, Text, ListItem, Input } from '../ui';
import { AvatarRow, UserEntry, IconInput, GameEntry } from '../ui/components/molecules';
import { faCheck, faClipboard, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MessageBox } from '../ui/components/molecules/MessageBox/MessageBox';

export default function Index() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const { state } = useContext(StoreContext);
  const { lobbyId } = router.query;

  const { data: games } = useGames({
    limit: state.lobby ? state.lobby.players.length : 0,
  });

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
              <Button onClick={() => state.socket?.createLobby()} text={'Create lobby'} />
            ) : (
              <IconInput text={`http://localhost:3000/?lobbyId=${state.lobby.id}`} icon={!copied ? faClipboard : faCheck} onClick={() => {
                navigator.clipboard.writeText(`http://localhost:3000/?lobbyId=${state.lobby.id}`);
                toast('Copied lobby link', {
                  icon: '🎉',
                });
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 5000);
              }}/>
            )}
          </Card>
          {state.lobby?.id && (
            <Card header={'Messages'} subHeader={'Chat directly with your lobby'}>
              <MessageBox messages={state.lobby.messages ?? []} />
              <IconInput text={message} icon={faPaperPlane} onChange={text => setMessage(text)} onSubmit={() => {
                if (message) {
                  state.socket.sendMessage(message);
                  setMessage('');
                }
              }}/>
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
