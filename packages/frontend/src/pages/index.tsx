import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Column, Row } from '../ui/components/layouts';
import { StoreContext } from '../utils/store';
import { toast } from 'react-hot-toast';
import { useGames } from '../hooks/useGames';
import { Button, ListItem } from '../ui';
import { UserEntry, IconInput, GameEntry } from '../ui/components/molecules';
import { faCheck, faClipboard, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MessageBox } from '../ui/components/molecules';
import { useLobby } from '../hooks/useLobby';
import { InQueue } from '../ui/components/templates';
import { Page } from '../ui/components/templates/Page/Page';

export default function Index() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const { state } = useContext(StoreContext);
  const [username, setUsername] = useState<string>('');

  const { lobbyId } = router.query;

  const { isAdmin } = useLobby();

  const { data: games } = useGames({
    limit: state.lobby ? state.lobby.players.length : 0,
  });

  useEffect(() => {
    if (state.account) {
      setUsername(state.account.username);
    }
  }, [state.account]);

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
      <InQueue
        isAdmin={isAdmin()}
        queueType={state.queue.type}
        lobbyPlayers={state.lobby.players}
        onLeaveQueue={() => state.socket.leaveGameSearch(state.queue.type)}
      />
    );
  }

  return (
    <Page>
      <Row>
        <Column widthFlex={1}>
          <Card header={'Lobby members'} subHeader={'People in your lobby'}>
            {(state.lobby?.players || []).map((u, index) => (
              <UserEntry
                {...u}
                key={`user-${u.username}-index-${index}`}
                usernameOverride={username}
                kickable={isAdmin() && u.id !== state.account.id}
                onUsernameChange={(name: string) => setUsername(name)}
                onUsernameSave={() => state.socket.updateUsername(username)}
              />
            ))}
            {!state.lobby?.id ? (
              <Button onClick={() => state.socket?.createLobby()} text={'Create lobby'} />
            ) : (
              <IconInput
                text={`http://localhost:3000/?lobbyId=${state.lobby.id}`}
                icon={!copied ? faClipboard : faCheck}
                onClick={() => {
                  navigator.clipboard.writeText(`http://localhost:3000/?lobbyId=${state.lobby.id}`);
                  toast('Copied lobby link', {
                    icon: '🎉',
                  });
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 5000);
                }}
              />
            )}
          </Card>
          {state.lobby?.id && (
            <Card header={'Messages'} subHeader={'Chat directly with your lobby'}>
              <MessageBox messages={state.lobby.messages ?? []} />
              <IconInput
                text={message}
                icon={faPaperPlane}
                onChange={text => setMessage(text)}
                onSubmit={() => {
                  if (message) {
                    state.socket.sendMessage(message);
                    setMessage('');
                  }
                }}
              />
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
                      if (isAdmin()) {
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
    </Page>
  );
}
