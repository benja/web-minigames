import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Column, Container, Row } from '../ui/components/layouts';
import { StoreContext } from '../utils/store';
import { Game } from '@wmg/shared';
import { GameListing, UserListing } from '../ui/components/organisms';
import { toast } from 'react-hot-toast';

const games: Game[] = [
  {
    name: 'This is a game name',
    description: 'This is a description of a game pepehands',
    image: 'https://avatars.githubusercontent.com/u/16708653?s=400&u=b96a5b2534bdd50476bddf50d0290985b5888687&v=4',
  },
];

export default function Index() {
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const { state } = useContext(StoreContext);
  const { lobbyId } = router.query;

  useEffect(() => {
    if (!state.socket || state.lobby) return;

    if (lobbyId && typeof lobbyId === 'string') {
      console.log('Join lobby', lobbyId);
      state.socket.joinLobby(lobbyId);
    }
  }, [lobbyId, state.lobby, state.socket]);

  return (
    <Container>
      <Row>
        <Column widthFlex={1}>
          <UserListing users={state.lobby?.players || []} />
          {!state.lobby?.id && <button onClick={() => state.socket?.createLobby()}>Create lobby</button>}
          {state.lobby?.id && (
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
          )}
        </Column>
        <Column widthFlex={2}>
          <GameListing games={games} />
        </Column>
      </Row>
    </Container>
  );
}
